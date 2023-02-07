import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Recipe from 'App/Models/Recipe';
import RecipeDifficulty from 'Types/Recipe/RecipeDifficulty.enum';
import Product from 'App/Models/Product';

interface StepInterface{
    id: number,
    title: string,
    description: string
}

interface RecipeInterface{
    id: number,
    coockingTime: number,
    difficulty: RecipeDifficulty,
    steps: Array<StepInterface>,
    productsId: Array<number>,
    metric: Array<number>
}



export default class extends BaseSeeder {
  public async createRecipe(obj: RecipeInterface){
    // Recipe 1
    const recipe = await Recipe.create({
        id: obj.id,
        cookingTime: obj.coockingTime,
        difficulty: obj.difficulty
      });
  
      await recipe.save();

      await recipe
        .related('steps')
        .createMany(obj.steps);
      
      const metric = obj.metric;
      
      let iterator = 0;
      let productIds = obj.productsId;
      for (let productId of productIds) {
        const product = await Product.find(productId);
        if (!product) return;
  
        const recipeProduct = await recipe.related('products').create({productCount: metric[iterator]});
        await recipeProduct.related('product').associate(product);
        iterator += 1;
      };
  }


  public async run () {
    const recipes: Array<RecipeInterface> = 
        [
            {
            id: 1,
            coockingTime: 1200,
            difficulty: RecipeDifficulty.MEDIUM,
            steps: [
                {
                    id: 1,
                    title: 'Prepare the oven',
                    description: 'Preheat the oven to 350 degrees F (180 degrees C). Line a sheet pan with parchment paper. Set aside.',
                },
                {
                    id: 2,
                    title: 'Mix ingridients',
                    description: 'In a large mixing bowl, add Red Velvet Cake Mix (1/6 box) , Large Egg (1/3) , and Butter (1 Tbsp) . With a rubber spatula, stir until dough forms (slightly sticky consistency).'
                },
                {
                    id: 3,
                    title: 'Make some balls',
                    description: 'Using your hands, shape the dough into balls (1 oz each) and place them on the prepared sheet pan, about 2 to 2.5-inch apart.'
                },
                {
                    id: 4,
                    title: 'Press it!',
                    description: 'Using the back of a spoon, flatten each dough to about 0.5-inch thick and top each dough with Chocolate Chunks (3 Tbsp) .'
                },
                {
                    id: 5,
                    title: 'Bake it',
                    description: 'Bake in the oven for 10 minutes. Don’t let them brown. Cookies will look soft and not quite done but firm up as they cool.'
                },
                {
                    id: 6,
                    title: 'Bon appetite',
                    description: 'Let sit on the sheet pan for 5 minutes, then transfer to a wire rack to cool completely. Enjoy the cookies right away!'
                },
            ],
            productsId: Array.from({length: 3}, (_, i) => i + 1), //productsIds 1-4
            metric: [1, 80, 210, 2] //box, g, g, things
            },
            {
            id: 2,
            coockingTime: 1800,
            difficulty: RecipeDifficulty.HARD,
            steps: [
                {
                    id: 7,
                    title: 'Stack the Pancetta',
                    description: 'Stack the Pancetta (3/4 cup) and using a very sharp knife, cut the stack into a 1/4 inch dice.',
                },
                {
                    id: 8,
                    title: 'Heat the Pancetta',
                    description: 'Heat a large, heavy-bottomed pan over medium heat and add the Olive Oil (1 Tbsp) . When the oil is hot, add the pancetta and cook for 8 to 10 minutes, stirring occasional until lightly golden.'
                },
                {
                    id: 9,
                    title: 'Add the Garlic',
                    description: 'Then add the Garlic (4 cloves) , stirring constantly, cooking for 1 more minute. Turn off the heat and set aside. Do not pour off the fat, as it adds to the flavor and texture of the dish.'
                },
                {
                    id: 10,
                    title: 'Beat the large Egg',
                    description: 'Beat the large Eggs (3) in a bowl, adding the Kosher Salt (1/2 tsp) , Ground Black Pepper (1/4 tsp) , and Pecorino Romano Cheese (1 cup) . Whisk until incorporated. Set the bowl aside to allow the eggs to come to room temperature.'
                },
                {
                    id: 11,
                    title: 'Add the Spaghetti',
                    description: 'Bring a large pot of generously salted water to a boil. Add the dried Spaghetti (1 lb) , and cook 7 -9 minutes, or until al dente. Before you drain the pasta, reserve 1/2 cup of pasta water.'
                },
                {
                    id: 12,
                    title: 'Add the drained pasta to the pan with the pancetta.',
                    description: 'Toss until well mixed. Add the egg mixture and 1/4 cup of the reserved pasta water, and quickly toss to coat the pasta. Toss quickly and constantly so the egg creates a creamy sauce.'
                },
                {
                    id: 13,
                    title: 'Add Ground Nutmeg',
                    description: 'If using, add a pinch of Ground Nutmeg (1 pinch) and toss to combine.'
                },
                {
                    id: 14,
                    title: 'Bon appetite',
                    description: 'Garnish the dish with extra Pecorino and Fresh Parsley (1 handful) . Serve immediately.'
                },
            ],
            productsId: Array.from({length: 9}, (_, i) => i + 3), //productsIds 3-11
            metric: [4, 170, 4, 3, 455, 120, 1, 1] //things, ml, cloves, g, g, g, handful, pinch 
            },
            {
            id: 3,
            coockingTime: 900,
            difficulty: RecipeDifficulty.EASY,
            steps: [
                {
                    id: 15,
                    title: 'Add Japanese Kewpie Mayonnaise',
                    description: 'Slather one side of each piece of Rustic Bread (4 slices) with ½ Tbsp of Japanese Kewpie Mayonnaise (30 g) .'
                },
                {
                    id: 16,
                    title: 'Heat it',
                    description: 'Heat a large non-stick skillet with a lid over medium heat. Once the pan is hot, place 2 pieces of bread, mayonnaise-side down on the skillet. Top with 2 slices of Gouda (4 slices) , 2 Tbsp of Kimchi (60 mL) , then 2 slices of Mild Yellow Cheddar (4 slices) . Put the lid on and cook until the cheese begins to melt and the bottom is golden brown.'
                },
                {
                    id: 17,
                    title: 'Keep heating',
                    description: 'Place the second piece of bread on top of each sandwich, mayo side out. Press down lightly. Carefully flip the sandwiches and cook for 3-4 more minutes, until the bottom is golden brown. The cheese should be fully melted by now.'
                },
                {
                    id: 18,
                    title: 'Bon appetite',
                    description: 'Cut in half and serve hot.'
                }
            ],
            productsId: Array.from({length: 5}, (_, i) => i + 12), //productsIds 12-16
            metric: [4, 30, 60, 4, 4] //slices, g, ml, slices, slices
            },
            {
            id: 4,
            coockingTime: 9000,
            difficulty: RecipeDifficulty.HARD,
            steps: [
                {
                    id: 19,
                    title: 'Blend the ingredients',
                    description: 'First, scoop the fruit out of the watermelon. In a blender or food processor, puree the watermelon until it reaches a thin, even consistency. You should have about 6 cups of watermelon juice. If you have seeds in your watermelon, strain them out at this point with a mesh colander. Then, stir in the lime juice and sugar.',
                },
                {
                    id: 20,
                    title: 'Freeze everything',
                    description: 'Pour the mixed ingredients into a large baking dish and freeze it for 4 to 6 hours. Throughout freezing, remove it from the freezer and scrape at the frozen sides and the top. Place back in the freezer. Repeat this process of freezing and scraping every few hours, until the mixture is completely frozen and scraped.  '
                },
                {
                    id: 21,
                    title: 'Bon appetite',
                    description: 'As for storage, keep the scraped granitas in the freezer in an airtight container until ready to enjoy!'
                }
            ],
            productsId: [18, 19, 20, 21],
            metric: [0.25, 15, 45, 1] //thing, ml, g, thing
            },
            {
            id: 5,
            coockingTime: 1800,
            difficulty: RecipeDifficulty.MEDIUM,
            steps: [
                {
                    id: 22,
                    title: 'Heat it!.',
                    description: 'Heat Vegetable Oil (15 mL) in a skillet over medium-high heat. Then add Yellow Onion (1) and Red Bell Pepper (1) , and cook for 2-3 minutes or until soft.',
                },
                {
                    id: 23,
                    title: 'Add Beef',
                    description: 'Add Ground Beef (455 g) and brown for about 5 minutes.'
                },
                {
                    id: 24,
                    title: 'Add some vegetables',
                    description: 'Add Diced Tomatoes (1 can) , Zucchini (2) and season with Taco Seasoning (35 g) , Ground Cumin (4 g) , Salt (to taste) , and Ground Black Pepper (to taste) . Bring to a simmer for 10-15 minutes or until the zucchini is tender and the liquid is reduced. Remove from heat.'
                },
                {
                    id: 25,
                    title: 'Add a cheese',
                    description: 'Sprinkle the top right away with Shredded Mexican Cheese Blend (115 g) and Scallions (to taste) .'
                },
                {
                    id: 26,
                    title: 'Bon appetite',
                    description: 'Serve warm with Tortilla Chips (to taste) if desired!'
                },
            ],
            productsId: [22, 23, 24, 25, 26, 27, 28, 29, 30],
            metric: [455, 1, 1, 2, 1, 4, 35, 115, 15] // g, thing, thing, thing, can, g, g, g, ml
            },
            {
            id: 6,
            coockingTime: 300,
            difficulty: RecipeDifficulty.EASY,
            steps: [
                {
                    id: 27,
                    title: 'Heat pan',
                    description: 'Place a large, non-stick frying pan on a medium heat, drizzle in 2 tablespoons of olive oil and heat until the pan is warm.',
                },
                {
                    id: 28,
                    title: 'Crack eggs',
                    description: 'Crack 4 eggs into a mixing bowl and whisk them well with a fork.  (That’s a double yolk egg there!)'
                },
                {
                    id: 29,
                    title: 'Heat cracked eggs',
                    description: 'Pour the eggs into the frying pan, and using a non-stick spatula, move the eggs around the pan constantly as they cook gently for about 2 minutes, or until you are happy with the consistency.  They should be bright yellow and creamy.'
                },
                {
                    id: 30,
                    title: 'Bon appetite',
                    description: 'Serve with fresh, chopped chives sprinkled on top.'
                },
            ],
            productsId: [4, 5, 31],
            metric: [4, 30, 1] //things, ml, handful
            },
            {
            id: 7,
            coockingTime: 2400,
            difficulty: RecipeDifficulty.IMPOSSIBLE,
            steps: [
                {
                    id: 31,
                    title: 'Prepare Tofu',
                    description: 'Slice the Extra Firm Tofu (1 block) into about 6 slabs, and pressing the slabs between 4 sheets of paper towel on each side. Let it sit to absorb as much liquid as possible from the tofu.',
                },
                {
                    id: 32,
                    title: 'Get a Chile juice',
                    description: 'Soak the Pasilla Chile Peppers (2) in a bowl of warm water to reconstitute the flesh. Remove the stems and seeds when soft.'
                },
                {
                    id: 33,
                    title: 'Mix them',
                    description: 'To make the chorizo flavoring, blend together the reconstituted pasillas with the Chipotle Peppers in Adobo Sauce (1 can) , Paprika (3 g) , Cayenne Pepper (3 g) , Mexican Chili Powder (3 g) , Crushed Red Pepper Flakes (5 g) , Ground Cumin (3 g) , Ground Ginger (2 g) , Ground Coriander (as needed) , Ground Cloves (1 pinch) , Salt (6 g) , Distilled White Vinegar (15 mL) , and Tahini (30 g) .'
                },
                {
                    id: 34,
                    title: 'Crumble the tofu',
                    description: 'Crumble the tofu in a large bowl and coat with about 2/3 of the hot sauce you just made. Let sit for about 15 minutes.'
                },
                {
                    id: 35,
                    title: 'Make a quick topping',
                    description: 'Meanwhile, make a quick topping by mixing the Yellow Onion (1/2) and Fresh Cilantro (4 g) with Lemon Juice (15 mL) and a little salt.'
                },
                {
                    id: 36,
                    title: 'Heat the Tofu',
                    description: 'Sear the tofu in a hot pan until it develops a little crunchy texture. Add the remaining hot sauce throughout the cooking process to keep moist and maintain flavor.'
                },
                {
                    id: 37,
                    title: 'Coock the topping',
                    description: 'While that cooks, steam the White Corn Tortillas (6) in the Panasonic Microwave Oven by covering them on a plate and heating for about a minute.'
                },
                {
                    id: 38,
                    title: 'Bon appetite',
                    description: 'When the tofu is done to your liking you are ready to assemble and enjoy. If you arent keeping these vegan, add some crumbled Queso Fresco (to taste) to help cut a little bit of the heat. Cooking results may vary depending on microwave oven used.'
                },
            ],
            productsId: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 23],
            metric: [1, 4, 15, 1, 2, 3, 3, 3, 5, 3, 2, 1, 6, 15, 30, 6, 0.5] // block, g, ml, can, things, g, g, g, g, g, g, pinch, g, ml, g, thing, thing
            },
            {
            id: 8,
            coockingTime: 1200,
            difficulty: RecipeDifficulty.HARD,
            steps: [
                {
                    id: 7,
                    title: '',
                    description: '',
                },
                {
                    id: 8,
                    title: '',
                    description: ''
                },
                {
                    id: 9,
                    title: '',
                    description: ''
                },
                {
                    id: 10,
                    title: '',
                    description: ''
                },
                {
                    id: 11,
                    title: '',
                    description: ''
                },
                {
                    id: 12,
                    title: '',
                    description: ''
                },
            ],
            productsId: Array.from({length: 3}, (_, i) => i + 1), //productsIds 1-4
            metric: [1, 80, 210, 2] //box, g, g, things
            },
            {
            id: 9,
            coockingTime: 1200,
            difficulty: RecipeDifficulty.HARD,
            steps: [
                {
                    id: 7,
                    title: '',
                    description: '',
                },
                {
                    id: 8,
                    title: '',
                    description: ''
                },
                {
                    id: 9,
                    title: '',
                    description: ''
                },
                {
                    id: 10,
                    title: '',
                    description: ''
                },
                {
                    id: 11,
                    title: '',
                    description: ''
                },
                {
                    id: 12,
                    title: '',
                    description: ''
                },
            ],
            productsId: Array.from({length: 3}, (_, i) => i + 1), //productsIds 1-4
            metric: [1, 80, 210, 2] //box, g, g, things
            },
            {
            id: 10,
            coockingTime: 1200,
            difficulty: RecipeDifficulty.HARD,
            steps: [
                {
                    id: 7,
                    title: '',
                    description: '',
                },
                {
                    id: 8,
                    title: '',
                    description: ''
                },
                {
                    id: 9,
                    title: '',
                    description: ''
                },
                {
                    id: 10,
                    title: '',
                    description: ''
                },
                {
                    id: 11,
                    title: '',
                    description: ''
                },
                {
                    id: 12,
                    title: '',
                    description: ''
                },
            ],
            productsId: Array.from({length: 3}, (_, i) => i + 1), //productsIds 1-4
            metric: [1, 80, 210, 2] //box, g, g, things
            },
    ];

    for(let r of recipes){
        this.createRecipe(r);
    }
    
  }
}
