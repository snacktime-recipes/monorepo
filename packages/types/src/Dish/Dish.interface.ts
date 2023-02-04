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
    likes: number,
    meta: MetaWithRecipe | MetaWithoutRecipe,
    createdAt: string,
    updatedAt: string,
};

export default Dish;