import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dish from 'App/Models/Dish';
import Typesense from '@ioc:Typesense';
import DishType from 'Types/Dish/Dish.interface';
import SearchableDish from 'Types/Dish/SearchableDish.interface';
import ErrorType from 'Types/ErrorType.enum';
import ProfileDishActivity from 'App/Models/ProfileDishActivity';

export default class DishesController {
    public static async fetchById(id: number) {
        const dishes = await Dish.query()
            .preload('recipe')
            .preload('userActivity')
            .where('id', id);

        if (dishes.length != 1) return null;
        const dish = dishes[0];

        return {
            ...dish.serialize(),
            likedBy: dish.userActivity
                .filter((activity) => activity.isLiked)
                .map((activity) => activity.profileId) ?? [],
            meta: await dish.computeMeta(),
        };
    };
    
    public async fetch({ response, params }: HttpContextContract) {
        const dish = await DishesController.fetchById(params.id);
        
        if (!dish) return response.status(404).send({ error: ErrorType.NOT_FOUND });
        return dish;
    };

    public async like({ auth, params, response, request }: HttpContextContract){
        try {
            await auth.use('web').authenticate()
        } catch {
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        };
        
        const dishes = await Dish.query()
            .where('id', params.id)
            .preload('userActivity');
    
        if (dishes.length <= 0) return response.status(404).send({ error: ErrorType.NOT_FOUND });
        if (dishes.length > 1) return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const searchCriteria = {
            dishId: params.id,
            profileId: auth.user!.id
        };
          
        const savePayload = {
            isLiked: request.url().endsWith("/unlike") ? false : true
        };
       
        return await ProfileDishActivity.updateOrCreate( searchCriteria, savePayload ); 
    };

    public async bookmark({ auth, params, response, request }: HttpContextContract){
        try {
            await auth.use('web').authenticate()
        } catch {
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        };
        
        const dishes = await Dish.query()
            .where('id', params.id)
            .preload('userActivity');
    
        if (dishes.length <= 0) return response.status(404).send({ error: ErrorType.NOT_FOUND });
        if (dishes.length > 1) return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const searchCriteria = {
            dishId: params.id,
            profileId: auth.user!.id
        };
        
        const savePayload = {
            isBookmarked: request.url().endsWith("/unbookmark") ? false : true
        };
       
        return await ProfileDishActivity.updateOrCreate( searchCriteria, savePayload ); 
    };

    public async getRecipe({ response, params }: HttpContextContract) {
        const dishes = await Dish
            .query()
            .where('id', params.id)
            .preload('recipe', (query) => query.preload('steps'));

        if (dishes.length == 0)
            return response.status(404).send({ error: ErrorType.NOT_FOUND, entity: "DISH" });

        const dish = dishes[0];

        if (dish.recipe == null)
            return response.status(404).send({ error: ErrorType.NOT_FOUND, entity: "RECIPE" });

        return {
            ...dish.recipe.serialize(),
            steps: dish.recipe.steps.map((step) => ({
                id: step.id,
                title: step.title,
                description: step.description,
                videoUrl: step.videoUrl,
            })),
        };
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
        const page = request.input("page") ?? 1;
        const itemsPerPage = request.input("itemsPerPage") ?? 10;

        const paginated = await Dish.query()
            .paginate(page, itemsPerPage);

        paginated.baseUrl("/dishes");

        return {
            ...paginated.serialize(),
            data: await Promise.all(paginated.map((dish) => DishesController.fetchById(dish.id))),
        };
    };

    public async search({ response, request }: HttpContextContract) {
        const query = request.input('query');

        if (!query)
            return response.status(400).send({ error: ErrorType.INVALID_PAYLOAD, message: "?query parameter is mandatory" })

        const results = await Typesense.search('dishes', {
            query
        }).catch(() => response.status(500).send({ error: ErrorType.SERVER_ERROR }));

        if (!results) return;

        // Fetching dishes with these ids, and returning them
        const serializedDishes: Array<SearchableDish> = [];

        for (let result of results.hits ?? []) {
            const dish = await Dish.findBy('id', result.document['id']).catch(null);

            if (dish) {
                serializedDishes.push({
                    ...dish.serialize() as DishType,
                    meta: await dish.computeMeta(),
                    // @ts-ignore
                    highlights: result.highlights?.map((highlight) => ({
                        field: highlight.field,
                        snippet: highlight.snippet,
                    })) ?? [],
                });
            };
        };

        return {
            found: results.found,
            hits: serializedDishes,
        };
    };
}
