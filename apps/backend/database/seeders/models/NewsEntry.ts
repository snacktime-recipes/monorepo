import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import NewsEntry from 'App/Models/NewsEntry'

export default class extends BaseSeeder {
  public async run () {
    await NewsEntry.createMany([
      {
        id: 1,
        title: "Test news entry!",
        description: "Hurraaay! It's without a link"
      },
      {
        id: 2,
        title: "Test news",
        description: "Test news entry with a link!",
        link: "https://twitter.com/juiipupy/status/1560662139366322179"
      }
    ]);
  }
}
