import { test } from '@japa/runner'
import RecipeDifficulty from 'Types/Recipe/RecipeDifficulty.enum';

test.group('Dishes', () => {
  /*
  | Route: GET /dishes
  | Returns: Paginated array of dishes
  | Model: Dish (App/Models/Dish)
  | Schema:
  | {
  |   meta: { ...paginate meta options },
  |   data: [
  |     {
  |       id: string,
  |       name: string,
  |       description: string, (empty string if null),
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

    response.assert?.isArray(body.data);
    response.assert?.properties(body.data[0], ["id", "name", "description", "createdAt", "updatedAt"]);
  });

  /*
  | Route: GET /dishes/:id
  | Returns: Instance of a Dish model
  | Model: Dish (App/Models/Dish)
  | Schema: {
  |   id: string,
  |   name: string,
  |   description: string,
  |   createdAt: string,
  |   updatedAt: string,
  | }
  */
  test('get one dish', async ({ client }) => {
    const response = await client.get('/dishes/1');
    const { response: { body } } = response;

    response.assertStatus(200);
    response.assert?.properties(body, ["id", "name", "description", "createdAt", "updatedAt"]);
  });

  /*
  | Route: GET /dishes/:id/recipe
  | Returns: Recipe instance of a Dish
  | Model: Recipe (App/Models/Recipe)
  | Schema: {
  |   id: string,
  |   products: [ ...array of Product ],
  |   steps: [ ...array of CookStep ],
  |   cookingTime: number,
  |   difficulty: RecipeDifficulty enum (EASY, MEDIUM, HARD, IMPOSSIBLE)
  |   createdAt: string,
  |   updatedAt: string,
  | }
  */
  test('get recipe of a dish', async ({ client }) => {
    const response = await client.get('/dishes/1/recipe');
    const { response: { body } } = response;

    response.assertStatus(200);

    response.assert?.properties(body, ["id", "steps", "cookingTime", "difficulty", "createdAt", "updatedAt"]);
    
    response.assert?.isArray(body.steps);
    response.assert?.properties(body.steps[0], ["id", "title", "createdAt", "updatedAt"]);

    response.assert?.oneOf(body.difficulty, Object.values(RecipeDifficulty));
  });

  /*
  | Route: GET /dishes/:id/products
  | Returns: array of Product
  | Model: Product (App/Models/Product)
  | Schema: [
  |   {
  |     id: string,
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
})
