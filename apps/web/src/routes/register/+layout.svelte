<script lang="ts">
    import { onMount } from "svelte";
    import Profile from '../../stores/Profile.store';
    import { goto } from '$app/navigation';

    onMount(() => {
        if ($Profile.isAuthorized) {
            goto('/');
        };
    });
</script>

<slot />