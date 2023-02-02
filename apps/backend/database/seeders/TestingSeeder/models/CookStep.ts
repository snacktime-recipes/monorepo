import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CookStep from 'App/Models/CookStep'

export default class extends BaseSeeder {
  public async run () {
    await CookStep.createMany([
        {
            id: 1,
            title: 'Mush apple in potato syrop',
            description: 'Just mush\'em!',
        },
        {
            id: 2,
            title: 'Add sugar',
            description: 'You know'
        }
    ])
  }
}
