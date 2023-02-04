<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let isDisplayed = true;

    onMount(() => {
        setTimeout(() => {
            isDisplayed = false;
        }, 150);
    });
</script>

{ #if isDisplayed }
    <div out:fade class="absolute z-50 bg-gray-100 w-full h-screen"></div>
{ /if }