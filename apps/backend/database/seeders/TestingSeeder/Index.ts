import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public static environment = ['testing'];

  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  };

  public async run() {
    await this.runSeeder(await import('./models/Product'))
    await this.runSeeder(await import('./models/Recipe'))
    await this.runSeeder(await import('./models/Dish'))
  };
}
