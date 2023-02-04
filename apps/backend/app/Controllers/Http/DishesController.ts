import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dish from 'App/Models/Dish';
import DishType from 'Types/Dish/Dish.interface';

export default class DishesController {
    public async fetchById({ params }: HttpContextContract) {
        const dish = await Dish.find(params.id);
        return {
            ...dish?.serialize(),
            meta: await dish?.computeMeta(),
        }
    };

    public async getRecipe({params}: HttpContextContract) {
        const dish = await Dish
            .query()
            .where('id', params.id)
            .preload('recipe', (query) => query.preload('steps'));
        return dish[0].recipe;
    }

    public async getProducts({params}: HttpContextContract) {
        const dish = await Dish
            .query()
            .where('id', params.id)
            .preload('recipe', (query) => {
                query.preload('products', (query) => query.preload('product'));
            });
        return dish[0].recipe.products.map((recipeProduct) => ({
            ...recipeProduct.product.serialize(),
            count: recipeProduct.productCount
        }));
    }

    public async paginate({ request }: HttpContextContract) {
        const page = request.qs().page ?? 1;
        const itemsPerPage = 10;

        const paginated = await Dish.query().paginate(page, itemsPerPage);
        paginated.baseUrl("/dishes");

        const serializedDishes: Array<DishType> = [];

        for (let dish of paginated) {
            serializedDishes.push({
                ...dish.serialize() as DishType,
                meta: await dish.computeMeta(),
            });
        };

        return {
            ...paginated.serialize(),
            data: serializedDishes,
        };
    };
}
