import { test } from '@japa/runner'

test.group('Dishes', (group) => {
  test('get a paginated list of dishes', async ({ client }) => {
    const response = await client.get('/dishes');
    const { response: { body } } = response;

    response.assertStatus(200);

    response.assert?.isArray(body.data);
    response.assert?.properties(body.data[0], ["id", "name", "description", "createdAt", "updatedAt"]);
  });

  test('get one dish', async ({ client }) => {
    const response = await client.get('/dishes/1');
    const { response: { body } } = response;

    response.assertStatus(200);
    response.assert?.properties(body, ["id", "name", "description", "createdAt", "updatedAt"]);
  });

  test('get recipe of a dish', async ({ client }) => {
    const response = await client.get('/dishes/1/recipe');
    const { response: { body } } = response;

    response.assertStatus(200);
    response.assert?.properties(body, ["id", "products", "steps", "cookingTime", "difficulty", "createdAt", "updatedAt"]);
  });

  test('get products of a dish\'s recipe', async ({ client }) => {
    const response = await client.get('/dishes/1/products');
    const { response: { body } } = response;

    response.assertStatus(200);

    response.assert?.isArray(body);
    response.assert?.properties(body[0], ["id", "name", "imageUrl", "createdAt", "updatedAt"]);
  });
})
