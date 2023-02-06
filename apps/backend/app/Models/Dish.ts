import { DateTime } from 'luxon'
import { afterSave, HasMany, hasMany, BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Recipe from 'App/Models/Recipe'
import DishType from 'Types/Dish/Dish.interface';
import Typesense from '@ioc:Typesense'
import ProfileDishActivity from './ProfileDishActivity'

export default class Dish extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: 'categoryId' })
  public categoryId: number

  @column({ serializeAs: "imageUrl" })
  public imageUrl: string

  @column()
  public description: string | null
  
  @column()
  public likes: number

  @hasMany(() => ProfileDishActivity, { serializeAs: null })
  public userActivity: HasMany<typeof ProfileDishActivity>

  @hasOne(() => Recipe, { serializeAs: null })
  public recipe: HasOne<typeof Recipe>

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt'  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt'  })
  public updatedAt: DateTime
  
  @afterSave()
  public static async updateSearchEntity(entity: Dish) {
    await Typesense.updateOrCreate(entity);
  };

  public async computeMeta(): Promise<DishType["meta"]> {
    // Trying to fetch recipe
    const recipes = await Recipe
      .query()
      .preload('products')
      .where('dish_id', this.id);

    if (recipes.length != 1) return {
      doRecipeExists: false,
    };

    const recipe = recipes[0];

    return {
      doRecipeExists: true,
      productsCount: recipe.products?.length,
      cookingTime: recipe.cookingTime,
    };
  };
}
