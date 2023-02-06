import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryType from 'Types/Category/Category.interface';
import Category from 'App/Models/Category';
import ErrorType from 'Types/ErrorType.enum';

export default class CategoriesController {
    public async paginate({ request }: HttpContextContract) {
        const page = request.qs().page ?? 1;
        const itemsPerPage = 10;

        const paginated = await Category.query()
            .paginate(page, itemsPerPage);
        paginated.baseUrl("/categories");

        const serializedDishes: Array<CategoryType> = [];

        for (let category of paginated) {
            serializedDishes.push({
                ...category.serialize() as CategoryType});
        };

        return {
            ...paginated.serialize(),
            data: serializedDishes,
        };
    };
    public async fetchById({ response, params }: HttpContextContract) {
        const categories = await Category.query()
            .where('id', params.id);
        
        if (categories.length <= 0) return response.status(404).send({ error: ErrorType.NOT_FOUND });
        if (categories.length > 1) return response.status(500).send({ error: ErrorType.SERVER_ERROR });

        const category = categories[0];

        return {
            ...category?.serialize(),
        }
    };
}
