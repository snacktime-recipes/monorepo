import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile';
import Product from 'App/Models/Product';
import Dish from 'App/Models/Dish';
import { AuthType } from 'Types/Profile';

export default class extends BaseSeeder {
  public async run () {
    const profile = await Profile.create({
      id: 1,
      email: 'test@smail.com',
      username: 'UFO_believer',
      password: '123',
      authType: AuthType.PASSWORD
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

      const ProfileDishACtivity = await dish.related('userActivity').create({profileId:1, like: true, bookmark: true});
      await ProfileDishACtivity.related('dishActivity').associate(dish);
      await ProfileDishACtivity.related('activityBy').associate(profile);

  }
}
