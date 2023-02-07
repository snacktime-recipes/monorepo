import { Dish } from "../Dish";
import AuthType from "./AuthType.enum";

export interface Profile {
    id: number;
    email: string,
    username: string,
    avatar: string,
    authType: AuthType,

    // Relationships
    likes: Array<Dish>,
    bookmarks: Array<Dish>,

    createdAt: string,
    updatedAt: string,
}