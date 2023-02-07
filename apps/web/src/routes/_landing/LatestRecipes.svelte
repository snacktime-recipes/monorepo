<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import CodiconHeart from '~icons/codicon/heart';
    import TextPlaceholder from '../../components/Loaders/TextPlaceholder.svelte';
    import { ApplicationConfig } from '../../configs/ApplicationConfig.const';
    import type { Dish } from '$types';

    let items: Array<Dish> = [];

    onMount(async () => {
        const response = await fetch(`${ApplicationConfig.apiUrl}/dishes?itemsPerPage=4`)
            .then((response) => response.json());

        items = response.data;
        isLoading = false;
    });

    let isLoading = true;
</script>

<section class="w-full md:w-1/2 h-[70vh] md:h-[65vh] mt-16 md:mt-0 overflow-hidden md:overflow-visible">
    <div class="ml-2 rounded-xl px-4 py-2 bg-white flex items-center w-fit">
        <img src="https://em-content.zobj.net/thumbs/120/apple/325/pancakes_1f95e.png" class="w-7 h-7" alt="">

        <p class="text-lg font-medium ml-3">Latest recipes</p>
    </div>

    <!-- Cards themselves -->
    <div class="w-full h-full scroll-smooth snap-always snap-x snap-mandatory box-content overflow-x-scroll md:overflow-visible">
        <div class="w-[200vh] pb-20 md:pb-0 md:w-full h-full flex flex-nowrap md:flex-wrap items-stretch">
            { #if isLoading }
                { #each [1,2,3,4] as _ }
                    <div class="snap-center w-full h-full md:w-1/2 md:h-1/2 p-2">
                        <div class="flex flex-col items-center justify-center shadow-xl bg-white w-full h-full rounded-xl"> 
                            <div class="flex">
                                <TextPlaceholder class="h-7 w-12 mr-2" />
                                <TextPlaceholder class="h-7 w-24" />
                            </div>

                            <div class="flex flex-wrap mt-4">
                                <TextPlaceholder class="h-5 w-6 mr-2" />
                                <TextPlaceholder class="h-5 w-16 mr-2" />
                                <TextPlaceholder class="h-5 w-24 mr-2" />
                            </div>
                        </div>
                    </div>
                { /each }
            { :else }
                { #each items as dish }
                    <div class="snap-center w-full h-full md:w-1/2 md:h-1/2 p-2">
                        <div class="w-full h-full flex flex-col md:flex-row items-start justify-start md:justify-center bg-white rounded-xl shadow-xl"> 
                            <!-- Image -->
                            <div in:fade class="w-full h-full md:w-1/3 rounded-xl md:rounded-l-xl" style="background-image: url('{ dish.imageUrl }'); background-size: cover;">
                                <div class="hidden md:block w-full h-full rounded-l-xl bg-gradient-to-r from-black to-transparent opacity-40"></div>
                            </div>

                            <div in:fade class="w-2/3 p-8">
                                <!-- Tags and popularity -->
                                <div class="flex items-stretch gap-2">
                                    <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-r from-yellow-300 to-amber-400">
                                        <CodiconHeart class="w-4 h-4 text-white mr-1" />
                                        
                                        <p class="text-white text-xs">{ dish.likedBy?.length ?? 0 } likes</p>
                                    </div>
                                </div>

                                <h1 class="mt-1 text-xl font-medium">{ dish.name }</h1>
                                <p class="text-sm text-black text-opacity-80 line-clamp-5">{ dish.description ?? "Empty description" }</p>
                            </div>
                        </div>
                    </div>
                { /each }
            { /if }
        </div>
    </div>
</section>