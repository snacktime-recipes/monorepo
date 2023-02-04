<script lang="ts">
    // Imports
    import type { ErrorType } from '../_auth/ErrorType.enum';
    import type { InputField } from '../_auth/InputField.interface';
    import AuthCard from '../_auth/AuthCard.svelte';

    import CodiconMail from '~icons/codicon/mail';
    import CodiconLock from '~icons/codicon/lock';
    import CodiconAccount from '~icons/codicon/account';
    import SimplePageTransition from '../../components/Special/SimplePageTransition.svelte';

    // Variables
    const fields: Array<InputField> = [
        {
            type: 'text',
            icon: CodiconAccount,
            placeholder: 'username',
            serializeAs: 'username'
        },
        {
            type: 'text',
            icon: CodiconMail,
            placeholder: 'user@mail.com',
            serializeAs: 'email'
        },
        {
            type: 'text',
            icon: CodiconLock,
            placeholder: '****************',
            serializeAs: 'password'
        }
    ];

    const button = {
        text: "Register",
        handler: register,
    };

    let isPanicked: boolean = false;
    let error: ErrorType | null = null;

    function register(fields: Record<"email" | "password", InputField>) {
        const email = fields.email?.value;
        const password = fields.password?.value;

        console.log('fields:', fields);

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

        // Authorizing user
        
    };
</script>

<SimplePageTransition />
<AuthCard disableForgotPasswordField title="Welcome!" subtitle='To proceed, fill out the form below and click on the "Register" button' {fields} {button} bind:error={error} bind:isPanicked={isPanicked} />