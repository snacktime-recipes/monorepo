import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category';
import Dish from 'App/Models/Dish';

export default class extends BaseSeeder {
  public async run () {
    const categories = await Category.createMany([
      {
        id: 1,
        title: 'Spicy!',
        
      },
      {
        id: 2,
        title: 'For everyone',
        description: 'Made in Japan （っ＾▿＾）',
        
      },
      {
        id: 3,
        title: 'American',
        
      }
    ]);

    categories[0].related('dishes').save((await Dish.find(1))!)
  }
}
