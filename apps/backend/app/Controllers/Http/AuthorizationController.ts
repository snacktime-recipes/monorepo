import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import Profile from 'App/Models/Profile';

export default class AuthorizationController {
    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email');
        const password = request.input('password');
        try{
        await auth.use('web').attempt(email, password);
        }
        catch{
            return "You've just made a misstake ;3"
        }

        response.redirect('/profile')
        
    };
    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('web').logout()
        response.redirect('/profile/login')
    };
    public async products({ auth }: HttpContextContract) {
        await auth.use('web').authenticate()
    };
    public async getProfile({auth}: HttpContextContract) {
        await auth.use('web').authenticate()

        return await Profile.findBy("email", auth.user!.email);
    }
}
