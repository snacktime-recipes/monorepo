import Route from '@ioc:Adonis/Core/Route'

Route.get('/recipes', 'ProductsController.fetchAll');