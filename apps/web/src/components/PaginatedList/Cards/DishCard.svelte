<script lang="ts">
    import CodiconWatch from '~icons/codicon/watch';

    import CodiconBookmark from '~icons/codicon/bookmark';
    import CodiconTrash from '~icons/codicon/trash'

    import CodiconHeart from '~icons/codicon/heart';
    import CodiconHeartFilled from '~icons/codicon/heart-filled'
    
    import { Profile } from '../../../stores/Profile.store';
    import type { AuthorizedProfile } from '../../../stores/Profile.store';

    import type { Dish, SearchableDish } from '$types';
    import secondsToTime from '../../../helpers/secondsToTime';
    import { ApplicationConfig } from '../../../configs/ApplicationConfig.const';

    $: profile = $Profile as AuthorizedProfile;

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

    $: isLiked = profile.likes?.includes(dish.id);
    $: isBookmarked = profile.bookmarks?.includes(dish.id);

    function isSearchableDish(dish: any): dish is SearchableDish {
        if (dish.highlights) {
            return true;
        };

        return false;
    };

    async function bookmark() {
        isLoading = true;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');

        await fetch(`${ApplicationConfig.apiUrl}/dishes/${dish.id}/${ isBookmarked ? "unbookmark" : "bookmark" }`, {
            method: 'POST',
            headers,
            credentials: 'include'
        });
        
        await Profile.refetch();
    };

    async function like() {
        isLoading = true;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');

        await fetch(`${ApplicationConfig.apiUrl}/dishes/${dish.id}/${ isLiked ? "unlike" : "like" }`, {
            method: 'POST',
            headers,
            credentials: 'include'
        });

        await Profile.refetch();
    };

    let name: string;
    let description: string;

    let isLoading = false;

    let dish: Dish | SearchableDish;
    export { dish as data };

    export let dark = false;
    export let disableBookmarkButton = false;
    export let disableLikeButton = false;
    export let enableFullscreenLikeButton = false;
</script>

<div class="flex-1 rounded-xl { dark ? "bg-gray-100" : "bg-white" } flex flex-col p-4 hover:scale-105 transition ease-in-out duration-200">
    <!-- Image -->
    <div class="relative">
        <img src="{ dish.imageUrl }" alt="" class="cursor-pointer rounded-xl">
    
        <!-- Like button -->
        { #if !disableLikeButton }
            <div class="absolute top-0 right-0 p-3">
                <button on:click={() => like()} class="p-3 rounded-full bg-gradient-to-tr from-red-400 to-pink-400">
                    <svelte:component this={ isLiked ? CodiconHeartFilled : CodiconHeart } class="w-6 h-6 text-white" />
                </button>
            </div>
        { /if }
    </div>

    <!-- Tags (todo) -->
    <div class="flex flex-wrap gap-2 my-4 opacity-80">
        <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-r from-red-500 to-rose-500">
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
    <div class="my-4 flex-1">
        <h1 class="text-xl font-bold">{ @html name }</h1>
        <p class="md:text-sm md:text-xs opacity-60">{ @html description }</p>
    </div>

    <!-- Buttons -->
    <div class="flex flex-col md:flex-row items-stretch gap-2">
        <!-- Add to favouries -->
        { #if !disableBookmarkButton }
            <button on:click={() => {
                bookmark();
            }} class="w-full py-2 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center hover:from-sky-600 hover:to-indigo-600 transition ease-in-out duration-200">
                <svelte:component this={ isBookmarked ? CodiconTrash : CodiconBookmark } class="text-white w-5 h-5" />

                <p class="text-white text-sm ml-1">{ isBookmarked ? "Remove from bookmarks" : "Bookmark" }</p>
            </button>
        { /if }

        <!-- Fullscreen like button -->
        { #if enableFullscreenLikeButton }
            <button on:click={() => {
                like();
            }} class="w-full py-2 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 flex items-center justify-center hover:from-red-600 hover:to-pink-600 transition ease-in-out duration-200">
                <svelte:component this={isLiked ? CodiconHeartFilled : CodiconHeart} class="text-white w-5 h-5" />

                <p class="text-white text-sm ml-1">{ isLiked ? "Unlike" : "Like" }</p>
            </button>
        { /if }
    </div>

    <!-- Time to prepare -->
    { #if dish.meta.doRecipeExists }
        <div class="mt-4 w-full flex items-center justify-center opacity-60">
            <CodiconWatch class="text-black w-5 h-5" />

            <p class="text-sm ml-1">{ cookingTime.hours > 0 ? cookingTime.hours + "h" : "" }{ cookingTime.minutes + "m" }</p>
        </div>
    { /if }
</div>