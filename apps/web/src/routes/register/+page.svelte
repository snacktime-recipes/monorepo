<script lang="ts">
    // Imports
    import type { ErrorType } from '../_auth/ErrorType.enum';
    import type { InputField } from '../_auth/InputField.interface';
    import AuthCard from '../_auth/AuthCard.svelte';

    import CodiconMail from '~icons/codicon/mail';
    import CodiconLock from '~icons/codicon/lock';
    import CodiconAccount from '~icons/codicon/account';
    import SimplePageTransition from '../../components/Special/SimplePageTransition.svelte';
    import { ApplicationConfig } from '../../configs/ApplicationConfig.const';
    import Profile from '../../stores/Profile.store';

    // Variables
    const fields: Array<InputField> = [
        {
            id: 'username',
            icon: CodiconAccount,
            placeholder: 'username',
        },
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
        text: "Register",
        handler: register,
    };

    let isLoading = false;
    let isPanicked: boolean = false;
    let error: ErrorType | null = null;

    async function register(fields: Record<"username" | "email" | "password", InputField>) {
        const username = fields.username!.value;
        const email = fields.email!.value;
        const password = fields.password!.value;

        isLoading = true;
        isPanicked = false;
        error = null;

        if (username == null) {
            throwError("EMPTY_USERNAME");
            return;
        };

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
        if (password == null) {
            throwError("EMPTY_PASSWORD");
            return;
        };

        // Registering user
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');

        const response = await fetch(`${ ApplicationConfig.apiUrl }/profile/register`, {
            method: 'POST',
            credentials: 'include',
            headers,
            body: JSON.stringify({
                username: username,
                email,
                password
            }),
        });

        if (response.status == 200) {
            const json = await response.json();
            Profile._updateProfile(json);
        } else {
            // Handling error
            throwError("SERVER_ERROR");
        };

        isLoading = false;
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
    title="Welcome!" 
    subtitle='To proceed, fill out the form below and click on the "Register" button' 
    {fields} 
    {button} 
    bind:isLoading={isLoading} bind:error={error} bind:isPanicked={isPanicked}
/>