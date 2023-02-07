import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product';

export default class extends BaseSeeder {
  public async run () {
    let id = 1;
    let products = [
        {
          name: 'Red Velvet Cake Mix',
          imageUrl: 'https://www.sidechef.com/ingredient/small/0c6014e7-9b30-4e4b-8181-3ca1d10065a7.jpeg?d=96x96'
        },
        {
          name: 'Butter , melted',
          imageUrl: 'https://www.sidechef.com/ingredient/small/a19c1cdf-a44b-44dc-a371-0fe84db3526a.jpg?d=96x96'
        },
        {
          name: 'Roughly Chopped White Chocolate',
          imageUrl: 'https://www.sidechef.com/ingredient/small/c26d4aea-e2e7-4bbc-a3e6-6b0c341af8b9.jpeg?d=96x96'
        },
        {
          name: 'Egg',
          imageUrl: 'https://www.sidechef.com/ingredient/small/82ebd0db-fdb3-477d-933c-58b928c9de5f.jpeg?d=96x96'
        },
        {
          name: 'Olive Oil',
          imageUrl: 'https://www.sidechef.com/ingredient/small/5f7a83c4-15b6-4a68-aa9d-73565caf5685.jpg?d=96x96'
        },
        {
          name: 'Pancetta',
          imageUrl: 'https://www.sidechef.com/ingredient/small/3a663584-c41a-4716-b452-9887383d206f.jpeg?d=96x96'
        },
        {
          name: 'Garlic, finely chopped',
          imageUrl: 'https://www.sidechef.com/ingredient/small/6add75ac-14d1-4dc8-9bd0-6c5a891014a2.jpg?d=96x96'
        },
        {
          name: 'Kosher Salt',
          imageUrl: 'https://www.sidechef.com/ingredient/small/ffb1cc27-4ed2-40b3-a73b-76766c33935b.jpeg?d=96x96'
        },
        {
          name: 'Spaghetti',
          imageUrl: 'https://www.sidechef.com/ingredient/small/93470eb6-26ff-4290-966f-f71910f3577e.jpeg?d=96x96'
        },
        {
          name: 'Pecorino Romano Cheese, grated',
          imageUrl: 'https://www.sidechef.com/ingredient/small/bac92973-be51-47a8-9e53-3f7500a18b33.jpg?d=96x96'
        },
        {
          name: 'Fresh Parsley, chopped',
          imageUrl: 'https://www.sidechef.com/ingredient/small/c27d5b7c-514d-49ae-8149-99e191b73433.jpg?d=96x96'
        },
        {
          name: 'Ground Nutmeg',
          imageUrl: 'https://www.sidechef.com/ingredient/small/34dcf78d-bcb1-4ce8-baed-c6ebe3b5111d.jpeg?d=96x96'
        },
        {
          name: 'Rustic Bread',
          imageUrl: 'https://www.sidechef.com/ingredient/small/006da254-f5e0-4e52-b129-2dd0d3264870.jpeg?d=96x96'
        },
        {
          name: 'Japanese Kewpie Mayonnaise',
          imageUrl: 'https://www.sidechef.com/ingredient/small/28658062-c7fe-480b-aa56-9c6a3a1a2c43.jpeg?d=96x96'
        },
        {
          name: 'Roughly Chopped Kimchi',
          imageUrl: 'https://www.sidechef.com/ingredient/small/b4c330b5-aef7-4eb8-8d71-ee37d5e40303.jpeg?d=96x96'
        },
        {
          name: 'Gouda',
          imageUrl: 'https://www.sidechef.com/ingredient/small/b9fe784c-27a2-4d38-8c26-4a69d375a444.jpg?d=96x96'
        },
        {
          name: 'Mild Yellow Cheddar',
          imageUrl: 'https://www.sidechef.com/ingredient/small/6c1fffbc-de0d-4452-b3f3-0502084ec63b.jpeg?d=96x96'
        },
        {
          name: '',
          imageUrl: ''
        },
      ];
    products.map((step)=>{ step['id'] = id; id += 1})

    await Product.createMany(products);
  }
}
