import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile';
import Product from 'App/Models/Product';
import Dish from 'App/Models/Dish';

export default class extends BaseSeeder {
  public async run () {
    const profile = await Profile.create({
      id: 1,
      email: 'test@smail.com',
      username: 'UFO_believer',
      password: '123'
    });

    await profile.save();

    const productIds = [1, 2];
      for (let productId of productIds) {
        const product = await Product.find(productId);
        if (!product) return;

        const profileProduct = await profile.related('products').create({productCount: 4});
        await profileProduct.related('product').associate(product);
      };

      const dishId = 1;

      const dish = await Dish.findBy('id', dishId);
      if (!dish) return;

      const ProfileDish = await dish.related('userActivity').create({like: true, bookmark: true});
      await ProfileDish.related('dish').associate(dish);
      await ProfileDish.related('profile').associate(profile);

  }
}
