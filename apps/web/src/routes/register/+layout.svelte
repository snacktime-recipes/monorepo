<script lang="ts">
    import { onMount } from "svelte";
    import Profile from '../../stores/Profile.store';
    import { goto } from '$app/navigation';
    import Circle from "../../components/Loaders/Circle.svelte";

    // Variables
    let isLoading = true;

    onMount(() => {
        Profile.subscribe((object) => {
            if (object.isLoaded) {
                if (object.isAuthorized) {
                    goto('/');
                } else {
                    isLoading = false;
                };
            }
        });
    });
</script>

<svelte:head>
    <title>snacktime - register</title>
</svelte:head>

{ #if isLoading }
    <div class="w-full h-[65vh] flex items-center justify-center">
        <Circle size="30" />
    </div>
{ :else }
    <slot />
{ /if }