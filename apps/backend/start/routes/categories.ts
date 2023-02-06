import Route from '@ioc:Adonis/Core/Route'

// Products route
Route
    .group(() => {
        Route.get('', 'CategoriesController.paginate');
        Route.get('/:id', 'CategoriesController.fetchById');

    })
    .prefix("/categories")