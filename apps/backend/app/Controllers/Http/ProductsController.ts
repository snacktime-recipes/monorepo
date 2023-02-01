import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

export default class ProductsController {
    public async fetchById({ params }: HttpContextContract) {
        return await Product.find(params.id);
    };

    public async paginate({ request }: HttpContextContract) {
        const page = request.qs().page ?? 1;
        const itemsPerPage = 10;

        const paginated = await Product.query().paginate(page, itemsPerPage);
        paginated.baseUrl("/products");

        return paginated;
    };
}
