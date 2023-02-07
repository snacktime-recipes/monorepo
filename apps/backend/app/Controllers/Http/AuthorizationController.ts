import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile';
import ProfileProduct from 'App/Models/ProfileProduct';
import ProfileDishActivity from 'App/Models/ProfileDishActivity';
import ErrorType from 'Types/ErrorType.enum';
import { AuthType } from 'Types/Profile';
import DishesController from './DishesController';

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
        const body = request.body();

        const email = body.email;
        const username = body.username;
        const password = body.password;


        if (!email || !username || !password) return response.status(400).send({ error: ErrorType.INVALID_PAYLOAD });

        const profile = await Profile.create({
            email: email,
            username: username,
            password: password,
            authType: AuthType.PASSWORD,
        });
        
        await profile.save();
        await auth.use('web').loginViaId(profile.id);

        return auth.user!;

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
    public async getActivity({ auth, response }: HttpContextContract) {
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }
        const profile = await Profile.findBy("email", auth.user!.email);
        const profileDishActivity = await ProfileDishActivity.query()
            .where('profileId', profile!.id);
        return profileDishActivity;
    };
    public async updateProduct({ params, auth, response, request }: HttpContextContract){
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }

        const body = request.body();

        const productCount = body.count;
        const profile = await Profile.findBy("email", auth.user!.email);

        const searchCriteria = {
            productId: params.id,
            profileId: profile!.id
          }
          
        const savePayload = {
            productCount: productCount
        }
       
        return await ProfileProduct.updateOrCreate( searchCriteria, savePayload ); 
    }
    public async getProfile({ auth, response }: HttpContextContract) {
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }

        const profiles = await Profile
            .query()
            .preload('myDishesActivivty')
            .where('id', auth.user!.id);

        if (profiles.length != 1) return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const profile = profiles[0];

        return {
            ...profile.serialize(),
            likes: await Promise.all(
                profile.myDishesActivivty
                    .filter((activity) => activity.isLiked)
                    .map((activity) => DishesController.fetchById(activity.dishId))
            ),
            bookmarks: await Promise.all(
                profile.myDishesActivivty
                    .filter((activity) => activity.isBookmarked)
                    .map((activity) => DishesController.fetchById(activity.dishId))
            )
        };
    }
}
