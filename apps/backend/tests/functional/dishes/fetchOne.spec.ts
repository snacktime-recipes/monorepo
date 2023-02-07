import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";
import { DishSchema } from "../_schemas/Dish.schema";

test.group('Dishes -> FetchOne', (group) => {
  group.tap((test) => test.tags(["dishes"]));

  /*
  | Route: GET /dishes/:id
  | Schema: ./_schemas/Dish.schema.ts
  | Description:
  |   Returns dish information by it's id
  */
  test('get one dish', async ({ client, expect }) => {
    const response = await client.get('/dishes/1');
    const { response: { body } } = response;

    expect(body).toMatchObject(DishSchema);
  });

  /*
  | Route: GET /dishes/:id
  | Description:
  |   Tries to get nonexistent dish information. Returns 404 status code
  |   and { error: ErrorType.NOT_FOUND } body
  */
  test('try to get nonexistent dish', async ({ client }) => {
    const response = await client.get('/dishes/:bruh');
    const { response: { body } } = response;

    response.assertStatus(404);
    response.assert?.deepEqual(body, {
      error: ErrorType.NOT_FOUND
    });
  });
});