import { test } from '@japa/runner'

test.group('Dishes', (group) => {
  group.tap((test) => test.tags(["dishes"]));

  /*
  | Route: GET /dishes
  | Returns: Paginated array of dishes
  | Model: Dish (App/Models/Dish)
  | Schema:
  | {
  |   meta: { ...paginate meta options },
  |   data: [
  |     {
  |       id: number,
  |       name: string,
  |       description: string,
  |       createdAt: string,
  |       updatedAt: string,
  |     }
  |   ] 
  | }
  */
  test('get a paginated list of dishes', async ({ client }) => {
    const response = await client.get('/dishes');
    const { response: { body } } = response;

    response.assertStatus(200);

    response.assert?.isObject(body.meta);
    response.assert?.isArray(body.data);
    response.assert?.properties(body.data[0], ["id", "name", "description", "createdAt", "updatedAt"]);
  });
})
