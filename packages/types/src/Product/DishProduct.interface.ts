import Product from "./Product.interface";

export interface DishProduct extends Product {
    count: number,
    measurement: string,
};