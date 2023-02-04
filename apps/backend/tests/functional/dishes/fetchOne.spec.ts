import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";
import { ApiResponse } from "@japa/api-client";

export function assertOneDish(response: ApiResponse, body: any) {
  // Root-properties
  response.assertStatus(200);
  response.assert?.properties(body, ["id", "name", "imageUrl", "likes", "meta", "description", "createdAt", "updatedAt"]);

  // Asserting meta object
  response.assert?.isObject(body.meta);
  response.assert?.properties(body.meta, ["productsCount"]);
};

test.group('Dishes -> FetchOne', (group) => {
  group.tap((test) => test.tags(["dishes"]));

  /*
  | Route: GET /dishes/:id
  | Returns: Instance of a Dish model
  | Model: Dish (App/Models/Dish)
  | Schema: {
  |   id: number,
  |   name: string,
  |   imageUrl: string,
  |   description?: string,
  |   likes: number,
  |   meta: {
  |     productsCount: number,
  |   },
  |   createdAt: string,
  |   updatedAt: string,
  | }
  */
  test('get one dish', async ({ client }) => {
    const response = await client.get('/dishes/1');
    const { response: { body } } = response;

    assertOneDish(response, body);
  });

  test('try to get nonexistent dish', async ({ client }) => {
    const response = await client.get('/dishes/:bruh');
    const { response: { body } } = response;

    response.assertStatus(404);
    response.assert?.deepEqual(body, {
      error: ErrorType.NOT_FOUND
    });
  });
});