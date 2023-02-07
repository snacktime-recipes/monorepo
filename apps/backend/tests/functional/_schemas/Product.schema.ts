import expect from 'expect';
import { Product } from 'Types/Product';

export const ProductSchema: Record<keyof Product, any> = {
    id: expect.any(Number),
    name: expect.any(String),
    description: expect.any(String),
    imageUrl: expect.any(String),

    createdAt: expect.any(String),
    updatedAt: expect.any(String),
};