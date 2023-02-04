import Route from '@ioc:Adonis/Core/Route'

// Products route
Route
    .group(() => {
        Route.post('/login', 'AuthorizationController.login');
        Route.post('/logout', 'AuthorizationController.logout');
        Route.get('/products', 'AuthorizationController.getProducts');
        Route.get('', 'AuthorizationController.getProfile');
    })
    .prefix("/profile")