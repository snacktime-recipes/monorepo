import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product';

export default class extends BaseSeeder {
  public async run () {
    await Product.createMany([
      {
        id: 1,
        name: 'Butter',
        imageUrl: 'https://media.istockphoto.com/id/177834117/photo/butter-isolated-on-white.jpg?s=612x612&w=0&k=20&c=wKXNDSvB-tzfT9RPdmKsH2JAGpBv7OISdUmGdegupxg='
      },
      {
        id: 2,
        name: 'Apple',
        imageUrl: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w='
      },
      {
        id: 3,
        name: 'Sugar',
        imageUrl: 'https://thumbs.dreamstime.com/b/sugar-18751962.jpg'
      }
    ]);
  }
}
