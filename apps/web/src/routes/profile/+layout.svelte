<script lang='ts'>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Circle from "../../components/Loaders/Circle.svelte";
    import { ProfileSections } from "../../configs/ProfileSections.const";
    import Profile, { type AuthorizedProfile } from "../../stores/Profile.store";
    import { page } from '$app/stores';
    import CodiconSignOut from '~icons/codicon/sign-out';

    $: profile = $Profile as AuthorizedProfile;
    $: currentSection = ProfileSections.find((x) => x.matches.test($page.route.id ?? ""));

    // Redirecting user to login page if unauthorized
    onMount(() => {
        const unsubscribe = Profile.subscribe((object) => {
            if (!object.isLoaded) return;
            if (!object.isAuthorized) {
                unsubscribe();
                goto("/login");
            };
        });
    });
</script>

<section class="w-full min-h-[100vh] p-4">
    <div class="w-full h-full bg-white rounded-xl p-4">
        { #if !$Profile.isLoaded || !$Profile.isAuthorized }
            <div class="w-full min-h-[100vh] flex items-center justify-center">
                <Circle size="40" />
            </div>
        { :else }
            <!-- Card header -->
            <div class="hidden md:block w-full p-2">
                <!-- Account information -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span style="background-image: url('{ profile.avatar }'); background-size: cover;" class="w-20 h-20 rounded-full border-4 border-white ring-2 ring-gray-200"></span>
                    
                        <div class="ml-4">
                            <h1 class="text-xl font-medium">{ profile.username }</h1>
                            <p class="text-sm opacity-80">{ profile.email }</p>
                        </div>
                    </div>

                    <!-- Logout buttons -->
                    <button on:click={() => {
                        Profile.logout();
                    }} class="flex items-center my-2 mx-2 px-6 py-2 rounded-full bg-red-500 hover:bg-red-700 text-white font-medium transition duration-200">
                        <CodiconSignOut class="w-5 h-5" />

                        <p class="ml-2">Logout</p>
                    </button>
                </div>

                <!-- Sections -->
                <div class="mt-4 w-full flex items-center justify-start bg-gray-100 rounded-xl p-2">
                    { #each ProfileSections as section }
                        { @const isCurrentSection = currentSection == section }

                        <a href={section.href} class="{ isCurrentSection ? "bg-white" : "" } px-6 mx-2 py-2 hover:bg-gray-200 transition duration-100 rounded-xl cursor-pointer">
                            <p class="text-md font-medium">{ section.title }</p>
                        </a>
                    { /each }
                </div>
            </div>

            <!-- Mobile sections -->
            <div class="w-full md:hidden p-2">
                { #if currentSection }
                    <div class="w-full rounded-xl bg-gray-100 p-4 flex items-center">
                        <div style="{ `background: linear-gradient(45deg, ${ currentSection.gradient?.from ?? "#38bdf8" } 0%, ${ currentSection.gradient?.to ?? "#6366f1" } 100%);` }" class="p-3 rounded-xl">
                            <svelte:component this={currentSection.icon} class="w-7 h-7 text-white" />
                        </div>

                        <div class="ml-4">
                            <h1 class="text-xl font-medium">{ currentSection.title }</h1>
                            <p class="text-sm opacity-80">{ currentSection.description }</p>
                        </div>
                    </div>
                { /if }
            </div>

            <!-- Card contents -->
            <div>
                <slot />
            </div>
        { /if }
    </div> 
</section>