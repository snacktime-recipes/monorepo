<script lang="ts">
    // Imports
    import type { ErrorType } from '../_auth/ErrorType.enum';
    import type { InputField } from '../_auth/InputField.interface';
    import AuthCard from '../_auth/AuthCard.svelte';
    import CodiconMail from '~icons/codicon/mail';
    import CodiconLock from '~icons/codicon/lock';
    import SimplePageTransition from '../../components/Special/SimplePageTransition.svelte';
    import Profile from '../../stores/Profile.store';
    
    // Variables
    const fields: Array<InputField> = [
        {
            id: 'email',
            icon: CodiconMail,
            placeholder: 'user@mail.com',
        },
        {
            id: 'password',
            icon: CodiconLock,
            placeholder: '****************',
        }
    ];

    const button = {
        text: "Login",
        handler: login,
    };

    let isLoading = false;
    let isPanicked: boolean = false;
    let error: ErrorType | null = null;

    async function login(fields: Record<"email" | "password", InputField>) {
        const email = fields.email?.value;
        const password = fields.password?.value;

        isLoading = true;
        isPanicked = false;
        error = null;

        // Checking if email or password is empty
        if (email == null) {
            isPanicked = true;
            error = "EMPTY_EMAIL";
            return;
        } else {
            // Checking if email is valid using regexp
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]+$/)) {
                isPanicked = true;
                error = "INVALID_EMAIL";
                return;
            };
        };

        // Checking if password is set
        if (password == null) {
            isPanicked = true;
            error = "EMPTY_PASSWORD";
            return;
        };

        // Trying to authorize this user
        await Profile.login(email, password);
    };
</script>

<SimplePageTransition />
<AuthCard {fields} {button} bind:error={error} bind:isPanicked={isPanicked} />