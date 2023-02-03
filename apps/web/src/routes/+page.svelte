<script lang="ts">
    import CodiconSignIn from '~icons/codicon/sign-in'
    import CodiconBookmark from '~icons/codicon/bookmark'
    import CodiconSearch from '~icons/codicon/search'
    import CodiconWatch from '~icons/codicon/watch'
    import CodiconStarFull from '~icons/codicon/star-full'

    const links = [
        { title: "lorem 1" },
        { title: "lorem 2" },
        { title: "lorem 3" },
    ];

    const isAuthorized = true;
</script>

<main class="w-full bg-gray-100">
    <!-- Header -->
    <header class="w-full px-6 md:px-8 lg:px-12 py-6 md:py-4 flex items-center justify-between">
        <!-- Logotype + Urls (Desktop) -->
        <div class="hidden md:flex items-center justify-start">
            <h1 class="text-xl font-bold">snacktime</h1>

            <div class="ml-8">
                { #each links as link }
                    <a href="#" class="opacity-80 text-sm text-black mx-4">{ link.title }</a>
                { /each }
            </div>
        </div>

        <!-- Profile (Mobile/Desktop) -->
        <div class="flex w-full md:w-auto items-center justify-between md:justimy-start">
            { #if isAuthorized }
                <div class="flex items-center h-14 p-2 md:pr-6 rounded-full bg-white hover:bg-gray-200 hover:cursor-pointer">
                    <div style="background-image: url('https://media.istockphoto.com/id/1049869360/photo/cool-dog.jpg?s=612x612&w=0&k=20&c=J3GFEVyVxJW9JT7iAoqHTASmbKp4Zz4IleB6HP9Szho='); background-size: cover; background-position: center;" class="w-10 h-10 rounded-full bg-red-500"></div>

                    <div class="hidden md:block ml-3">
                        <h1 class="text-sm font-medium">soglacen</h1>
                        <p class="text-xs opacity-60">soglacen@gmail.com</p>
                    </div>
                </div>
            { :else }
                { #each [{ text: "Login", type: "ghost" }, { text: "Signup", type: "full", icon: CodiconSignIn }] as button }
                    <button class="hidden md:flex items-center mx-2 px-6 py-2 rounded-full { button.type == 'full' ? "bg-sky-500 hover:bg-sky-600 text-white font-medium" : "hover:bg-gray-200" } transition-all ease-in-out duration-200">
                        { #if button.icon }
                            <svelte:component this={button.icon} class="text-white h-5 w-5 mr-1" />
                        { /if }

                        <p>{ button.text }</p>
                    </button>
                { /each }

                <button class="md:hidden px-4 h-12 flex items-center justify-center rounded-full bg-sky-500">
                    <CodiconSignIn class="text-white h-6 w-6" />

                    <div class="ml-2">
                        <h1 class="text-base font-medium text-white">Login</h1>
                    </div>
                </button>
            { /if }

            <!-- Mobile-only logotype -->
            <div class="md:hidden text-center">
                <h1 class="text-2xl font-bold">snacktime</h1>
                <p class="text-xs opacity-70">Lorem, ipsum dolor.</p>
            </div>

            <!-- Bookmarks -->
            <button class="ml-4 w-14 h-14 bg-white hover:bg-gray-200 transition ease-in-out duration-200 rounded-full flex items-center justify-center">
                <CodiconBookmark class="h-6 w-6 text-black" />
            </button>
        </div>
    </header>

    <!-- Hero -->
    <section class="w-full flex flex-wrap px-2">
        <!-- Big hero card -->
        <section class="w-full lg:w-1/2 h-auto lg:h-[65vh]">
            <!-- Card header -->
            <div class="mx-2 rounded-xl px-4 py-2 bg-white flex items-center w-fit">
                <img src="https://em-content.zobj.net/thumbs/120/apple/325/rolled-up-newspaper_1f5de-fe0f.png" class="w-7 h-7" alt="">

                <p class="text-lg font-medium ml-3">News</p>
            </div>

            <!-- Card itself -->
            <div class="w-full h-full p-2">
                <div class="w-full h-full px-8 py-12 lg:py-0 flex items-center justify-start bg-gradient-to-br from-indigo-500 to-sky-400 rounded-xl shadow-xl"> 
                    <div class="w-full lg:w-2/3 text-left">
                        <h1 class="text-6xl text-white font-bold">Lorem ipsum dolor sit amet</h1>
                        <p class="text-base text-white text-opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam repellat modi praesentium beatae eos quasi quod eveniet perferendis nobis atque.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Small hero cards -->
        <section class="hidden lg:block w-1/2 h-[65vh]">
            <div class="mx-2 rounded-xl px-4 py-2 bg-white flex items-center w-fit">
                <img src="https://em-content.zobj.net/thumbs/120/apple/325/pancakes_1f95e.png" class="w-7 h-7" alt="">

                <p class="text-lg font-medium ml-3">Popular recipes</p>
            </div>

            <!-- Cards themselves -->
            <div class="w-full h-full flex flex-wrap">
                { #each [1,2,3,4] as _ }
                    <div class="w-1/2 h-1/2 p-2">
                        <div class="w-full h-full flex items-start justify-center bg-white rounded-xl shadow-xl"> 
                        <!-- Image -->
                            <div class="w-1/3 h-full rounded-l-xl" style="background-image: url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'); background-size: cover;">
                                <div class="w-full h-full rounded-l-xl bg-gradient-to-r from-black to-transparent opacity-40"></div>
                            </div>

                            <!-- Texts -->
                            <div class="w-2/3 p-8">
                                <!-- Tags and popularity -->
                                <div class="flex items-stretch gap-2">
                                    <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-r from-yellow-300 to-amber-400">
                                        <CodiconStarFull class="w-4 h-4 text-white mr-1" />
                                        
                                        <p class="text-white text-xs">4.5</p>
                                    </div>
                                </div>

                                <h1 class="mt-1 text-xl font-medium">Lorem ipsum dolor sit.</h1>
                                <p class="text-sm text-black text-opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nemo.</p>
                            </div>
                        </div>
                    </div>
                { /each }
            </div>
        </section>
    </section>

    <!-- Content -->
    <section class="w-full mt-24 px-4">
        <!-- Search bar (desktop-only) -->
        <div class="w-full flex items-stretch justify-between">
            <!-- Search -->
            <div class="rounded-full bg-white px-6 py-3 w-full lg:w-2/3 flex items-center">
                <CodiconSearch class="w-5 h-5 text-black text-opacity-70 mr-3" />
                
                <input class="w-full" type="text" placeholder="Search...">
            </div>
        </div>

        <!-- Recipes -->
        <div class="mt-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            { #each [1,2,3,4,5,6,7,8] as _ }
                <div class="flex-1 rounded-xl bg-white p-4">
                    <!-- Image -->
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" alt="" class="rounded-xl">

                    <!-- Text -->
                    <div class="my-4">
                        <h1 class="text-xl font-bold">Lorem ipsum dolor sit.</h1>
                        <p class="text-sm md:text-xs opacity-60">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, delectus.</p>
                    </div>

                    <!-- Buttons -->
                    <div class="flex flex-col md:flex-row items-stretch gap-2">
                        <!-- Add to favouries -->
                        <button class="w-full md:w-1/2 py-2 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center">
                            <CodiconBookmark class="text-white w-5 h-5" />

                            <p class="text-white text-sm ml-1">Bookmark</p>
                        </button>

                        <!-- Time to prepare -->
                        <div class="w-full md:w-1/2 flex items-center justify-center opacity-60">
                            <CodiconWatch class="text-black w-5 h-5" />

                            <p class="text-sm ml-1">15 minutes</p>
                        </div>
                    </div>
                </div>
            { /each }
        </div>
    </section>

    <!-- Footer -->
    <footer class="pt-12 w-full pb-8 px-4">
        <!-- Divider -->
        <div class="my-12 w-full h-[3px] rounded-full bg-gray-200"></div>

        <!-- Content -->
        <div class="w-full flex items-center justify-between">
            <!-- Company information -->
            <div class="w-1/3">
                <h1 class="text-xl font-bold">snacktime</h1>
                <p class="text-sm opacity-60">Lorem, ipsum dolor.</p>

                <p class="text-sm opacity-60 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ipsa repudiandae. Error laborum similique reiciendis!</p>
            
                <!-- Social links -->
                <div class="mt-4 flex gap-8 items-center">
                    { #each links as link }
                        <a href="#" class="opacity-80 text-base text-black">{ link.title }</a>
                    { /each }
                </div>
            </div>

            <!-- More links -->
            <div class="w-2/3">

            </div>
        </div>
    </footer>
</main>