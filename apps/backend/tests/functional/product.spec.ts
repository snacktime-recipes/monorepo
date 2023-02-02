import { test } from '@japa/runner'

test.group('Products', () => {
  test('get a paginated list of products', async ({ client }) => {
    const response = await client.get('/products');
    const { response: { body } } = response;

    response.assertStatus(200);
    
    response.assert?.isArray(body.data);
    response.assert?.properties(body.data[0], ["id", "name", "imageUrl", "createdAt", "updatedAt"]);
  });

  test('get one product', async ({ client }) => {
    const response = await client.get('/products/1');
    const { response: { body } } = response;

    response.assertStatus(200);

    response.assert?.properties(body, ["id", "name", "imageUrl", "createdAt", "updatedAt"]);
  });
})
