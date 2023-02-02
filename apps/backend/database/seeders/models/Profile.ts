import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile';
export default class extends BaseSeeder {
  public async run () {
    await Profile.create({
      id: 1,
      email: "test@smail.com",
      password: "123"
    });
  }
}
