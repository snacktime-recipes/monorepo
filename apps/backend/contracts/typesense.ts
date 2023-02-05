declare module '@ioc:Typesense' {
    import Client from 'providers/TypesenseProvider';
    const TypesenseClient: Client;
    
    export default TypesenseClient;
}