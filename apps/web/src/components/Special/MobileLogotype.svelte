<script lang="ts">
    import { onMount } from "svelte";
    import HeaderLinks from "../../configs/HeaderLinks.const";
    import Logotype from "./Logotype.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    // Variables
    let startPos = 0,
        currentTranslate = 1000,
        isDragging = false;

    let isMenuOpened = false;

    let container: HTMLElement, card: HTMLElement;

    onMount(() => {
        // Mobile
        card.addEventListener('touchstart', touchStart);
        card.addEventListener('touchend', touchEnd);
        card.addEventListener('touchmove', touchMove);

        // Desktop
        card.addEventListener('mousedown', touchStart);
        card.addEventListener('mouseup', touchEnd);
        card.addEventListener('mouseleave', touchEnd);
        card.addEventListener('mousemove', touchMove);
    
        // Callbacks
        function touchStart(event: any) {
            isDragging = true;
            startPos = getPositionY(event);
            requestAnimationFrame(animation);
        };

        function touchEnd() {
            isDragging = false;
            if (currentTranslate >= 400) {
                // Closing
                currentTranslate = 1000;
                requestAnimationFrame(animation);
                startPos = 0;

                setTimeout(() => {
                    isMenuOpened = false;
                }, 100);
            } else {
                currentTranslate = 100;
                requestAnimationFrame(animation);
            };
        };

        function touchMove(event: any) {
            if (isDragging) {
                const currentPosition = getPositionY(event);
                currentTranslate = currentPosition - startPos + 100;
            };
        };
    });

    function animation() {
        container.style.paddingTop = `${ currentTranslate }px`;
        isDragging && requestAnimationFrame(animation);
    };

    function openMenu() {
        if (isMenuOpened) {
            // Closing
            currentTranslate = 1000;
            requestAnimationFrame(animation);
            startPos = 0;

            setTimeout(() => {
                isMenuOpened = false;
            }, 100);            
        } else {
            isMenuOpened = true;
            
            setTimeout(() => {
                currentTranslate = 100;
                requestAnimationFrame(animation);
            }, 10);
        };
    };

    // Helper functions
    function getPositionY(event: any) {
        return event.type?.includes('mouse')
            ? event.pageY
            : event.touches[0]?.clientY;
    };
</script>

<div on:click={() => {
    openMenu();
}} class="md:hidden rounded-full cursor-pointer px-4 py-2 hover:bg-gray-200">
    <Logotype />
</div>

<div bind:this={container} on:dragstart|preventDefault class="container { !isMenuOpened ? "hidden" : "" } md:hidden absolute z-50 inset-0 w-full pt-24 h-screen bg-gradient-to-t from-black transition-all ease-in-out duration-300">
    <div bind:this={card} on:dragstart|preventDefault class="card rounded-t-xl bg-white w-full h-full">
        <!-- Header -->
        <div class="py-6 flex justify-center">
            <div class="rounded-full w-1/4 h-[4px] bg-gray-200"></div>
        </div>

        <!-- Links -->
        <div class="mt-6 px-4">
            { #each HeaderLinks as link }
                { @const isCurrentPage = $page.route.id == link.href }
                
                <div on:click={() => {
                    goto(link.href);
                    openMenu();
                }} class="flex items-center py-3 px-4 my-5 cursor-pointer border-b-[2px] border-gray-200">
                    <p class="text-xl font-medium">{link.title}</p>

                    { #if isCurrentPage }
                        <div class="ml-2 rounded-xl bg-gradient-to-tr px-3 py-0.5 from-slate-300 to-gray-400">
                            <p class="text-sm text-white">You are here</p>
                        </div>
                    { /if }
                </div>
            { /each }
        </div>
    </div>
</div>

<style>
    .container {
        padding-top: 1000px;
        transition: all 0.3s ease-out;
    }
</style>