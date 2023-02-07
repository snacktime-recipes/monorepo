<script lang="ts">
    import { onMount } from "svelte";
    import Circle from "../../../components/Loaders/Circle.svelte";
    import { ApplicationConfig } from "../../../configs/ApplicationConfig.const";

    // urgh
    let items: Array<{ id: number, title: string, description?: string }> = [];

    onMount(async () => {
        const response = await fetch(`${ApplicationConfig.apiUrl}/categories`)
            .then((response) => response.json())
            .catch(() => {
                isLoading = false;
                isPanicked = true;
            });

        items = response.data;
        isLoading = false;
    });

    let isPanicked = false;
    let isLoading = true;
</script>

<div class="mb-12 w-full rounded-xl bg-white p-4">
    { #if isLoading }
        <div class="w-full flex items-center justify-center py-12">
            <Circle size="20" />
        </div>
    { :else }
        { #if isPanicked }
            <div class="py-12 text-center">
                <h1 class="text-xl font-medium">Error while fetching categories</h1>
                <p class="text-sm opacity-80">You can try to reload this page and see whatever this issue resolves itself.</p>
            </div>
        { :else }
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                { #each items as category }
                    <button on:click={() => {

                    }} class="rounded-xl bg-gray-100 p-4 hover:scale-105 hover:bg-gray-200 transition duration-100 text-center">
                        <h1 class="text-xl font-medium">{ category.title }</h1>
                        <p class="text-sm opacity-60">{ category.description ?? "Empty description" }</p>
                    </button>
                { /each }
            </div>
        { /if }
    { /if }
</div>