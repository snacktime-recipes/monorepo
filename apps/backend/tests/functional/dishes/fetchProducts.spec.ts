import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";

test.group('Dishes -> FetchProducts', (group) => {
  group.tap((test) => test.tags(["dishes"]));

  /*
  | Route: GET /dishes/:id/products
  | Returns: array of Product
  | Model: Product (App/Models/Product)
  | Schema: [
  |   {
  |     id: number,
  |     name: string,
  |     imageUrl: string,
  |     createdAt: string,
  |     updatedAt: string,
  |   } 
  | ]
  */
  test('get products of a dish\'s recipe', async ({ client }) => {
    const response = await client.get('/dishes/1/products');
    const { response: { body } } = response;

    response.assertStatus(200);

    response.assert?.isArray(body);
    response.assert?.properties(body[0], ["id", "name", "count", "imageUrl", "createdAt", "updatedAt"]);
  });

  test('try to get products of a nonexistent dish', async ({ client }) => {
    const response = await client.get('/dishes/:bruh/products');
    const { response: { body } } = response;

    response.assertStatus(404);
    response.assert?.deepEqual(body, {
      error: ErrorType.NOT_FOUND,
      entity: "DISH"
    });
  });

  test('try to fetch empty products', async ({ client }) => {
    const response = await client.get('/dishes/2/products');
    const { response: { body } } = response;

    response.assertStatus(200);
    response.assert?.deepEqual(body, []);
  });
});