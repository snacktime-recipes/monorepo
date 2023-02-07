import { test } from '@japa/runner'
import { DishSchema } from '../_schemas/Dish.schema';

test.group('Dishes', (group) => {
  group.tap((test) => test.tags(["dishes"]));

  /*
  | Route: GET /dishes
  | Schema: ./_schemas/Dish.schema.ts
  | Description:
  |   Returns array of dishes
  */
  test('get a paginated list of dishes', async ({ client, expect }) => {
    const response = await client.get('/dishes');
    const { response: { body } } = response;

    response.assertStatus(200);

    response.assert?.isObject(body.meta);
    response.assert?.isArray(body.data);

    expect(body).toMatchObject({
      // todo test properly for paginate meta info
      meta: expect.anything(),
      data: expect.arrayContaining([ DishSchema ]),
    });
  });
})
