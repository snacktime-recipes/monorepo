import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ProfileProduct from './ProfileProduct'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import ProfileDishActivity from './ProfileDishActivity'
import { AuthType } from 'Types/Profile'
import Category from './Category'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password?: string

  @column({ serializeAs: 'authType' })
  public authType: AuthType

  @column()
  public avatar: string

  @hasMany(() => ProfileProduct)
  public products: HasMany<typeof ProfileProduct>

  @hasMany(() => ProfileDishActivity, { serializeAs: null })
  public myDishesActivivty: HasMany<typeof ProfileDishActivity>

  @column({ serializeAs: null })
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime

  @beforeSave()
  public static async nullableAvatar(profile: Profile) {
    if (profile.avatar == null && profile.$dirty.avatar == null) {
      profile.avatar = `https://ui-avatars.com/api/?name=${ profile.username }`;
    };
  };

  @beforeSave()
  public static async hashPassword(profile: Profile) {
    if (profile.$dirty.password && profile.password) {
      profile.password = await Hash.make(profile.password)
    }
  }
}
