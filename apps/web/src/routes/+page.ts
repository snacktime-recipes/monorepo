import type { Dish } from "$types";
import { ApplicationConfig } from "../configs/ApplicationConfig.const";

/** @type {import('./$types').PageLoad} */
export async function load() {
    const response = await fetch(`${ApplicationConfig.apiUrl}/dishes`);
    const items = await response.json();

    return items as {
        data: Array<Dish>
    };
}