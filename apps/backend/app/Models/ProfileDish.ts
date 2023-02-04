import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class ProfileDish extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public profileId: number

  @column({ serializeAs: null })
  public dishId: number

  @column()
  public like: boolean

  @column()
  public bookmark: boolean

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

}
