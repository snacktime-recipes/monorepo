import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dish from 'App/Models/Dish';
import Recipe from 'App/Models/Recipe';

export default class extends BaseSeeder {
  public async run () {
    // With recipe
    const withRecipe = await Dish.create({
      id: 1,
      imageUrl: "https://www.themealdb.com/images/media/meals/nv5lf31628771380.jpg",
      likes: 1200,
      name: "Spicy Arrabiata Penne",
      description: "Something in Spanish",
    });
   
    await withRecipe.save();
    await withRecipe.related('recipe').save((await Recipe.find(1))!);
  
    // With recipe with empty products array
    const withEmptyRecipe = await Dish.create({
      id: 2,
      imageUrl: "https://www.themealdb.com/images/media/meals/0jv5gx1661040802.jpg",
      likes: 20,
      name: "Fettuccine Alfredo"
    });

    await withEmptyRecipe.save();
    await withEmptyRecipe.related('recipe').save((await Recipe.find(2))!);

    // Without recipe
    const withoutRecipe = await Dish.create({
      id: 3,
      imageUrl: "https://www.themealdb.com/images/media/meals/u9l7k81628771647.jpg",
      likes: 300,
      name: "Walnut Roll Gužvara",
      description: "Something in Spanish",
    });

    await withoutRecipe.save();
  }
}
