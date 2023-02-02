import Route from '@ioc:Adonis/Core/Route'

// Products route
Route
    .group(() => {
        Route.post('/login', 'AuthorizationController.login');
        Route.post('/logout', 'AuthorizationController.paginate');
        Route.get('/products', 'AuthorizationController.paginate');
        Route.get('', 'AuthorizationController.getProfile');
    })
    .prefix("/profile")