import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ProfileProduct from './ProfileProduct'
import ProfileDish from './ProfileDish'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @hasMany(() => ProfileProduct)
  public products: HasMany<typeof ProfileProduct>

  @hasMany(() => ProfileDish)
  public dishes: HasMany<typeof ProfileDish>

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (profile: Profile) {
    if (profile.$dirty.password) {
      profile.password = await Hash.make(profile.password)
    }
  }
}
