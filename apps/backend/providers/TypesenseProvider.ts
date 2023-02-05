import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Dish from 'App/Models/Dish';
import type { Client } from 'typesense';
import Typesense from 'typesense';

// Nodes configuration
const developmentNode = {
  host: 'search.dev.snacktime.recipes',
  port: 443,
  protocol: 'https',
};

const productionNode = {
  host: 'typesence',
  port: 8108,
  protocol: 'http'
};

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class TypesenseProvider {
  private client: Client;

  constructor(protected app: ApplicationContract) {
    const Env = this.app.container.resolveBinding('Adonis/Core/Env');

    this.client = new Typesense.Client({
      apiKey: Env.get('SEARCH_API_KEY'),
      nodes: [
        // Env.get('NODE_ENV') == 'development' ? developmentNode : productionNode,
        developmentNode,
      ],
    });
  };

  // Methods
  public search(collection: 'dishes', options: {
    query: string
  }) {
    return this.client
      .collections(collection)
      .documents()
      .search({
        q: options.query,
        query_by: this.getQueryByProperty(collection),
      });
  };

  public async updateOrCreate(entity: Dish) { 
    const document = await this.client
      .collections('dishes')
      .documents(entity.id.toString())
      .retrieve()
      .catch(() => (null));

    if (!document) {
      // Creating new
      await this.client
        .collections('dishes')
        .documents()
        .create({
          id: entity.id.toString(),
          name: entity.name,
          description: entity.description ?? "",
        })
    } else {
      // Updating
      await this.client
        .collections('dishes')
        .documents(entity.id.toString())
        .update({
          name: entity.name,
          description: entity.description ?? "",
        });
    };
  };

  // Private
  private getQueryByProperty(collection: 'dishes'): string {
    switch (collection) {
      case 'dishes':
        return 'name,description';
    };
  };
}
