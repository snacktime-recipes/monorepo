import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class RecipeProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public recipeId: number

  @column({ serializeAs: null })
  public productId: number

  @column({ serializeAs: 'productCount' })
  public productCount: number

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'createdAt' })
  public updatedAt: DateTime
}
