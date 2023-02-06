<script lang="ts">
    import type { ProfileProduct } from "$types";
    import { onMount, onDestroy } from "svelte";
  import { slide } from "svelte/transition";
    import CodiconAdd from '~icons/codicon/add';
    import CodiconChromeMinimize from '~icons/codicon/chrome-minimize'
    import { ApplicationConfig } from "../../../../configs/ApplicationConfig.const";

    $: if (modifyingTimer <= 0) {
        // Sending update request
        if (updatedQuantity && updatedQuantity != product.count) {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', '*/*');
            
            fetch(`${ApplicationConfig.apiUrl}/profile/products/${product.id}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    count: updatedQuantity
                })
            })
            .then((response) => response.json())
            .catch((error) => {
                console.log("error while updating product count:", error);
            });
        };
    };

    let interval: NodeJS.Timer;
    let modifyingTimer = 0;
    let updatedQuantity: number | null;

    let isDrawerOpened = false;

    function addOne() {
        modifyingTimer = 1;

        if (!updatedQuantity) updatedQuantity = product.count;
        updatedQuantity += 1;
    };

    function removeOne() {
        modifyingTimer = 1;
        
        if (!updatedQuantity) updatedQuantity = product.count;
        if (updatedQuantity > 0) updatedQuantity -= 1;
    };

    onMount(() => {
        interval = setInterval(() => {
            if (modifyingTimer >= 1) modifyingTimer--;
        }, 1000);
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });

    export let product: ProfileProduct;
</script>

<div class="flex-1">
    <div on:click={() => {
        isDrawerOpened = !isDrawerOpened;
    }} class="{ isDrawerOpened ? "rounded-t-xl" : "rounded-xl" } md:rounded-xl flex-1 p-4 flex bg-gray-100 relative">
        <!-- Image -->
        <img src="{ product.imageUrl }" class="w-20 h-20 md:w-24 md:h-24 rounded-xl" alt="">

        <!-- Name -->
        <div class="w-full flex flex-1 items-center justify-between">
            <div class="w-2/3 md:w-full ml-4 flex flex-col  ">
                <h1 class="text-lg font-medium">{ product.name }</h1>
                <p class="md:hidden text-md opacity-80">{ product.description ?? "Empty description. It must be something cool then!" }</p>
            
                <div class="hidden rounded-full md:flex items-center p-2 bg-white">
                    <button on:click={() => {
                        removeOne();
                    }} class="p-2 rounded-full bg-red-500">
                        <CodiconChromeMinimize class="text-white w-4 h-4" />
                    </button>

                    <h1 class="mx-3 text-md font-medium">{ updatedQuantity ?? product.count }</h1>

                    <button on:click={() => {
                        addOne();
                    }} class="p-2 rounded-full bg-green-500">
                        <CodiconAdd class="text-white w-4 h-4" />
                    </button>
                </div>
            </div>

            <!-- Item count (mobile-only) -->
            <div class="w-16 h-16 md:hidden rounded-full bg-gray-200 flex items-center justify-center">
                <h1 class="text-md font-medium">{ updatedQuantity ?? product.count }</h1>
            </div>
        </div>
    </div>

    <!-- Add or Remove (Mobile-only) -->
    { #if isDrawerOpened }
        <div in:slide out:slide class="w-full flex md:hidden items-stretch">
            <!-- Remove -->
            <button on:click={() => removeOne()} class="w-1/2 bg-red-500 active:bg-red-700 rounded-bl-xl py-4 flex items-center justify-center">
                <CodiconChromeMinimize class="text-white w-4 h-4" />
            </button>

            <!-- Add -->
            <button on:click={() => addOne()} class="w-1/2 bg-green-500 active:bg-green-700 rounded-br-xl py-4 flex items-center justify-center">
                <CodiconAdd class="text-white w-4 h-4" />
            </button>
        </div>
    { /if }
</div>