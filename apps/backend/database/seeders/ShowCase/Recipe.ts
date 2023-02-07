import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Recipe from 'App/Models/Recipe';
import RecipeDifficulty from 'Types/Recipe/RecipeDifficulty.enum';
import Product from 'App/Models/Product';

export default class extends BaseSeeder {
  public async run () {
    // Recipe 1
    let recipe = await Recipe.create({
      id: 1,
      cookingTime: 1200,
      difficulty: RecipeDifficulty.MEDIUM
    });

    await recipe.save();

    let id = 1;
    let steps = [
        {
            title: 'Prepare the oven',
            description: 'Preheat the oven to 350 degrees F (180 degrees C). Line a sheet pan with parchment paper. Set aside.',
        },
        {
            title: 'Mix ingridients',
            description: 'In a large mixing bowl, add Red Velvet Cake Mix (1/6 box) , Large Egg (1/3) , and Butter (1 Tbsp) . With a rubber spatula, stir until dough forms (slightly sticky consistency).'
        },
        {
            title: 'Make some balls',
            description: 'Using your hands, shape the dough into balls (1 oz each) and place them on the prepared sheet pan, about 2 to 2.5-inch apart.'
        },
        {
            title: 'Press it!',
            description: 'Using the back of a spoon, flatten each dough to about 0.5-inch thick and top each dough with Chocolate Chunks (3 Tbsp) .'
        },
        {
            title: 'Bake it',
            description: 'Bake in the oven for 10 minutes. Don’t let them brown. Cookies will look soft and not quite done but firm up as they cool.'
        },
        {
            title: 'Bon appetite',
            description: 'Let sit on the sheet pan for 5 minutes, then transfer to a wire rack to cool completely. Enjoy the cookies right away!'
        },
    ];

    // ids 1-6
    steps.map((step)=>{ step['id'] = id; id += 1})

    await recipe
      .related('steps')
      .createMany(steps);
    
                //box, g, g, things
    let metric = [1, 80, 210, 2]
    
    let iterator = 0;
    //productsIds 1-4
    let productIds = Array.from({length: 3}, (_, i) => i + 1);
    for (let productId of productIds) {
      const product = await Product.find(productId);
      if (!product) return;

      const recipeProduct = await recipe.related('products').create({productCount: metric[iterator]});
      await recipeProduct.related('product').associate(product);
      iterator += 1;
    };

    // Recipe 2
    recipe = await Recipe.create({
        id: 2,
        cookingTime: 1200,
        difficulty: RecipeDifficulty.HARD
      });
  
      await recipe.save();
  
      steps = [
            {
                title: 'Stack the Pancetta',
                description: 'Stack the Pancetta (3/4 cup) and using a very sharp knife, cut the stack into a 1/4 inch dice.',
            },
            {
                title: 'Heat the Pancetta',
                description: 'Heat a large, heavy-bottomed pan over medium heat and add the Olive Oil (1 Tbsp) . When the oil is hot, add the pancetta and cook for 8 to 10 minutes, stirring occasional until lightly golden.'
            },
            {
                title: 'Add the Garlic',
                description: 'Then add the Garlic (4 cloves) , stirring constantly, cooking for 1 more minute. Turn off the heat and set aside. Do not pour off the fat, as it adds to the flavor and texture of the dish.'
            },
            {
                title: 'Beat the large Egg',
                description: 'Beat the large Eggs (3) in a bowl, adding the Kosher Salt (1/2 tsp) , Ground Black Pepper (1/4 tsp) , and Pecorino Romano Cheese (1 cup) . Whisk until incorporated. Set the bowl aside to allow the eggs to come to room temperature.'
            },
            {
                title: 'Add the Spaghetti',
                description: 'Bring a large pot of generously salted water to a boil. Add the dried Spaghetti (1 lb) , and cook 7 -9 minutes, or until al dente. Before you drain the pasta, reserve 1/2 cup of pasta water.'
            },
            {
                title: 'Add the drained pasta to the pan with the pancetta.',
                description: 'Toss until well mixed. Add the egg mixture and 1/4 cup of the reserved pasta water, and quickly toss to coat the pasta. Toss quickly and constantly so the egg creates a creamy sauce.'
            },
            {
                title: 'Add Ground Nutmeg',
                description: 'If using, add a pinch of Ground Nutmeg (1 pinch) and toss to combine.'
            },
            {
                title: 'Bon appetite',
                description: 'Garnish the dish with extra Pecorino and Fresh Parsley (1 handful) . Serve immediately.'
            },
      ];
  
      // ids 7-14
      steps.map((step)=>{ step['id'] = id; id += 1})
  
      await recipe
        .related('steps')
        .createMany(steps);
      
            //things, ml, cloves, g, g, g, handful, pinch 
      metric = [4, 170, 4, 3, 455, 120, 1, 1]
      
      iterator = 0;
      //productsIds 3-11
      productIds = Array.from({length: 9}, (_, i) => i + 3);
      for (let productId of productIds) {
        const product = await Product.find(productId);
        if (!product) return;
  
        const recipeProduct = await recipe.related('products').create({productCount: metric[iterator]});
        await recipeProduct.related('product').associate(product);
        iterator += 1;
      };
    // Recipe 3

    recipe = await Recipe.create({
        id: 3,
        cookingTime: 900,
        difficulty: RecipeDifficulty.EASY
      });
  
      await recipe.save();
  
      steps = [
          {
              title: 'Add Japanese Kewpie Mayonnaise',
              description: 'Slather one side of each piece of Rustic Bread (4 slices) with ½ Tbsp of Japanese Kewpie Mayonnaise (30 g) .'
          },
          {
              title: 'Heat it',
              description: 'Heat a large non-stick skillet with a lid over medium heat. Once the pan is hot, place 2 pieces of bread, mayonnaise-side down on the skillet. Top with 2 slices of Gouda (4 slices) , 2 Tbsp of Kimchi (60 mL) , then 2 slices of Mild Yellow Cheddar (4 slices) . Put the lid on and cook until the cheese begins to melt and the bottom is golden brown.'
          },
          {
              title: 'Keep heating',
              description: 'Place the second piece of bread on top of each sandwich, mayo side out. Press down lightly. Carefully flip the sandwiches and cook for 3-4 more minutes, until the bottom is golden brown. The cheese should be fully melted by now.'
          },
          {
              title: 'Bon appetite',
              description: 'Cut in half and serve hot.'
          },
          {
              title: '',
              description: ''
          },
      ];
  
      // ids 15-18
      steps.map((step)=>{ step['id'] = id; id += 1})
  
      await recipe
        .related('steps')
        .createMany(steps);
      
            //slices, g, ml, slices, slices 
      metric = [4, 30, 60, 4, 4]
      
      iterator = 0;
      //productsIds 12-16
      productIds = Array.from({length: 5}, (_, i) => i + 12);
      for (let productId of productIds) {
        const product = await Product.find(productId);
        if (!product) return;
  
        const recipeProduct = await recipe.related('products').create({productCount: metric[iterator]});
        await recipeProduct.related('product').associate(product);
        iterator += 1;
      };
  }
}
