import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile';
import ProfileProduct from 'App/Models/ProfileProduct';
import ErrorType from 'Types/ErrorType.enum';

export default class AuthorizationController {
    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email');
        const password = request.input('password');
        try{
            await auth.use('web').attempt(email, password);
        }
        catch{
            return response.status(400).send({error: ErrorType.INVALID_PAYLOAD});
        }

        return auth.user;
        
        
    };
    public async logout({ auth, response }: HttpContextContract) {
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }
        await auth.use('web').logout();
        
        return response.status(200).send({ok: true});
    };
    public async register({ request, auth, response }: HttpContextContract) {
        const email = request.input('email');
        const userName = request.input('userName');
        const password = request.input('password');
        
        const profile = await Profile.create({
            email: email,
            userName: userName,
            password: password
            });
        
        try{
            await profile.save()
        }
        catch{
            return response.status(404).send({error: '?'});
        }
        
        try{
            await auth.use('web').loginViaId(profile.id)
        }
        catch{
            return response.status(404).send({error: '??'});
        }

        return response.status(200).send({profile, ok: true});

    }
    public async getProducts({ auth, response }: HttpContextContract) {
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }
        const profile = await Profile.findBy("email", auth.user!.email);
        const profileProducts = await ProfileProduct.query()
            .where('profileId', profile!.id)
            .preload('product');
        return profileProducts.map((profileProduct) => ({
            ...profileProduct.product.serialize(),
            count: profileProduct.productCount
        }));
    };
    public async getProfile({ auth, response }: HttpContextContract) {
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }

        return await Profile.findBy("email", auth.user!.email);
    }
}
