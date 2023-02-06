import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Dish from './Dish'
import Profile from './Profile'

export default class ProfileDishActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'profileId' })
  public profileId: number

  @column({ serializeAs: 'dishId' })
  public dishId: number

  @column()
  public like: boolean

  @column()
  public bookmark: boolean

  @belongsTo(() => Dish)
  public dishActivity: BelongsTo<typeof Dish>

  @belongsTo(() => Profile)
  public activityBy: BelongsTo<typeof Profile>

}
