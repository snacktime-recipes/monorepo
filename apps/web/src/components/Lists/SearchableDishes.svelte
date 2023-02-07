<script lang="ts">
    import CodiconSearch from '~icons/codicon/search';
    import PaginatedList from '../PaginatedList/PaginatedList.svelte';
    import DishCard from '../PaginatedList/Cards/DishCard.svelte';
    import { ApplicationConfig } from '../../configs/ApplicationConfig.const';

    $: {
        isLoading = true;

        // Refetching items
        if (search) {
            isSearching = true;
            currentSearchId += 1;

            searchByQuery(search, currentSearchId);
        } else {
            isSearching = false;
        };
    };

    function searchByQuery(query: string, searchId: number) {
        fetch(`${ApplicationConfig.apiUrl}/dishes/search?query=${query}`)
            .then((response) => response.json())
            .then((response) => {
                if (isSearching && currentSearchId == searchId) items = response.hits ?? [];
            })
            .catch(() => {
                isPanicked = true;
                isLoading = false;
            });
    };

    let currentSearchId = 0;
    let isSearching = false;
    let isLoading = false;
    let isPanicked = false;
    let items: Array<any> = [];

    let search: string;

    export let disableCategories = false;
</script>

<!-- Categories -->

<!-- Search bar (desktop-only) -->
<div class="w-full flex items-stretch justify-between">
    <!-- Search -->
    <div class="rounded-full bg-white px-6 py-3 w-full lg:w-2/3 flex items-center">
        <CodiconSearch class="w-5 h-5 text-black text-opacity-70 mr-3" />
        
        <input bind:value={search} class="w-full" type="text" placeholder="Search...">
    </div>

    <!-- Pagination settings (todo) -->
</div>

{ #if isSearching && items.length <= 0 }
    <div class="w-full flex items-center justify-center py-24">
        <div class="w-full md:w-1/3 rounded-xl bg-white py-12 px-6 text-center flex flex-col items-center justify-center">
            <img src="https://em-content.zobj.net/thumbs/120/apple/325/milky-way_1f30c.png" class="w-20" alt="">

            <h1 class="text-2xl font-medium mt-2">Nothing here...</h1>
            <p class="text-sm opacity-80">There's nothing here! Very strange, isn't it?</p>
        </div>
    </div>
{ /if }

<!-- Recipes -->
<PaginatedList card={DishCard} url="/dishes" bind:items={items} {isSearching} />