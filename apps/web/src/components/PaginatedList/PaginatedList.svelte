<script lang="ts">
    import { onMount } from "svelte";
    import { ApplicationConfig } from "../../configs/ApplicationConfig.const";
    import Circle from "../Loaders/Circle.svelte";
  import TextPlaceholder from "../Loaders/TextPlaceholder.svelte";

    // Variables
    let isLoading = true;
    let isPanicked = false;

    let totalElements: number = 0;
    let currentPage: number = 1;
    let data: Array<any> = [];

    // Fetching 
    onMount(async () => {
        const response = await fetch(`${ ApplicationConfig.apiUrl }${ url.startsWith("/") ? "" : "/" }${ url }`, { credentials: 'include' });

        if (response.status == 200) {
            const json = await response.json();

            totalElements = json.meta.total;
            currentPage = json.meta.current_page;

            data = json.data;
        } else {
            isPanicked = true;
        };

        // Updating state
        setTimeout(() => {
            isLoading = false;
        }, 150);
    });

    export let url: string;
    export let card: any;
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
            <div class="mt-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                { #each data as entry }
                    <svelte:component this={card} data={entry} />
                { /each }
            </div>
        { /if }
    { /if }
</div>