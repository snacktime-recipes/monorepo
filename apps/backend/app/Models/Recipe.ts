import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import RecipeDifficulty from 'Types/Recipe/RecipeDifficulty.enum'
import CookStep from 'App/Models/CookStep'
import RecipeProduct from './RecipeProduct'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dishId: number

  @hasMany(() => RecipeProduct)
  public products: HasMany<typeof RecipeProduct>

  @hasMany(() => CookStep)
  public steps: HasMany<typeof CookStep>

  @column()
  public cookingTime: number

  @column()
  public difficulty: RecipeDifficulty;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}