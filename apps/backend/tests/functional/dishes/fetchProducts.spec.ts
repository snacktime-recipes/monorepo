import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";
import { ProductSchema } from "../_schemas/Product.schema";

test.group('Dishes -> FetchProducts', (group) => {
  group.tap((test) => test.tags(["dishes"]));

  /*
  | Route: GET /dishes/:id/products
  | Schema: ./_schemas/Product.schema.ts
  | Description:
  |   Returns array of Products, that are needed in this
  |   recipe.
  */
  test('get products of a dish\'s recipe', async ({ client, expect }) => {
    const response = await client.get('/dishes/1/products');
    const { response: { body } } = response;

    response.assertStatus(200);

    response.assert?.isArray(body);
    expect(body).toEqual(
      expect.arrayContaining([ProductSchema])
    );
  });

  /*
  | Route: GET /dishes/:id/products
  | Schema: ...
  | Description:
  |   Returns 404 status code with { error: ErrorType.NOT_FOUND, entity: "DISH" } payload,
  |   that means that Dish with this id is not found.
  */
  test('try to get products of a nonexistent dish', async ({ client }) => {
    const response = await client.get('/dishes/:bruh/products');
    const { response: { body } } = response;

    response.assertStatus(404);
    response.assert?.deepEqual(body, {
      error: ErrorType.NOT_FOUND,
      entity: "DISH"
    });
  });

  /*
  | Route: get /dishes/:id/products
  | Description:
  |   Returns empty array, because dish with this id
  |   does not have any products assigned
  */
  test('try to fetch empty products', async ({ client }) => {
    const response = await client.get('/dishes/2/products');
    const { response: { body } } = response;

    response.assertStatus(200);
    response.assert?.deepEqual(body, []);
  });
});