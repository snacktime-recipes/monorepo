import expect from "expect";
import { Dish } from "Types/Dish";
import { DishProduct } from "Types/Product";
import { Recipe, RecipeStep } from "Types/Recipe";
import { ProductSchema } from "./Product.schema";

export const DishSchema: Record<keyof Dish, any> = {
    id: expect.any(Number),
    name: expect.any(String),
    categoryId: expect.any(Number),
    imageUrl: expect.any(String),
    description: expect.any(String),
    
    likedBy: expect.arrayContaining([
        expect.any(Number),
    ]),
    
    // todo
    // Make proper check
    meta: expect.anything(),
    
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
};

export const DishProductSchema: Record<keyof DishProduct, any> = {
    ...ProductSchema,
    count: expect.any(Number),
};

// Recipe
export const RecipeStepSchema: Record<keyof RecipeStep, any> = {
    id: expect.any(Number),
    description: expect.any(String),
    title: expect.any(String),
    
    // todo
    // do this check properly
    // videoUrl: expect.anything(),
};

export const RecipeSchema: Record<keyof Recipe, any> = {
    id: expect.any(Number),
    // todo do this enum properly
    difficulty: expect.any(String),
    steps: expect.arrayContaining([RecipeStepSchema]),
    cookingTime: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
};