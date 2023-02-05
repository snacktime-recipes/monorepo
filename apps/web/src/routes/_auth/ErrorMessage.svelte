<script lang="ts">
    import { slide } from "svelte/transition";
    import { onMount, onDestroy } from "svelte";
    import { ErrorMessages } from "./ErrorMessages.const";
    import type { ErrorType } from "./ErrorType.enum";

    // Variables
    let interval: any;
    const maxAutoDeleteTime = 8;
    let autoDeleteTime = maxAutoDeleteTime;

    $: angle = 360 * ((maxAutoDeleteTime - autoDeleteTime)/maxAutoDeleteTime);
    
    // Adapt the logic according to the approach
    $: background = `
        radial-gradient(transparent 50%, transparent 50%),
        conic-gradient(transparent 0deg ${angle}deg, #fff ${angle}deg 360deg)`;
    
    $: cssVarStyles = `--background:${background}`

    onMount(() => {
        interval = setInterval(() => {
            autoDeleteTime--;
            
            if (autoDeleteTime <= 0) {
                isPanicked = false;
            };
        }, 1000);
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });

    export let error: ErrorType;
    export let isPanicked: boolean;
</script>

<button on:click={() => {
    isPanicked = false;
}} in:slide out:slide class="w-full flex items-center justify-between mb-6 rounded-xl px-5 py-3 bg-red-400 opacity-80">
    <p class="text-white">
        { error ? ErrorMessages[error] : "Unknown error" }
    </p>

    <!-- Auto-delete circle -->    
    <div id="progress-circle" class="w-10 h-10 flex items-center justify-center rounded-full" style="{cssVarStyles}">
        <div class="w-8 h-8 flex items-center justify-center rounded-full bg-red-400">
            <p class="text-sm text-white">{autoDeleteTime}</p>
        </div>
    </div>
</button>

<style>
    #progress-circle {
        background: var(--background);
        transition: all 500ms ease-in;
    }
</style>