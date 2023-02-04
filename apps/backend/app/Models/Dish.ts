import { DateTime } from 'luxon'
import { BaseModel, column, computed, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Recipe from 'App/Models/Recipe'
import DishType from 'Types/Dish/Dish.interface';

export default class Dish extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: "imageUrl" })
  public imageUrl: string

  @column()
  public description: string | null
  
  @column()
  public likes: number

  @hasOne(() => Recipe)
  public recipe: HasOne<typeof Recipe>

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt'  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt'  })
  public updatedAt: DateTime
  
  public async computeMeta(): Promise<DishType["meta"]> {
    // Trying to fetch recipe
    const recipe = await Recipe
      .query()
      .preload('products')
      .where('dish_id', this.id);

    if (recipe.length != 1) return {
      doRecipeExists: false,
    };

    return {
      doRecipeExists: true,
      productsCount: recipe[0].products?.length,
    };
  };
}
