import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dish from 'App/Models/Dish';
import ErrorType from 'Types/ErrorType.enum';

export default class DishesController {
    public async fetchById({ params, response }: HttpContextContract) {
        const dish = await Dish.query()
            .where('id', params.id)
            .preload('userActivity');

        if(dish.length == 0)
            return response.status(404).send({error: ErrorType.NOT_FOUND});

        return dish;
    };

    public async getRecipe({ params }: HttpContextContract) {
        const dish = await Dish
            .query()
            .where('id', params.id)
            .preload('recipe', (query) => query.preload('steps'));
        return dish[0].recipe;
    }

    public async getProducts({ params, response }: HttpContextContract) {
        const dish = await Dish
            .query()
            .where('id', params.id)
            .preload('recipe', (query) => {
                query.preload('products', (query) => query.preload('product'));
            });

        if(dish.length == 0)
            return response.status(404).send({error: ErrorType.NOT_FOUND, entity: 'DISH'});

        try{
            return dish[0].recipe.products.map((recipeProduct) => ({
                ...recipeProduct.product.serialize(),
                count: recipeProduct.productCount
            }));
        }
        catch{
            return [];
        }
    }

    public async paginate({ request }: HttpContextContract) {
        const page = request.qs().page ?? 1;
        const itemsPerPage = 10;

        const paginated = await Dish.query()
            .preload('userActivity')
            .paginate(page, itemsPerPage);
        paginated.baseUrl("/dishes");

        return paginated;
    };
}
