import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dish from 'App/Models/Dish';

export default class DishesController {
    public async fetchById({ params }: HttpContextContract) {
        return await Dish.find(params.id);
    };

    public async getRecipe({params}: HttpContextContract) {
        const dish = await Dish
            .query()
            .where('id', params.id)
            .preload('recipe');
        return dish[0].recipe;
    }

    public async getProducts({params}: HttpContextContract) {
        const dish = await Dish
            .query()
            .where('id', params.id)
            .preload('recipe', (query) => {
                query.preload('products');
            });
        return dish[0].recipe.products;
    }

    public async paginate({ request }: HttpContextContract) {
        const page = request.qs().page ?? 1;
        const itemsPerPage = 10;
        

        const paginated = await Dish.query().paginate(page, itemsPerPage);
        paginated.baseUrl("/dishes");

        return paginated;
    };
}
