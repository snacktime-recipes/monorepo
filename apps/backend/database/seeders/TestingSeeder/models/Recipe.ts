import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Recipe from 'App/Models/Recipe';
import RecipeDifficulty from 'Types/Recipe/RecipeDifficulty.enum';

export default class extends BaseSeeder {
  public async run () {
      const recipe = await Recipe.create({
        id: 1,
        cookingTime: 3600,
        difficulty: RecipeDifficulty.HARD
      })
      
      recipe
        .related('products')
        .query()
        .from('products')
        .select('*')
        .whereIn('id', [2, 3]);

      recipe
        .related('steps')
        .query()
        .from('cook_steps')
        .select('*')
        .whereIn('id', [1, 2]);
  }
}
