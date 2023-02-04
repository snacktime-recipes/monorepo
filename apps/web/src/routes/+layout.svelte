<script>
  import '../app.postcss';

  // Icons
  import CodiconBookmark from '~icons/codicon/bookmark';
  
  // Other modules
  import Profile from '../stores/Profile.store';
  import HeaderLinks from '../configs/HeaderLinks.const';
  import Logotype from '../components/Special/Logotype.svelte';
  import Header from '../stores/Header.store';
  import MobileLogotype from '../components/Special/MobileLogotype.svelte';
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
                <div class="flex items-center h-14 p-2 md:pr-6 rounded-full bg-gray-100 hover:bg-gray-300 hover:cursor-pointer">
                    <div style="background-image: url('https://media.istockphoto.com/id/1049869360/photo/cool-dog.jpg?s=612x612&w=0&k=20&c=J3GFEVyVxJW9JT7iAoqHTASmbKp4Zz4IleB6HP9Szho='); background-size: cover; background-position: center;" class="w-10 h-10 rounded-full bg-red-500"></div>

                    <div class="hidden md:block ml-3">
                        <h1 class="text-sm font-medium">{ $Profile.username }</h1>
                        <p class="text-xs opacity-60">{ $Profile.email }</p>
                    </div>
                </div>
            { :else }
                { #each $Header.buttons as button }
                    <a href={button.href} class="{ button.displayOnMobile == false ? "hidden md:flex" : "flex" } items-center mx-2 px-6 py-2 rounded-full { button.type == 'full' ? "bg-sky-500 hover:bg-sky-600 text-white font-medium" : "hover:bg-gray-200" } transition-all ease-in-out duration-200">
                        { #if button.icon }
                            <svelte:component this={button.icon} class="text-white h-5 w-5 mr-1" />
                        { /if }

                        <p>{ button.text }</p>
                    </a>
                { /each }
            { /if }

            <!-- Mobile-only logotype -->
            <MobileLogotype />

            <!-- Bookmarks -->
            { #if $Profile.isAuthorized }
                <button class="hidden md:flex md:ml-4 w-14 h-14 bg-gray-100 hover:bg-gray-300 transition ease-in-out duration-200 rounded-full items-center justify-center">
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
            <Logotype subtext="Lorem ipsum" />

            <p class="text-sm opacity-60 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ipsa repudiandae. Error laborum similique reiciendis!</p>
        </div>
    </div>
  </footer>
</main>