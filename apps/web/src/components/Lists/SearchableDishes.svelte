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
            fetch(`${ApplicationConfig.apiUrl}/dishes/search?query=${search}`)
                .then((response) => response.json())
                .then((response) => {
                    if (isSearching) items = response.hits ?? [];
                })
                .catch(() => {
                    isPanicked = true;
                    isLoading = false;
                });
        } else {
            isSearching = false;
        };
    };

    let isSearching = false;
    let isLoading = false;
    let isPanicked = false;
    let items: Array<any> = [];

    let search: string;
</script>

<!-- Search bar (desktop-only) -->
<div class="w-full flex items-stretch justify-between">
    <!-- Search -->
    <div class="rounded-full bg-white px-6 py-3 w-full lg:w-2/3 flex items-center">
        <CodiconSearch class="w-5 h-5 text-black text-opacity-70 mr-3" />
        
        <input bind:value={search} class="w-full" type="text" placeholder="Search...">
    </div>
</div>

<!-- Recipes -->
<PaginatedList card={DishCard} url="/dishes" bind:items={items} {isSearching} />