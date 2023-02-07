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
                if (isSearching && currentSearchId <= searchId) items = response.hits ?? [];
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

<!-- Recipes -->
<PaginatedList card={DishCard} url="/dishes" bind:items={items} {isSearching} />