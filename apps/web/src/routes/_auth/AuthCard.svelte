<script lang="ts">
    // Imports
    import type { ErrorType } from "./ErrorType.enum";
    import type { InputField } from "./InputField.interface";

    import LogosGoogleIcon from '~icons/logos/google-icon';
    import LogosTwitter from '~icons/logos/twitter';
    import LogosDiscordIcon from '~icons/logos/discord-icon';
    import LogosFacebook from '~icons/logos/facebook';
  import { ErrorMessages } from "./ErrorMessages.const";

    $: serializedFields = () => {
        const serialized: Record<string, InputField> = {};

        fields.forEach((field) => {
            serialized[field.serializeAs] = field;
        });

        return serialized;
    };

    // Theme info
    export let disableForgotPasswordField = false;
    export let title: string = "Welcome back";
    export let subtitle: string = "To proceed, you'll need to authorize into your account";

    // Two-way bindable error info
    export let isPanicked: boolean;
    export let error: ErrorType | null;

    // Technical info
    export let fields: Array<InputField> = [];
    export let button: {
        text: string,
        handler: (fields: Record<string, InputField>) => void,
    } | null = null;
    export let disableSocialLogin = false;
</script>

<div class="w-full md:py-6 flex items-center justify-center">
    <div class="w-full md:w-1/3 rounded-xl bg-white px-6 py-12">
        <!-- Error (if exists) -->
        { #if isPanicked }
            <div class="mb-6 rounded-xl px-5 py-3 bg-red-500 bg-opacity-80">
                <p class="text-white">
                    { error ? ErrorMessages[error] : "Unknown error" }
                </p>
            </div>
        { /if }

        <!-- Texts -->
        <div class="text-center px-6">
            <h1 class="text-2xl font-medium">{ title }</h1>
            <p class="text-sm opacity-70">{ subtitle }</p>
        </div>

        <!-- Input -->
        <div class="my-8">
            { #each fields as field }
                <div class="my-4 bg-gray-100 px-4 py-4 md:py-2 rounded-xl flex items-center">
                    <svelte:component this={field.icon} class="w-6 h-6 md:w-5 md:h-5 opacity-60 mr-4 md:mr-2" />

                    <input bind:value={field.value} class="bg-gray-100 text-lg md:text-base" placeholder={field.placeholder}>
                </div>
            { /each }

            <!-- Forgot password links -->
            { #if !disableForgotPasswordField }
                <div class="flex items-center justify-end px-2">
                    <a href="/forgot-password" class="text-md md:text-sm opacity-70 underline">Forgot password?</a>
                </div>
            { /if }
        </div>

        <!-- Buttons -->
        { #if button }
            <button on:click={() => button?.handler(serializedFields())} class="w-full py-4 md:py-2 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center">
                <p class="text-white text-lg md:text-base ml-1">{ button.text }</p>
            </button>
        { /if }

        { #if !disableSocialLogin }
            <!-- Or Social Login -->
            <div class="my-6 flex items-center">
                <div class="w-full h-1 rounded-full bg-gray-100"></div>
                <p class="mx-4 whitespace-nowrap text-md opacity-50">or use</p>
                <div class="w-full h-1 rounded-full bg-gray-100"></div>
            </div>

            <div class="grid grid-cols-2 gap-5 md:gap-3 items-stretch">
                { #each [
                    {
                        title: "Google",
                        icon: LogosGoogleIcon,
                    },
                    {
                        title: "Facebook",
                        icon: LogosFacebook,
                    },
                    {
                        title: "Twitter",
                        icon: LogosTwitter,
                    },
                    {
                        title: "Discord",
                        icon: LogosDiscordIcon,
                    },
                ] as link }
                    <div class="flex-1 rounded-xl bg-gray-100 px-4 py-4 md:py-3 flex items-center">
                        <svelte:component this={link.icon} class="w-7 h-7 md:w-5 md:h-5" />

                        <p class="text-lg md:text-md opacity-70 ml-4 md:ml-2">{link.title}</p>
                    </div>
                { /each }
            </div>
        { /if }

        <!-- Disclaimer -->
        <p class="text-center text-sm mt-10 opacity-60">By clicking <span class="underline">"Login"</span> or <span class="underline">"Register"</span> buttons you confirm that you have read and agree with our <a href="/help/tou" class="underline">Terms of Use</a></p>
    </div>
</div>