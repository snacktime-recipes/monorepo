import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
    public static environment = ['showcase'];

    private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
        await new Seeder.default(this.client).run()
    };

    public async run() {
        await this.runSeeder(await import('../Product'));
        await this.runSeeder(await import('../Recipe'));
        await this.runSeeder(await import('../Dish'));
        await this.runSeeder(await import('../NewsEntry'));
    };
}
