import Route from '@ioc:Adonis/Core/Route'

Route
    .group(() => {
        Route.get('/:id/callback', 'SocialAuthsController.callback');
        Route.get('/:id', 'SocialAuthsController.redirect');
    })
    .prefix('/social')