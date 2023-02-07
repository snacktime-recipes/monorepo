import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { AuthType } from 'Types/Profile'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('username', 255).notNullable()
      table.string('password', 180).nullable();
      table.string('avatar').nullable()
      table.string('remember_me_token').nullable()
      table.enum('auth_type', Object.values(AuthType))
      
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
