<script lang="ts">
    import Logotype from './Logotype.svelte';
    import { ApplicationConfig } from '../../configs/ApplicationConfig.const';

    export let href: string | null = null;
    export let subtext: string | null = null;
    export let centeredSubtext: boolean = false;
    export let centered: boolean = false;

    export let withIcon: string | boolean = true;

    let classNames: string = "";
    export { classNames as class };
    export let subtextClasses: string = "text-sm";
</script>

{ #if subtext != null }
    <svelte:element this={ href == null ? "div" : "a" } {href} class="{ subtextClasses } { centeredSubtext ? "text-center" : null }">
        <Logotype {centered} class={classNames} />
        
        <p class="opacity-60">{subtext}</p>
    </svelte:element>
{ :else }
    <svelte:element this={ href == null ? "span" : "a" } {href} class="{ centered ? "justify-center" : "" } flex items-center { classNames }">
        { #if withIcon }
            <img src={ typeof withIcon == "string" ? withIcon : ApplicationConfig.theme.logo} class="h-6" alt="">
        { /if }

        <h1 class="text-xl font-bold ml-2">snacktime</h1>
    </svelte:element>
{ /if }
