import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profile_dish_activities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_liked')
      table.boolean('is_bookmarked')

      table
        .integer('profile_id')
        .unsigned()
        .references('profiles.id')
        .onDelete('CASCADE')

      table
        .integer('dish_id')
        .unsigned()
        .references('dishes.id')
        .onDelete('CASCADE')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
