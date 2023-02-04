<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Profile from '../../stores/Profile.store';
    import { goto } from '$app/navigation';
    import CodiconSignIn from '~icons/codicon/sign-in';
    import Header from '../../stores/Header.store';

    onMount(() => {
        if ($Profile.isAuthorized) {
            goto('/');
            return;
        };

        Header.updateButtons([
            {
                text: 'Signup',
                type: 'full',
                href: '/register',
                icon: CodiconSignIn,
            },    
            {
                text: 'Login',
                type: 'ghost',
                href: '/login',

                displayOnMobile: false,
            }
        ]);
    });

    onDestroy(() => {
        Header.resetButtons();
    });
</script>

<svelte:head>
    <title>snacktime - login</title>
</svelte:head>

<slot />