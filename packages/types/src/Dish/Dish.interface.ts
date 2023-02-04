export interface Dish {
    id: number,
    name: string,
    imageUrl: string,
    description?: string,
    likes: number,
    meta: {
        doRecipeExists: boolean,
        productsCount?: number,
    },
    createdAt: string,
    updatedAt: string,
};

export default Dish;