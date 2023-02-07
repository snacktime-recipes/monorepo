<script lang="ts">
    import Circle from "../../../components/Loaders/Circle.svelte";
    import { onMount } from "svelte";
    import { ApplicationConfig } from "../../../configs/ApplicationConfig.const";
    import type { ProfileProduct } from "$types";
    import { fade } from "svelte/transition";
    import ProductCard from "./_components/ProductCard.svelte";

    let products: Array<ProfileProduct> = [];

    onMount(async () => {
        const response = await fetch(`${ApplicationConfig.apiUrl}/profile/products`)
            .then((response) => response.json())
            .catch(() => {
                isLoading = false;
                isPanicked = true;
            });

        products = response ?? []; 
        isLoading = false;
    });

    let isPanicked = false;
    let isLoading = true;
</script>

<div class="w-full py-16 flex justify-center">
    <div class="w-full md:w-1/3 flex items-center justify-center rounded-xl bg-gray-100 p-4">
        <img class="w-10" src="https://em-content.zobj.net/thumbs/120/apple/325/test-tube_1f9ea.png" alt="">

        <div class="ml-4">
            <h1 class="text-xl font-medium">Work in progress</h1>
            <p class="text-sm opacity-80">We are currently working on this feature. Stay tuned!</p>
        </div>
    </div>
</div>

<div class="mt-4 p-2">
    <!-- Content -->
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
            <div in:fade class="grid grid-cols-1 md:grid-cols-5 gap-4">
                { #each products as product }
                    <ProductCard {product} />
                { /each }
            </div>
        { /if }
    { /if }
</div>