import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: "imageUrl" })
  public imageUrl: string | null

  @column()
  public recipeId: number

  @column.dateTime({ serializeAs: "createdAt", autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ serializeAs: "updatedAt", autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}