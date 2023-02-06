import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dish from 'App/Models/Dish';
import Typesense from '@ioc:Typesense';
import DishType from 'Types/Dish/Dish.interface';
import SearchableDish from 'Types/Dish/SearchableDish.interface';
import ErrorType from 'Types/ErrorType.enum';
import ProfileDishActivity from 'App/Models/ProfileDishActivity';

export default class DishesController {
    public async fetchById({ response, params }: HttpContextContract) {
        const dishes = await Dish.query()
            .where('id', params.id)
            .preload('userActivity');
        
        if (dishes.length <= 0) return response.status(404).send({ error: ErrorType.NOT_FOUND });
        if (dishes.length > 1) return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const dish = dishes[0];

        return {
            ...dish?.serialize(),
            meta: await dish?.computeMeta(),
            likedby: dish.userActivity.map((activity)=>{
                if(activity.isLiked)
                return {id: activity.profileId}}),
        }
    };

    public async like({ auth, params, response }: HttpContextContract){
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }
        
        const dishes = await Dish.query()
        .where('id', params.id)
        .preload('userActivity');
    
        if (dishes.length <= 0) return response.status(404).send({ error: ErrorType.NOT_FOUND });
        if (dishes.length > 1) return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const searchCriteria = {
            dishId: params.id,
            profileId: auth.user!.id
          }
          
        const savePayload = {
            isLiked: true
        }
       
        return await ProfileDishActivity.updateOrCreate( searchCriteria, savePayload ); 

    }

    public async unLike({ auth, params, response }: HttpContextContract){
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }
        
        const dishes = await Dish.query()
        .where('id', params.id)
        .preload('userActivity');
    
        if (dishes.length <= 0) return response.status(404).send({ error: ErrorType.NOT_FOUND });
        if (dishes.length > 1) return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const searchCriteria = {
            dishId: params.id,
            profileId: auth.user!.id
          }
          
        const savePayload = {
            isLiked: false
        }
       
        return await ProfileDishActivity.updateOrCreate( searchCriteria, savePayload ); 

    }

    public async bookmark({ auth, params, response }: HttpContextContract){
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }
        
        const dishes = await Dish.query()
        .where('id', params.id)
        .preload('userActivity');
    
        if (dishes.length <= 0) return response.status(404).send({ error: ErrorType.NOT_FOUND });
        if (dishes.length > 1) return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const searchCriteria = {
            dishId: params.id,
            profileId: auth.user!.id
          }
          
        const savePayload = {
            isBookmarked: true
        }
       
        return await ProfileDishActivity.updateOrCreate( searchCriteria, savePayload ); 
    }
    public async unBookmark({ auth, params, response }: HttpContextContract){
        try{
            await auth.use('web').authenticate()
        }
        catch{
            return response.status(401).send({error: ErrorType.UNAUTHORIZED});
        }
        
        const dishes = await Dish.query()
        .where('id', params.id)
        .preload('userActivity');
    
        if (dishes.length <= 0) return response.status(404).send({ error: ErrorType.NOT_FOUND });
        if (dishes.length > 1) return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const searchCriteria = {
            dishId: params.id,
            profileId: auth.user!.id
          }
          
        const savePayload = {
            isBookmarked: false
        }
       
        return await ProfileDishActivity.updateOrCreate( searchCriteria, savePayload ); 
    }

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

        return dish.recipe;
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

        const serializedDishes: Array<DishType> = [];

        for (let dish of paginated) {
            serializedDishes.push({
                ...dish.serialize() as DishType,
                meta: await dish.computeMeta(),
                likedby: dish.userActivity.map((activity)=>{
                    if(activity.isLiked)
                    return {id: activity.profileId}}),
                
            });
        };

        return {
            ...paginated.serialize(),
            data: serializedDishes,
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
