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
    import { goto } from '$app/navigation';

    $: profile = $Profile as AuthorizedProfile;

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

    function timeToString(time: { hours: number, minutes: number }): string {
        return `${ time.hours != 0 ? time.hours + "h " : "" }${ time.minutes != 0 ? time.minutes + "m" : "" }`;
    };

    $: isLiked = profile.likes?.includes(dish.id);
    $: isBookmarked = profile.bookmarks?.includes(dish.id);
    $: tags = [
        {
            icon: CodiconHeart,
            text: `${ dish.likedBy.length ?? 0 } likes`
        },
        // Ingredients + CookingTime
        ...dish.meta.doRecipeExists ? [
            {
                text: `${ dish.meta.productsCount } ingredients`
            },
            {
                icon: CodiconWatch,
                text: `${ timeToString(secondsToTime(dish.meta.cookingTime)) } to cook`
            },
        ] : [],
    ];

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
    export let enableFullscreenBookmarkButton = false;
</script>

<button on:click={() => {
    goto(`/dish/${ dish.id }`);
}} class="flex-1 rounded-xl { dark ? "bg-gray-100" : "bg-white" } flex flex-col p-4 hover:scale-105 transition ease-in-out duration-200">
    <!-- Image -->
    <div class="relative">
        <img src="{ dish.imageUrl }" alt="{ dish.name }" class="object-cover w-full h-64 inset-0 cursor-pointer rounded-xl">

        <!-- Like button -->
        { #if !disableLikeButton }
            <div class="absolute top-0 right-0 p-3">
                <button on:click|preventDefault|stopPropagation={() => like()} class="p-3 rounded-full bg-gradient-to-tr from-red-400 to-pink-400">
                    <svelte:component this={ isLiked ? CodiconHeartFilled : CodiconHeart } class="w-6 h-6 text-white" />
                </button>
            </div>
        { /if }
    </div>

    <!-- Text -->
    <div class="my-4 text-left flex-1">
        <h1 class="text-xl font-bold">{ @html name }</h1>
        <p class="md:text-sm opacity-60 line-clamp-4">{ @html description }</p>
    </div>

    <!-- Divider -->
    <div class="h-0.5 w-full bg-gray-200 rounded-full"></div>

    <!-- Tags -->
    <div class="mt-5 opacity-60 flex items-center flex-wrap gap-2">
        { #each tags as tag }
            { @const tagIndex = tags.findIndex((x) => x == tag) }
        
            <div class="flex items-center justify-center text-black">
                { #if tag.icon != null }
                    <svelte:component this={tag.icon} class="w-5 h-5 mr-2" />
                { /if }

                <p class="text-sm">{ tag.text }</p>
            </div>

            <!-- Dot -->
            { #if tagIndex < tags.length - 1 }   
                <span class="w-1 h-1 rounded-full bg-gray-800 mx-0.5"></span>
            { /if }
        { /each }
    </div>

    <!-- Buttons -->
    <div class="mt-5 flex flex-col md:flex-row items-stretch gap-2">
        <!-- Add to favouries -->
        { #if enableFullscreenBookmarkButton }
            <button on:click|preventDefault|stopPropagation={() => {
                bookmark();
            }} class="w-full py-2 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center hover:from-sky-600 hover:to-indigo-600 transition ease-in-out duration-200">
                <svelte:component this={ isBookmarked ? CodiconTrash : CodiconBookmark } class="text-white w-5 h-5" />

                <p class="text-white text-sm ml-1">{ isBookmarked ? "Remove from bookmarks" : "Bookmark" }</p>
            </button>
        { /if }

        <!-- Fullscreen like button -->
        { #if enableFullscreenLikeButton }
            <button on:click|preventDefault|stopPropagation={() => {
                like();
            }} class="w-full py-2 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 flex items-center justify-center hover:from-red-600 hover:to-pink-600 transition ease-in-out duration-200">
                <svelte:component this={isLiked ? CodiconHeartFilled : CodiconHeart} class="text-white w-5 h-5" />

                <p class="text-white text-sm ml-1">{ isLiked ? "Unlike" : "Like" }</p>
            </button>
        { /if }
    </div>
</button>