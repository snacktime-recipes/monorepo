import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class ProfileProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public profileId: number

  @column({ serializeAs: null })
  public productId: number

  @column({ serializeAs: 'productCount' })
  public productCount: number

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

}
