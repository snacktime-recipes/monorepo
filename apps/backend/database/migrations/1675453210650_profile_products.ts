import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profile_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_count').defaultTo(1)

      table
        .integer('profile_id')
        .unsigned()
        .references('profiles.id')
        .onDelete('CASCADE')

      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onDelete('CASCADE')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
