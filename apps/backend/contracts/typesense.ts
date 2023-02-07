declare module '@ioc:Typesense' {
    import Client from 'providers/TypesenseProvider';
    const Typesense: Client;
    
    export default Typesense;
}