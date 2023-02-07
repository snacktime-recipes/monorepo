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
    await dish.related('recipe').save((await Recipe.find(2))!);

  }
}
