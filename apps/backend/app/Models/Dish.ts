import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Recipe from 'App/Models/Recipe'
import ProfileDish from './ProfileDish'

export default class Dish extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string | null

  @hasMany(() => ProfileDish)
  public userActivity: HasMany<typeof ProfileDish>

  @hasOne(() => Recipe)
  public recipe: HasOne<typeof Recipe>

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt'  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt'  })
  public updatedAt: DateTime
}
