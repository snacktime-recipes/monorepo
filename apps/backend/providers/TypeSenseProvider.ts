import Typesense from 'typesense';
import Env from '@ioc:Adonis/Core/Env';

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

export const TypesenseClient = new Typesense.Client({
    nodes: [
        Env.get('NODE_ENV') == 'development' ? developmentNode : productionNode,
    ],
    apiKey: Env.get('SEARCH_API_KEY'),
});
export default TypesenseClient;