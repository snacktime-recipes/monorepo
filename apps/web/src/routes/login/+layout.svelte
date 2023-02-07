<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Profile from '../../stores/Profile.store';
    import { goto } from '$app/navigation';
    import CodiconSignIn from '~icons/codicon/sign-in';
    import Header from '../../stores/Header.store';
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

{ #if isLoading }
    <div class="w-full h-[65vh] flex items-center justify-center">
        <Circle size="30" />
    </div>
{ :else }
    <slot />
{ /if }