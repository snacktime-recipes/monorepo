<script lang="ts">
    // Imports
    import CodiconHeart from '~icons/codicon/heart';
    import SearchableDishes from '../components/Lists/SearchableDishes.svelte';
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
    <SearchableDishes />
</section>