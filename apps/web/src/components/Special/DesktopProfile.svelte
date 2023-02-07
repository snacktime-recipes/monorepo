<script lang="ts">
    import {
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        Transition
    } from "@rgossiaux/svelte-headlessui";

    $: profile = $Profile as AuthorizedProfile;

    let isOpened = false;

    import ProfileLinks from "../../configs/ProfileLinks.const";
    import Profile from "../../stores/Profile.store";
    import type { AuthorizedProfile } from "../../stores/Profile.store";
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";
</script>

<div class="z-50 relative hidden md:flex items-center">
    <Menu>
        <MenuButton on:click={() => isOpened = !isOpened }>
            <div in:fade class="hidden md:flex w-14 h-14 rounded-full" style="background-image: url('{ profile.avatar }'); background-size: cover; background-position: center;"></div>
        </MenuButton>

        { #if isOpened }
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <MenuItems static class="absolute right-0 w-64 mt-2 bg-white border border-gray-200 divide-y shadow-2xl rounded-xl overflow-hidden">
                    <!-- Profile info -->
                    <div class="flex items-center p-2 py-4">
                        <div style="background-image: url('{ profile.avatar }'); background-size: cover; background-position: center;" class="w-10 h-10 rounded-full bg-red-500"></div>

                        <div class="ml-3 text-left">
                            <h1 class="text-sm font-medium">{ profile.username }</h1>
                            <p class="text-xs opacity-60">{ profile.email }</p>
                        </div>
                    </div>

                    <!-- Links -->
                    { #each ProfileLinks as link }
                        <button on:click={() => {
                            isOpened = false;

                            if (link.action) {
                                link.action();
                            } else if (link.href) {
                                goto(link.href);
                            };
                        }} class="w-full flex items-center justify-start p-4 hover:bg-gray-100 transition duration-100">
                            <!-- Icon -->
                            <svelte:component this={link.icon} style="color: { link.gradient?.from ?? link.background }" class="opacity-80 w-5 h-5" />

                            <!-- Texts -->
                            <h1 class="ml-2 text-sm font-medium">{ link.title }</h1>
                        </button>
                    { /each }        
                </MenuItems>
            </Transition>
        { /if }
    </Menu>
</div>