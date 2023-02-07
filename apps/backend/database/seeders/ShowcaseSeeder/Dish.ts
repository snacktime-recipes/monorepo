import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dish from 'App/Models/Dish';
import Recipe from 'App/Models/Recipe';

export default class extends BaseSeeder {
  public async run () {
    // With recipe
    let dish = await Dish.create({
      id: 1,
      imageUrl: "https://www.sidechef.com/recipe/48dbef8a-1825-420b-b53a-f128e5c96691.jpg",
      name: "Red Velvet Cake Mix Cookies",
      description: "These four-ingredient Red Velvet Cake Mix Cookies are so simple to make and are downright delicious. They're soft and tender, with a beautiful crackled top. And you can use this recipe with any cake mix, so you can experiment with all sorts of flavor combinations.",
    });
   
    await dish.save();
    await dish.related('recipe').save((await Recipe.find(1))!);
  
    // With recipe with empty products array
    dish = await Dish.create({
      id: 2,
      imageUrl: "https://www.sidechef.com/recipe/366d358a-5ea7-4a79-bf94-345fd62c4c5f.jpg",
      name: "Spaghetti alla Carbonara",
      description: 'Carbonara is an Italian pasta dish from Rome made with egg, hard cheese, the cured meat known as guanciale, and pepper. The recipe is not fixed. Cooks can use pancetta instead of guanciale, lardons, or smoked bacon.'
    });

    await dish.save();
    await dish.related('recipe').save((await Recipe.find(2))!);
    
    // With recipe with empty products array
    dish = await Dish.create({
      id: 3,
      imageUrl: "https://www.sidechef.com/recipe/981919e1-65c0-45a0-aff1-27626b0b4c25.jpg",
      name: "Kimchi Grilled Cheese",
      description: 'Grilled cheese is already a pretty much perfect food. Crispy bread, gooey cheese - how could it get any better than that?? Well, this kimchi grilled cheese might just be the upgrade of the century. By toasting the bread with Kewpie mayo and a little bit of tangy kimchi to your sandwich, you create something that tastes almost too good to be true. Feel free to use your favorite cheese and bread, but we love the creamy, melty texture that cheddar and gouda add.'
    });

    await dish.save();
    await dish.related('recipe').save((await Recipe.find(3))!);

    dish = await Dish.create({
      id: 4,
      imageUrl: "https://www.sidechef.com/recipe/7ebccafc-5883-402e-a4da-5bebe4f944f1.jpeg",
      name: "Watermelon Granita",
      description: 'This Watermelon Granita has just four ingredients and an is ultra-delicious and simple way to cool off with watermelon. Granitas fall somewhere between slushies and sorbets on the texture scale. Our ultra haute method of making these (literally just scraping and stirring away at it) produces light flakes of crystalline watermelon.'
    });

    await dish.save();
    await dish.related('recipe').save((await Recipe.find(4))!);

    dish = await Dish.create({
      id: 5,
      imageUrl: "https://www.sidechef.com/recipe/4fc97039-a2f2-4b15-bb47-69b5c7fe5da1.jpg",
      name: "Ground Beef and Zucchini Taco Skillet",
      description: 'Any taco fan who loves the combination of zesty flavor and cheesy goodness will be drooling over this mouth-watering Ground Beef and Zucchini Taco Skillet! This is an incredibly fun meal that your whole family will love. The ground beef in this dish is fused with bite-sized pieces of zucchini, peppers, and onions. The mix of ingredients provides a great base for the flavors to shine through. Sprinkled with taco seasoning and plenty of salsa for a kick, you won’t regret adding this delicious dinner option to your weekly rotation.'
    });

    await dish.save();
    await dish.related('recipe').save((await Recipe.find(5))!);
    
    dish = await Dish.create({
      id: 6,
      imageUrl: "https://www.sidechef.com/recipe/558d15a4-6414-4b2f-82fc-d07d863c4f5f.jpg",
      name: "The Perfect Scrambled Eggs",
      description: 'These are the creamiest, tastiest and simplest scrambled eggs, they are made in minutes and you won’t believe how good they are. Here’s How To Make Perfect Scrambled Eggs EVERY TIME in 4 simple steps!!'
    });

    await dish.save();
    await dish.related('recipe').save((await Recipe.find(6))!);
    
    dish = await Dish.create({
      id: 7,
      imageUrl: "https://www.sidechef.com/recipe/720470f7-8507-40b6-a20c-78f6ae9dd2b4.jpg",
      name: "Tofu Chorizo (Soyrizo) Tacos",
      description: 'Tacos are a great Chicago immigrant food. Chicago is home to the second-largest Mexican population in the states outside of LA) and we are home to some fantastic local products, as a result! (Partnership with Panasonic)'
    });

    await dish.save();
    await dish.related('recipe').save((await Recipe.find(7))!);

    dish = await Dish.create({
      id: 8,
      imageUrl: "https://www.sidechef.com/recipe/394430e2-d055-4b06-a8da-2833b268d232.jpg",
      name: "Fried Pickles",
      description: 'These fried pickles are the perfect appetizer or side dish to any party. They are spicy, crunchy, savory, and absolutely delicious.'
    });

    await dish.save();
    await dish.related('recipe').save((await Recipe.find(8))!);

    dish = await Dish.create({
      id: 9,
      imageUrl: "https://www.sidechef.com/recipe/742cf171-b247-4fa3-940c-0027ed162550.jpeg",
      name: "Crepe",
      description: 'Everybodys favourite breakfast dish - Crepe, delicious when topped with molten chocolate and fresh raspberries.'
    });

    await dish.save();
    await dish.related('recipe').save((await Recipe.find(9))!);

    dish = await Dish.create({
      id: 10,
      imageUrl: "https://www.sidechef.com/recipe/d218c4e6-1120-4f05-b3ee-ff86a3025ef8.jpg",
      name: "5-Ingredient BBQ Chicken Sandwich with Ranch Slaw",
      description: 'This BBQ Chicken Sandwich recipe couldn’t be easier! With only 5 ingredients and a special chicken shredding hack, you can have these juicy, flavorful sandwiches on the table for dinner in under half an hour. Enjoy the universally loved combo of BBQ chicken flavor and creamy ranch slaw in every bite, maximize the experience for your taste buds!'
    });

    await dish.save();
    await dish.related('recipe').save((await Recipe.find(10))!);

  }
}
