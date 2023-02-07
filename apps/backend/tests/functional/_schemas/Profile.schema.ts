import expect from "expect";
import { Profile, ProfileProduct } from "Types/Profile";
import { DishSchema } from "./Dish.schema";
import { ProductSchema } from "./Product.schema";

export const ProfileSchema: Record<keyof Profile, any> = {
    id: expect.any(Number),
    email: expect.any(String),
    username: expect.any(String),
    authType: expect.any(String),
    avatar: expect.any(String),

    // 
    likes: expect.arrayContaining([DishSchema]),
    bookmarks: expect.arrayContaining([DishSchema]),

    createdAt: expect.any(String),
    updatedAt: expect.any(String),
};

export const ProfileProductSchema: Record<keyof ProfileProduct, any> = {
    ...ProductSchema,
    count: expect.any(Number),
};