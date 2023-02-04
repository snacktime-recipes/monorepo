<script lang="ts">
    // Imports
    import CodiconBookmark from '~icons/codicon/bookmark';
    import CodiconSearch from '~icons/codicon/search';
    import CodiconWatch from '~icons/codicon/watch';
    import CodiconHeart from '~icons/codicon/heart';

    import secondsToTime from '../helpers/secondsToTime';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>snacktime</title>
</svelte:head>

<!-- Hero -->
<section class="w-full flex flex-wrap md:px-2">
    <!-- Big hero card -->
    <section class="w-full lg:w-1/2 h-auto lg:h-[65vh]">
        <!-- Card header -->
        <div class="ml-2 rounded-xl px-4 py-2 bg-white flex items-center w-fit">
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
    <section class="w-full md:w-1/2 h-[70vh] md:h-[65vh] mt-16 md:mt-0 overflow-hidden md:overflow-visible">
        <div class="ml-2 rounded-xl px-4 py-2 bg-white flex items-center w-fit">
            <img src="https://em-content.zobj.net/thumbs/120/apple/325/pancakes_1f95e.png" class="w-7 h-7" alt="">

            <p class="text-lg font-medium ml-3">Popular recipes</p>
        </div>

        <!-- Cards themselves -->
        <div class="w-full h-full scroll-smooth snap-always snap-x snap-mandatory box-content overflow-x-scroll md:overflow-visible">
            <div class="w-[200vh] pb-20 md:pb-0 md:w-full h-full flex flex-nowrap md:flex-wrap items-stretch">
                { #each [1,2,3,4] as _ }
                    <div class="snap-center w-full h-full md:w-1/2 md:h-1/2 p-2">
                        <div class="w-full h-full flex flex-col md:flex-row items-start justify-start md:justify-center bg-white rounded-xl shadow-xl"> 
                            <!-- Image -->
                            <div class="w-full h-full md:w-1/3 rounded-xl md:rounded-l-xl" style="background-image: url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'); background-size: cover;">
                                <div class="hidden md:block w-full h-full rounded-l-xl bg-gradient-to-r from-black to-transparent opacity-40"></div>
                            </div>

                            <!-- Texts -->
                            <div class="w-2/3 p-8">
                                <!-- Tags and popularity -->
                                <div class="flex items-stretch gap-2">
                                    <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-r from-yellow-300 to-amber-400">
                                        <CodiconHeart class="w-4 h-4 text-white mr-1" />
                                        
                                        <p class="text-white text-xs">Лайков: 1к</p>
                                    </div>
                                </div>

                                <h1 class="mt-1 text-xl font-medium">Lorem ipsum dolor sit.</h1>
                                <p class="text-sm text-black text-opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nemo.</p>
                            </div>
                        </div>
                    </div>
                { /each }
            </div>
        </div>
    </section>
</section>

<!-- Content -->
<section class="w-full mt-10 md:mt-24 px-4">
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
        { #each data.data as dish }
            { @const cookingTime = secondsToTime(dish.meta.cookingTime) }

            <div class="flex-1 rounded-xl bg-white p-4">
                <!-- Image -->
                <img src="{ dish.imageUrl }" alt="" class="rounded-xl">

                <!-- Tags (todo) -->
                <div class="flex flex-wrap gap-2 my-4 opacity-80">
                    <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-r from-yellow-300 to-amber-400">
                        <CodiconHeart class="w-4 h-4 text-white mr-1" />
                        
                        <p class="text-white text-xs">{ dish.likes }</p>
                    </div>

                    { #if dish.meta.doRecipeExists }
                        <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-br from-slate-400 to-gray-300">
                            <p class="text-white text-xs">{ dish.meta.productsCount } ingredients</p>
                        </div>
                    { /if }
                </div>

                <!-- Text -->
                <div class="my-4">
                    <h1 class="text-xl font-bold">{ dish.name }</h1>
                    <p class="hidden md:block text-sm md:text-xs opacity-60">{ dish.description ?? "Empty description" }</p>
                </div>

                <!-- Buttons -->
                <div class="flex flex-col md:flex-row items-stretch gap-2">
                    <!-- Add to favouries -->
                    <button class="w-full md:w-1/2 py-2 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center">
                        <CodiconBookmark class="text-white w-5 h-5" />

                        <p class="text-white text-sm ml-1">Bookmark</p>
                    </button>

                    <!-- Time to prepare -->
                    { #if dish.meta.doRecipeExists }
                        <div class="w-full md:w-1/2 flex items-center justify-center opacity-60">
                            <CodiconWatch class="text-black w-5 h-5" />

                            <p class="text-sm ml-1">{ cookingTime.hours > 0 ? cookingTime.hours + "h" : "" }{ cookingTime.minutes + "m" }</p>
                        </div>
                    { /if }
                </div>
            </div>
        { /each }
    </div>
</section>