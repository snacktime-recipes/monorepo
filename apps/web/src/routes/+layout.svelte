<script>
  import '../app.postcss';

  // Icons
  import CodiconBookmark from '~icons/codicon/bookmark';
  
  // Other modules
  import { onMount } from 'svelte';
  import Profile from '../stores/Profile.store';
  import HeaderLinks from '../configs/HeaderLinks.const';
  import Logotype from '../components/Special/Logotype.svelte';
  import Header from '../stores/Header.store';
  import MobileLogotype from '../components/Special/MobileLogotype.svelte';
  import MobileProfile from '../components/Special/MobileProfile.svelte';
  import TextPlaceholder from '../components/Loaders/TextPlaceholder.svelte';
  import { fade } from 'svelte/transition';
  import DesktopProfile from '../components/Special/DesktopProfile.svelte';

  onMount(() => {
    Profile.initialize();
  });
</script>

<main class='w-full bg-gray-100'>
  <!-- Header -->
  <header class="w-full md:px-4">
    <div class="bg-white w-full flex items-center justify-between md:rounded-b-xl px-6 md:px-8 lg:px-12 py-4">
        <!-- Logotype + Urls (Desktop) -->
        <div class="hidden md:flex items-center justify-start">
            <Logotype href="/" />

            <div class="ml-8">
                { #each HeaderLinks as link }
                    <a href={link.href} class="opacity-80 text-sm text-black mx-4">{ link.title }</a>
                { /each }
            </div>
        </div>

        <!-- Profile (Mobile/Desktop) -->
        <div class="flex w-full md:w-auto items-center justify-between flex-row-reverse md:flex-row md:justimy-start">
            { #if $Profile.isAuthorized }
                <!-- Desktop-only -->
                <DesktopProfile />

                <!-- Mobile-only -->
                <MobileProfile />
            { :else }
                { #if $Profile.isLoaded }
                    { #each $Header.buttons as button }
                        <a href={button.href} class="{ button.displayOnMobile == false ? "hidden md:flex" : "flex" } items-center my-2 mx-2 px-6 py-2 rounded-full { button.type == 'full' ? "bg-sky-500 hover:bg-sky-600 text-white font-medium" : "hover:bg-gray-200" } transition-all ease-in-out duration-200">
                            { #if button.icon }
                                <svelte:component this={button.icon} class="text-white h-5 w-5 mr-1" />
                            { /if }

                            <p>{ button.text }</p>
                        </a>
                    { /each }
                { :else }
                    <div class="flex items-center md:py-2">
                        <TextPlaceholder class="w-12 h-12 md:w-10 md:h-10" />

                        <div class="ml-3 hidden md:block">
                            <TextPlaceholder class="h-5 w-full" />

                            <div class="flex items-center justify-start mt-1">
                                <TextPlaceholder class="h-4 w-12" />
                                <TextPlaceholder class="h-4 w-24 ml-3" />
                            </div>
                        </div>
                    </div>
                { /if }
            { /if }

            <!-- Mobile-only logotype -->
            <MobileLogotype />

            <!-- Bookmarks -->
            { #if $Profile.isAuthorized }
                <button in:fade class="hidden md:flex md:ml-4 w-14 h-14 bg-gray-100 hover:bg-gray-300 transition ease-in-out duration-200 rounded-full items-center justify-center">
                    <CodiconBookmark class="h-6 w-6 text-black" />
                </button>
            { /if }
        </div>
    </div>
  </header>

  <!-- Content -->
  <section class="mt-6">
    <slot />
  </section>

  <!-- Footer -->
  <footer class="pt-12 w-full pb-8 px-4">
    <!-- Divider -->
    <div class="my-12 w-full h-[3px] rounded-full bg-gray-200"></div>

    <!-- Content -->
    <div class="w-full flex flex-col md:flex-row items-center justify-between">
        <!-- Company information -->
        <div class="w-2/3 md:w-1/3 text-center md:text-left">
            <Logotype class="justify-center md:justify-start" subtext="Lorem ipsum" />

            <p class="text-sm opacity-60 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ipsa repudiandae. Error laborum similique reiciendis!</p>
        </div>
    </div>
  </footer>
</main>