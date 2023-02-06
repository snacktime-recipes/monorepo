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
            throwError("EMPTY_EMAIL");
            return;
        } else {
            // Checking if email is valid using regexp
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]+$/)) {
                throwError("INVALID_EMAIL");
                return;
            };
        };

        // Checking if password is set
        if (password == null || password == "") {
            throwError("EMPTY_PASSWORD");
            return;
        };

        // Trying to authorize this user
        const isSuccesfull = await Profile.login(email, password);
        if (!isSuccesfull) {
            throwError("INVALID_PASSWORD_OR_EMAIL");
        };
    };

    function throwError(throwedError: ErrorType) {
        isPanicked = false;
        setTimeout(() => {
            isLoading = false;
            isPanicked = true;
            error = throwedError;
        }, 50);
    };
</script>

<SimplePageTransition />
<AuthCard 
    disableForgotPasswordField
    {fields} 
    {button} 
    {isLoading} bind:error={error} bind:isPanicked={isPanicked}
/>