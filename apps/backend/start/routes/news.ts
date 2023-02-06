import Route from '@ioc:Adonis/Core/Route';

Route
    .group(() => {
        Route.get('', 'NewsController.paginate');
    })
    .prefix('/news');