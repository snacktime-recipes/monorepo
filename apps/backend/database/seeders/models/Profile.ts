import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile';
import Product from '../../../app/Models/Product';
export default class extends BaseSeeder {
  public async run () {
    const profile = await Profile.create({
      id: 1,
      email: "test@smail.com",
      password: "123"
    });

    await profile.save();

    const productIds = [1, 2];
      for (let productId of productIds) {
        const product = await Product.find(productId);
        if (!product) return;

        const profileProduct = await profile.related('products').create({productCount: 4});
        await profileProduct.related('product').associate(product);
      };
  }
}
