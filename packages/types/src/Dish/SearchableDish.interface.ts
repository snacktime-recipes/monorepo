import Dish from "./Dish.interface";

export interface SearchableDish extends Dish {
    highlights: Array<{
        field: string,
        snippet: string,
    }>,
};

export default SearchableDish;