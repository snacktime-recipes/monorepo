<script lang="ts">
    import { fade } from "svelte/transition";
    import type { InputField } from "./InputField.interface";

    function handleInput(field: InputField, event: Event & { currentTarget: HTMLInputElement }) {
        // @ts-ignore
        field.value = event.target?.value;
    };

    let inputElement: HTMLInputElement;

    export let field: InputField;
    export let isLoading = false;
</script>

<button on:click={() => {
    inputElement.focus();
}} class="w-full my-4 bg-gray-100 px-4 py-4 md:py-2 rounded-xl flex items-center relative group">
    { #if isLoading }
        <div in:fade class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 cursor-not-allowed rounded-xl"></div>
    { /if }

    <svelte:component this={field.icon} class="w-6 h-6 md:w-5 md:h-5 opacity-60 mr-4 md:mr-2" />

    <input 
        on:click|preventDefault|stopPropagation 
        type={field.type} 
        placeholder={field.placeholder}
        bind:this={inputElement} 
        on:input={(event) => handleInput(field, event)} 
        class="bg-gray-100 text-lg md:text-base focus:outline-none" 
    />
</button>