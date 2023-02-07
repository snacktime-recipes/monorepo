<script lang="ts">
    import { onMount } from "svelte";
    import { ApplicationConfig } from "../../configs/ApplicationConfig.const";
    
    import Circle from "../Loaders/Circle.svelte";
    import CodiconArrowLeft from '~icons/codicon/arrow-left';
    import CodiconArrowRight from '~icons/codicon/arrow-right';

    // Variables
    let isLoading = true;
    let isPanicked = false;

    $: if (!isSearching) {
        items = initialItems;
    };

    let pagesCount = 0;

    // Fetching 
    onMount(async () => {
        await fetchByPageNumber(currentPage);

        // Updating state
        setTimeout(() => {
            isLoading = false;
        }, 150);
    });

    async function fetchByPageNumber(page: number) {
        const response = await fetch(`${ ApplicationConfig.apiUrl }${ url.startsWith("/") ? "" : "/" }${ url }?page=${page}&itemsPerPage=${itemsPerPage}`);

        if (response.status == 200) {
            const json = await response.json();

            totalElements = json.meta.total;
            currentPage = json.meta.current_page;
            pagesCount = json.meta.last_page ?? 1;

            items = json.data;
            initialItems = json.data;
        } else {
            isPanicked = true;
        };
    };

    export let url: string;
    export let card: any;

    let initialItems: Array<any>;
    export let items: Array<any>;
    
    export let totalElements = 0;
    export let currentPage = 1;
    export let itemsPerPage = 10;

    export let isSearching = false;
</script>

<div>
    { #if isLoading }
        <!-- Loading state -->
        <div class="w-full py-24 flex items-center justify-center">
            <Circle size="35" />
        </div>
    { :else }
        <!-- Panicked state -->
        { #if isPanicked }
            <div class="w-full py-24 flex items-center justify-center">
                <div class="w-1/3 text-center">
                    <h1 class="text-4xl font-medium">Error while fetching</h1>
                    <p class="text-sm opacity-70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, aliquid?</p>
                </div>
            </div>
        { :else }
            <!-- Normal state -->
            <div class="mt-4 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                { #each items as entry }
                    <svelte:component this={card} data={entry} />
                { /each }
            </div>

            <!-- Pages information -->
            <div class="w-full mt-6 flex items-center justify-center">
                <!-- Previous page -->
                <button on:click={() => {
                    if (currentPage > 1 && !isSearching) fetchByPageNumber(currentPage - 1);
                }} class="rounded-xl px-4 py-2 bg-white { currentPage > 1 ? "hover:bg-gray-200" : "cursor-not-allowed opacity-50" }  transition duration-200">
                    <CodiconArrowLeft class="w-5 h-5 text-black" />
                </button>

                <!-- Current page -->
                <div class="mx-6 text-lg font-medium">{ currentPage }</div>

                <!-- Next page -->
                <button on:click={() => {
                    if (currentPage < pagesCount && !isSearching) fetchByPageNumber(currentPage + 1);
                }} class="rounded-xl px-4 py-2 bg-white { currentPage < pagesCount ? "hover:bg-gray-200" : "cursor-not-allowed opacity-50" }  transition duration-200">
                    <CodiconArrowRight class="w-5 h-5 text-black" />
                </button>
            </div>
        { /if }
    { /if }
</div>