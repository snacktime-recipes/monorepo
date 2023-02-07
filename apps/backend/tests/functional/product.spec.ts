import { test } from '@japa/runner'
import ErrorType from 'Types/ErrorType.enum';
import { ProductSchema } from './_schemas/Product.schema';

test.group('Products', () => {
  /*
  | Route: GET /products
  | Schema: ./_schemas/Product.schema.ts
  | Description:
  |   Returns array of Product schema
  */
  test('get a paginated list of products', async ({ client, expect }) => {
    const response = await client.get('/products');
    const { response: { body } } = response;

    response.assertStatus(200);
    expect(body).toEqual(
      expect.arrayContaining([ProductSchema]),
    )
  });

  /*
  | Route: GET /products/:id
  | Schema: ...
  | Description:
  |   Returns product with this id
  */
  test('get one product', async ({ client, expect }) => {
    const response = await client.get('/products/1');
    const { response: { body } } = response;

    response.assertStatus(200);
    expect(body).toMatchObject(ProductSchema);
  });

  /*
  | Route: GET /products/:id
  | Schema: ...
  | Description:
  |   Returns 404 status code and { error: ErrorType.NOT_FOUND } payload,
  |   that means that product with this id was not found.
  */
  test('get nontexistent product', async ({ client }) => {
    const response = await client.get('/products/1');
    const { response: { body } } = response;

    response.assertStatus(404);
    response.assert?.deepEqual(body, {
      error: ErrorType.NOT_FOUND,
    });
  });
})
