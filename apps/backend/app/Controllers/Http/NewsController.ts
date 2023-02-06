import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NewsEntry from 'App/Models/NewsEntry'

export default class NewsController {
    public async paginate({ request }: HttpContextContract) {
        const page = request.input('page') ?? 1;
        const itemsPerPage = request.input('itemsPerPage') ?? 5;
        
        return await NewsEntry
            .query()
            .paginate(page, itemsPerPage);
    };
}
