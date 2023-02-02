import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import RecipeDifficulty from 'Types/Recipe/RecipeDifficulty.enum';

export default class extends BaseSchema {
  protected tableName = 'recipes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();      
      table.integer('cooking_time');
      table.enum('difficulty', Object.values(RecipeDifficulty));

      // Relationships
      table
        .integer('dishId')
        .unsigned()
        .references('dishes.id')
        .onDelete('CASCADE')

      // Meta
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
