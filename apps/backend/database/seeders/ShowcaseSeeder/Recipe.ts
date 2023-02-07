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
            productsId: [32, 33, 34, 35, 36, 37, 38, 39, 40, 27, 42, 43, 44, 45, 46, 47, 23],
            metric: [1, 4, 15, 1, 2, 3, 3, 3, 5, 3, 2, 1, 6, 15, 30, 6, 0.5] // block, g, ml, can, things, g, g, g, g, g, g, pinch, g, ml, g, thing, thing
            },
            {
            id: 8,
            coockingTime: 1500,
            difficulty: RecipeDifficulty.MEDIUM,
            steps: [
                {
                    id: 39,
                    title: 'Cut the Medium Dill Pickles',
                    description: 'Cut the Medium Dill Pickles (8) into thin (0.2-inch) slices. Set aside to dry.',
                },
                {
                    id: 40,
                    title: 'Heat pan',
                    description: 'Heat up the Vegetable Oil (as needed) in a large saucepan over medium heat, until it reaches 350 degrees F (175 degrees C).'
                },
                {
                    id: 41,
                    title: 'Time to mix',
                    description: 'Set up the dredging station. In a medium mixing bowl, whisk together All-Purpose Flour (125 g) , Cayenne Pepper (2 g) , Smoked Paprika (2 g) , Ground Cumin (2 g) , Salt (6 g) , and Ground Black Pepper (1 g) . Put the Eggs (2) in another medium bowl, and the Panko Breadcrumbs (100 g) in a third bowl.'
                },
                {
                    id: 42,
                    title: 'More mix',
                    description: 'Dredge the sliced pickles in the flour mixture first, then the eggs, then dredge in breadcrumbs.'
                },
                {
                    id: 43,
                    title: 'Heat it!',
                    description: 'Carefully lower the pickles into the oil and fry until both sides are golden brown, about 3-5 minutes. Fish the pickles out and put on a paper towel-lined plate.'
                },
                {
                    id: 44,
                    title: 'Bon appetite',
                    description: 'Serve with sauce of your choice.'
                },
            ],
            productsId: [48, 49, 38, 50, 27, 51, 44, 4, 52], //productsIds 1-4
            metric: [8, 125, 2, 2, 2, 1, 6, 2, 100] //things, g, g, g, g, g, g, things, g
            },
            {
            id: 9,
            coockingTime: 1200,
            difficulty: RecipeDifficulty.MEDIUM,
            steps: [
                {
                    id: 45,
                    title: 'Mix',
                    description: 'Sift together All-Purpose Flour (250 g) , Caster Sugar (4 g) , Salt (2 g) . Set aside.',
                },
                {
                    id: 46,
                    title: 'Beat eggs',
                    description: 'In a large bowl, beat Eggs (3) , Milk (500 mL)'
                },
                {
                    id: 47,
                    title: 'Mix 2',
                    description: 'Beat in the flour mixture until smooth'
                },
                {
                    id: 48,
                    title: 'Add butter',
                    description: 'Stir in Unsalted Butter (30 g) .'
                },
                {
                    id: 49,
                    title: 'Heat a pan',
                    description: 'Heat a frying pan over medium heat. Spread butter on surface of the flat pan.'
                },
                {
                    id: 50,
                    title: 'Add luquid',
                    description: 'Pour in the batter on the pan, approximately 100 milliliter.'
                },
                {
                    id: 51,
                    title: 'Spread it',
                    description: 'Rotate the pan to spread the batter as thin as possible.'
                },
                {
                    id: 52,
                    title: 'Repeat',
                    description: 'Once the lower part is cooked and brown, fold the crepe and remove on a plate'
                },
                {
                    id: 53,
                    title: 'Bon appetite',
                    description: 'Top with Chocolate Frosting (65 g) and Fresh Raspberries (100 g) . Served hot and enjoy!'
                },
            ],
            productsId: [49, 20, 44, 4, 41, 2, 53, 54],
            metric: [250, 4, 2, 3, 500, 30, 65, 100] //g, g, g, things, ml, g, g, g 
            },
            {
            id: 10,
            coockingTime: 1500,
            difficulty: RecipeDifficulty.MEDIUM,
            steps: [
                {
                    id: 54,
                    title: 'Preapre the chicken',
                    description: 'Place the Tyson® Chicken Thighs (455 g) in an empty saucepan. Season generously with Salt (to taste) and Ground Black Pepper (to taste) , 1-2 tsp each (the extra seasoning is needed to flavor the chicken). Add water until the chicken is covered by 1-inch.',
                },
                {
                    id: 55,
                    title: 'Bring the liquid',
                    description: 'Bring the liquid to a boil over medium-high heat, then lower heat to a simmer. Cook for 5-10 more minutes until the middle is no longer pink or the internal temperature reaches 165 degrees F (74 degrees C).'
                },
                {
                    id: 56,
                    title: 'Transfer the chicken',
                    description: 'Transfer the chicken to a paper towel-lined tray to cool slightly.'
                },
                {
                    id: 57,
                    title: 'Mix the salad',
                    description: 'In a medium bowl, combine the Coleslaw Mix (225 g) and the Ranch Dressing (60 mL) . Season with Ground Black Pepper (to taste) and Salt (to taste) , if desired.'
                },
                {
                    id: 58,
                    title: 'Shred the chicken',
                    description: 'To shred the chicken, transfer the chicken to the bowl of a stand mixer and blend for 30-60 seconds until shredded. You can also use a hand mixer, or shred by hand with two forks.'
                },
                {
                    id: 59,
                    title: 'Add sauce',
                    description: 'Add the Barbecue Sauce (145 g) to the shredded chicken and toss until fully coated.'
                },
                {
                    id: 60,
                    title: 'Heat it',
                    description: 'Place a skillet over high heat. Once hot, toast the Hamburger Buns (4) in the dry pan for 1-2 minutes, until golden.'
                },
                {
                    id: 61,
                    title: 'Bon appetite',
                    description: 'Place a quarter of the shredded chicken on each of the bottom buns. Top with the ranch slaw and serve with sides of choice.'
                },
            ],
            productsId: [55, 56, 57, 58, 59], 
            metric: [455, 145, 225, 60, 4] // g, g, g, ml, things
            },
            {
            id: 11,
            coockingTime: 1500,
            difficulty: RecipeDifficulty.MEDIUM,
            steps: [
                {
                    id: 62,
                    title: 'Prepare the oven',
                    description: 'Preheat the oven to 350 degrees F (180 degrees C).',
                },
                {
                    id: 63,
                    title: 'Mix it',
                    description: 'In a medium bowl, whisk No Salt Added Organic Sunflower Butter (320 g) , Egg (1) , Raw Sugar (125 g) , Vanilla Extract (5 mL) , Baking Powder (4 g) , and Kosher Salt (6 g) together.'
                },
                {
                    id: 64,
                    title: 'Add Cacao',
                    description: 'When the ingredients are combined, add the 70% Cacao Chocolate Chips (85 g) and mix well.'
                },
                {
                    id: 65,
                    title: 'Add dough',
                    description: 'Scoop out 1 tablespoon of the batter onto the tray with silicone mat or parchment paper.'
                },
                {
                    id: 66,
                    title: 'Add the Heart Candy',
                    description: 'Sprinkle the Heart Candy (50 g) on the top of the cookies.'
                },
                {
                    id: 67,
                    title: 'Bake it',
                    description: 'Bake for 10 minutes.'
                },
                {
                    id: 68,
                    title: 'Bon appetite',
                    description: 'Let them cool completely before removing from the baking sheet, otherwise the cookies may break apart.'
                },
            ],
            productsId: [60, 61, 4, 62, 63, 8, 64, 65], 
            metric: [320, 125, 1, 5, 4, 6, 85, 50] // g, g, thing, ml, g, g, g, g
            },
    ];

    for(let r of recipes){
        this.createRecipe(r);
    }
    
  }
}
