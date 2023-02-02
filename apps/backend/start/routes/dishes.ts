import Route from '@ioc:Adonis/Core/Route'

// Products route
Route
    .group(() => {
        Route.get('/:id', 'DishesController.fetchById');
        Route.get('/:id/recipe', 'DishesController.getRecipe')
        Route.get('/:id/products', 'DishesController.getProducts')
        Route.get('', 'DishesController.paginate');
    })
    .prefix("/dishes")