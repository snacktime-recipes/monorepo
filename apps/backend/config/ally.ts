/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { AllyConfig } from '@ioc:Adonis/Addons/Ally'

/*
|--------------------------------------------------------------------------
| Ally Config
|--------------------------------------------------------------------------
|
| The `AllyConfig` relies on the `SocialProviders` interface which is
| defined inside `contracts/ally.ts` file.
|
*/
const allyConfig: AllyConfig = {
	/*
	|--------------------------------------------------------------------------
	| Google driver
	|--------------------------------------------------------------------------
	*/
	google: {
		driver: 'google',
		clientId: Env.get('GOOGLE_CLIENT_ID'),
		clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
		callbackUrl: `${ Env.get('NODE_ENV') == 'development' ? "http://localhost:5173/api" : "https://api.dev.snacktime.recipes" }/social/google/callback`,
	},
	/*
	|--------------------------------------------------------------------------
	| Twitter driver
	|--------------------------------------------------------------------------
	*/
	twitter: {
		driver: 'twitter',
		clientId: Env.get('TWITTER_CLIENT_ID'),
		clientSecret: Env.get('TWITTER_CLIENT_SECRET'),
		callbackUrl: `${ Env.get('NODE_ENV') == 'development' ? "http://localhost:5173/api" : "https://api.dev.snacktime.recipes" }/social/twitter/callback`,
	},
	/*
	|--------------------------------------------------------------------------
	| Discord driver
	|--------------------------------------------------------------------------
	*/
	discord: {
		driver: 'discord',
		clientId: Env.get('DISCORD_CLIENT_ID'),
		clientSecret: Env.get('DISCORD_CLIENT_SECRET'),
		callbackUrl: `${ Env.get('NODE_ENV') == 'development' ? "http://localhost:5173/api" : "https://api.dev.snacktime.recipes" }/social/discord/callback`,
		scopes: ['identify', 'email']
	},
  /*
  |--------------------------------------------------------------------------
  | Facebook driver
  |--------------------------------------------------------------------------
  */
  facebook: {
    driver: 'facebook',
    clientId: Env.get('FACEBOOK_CLIENT_ID'),
    clientSecret: Env.get('FACEBOOK_CLIENT_SECRET'),
    callbackUrl: `${ Env.get('NODE_ENV') == 'development' ? "http://localhost:5173/api" : "https://api.dev.snacktime.recipes" }/social/facebook/callback`,
  },
}

export default allyConfig
