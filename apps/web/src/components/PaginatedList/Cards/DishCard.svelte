<script lang="ts">
    import CodiconWatch from '~icons/codicon/watch';
    import CodiconBookmark from '~icons/codicon/bookmark';
    import CodiconHeart from '~icons/codicon/heart';

    import type { Dish, SearchableDish } from '$types';
    import secondsToTime from '../../../helpers/secondsToTime';

    // @ts-ignore
    $: cookingTime = secondsToTime(dish.meta?.cookingTime);

    $: {
        name = dish.name;
        description = dish.description ?? "Empty description";

        if (isSearchableDish(dish)) {
            // Updating name and description fields (if needed)
            dish.highlights.forEach((highlight) => {
                switch (highlight.field) {
                    case "name":
                        name = highlight.snippet;

                    case "description":
                        description = highlight.snippet;
                };
            });
        };
    };

    function isSearchableDish(dish: any): dish is SearchableDish {
        if (dish.highlights) {
            return true;
        };

        return false;
    };

    let name: string;
    let description: string;

    let dish: Dish | SearchableDish;
    export { dish as data };
</script>

<div class="flex-1 rounded-xl bg-white p-4 hover:scale-105 transition ease-in-out duration-200">
    <!-- Image -->
    <img src="{ dish.imageUrl }" alt="" class="cursor-pointer rounded-xl">

    <!-- Tags (todo) -->
    <div class="flex flex-wrap gap-2 my-4 opacity-80">
        <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-r from-yellow-300 to-amber-400">
            <CodiconHeart class="w-4 h-4 text-white mr-1" />
            
            <p class="text-white text-xs">{ dish.likes }</p>
        </div>

        { #if dish.meta.doRecipeExists }
            <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-br from-slate-400 to-gray-300">
                <p class="text-white text-xs">{ dish.meta.productsCount } ingredients</p>
            </div>
        { /if }
    </div>

    <!-- Text -->
    <div class="my-4">
        <h1 class="text-xl font-bold">{ @html name }</h1>
        <p class="hidden md:block text-sm md:text-xs opacity-60">{ @html description }</p>
    </div>

    <!-- Buttons -->
    <div class="flex flex-col md:flex-row items-stretch gap-2">
        <!-- Add to favouries -->
        <button class="w-full md:w-1/2 py-2 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center hover:from-sky-600 hover:to-indigo-600 transition ease-in-out duration-200">
            <CodiconBookmark class="text-white w-5 h-5" />

            <p class="text-white text-sm ml-1">Bookmark</p>
        </button>

        <!-- Time to prepare -->
        { #if dish.meta.doRecipeExists }
            <div class="w-full md:w-1/2 flex items-center justify-center opacity-60">
                <CodiconWatch class="text-black w-5 h-5" />

                <p class="text-sm ml-1">{ cookingTime.hours > 0 ? cookingTime.hours + "h" : "" }{ cookingTime.minutes + "m" }</p>
            </div>
        { /if }
    </div>
</div>