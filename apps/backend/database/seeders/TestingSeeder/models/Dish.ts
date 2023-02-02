import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dish from 'App/Models/Dish';

export default class extends BaseSeeder {
  public async run () {
    const dish = await Dish.create({
      id: 1,
      name: "Spicy Arrabiata Penne",
      description: "Something in Spanish"
    });

    dish
      .related('recipe')
      .query()
      .from('recipes')
      .select('*')
      .where('id', 1);
  }
}
