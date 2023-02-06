import { test } from "@japa/runner";
import ErrorType from "Types/ErrorType.enum";
import { RecipeDifficulty } from "Types/Recipe";

test.group('Dishes -> FetchRecipe', (group) => {
  group.tap((test) => test.tags(["dishes"]));

  /*
  | Route: GET /dishes/:id/recipe
  | Returns: Recipe instance of a Dish
  | Model: Recipe (App/Models/Recipe)
  | Schema: {
  |   id: number,
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
    response.assert?.oneOf(body.difficulty, Object.values(RecipeDifficulty));
    
    // Checking subobjects
    response.assert?.isArray(body.steps);
    response.assert?.properties(body.steps[0], ["id", "title"]);
  });

  test('try to fetch recipe of a nonexistent dish', async ({ client }) => {
    const response = await client.get('/dishes/:bruh/recipe');
    const { response: { body } } = response;

    response.assertStatus(404);
    response.assert?.deepEqual(body, {
      error: ErrorType.NOT_FOUND,
      entity: "DISH"
    });
  });

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