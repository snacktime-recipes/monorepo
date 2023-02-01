import Route from '@ioc:Adonis/Core/Route'

// Products route
Route
    .group(() => {
        Route.get('/:id', 'ProductsController.fetchById');
        Route.get('', 'ProductsController.paginate');
    })
    .prefix("/products")