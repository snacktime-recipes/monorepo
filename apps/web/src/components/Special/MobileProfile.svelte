<script lang="ts">
    import { onMount } from "svelte";
    import Profile from '../../stores/Profile.store';
    import ProfileLinks from "../../configs/ProfileLinks.const";
    import { goto } from "$app/navigation";
    import type { AuthorizedProfile } from "../../stores/Profile.store";

    // Variables
    $: profile = $Profile as AuthorizedProfile;

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
                toggleMenu();
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

    function toggleMenu() {
        if (isMenuOpened) {
            // Closing
            currentTranslate = 1000;
            requestAnimationFrame(animation);
            startPos = 0;

            // Removing overflow: hidden and overscroll-behaivor: containt to
            // body
            const body = getBody();
            if (!body) return;

            body.style.overflow = "auto";
            body.style.overscrollBehavior = "auto";

            setTimeout(() => {
                isMenuOpened = false;
            }, 100);            
        } else {
            isMenuOpened = true;

            // Adding overflow: hidden and overscroll-behaivor: containt to
            // body
            const body = getBody();
            if (!body) return;

            body.style.overflow = "hidden";
            body.style.overscrollBehavior = "contain";

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

    function getBody() {
        return document.getElementById('body');
    };
</script>

<div on:click={() => {
    toggleMenu();
}} class="md:hidden rounded-full cursor-pointer active:bg-gray-200">
    <div style="background-image: url('{ profile.avatar }'); background-size: cover; background-position: center;" class="w-12 h-12 rounded-full bg-red-500"></div>
</div>

<svelte:body class="bg-red-500" />

<div bind:this={container} on:dragstart|preventDefault class="container { !isMenuOpened ? "hidden" : "" } md:hidden absolute z-50 inset-0 w-full pt-24 h-screen bg-gradient-to-t from-black transition-all ease-in-out duration-300">
    <div bind:this={card} on:dragstart|preventDefault class="card rounded-t-xl bg-white w-full h-full">
        <!-- Header -->
        <div class="py-6 flex justify-center">
            <div class="rounded-full w-1/4 h-[4px] bg-gray-200"></div>
        </div>

        <!-- Profile info -->
        <div class="flex items-center justify-between px-6">
            <div class="flex items-start">
                <!-- Logotype -->
                <div style="background-image: url('https://media.istockphoto.com/id/1049869360/photo/cool-dog.jpg?s=612x612&w=0&k=20&c=J3GFEVyVxJW9JT7iAoqHTASmbKp4Zz4IleB6HP9Szho='); background-size: cover; background-position: center;" class="w-14 h-14 rounded-full bg-red-500"></div>

                <!-- Texts -->
                <div class="ml-4">
                    <h1 class="text-2xl font-medium">{ profile.username }</h1>
                    <p class="text-sm opacity-80">{ profile.email }</p>
                </div>
            </div>

            <!-- Logout -->
            <button on:click={() => {
                toggleMenu();
                Profile.logout();
            }} class="flex items-center px-6 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all ease-in-out duration-200">
                <p>Logout</p>
            </button>
        </div>

        <!-- Links -->
        <div class="mt-8 px-6">
            { #each ProfileLinks as link }
                { #if !link.isDesktopOnly }
                    <button on:click={() => {
                        if (link.action) {
                            link.action();
                        } else if (link.href) {
                            toggleMenu();
                            goto(link.href);
                        };
                    }} class="w-full flex items-center border-4 border-gray-100 rounded-xl my-2 p-4">
                        <!-- Icon -->
                        <div style="{ `background: linear-gradient(45deg, ${ link.gradient?.from ?? "#38bdf8" } 0%, ${ link.gradient?.to ?? "#6366f1" } 100%);` }" class="p-2 rounded-xl">
                            <svelte:component this={link.icon} class="w-6 h-6 text-white" />
                        </div>

                        <!-- Texts -->
                        <div class="ml-4 text-left">
                            <h1 class="text-xl font-medium">{ link.title }</h1>
                            <p class="text-xs opacity-60">{ link.subtitle }</p>
                        </div>
                    </button>
                { /if }
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