interface MetaWithRecipe {
    doRecipeExists: true,

    productsCount: number,
    cookingTime: number,
};

interface MetaWithoutRecipe {
    doRecipeExists: false,
};

interface ProfiledId{
    id: number,
}

export interface Dish {
    id: number,
    name: string,
    imageUrl: string,
    description?: string,
    meta: MetaWithRecipe | MetaWithoutRecipe,
    createdAt: string,
    updatedAt: string,
    likedby: Array<ProfiledId | undefined>,
};

export default Dish;