import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Recipe from 'App/Models/Recipe';
import RecipeDifficulty from 'Types/Recipe/RecipeDifficulty.enum';
import Product from 'App/Models/Product';

export default class extends BaseSeeder {
  public async run () {
      const recipe = await Recipe.create({
        id: 1,
        cookingTime: 3600,
        difficulty: RecipeDifficulty.HARD
      });

      await recipe.save();

      await recipe
        .related('steps')
        .createMany([
          {
              id: 1,
              title: 'Mush apple in potato syrop',
              description: 'Just mush\'em!',
          },
          {
              id: 2,
              title: 'Add sugar',
              description: 'You know'
          }
      ]);

      const productIds = [1, 2];
      for (let productId of productIds) {
        const product = await Product.find(productId);
        if (!product) return;

        const recipeProduct = await recipe.related('products').create({});
        await recipeProduct.related('product').associate(product);
      };
  }
}
