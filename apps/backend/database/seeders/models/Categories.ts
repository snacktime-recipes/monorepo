import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category';

export default class extends BaseSeeder {
  public async run () {
    await Category.createMany([
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
  }
}
