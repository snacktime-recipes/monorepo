import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";
import { RecipeSchema } from "../_schemas/Dish.schema";

test.group('Dishes -> FetchRecipe', (group) => {
  group.tap((test) => test.tags(["dishes"]));

  /*
  | Route: GET /dishes/:id/recipe
  | Schema: ./_schemas/Dish.schema.ts
  */
  test('get recipe of a dish', async ({ client, expect }) => {
    const response = await client.get('/dishes/1/recipe');
    const { response: { body } } = response;

    response.assertStatus(200);
    expect(body).toEqual(
      expect.arrayContaining([RecipeSchema]),
    );
  });

  /*
  | Route: GET /dishes/:id/recipe
  | Description:
  |   Returns 404 and { error: ErrorType.NOT_FOUND, entity: "DISH" } payload, that means
  |   that dish entity with this id is not found
  */
  test('try to fetch recipe of a nonexistent dish', async ({ client }) => {
    const response = await client.get('/dishes/:bruh/recipe');
    const { response: { body } } = response;

    response.assertStatus(404);
    response.assert?.deepEqual(body, {
      error: ErrorType.NOT_FOUND,
      entity: "DISH"
    });
  });

  /*
  | Route: GET /dishes/:id/recipe
  | Description:
  |   Returns 404 status code and { error: ErrorType.NOT_FOUND, entity: "DISH" } body, that
  |   means that recipe entity, that is associated with this dish, is not found
  */
  test('try to fetch nonexistent recipe of a dish', async ({ client }) => {
    const response = await client.get('/dishes/3/recipe');
    const { response: { body } } = response;

    response.assertStatus(404);
    response.assert?.deepEqual(body, {
      error: ErrorType.NOT_FOUND,
      entity: "RECIPE",
    });
  });
});