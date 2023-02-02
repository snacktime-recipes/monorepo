import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dish from 'App/Models/Dish';
import Recipe from 'App/Models/Recipe';

export default class extends BaseSeeder {
  public async run () {
    const dish = await Dish.create({
      id: 1,
      name: "Spicy Arrabiata Penne",
      description: "Something in Spanish"
    });
   
    await dish.save();
    await dish.related('recipe').save((await Recipe.find(1))!);
  }
}
