import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product';

export default class extends BaseSeeder {
  public async run () {
    let products = [
        {
          id: 1,
          name: 'Red Velvet Cake Mix',
          imageUrl: 'https://www.sidechef.com/ingredient/small/0c6014e7-9b30-4e4b-8181-3ca1d10065a7.jpeg?d=96x96'
        },
        {
          id: 2,
          name: 'Butter , melted',
          imageUrl: 'https://www.sidechef.com/ingredient/small/a19c1cdf-a44b-44dc-a371-0fe84db3526a.jpg?d=96x96'
        },
        {
          id: 3,
          name: 'Roughly Chopped White Chocolate',
          imageUrl: 'https://www.sidechef.com/ingredient/small/c26d4aea-e2e7-4bbc-a3e6-6b0c341af8b9.jpeg?d=96x96'
        },
        {
          id: 4,
          name: 'Egg',
          imageUrl: 'https://www.sidechef.com/ingredient/small/82ebd0db-fdb3-477d-933c-58b928c9de5f.jpeg?d=96x96'
        },
        {
          id: 5,
          name: 'Olive Oil',
          imageUrl: 'https://www.sidechef.com/ingredient/small/5f7a83c4-15b6-4a68-aa9d-73565caf5685.jpg?d=96x96'
        },
        {
          id: 6,
          name: 'Pancetta',
          imageUrl: 'https://www.sidechef.com/ingredient/small/3a663584-c41a-4716-b452-9887383d206f.jpeg?d=96x96'
        },
        {
          id: 7,
          name: 'Garlic, finely chopped',
          imageUrl: 'https://www.sidechef.com/ingredient/small/6add75ac-14d1-4dc8-9bd0-6c5a891014a2.jpg?d=96x96'
        },
        {
          id: 8,
          name: 'Kosher Salt',
          imageUrl: 'https://www.sidechef.com/ingredient/small/ffb1cc27-4ed2-40b3-a73b-76766c33935b.jpeg?d=96x96'
        },
        {
          id: 9,
          name: 'Spaghetti',
          imageUrl: 'https://www.sidechef.com/ingredient/small/93470eb6-26ff-4290-966f-f71910f3577e.jpeg?d=96x96'
        },
        {
          id: 10,
          name: 'Pecorino Romano Cheese, grated',
          imageUrl: 'https://www.sidechef.com/ingredient/small/bac92973-be51-47a8-9e53-3f7500a18b33.jpg?d=96x96'
        },
        {
          id: 11,
          name: 'Fresh Parsley, chopped',
          imageUrl: 'https://www.sidechef.com/ingredient/small/c27d5b7c-514d-49ae-8149-99e191b73433.jpg?d=96x96'
        },
        {
          id: 12,
          name: 'Ground Nutmeg',
          imageUrl: 'https://www.sidechef.com/ingredient/small/34dcf78d-bcb1-4ce8-baed-c6ebe3b5111d.jpeg?d=96x96'
        },
        {
          id: 13,
          name: 'Rustic Bread',
          imageUrl: 'https://www.sidechef.com/ingredient/small/006da254-f5e0-4e52-b129-2dd0d3264870.jpeg?d=96x96'
        },
        {
          id: 14,
          name: 'Japanese Kewpie Mayonnaise',
          imageUrl: 'https://www.sidechef.com/ingredient/small/28658062-c7fe-480b-aa56-9c6a3a1a2c43.jpeg?d=96x96'
        },
        {
          id: 15,
          name: 'Roughly Chopped Kimchi',
          imageUrl: 'https://www.sidechef.com/ingredient/small/b4c330b5-aef7-4eb8-8d71-ee37d5e40303.jpeg?d=96x96'
        },
        {
          id: 16,
          name: 'Gouda',
          imageUrl: 'https://www.sidechef.com/ingredient/small/b9fe784c-27a2-4d38-8c26-4a69d375a444.jpg?d=96x96'
        },
        {
          id: 17,
          name: 'Mild Yellow Cheddar',
          imageUrl: 'https://www.sidechef.com/ingredient/small/6c1fffbc-de0d-4452-b3f3-0502084ec63b.jpeg?d=96x96'
        },
        {
          id: 18,
          name: 'Seedless Watermelon',
          imageUrl: 'https://www.sidechef.com/ingredient/small/5f20c7a7-bec0-474a-b88a-da41119aa7e2.jpg?d=96x96'
        },
        {
          id: 19,
          name: 'Lime Juice',
          imageUrl: 'https://www.sidechef.com/ingredient/small/29d71d92-3ada-4a50-b24d-6e50a8b73620.jpeg?d=96x96'
        },
        {
          id: 20,
          name: 'Caster Sugar',
          imageUrl: 'https://www.sidechef.com/ingredient/small/39dd072a-0767-48ff-a6c6-b115c2c36da2.jpeg?d=96x96'
        },
        {
          id: 21,
          name: 'Fresh Mint',
          imageUrl: 'https://www.sidechef.com/ingredient/small/08dad5f2-ed29-4c68-aeef-1bf4664a0558.jpg?d=96x96'
        },
        {
          id: 22,
          name: 'Ground Beef',
          imageUrl: 'https://www.sidechef.com/ingredient/small/08e86267-f2e4-4325-891b-2874db4efa9b.jpeg?d=96x96'
        },
        {
          id: 23,
          name: 'Yellow Onion',
          imageUrl: 'https://www.sidechef.com/ingredient/small/34083f18-8ce9-4b2d-8687-67ff88aa4d5d.jpg?d=96x96'
        },
        {
          id: 24,
          name: 'Medium Red Bell Pepper',
          imageUrl: 'https://www.sidechef.com/ingredient/small/e4edfed0-7126-4842-b24e-7f879b771c1e.jpeg?d=96x96'
        },
        {
          id: 25,
          name: 'Large Zucchini',
          imageUrl: 'https://www.sidechef.com/ingredient/small/57b893f4-de5c-4b08-a511-295a59129dc1.jpg?d=96x96'
        },
        {
          id: 26,
          name: 'Tomato',
          imageUrl: 'https://www.sidechef.com/ingredient/small/4277580d-b751-477d-8b75-0721d075a58a.jpeg?d=96x96'
        },
        {
          id: 27,
          name: 'Ground Cumin',
          imageUrl: 'https://www.sidechef.com/ingredient/small/d674cdc4-1bfc-453c-b67f-749b16b3f498.jpeg?d=96x96'
        },
        {
          id: 28,
          name: 'Taco Seasoning',
          imageUrl: 'https://www.sidechef.com/ingredient/small/424e89db-34ff-4b57-9641-b44dc42187d3.jpeg?d=96x96'
        },
        {
          id: 29,
          name: 'Shredded Mexican Cheese Blend',
          imageUrl: 'https://www.sidechef.com/ingredient/small/d955c8d9-5aad-4934-bbe7-147392410ec3.jpeg?d=96x96'
        },
        {
          id: 30,
          name: 'Vegetable Oil',
          imageUrl: 'https://www.sidechef.com/ingredient/small/3250326f-a032-4a01-96d9-575ac125f403.jpeg?d=96x96'
        },
        {
          id: 31,
          name: 'Fresh Chives',
          imageUrl: 'https://www.sidechef.com/ingredient/small/0a6b9d0c-dcb1-4e58-94ab-7b76f9b91aa6.jpg?d=96x96'
        },
        {
          id: 32,
          name: 'Extra Firm Tofu',
          imageUrl: 'https://www.sidechef.com/ingredient/small/0cca8c01-8ec9-4cbc-9866-8d79cad117c2.jpeg?d=96x96'
        },
        {
          id: 33,
          name: 'Chopped Fresh Cilantro',
          imageUrl: 'https://www.sidechef.com/ingredient/small/0b5fa138-4543-4fb5-96c1-24d16a8d8862.jpg?d=96x96'
        },
        {
          id: 34,
          name: 'Lemon Juice',
          imageUrl: 'https://www.sidechef.com/ingredient/small/558a1354-6f70-4fa6-958d-cdd8974d7f05.jpeg?d=96x96'
        },
        {
          id: 35,
          name: 'Chipotle Peppers in Adobo Sauce',
          imageUrl: 'https://www.sidechef.com/ingredient/small/10ce1479-8b71-487b-b787-fbf779594a9c.jpeg?d=96x96'
        },
        {
          id: 36,
          name: 'Pasilla Chile Peppers',
          imageUrl: 'https://www.sidechef.com/ingredient/small/4da9195c-6629-46ea-953d-19887a4699a0.jpeg?d=96x96'
        },
        {
          id: 37,
          name: 'Paprika',
          imageUrl: 'https://www.sidechef.com/ingredient/small/5c49b970-7b44-4ff6-8125-ec534ac4caa6.jpg?d=96x96'
        },
        {
          id: 38,
          name: 'Cayenne Pepper',
          imageUrl: 'https://www.sidechef.com/ingredient/small/d447457e-2692-451a-b055-4457d3401ecc.jpeg?d=96x96'
        },
        {
          id: 39,
          name: 'Mexican Chili Powder',
          imageUrl: 'https://www.sidechef.com/ingredient/small/831d6fdf-a865-4a5b-aa9f-f622b313caa2.jpeg?d=96x96'
        },
        {
          id: 40,
          name: 'Crushed Red Pepper Flakes',
          imageUrl: 'https://www.sidechef.com/ingredient/small/cde21900-6882-44fb-aa30-3bbbfb2031a8.jpeg?d=96x96'
        },
        {
          id: 41,
          name: 'Ground Cumin',
          imageUrl: 'https://www.sidechef.com/ingredient/small/d674cdc4-1bfc-453c-b67f-749b16b3f498.jpeg?d=96x96'
        },
        {
          id: 42,
          name: 'Ground Ginger',
          imageUrl: 'https://www.sidechef.com/ingredient/small/ae0acb40-80c3-4185-b78a-f842052468b5.jpeg?d=96x96'
        },
        {
          id: 43,
          name: 'Ground Cloves',
          imageUrl: 'https://www.sidechef.com/ingredient/small/0a31122e-b69d-4e20-a3d6-53589f41005d.jpeg?d=96x96'
        },
        {
          id: 44,
          name: 'Salt',
          imageUrl: 'https://www.sidechef.com/ingredient/small/4acf584e-f4a6-417b-9a3c-66931f811a8c.jpg?d=96x96'
        },
        {
          id: 45,
          name: 'Distilled White Vinegar',
          imageUrl: 'https://www.sidechef.com/ingredient/small/6d048863-795f-4f35-935d-d8195d0bec19.jpeg?d=96x96'
        },
        {
          id: 46,
          name: 'Tahini',
          imageUrl: 'https://www.sidechef.com/ingredient/small/09e24fa7-da48-4cd5-899a-f15bd74c4b1c.jpeg?d=96x96'
        },
        {
          id: 47,
          name: 'White Corn Tortillas',
          imageUrl: 'https://www.sidechef.com/ingredient/small/85a7aac5-cf09-4f0f-9d31-5d620876fac0.jpeg?d=96x96'
        },
        {
          id: 48,
          name: '',
          imageUrl: ''
        },
        {
          id: 49,
          name: '',
          imageUrl: ''
        },
      ];

    await Product.createMany(products);
  }
}
