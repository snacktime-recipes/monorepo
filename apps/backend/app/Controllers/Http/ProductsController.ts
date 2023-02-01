import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

export default class ProductsController {
    public async fetchAll(ctx: HttpContextContract) {
        return [
            {
                id: 1,
                title: "String"
            }
        ]
    };
}
