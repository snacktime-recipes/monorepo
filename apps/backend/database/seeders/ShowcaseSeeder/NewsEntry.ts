import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import NewsEntry from 'App/Models/NewsEntry'

export default class extends BaseSeeder {
  public async run () {
    await NewsEntry.createMany([
      {
        id: 1,
        title: "Showcase environment",
        description: "There are approximately 10-20 dishes and products in this database, without any accounts. Social authorization is disabled, but authorization/registration with email/password is not."
      },
      {
        id: 2,
        title: "We are fully open-source!",
        description: "(albeit with a bit of bad code (for now))",
        link: "https://github.com/snacktime-recipes/monorepo"
      }
    ]);
  }
}
