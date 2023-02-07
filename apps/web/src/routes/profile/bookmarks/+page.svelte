<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Circle from "../../../components/Loaders/Circle.svelte";
    import DishCard from "../../../components/PaginatedList/Cards/DishCard.svelte";
    import Profile from "../../../stores/Profile.store";
    import type { AuthorizedProfile } from '../../../stores/Profile.store';
    import { ApplicationConfig } from "../../../configs/ApplicationConfig.const";

    $: profile = $Profile as AuthorizedProfile;

    onMount(async () => {
        // Fetching profile's bookmarks
        await Profile.refetch();

        isLoading = false;
    });

    let isPanicked = false;
    let isLoading = true;
</script>

<div class="p-2">
    { #if isLoading }
        <div class="w-full flex items-center justify-center py-20">
            <Circle size="40" />
        </div>
    { :else }
        { #if isPanicked }
            <div in:fade class="w-full flex items-center justify-center py-20 text-center">
                <h1 class="text-xl font-bold">Error while fetching news</h1>
                <p class="text-sm opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, iusto neque soluta ullam saepe officiis!</p>
            </div>
        { :else }
            { #if profile.bookmarks.length > 0 }
                <div in:fade class="grid grid-cols-2 md:grid-cols-5 gap-4">
                    { #each profile.bookmarks as dishId }
                        { @const dishFetcher = async () => (
                            fetch(`${ApplicationConfig.apiUrl}/dishes/${dishId}`)
                                .then((response) => response.json())
                        )}

                        { #await dishFetcher() then dish }
                            <DishCard dark enableFullscreenBookmarkButton disableLikeButton data={dish} />
                        { /await }
                    { /each }
                </div>
            { :else }
                <div class="w-full flex items-center justify-center py-24">
                    <div class="w-full md:w-1/3 rounded-xl bg-gray-100 py-12 px-6 text-center flex flex-col items-center justify-center">
                        <img src="https://em-content.zobj.net/thumbs/120/apple/325/milky-way_1f30c.png" class="w-20" alt="">

                        <h1 class="text-2xl font-medium mt-2">Nothing here...</h1>
                        <p class="text-sm opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsa doloribus velit unde rem tenetur sunt, rerum delectus sint nam quos ad veritatis cumque dolorem eaque ex accusamus, neque laudantium deleniti aperiam quibusdam! Vero.</p>
                    </div>
                </div>
            { /if }
        { /if }
    { /if } 
</div>