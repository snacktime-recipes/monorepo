import Route from '@ioc:Adonis/Core/Route'

// Products route
Route
    .group(() => {
        Route.post('/login', 'AuthorizationController.login');
        Route.post('/logout', 'AuthorizationController.logout');
        Route.post('/register', 'AuthorizationController.register');
        Route.get('/products', 'AuthorizationController.getProducts');
        Route.get('/categories', 'AuthorizationController.getCategories');
        Route.get('/activity', 'AuthorizationController.getActivity');
        Route.post('/products/:id', 'AuthorizationController.updateProduct');
        Route.get('', 'AuthorizationController.getProfile');
    })
    .prefix("/profile")