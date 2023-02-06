import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile';
import ErrorType from 'Types/ErrorType.enum'
import { AuthType } from 'Types/Profile';
import Env from '@ioc:Adonis/Core/Env';

export default class SocialAuthsController {
    private providers = ['discord', 'twitter', 'facebook', 'google'];

    public async callback({ params, auth, ally, response }: HttpContextContract) {
        if (this.providers.includes(params.id) == false)
            return response.status(400).send({ error: ErrorType.INVALID_PAYLOAD });

        const provider: Lowercase<AuthType> = params.id;

        // Trying to authorize this user
        const result = ally.use(provider);

        if (result.accessDenied() || result.stateMisMatch() || result.hasError())
            return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const user = await result.user();
        const profile = await Profile.updateOrCreate({
            email: user.email!
        }, {
            avatar: user.avatarUrl!,
            email: user.email!,
            username: user.nickName ?? user.name,
            authType: provider as AuthType,
        });

        await auth.use('web').login(profile);
        return response.redirect().status(200).toPath(Env.get('APP_URL'));
    };

    public async redirect({ params, ally, response }: HttpContextContract) {
        if (this.providers.includes(params.id) == false)
            return response.status(400).send({ error: ErrorType.INVALID_PAYLOAD });

        // Redirecting
        return ally.use(params.id).redirect();
    };
};
