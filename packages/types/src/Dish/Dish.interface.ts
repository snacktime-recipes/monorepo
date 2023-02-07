import { Profile } from "../Profile";

interface MetaWithRecipe {
    doRecipeExists: true,

    productsCount: number,
    cookingTime: number,
};

interface MetaWithoutRecipe {
    doRecipeExists: false,
};

export interface Dish {
    id: number,
    name: string,
    imageUrl: string,
    description?: string,
    categoryId: number,
    meta: MetaWithRecipe | MetaWithoutRecipe,

    likedBy: Array<Profile>,
    
    createdAt: string,
    updatedAt: string,
};

export default Dish;