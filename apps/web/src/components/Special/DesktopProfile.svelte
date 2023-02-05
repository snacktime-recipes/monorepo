<script lang="ts">
    import {
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        Transition
    } from "@rgossiaux/svelte-headlessui";

    $: profile = $Profile as AuthorizedProfile;

    import ProfileLinks from "../../configs/ProfileLinks.const";
    import Profile from "../../stores/Profile.store";
    import type { AuthorizedProfile } from "../../stores/Profile.store";
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";
</script>

<div class="z-50 relative hidden md:block">
    <Menu>
        <MenuButton>
            <div in:fade class="hidden md:flex items-center h-14 p-2 md:pr-6 rounded-full bg-gray-100 hover:bg-gray-300 hover:cursor-pointer">
                <div style="background-image: url('https://media.istockphoto.com/id/1049869360/photo/cool-dog.jpg?s=612x612&w=0&k=20&c=J3GFEVyVxJW9JT7iAoqHTASmbKp4Zz4IleB6HP9Szho='); background-size: cover; background-position: center;" class="w-10 h-10 rounded-full bg-red-500"></div>

                <div class="ml-3 text-left">
                    <h1 class="text-sm font-medium">{ profile.username }</h1>
                    <p class="text-xs opacity-60">{ profile.email }</p>
                </div>
            </div>
        </MenuButton>
        <MenuItems class="absolute right-0 w-64 mt-2 bg-gray-100 border border-gray-200 divide-y shadow-2xl rounded-xl overflow-hidden">
            { #each ProfileLinks as link }
                <button on:click={() => {
                    if (link.action) {
                        link.action();
                    } else if (link.href) {
                        goto(link.href);
                    };
                }} class="w-full flex items-center justify-start p-4 hover:bg-gray-200">
                    <!-- Icon -->
                    <svelte:component this={link.icon} style="color: { link.gradient?.from ?? link.background }" class="opacity-80 w-5 h-5" />

                    <!-- Texts -->
                    <h1 class="ml-2 text-sm font-medium">{ link.title }</h1>
                </button>
            { /each }        
        </MenuItems>
    </Menu>
</div>