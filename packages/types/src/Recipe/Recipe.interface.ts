import { RecipeDifficulty } from ".";

export interface RecipeStep {
    id: number;
    title: string;
    description: string;
    videoUrl?: string;
};

export interface Recipe {
    id: number;
    steps: Array<RecipeStep>;
    cookingTime: number;
    difficulty: RecipeDifficulty
    createdAt: string,
    updatedAt: string,
};