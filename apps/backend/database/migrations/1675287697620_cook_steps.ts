import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cook_steps'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('title').notNullable()
      table.string('description').nullable()
      table.string('videoUrl').nullable()

      // Relationships
      table
        .integer('recipe_id')
        .unsigned()
        .references('recipes.id')
        .onDelete('CASCADE')

      // Meta
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
