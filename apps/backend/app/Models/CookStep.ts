import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CookStep extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string | null

  @column({ serializeAs: "videoUrl" })
  public videoUrl: string | null

  @column({ serializeAs: null })
  public recipeId: number

  @column.dateTime({ autoCreate: true, serializeAs: "createdAt" })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: "updatedAt" })
  public updatedAt: DateTime
}
