import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Dish from './Dish'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @hasMany(() => Dish)
  public dishes: HasMany<typeof Dish>

  @column({ serializeAs: "imageUrl" })
  public imageUrl: string | null

  @column.dateTime({ serializeAs: "createdAt", autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ serializeAs: "updatedAt", autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}