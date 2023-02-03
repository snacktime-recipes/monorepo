import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";

test.group('Dishes -> FetchOne', (group) => {
  group.tap((test) => test.tags(["dishes"]));

  /*
  | Route: GET /dishes/:id
  | Returns: Instance of a Dish model
  | Model: Dish (App/Models/Dish)
  | Schema: {
  |   id: number,
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

  test('try to get nonexistent dish', async ({ client }) => {
    const response = await client.get('/dishes/:bruh');
    const { response: { body } } = response;

    response.assertStatus(404);
    response.assert?.equal(body, {
      error: ErrorType.NOT_FOUND
    });
  });
});