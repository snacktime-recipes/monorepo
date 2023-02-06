import Route from '@ioc:Adonis/Core/Route'

// Products route
Route
    .group(() => {
        Route.get('/search', 'DishesController.search')
        Route.get('/:id', 'DishesController.fetch');
        Route.post('/:id/like', 'DishesController.like');
        Route.post('/:id/unlike', 'DishesController.unLike');
        Route.post('/:id/bookmark', 'DishesController.bookmark');
        Route.post('/:id/unbookmark', 'DishesController.unBookmark');
        Route.get('/:id/recipe', 'DishesController.getRecipe')
        Route.get('/:id/products', 'DishesController.getProducts')
        Route.get('', 'DishesController.paginate');
    })
    .prefix("/dishes")