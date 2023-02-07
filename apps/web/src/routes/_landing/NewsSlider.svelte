<script lang="ts">
    import { onMount } from "svelte";
    import { ApplicationConfig } from "../../configs/ApplicationConfig.const";
    import type { NewsEntry } from "$types";
    import Circle from "../../components/Loaders/Circle.svelte";
    import { fade } from "svelte/transition";
    import CodiconLinkExternal from '~icons/codicon/link-external';
  import TextPlaceholder from "../../components/Loaders/TextPlaceholder.svelte";

    $: currentEntry = news.find((x) => x.id == currentEntryId);

    const news: Array<NewsEntry> = [];
    let currentEntryId: number;
        
    // Loading states
    let isLoading = true;
    let isPanicked = false;

    onMount(async () => {
        const response = await fetch(`${ApplicationConfig.apiUrl}/news`)
            .then((response) => response.json())
            .catch((error) => {
                isLoading = false;
                isPanicked = true;
            });

        response.data.forEach((item: any) => {
            news.push(item as NewsEntry);
        });

        currentEntryId = news[0].id;
        isLoading = false;
    });
</script>

<section class="w-full lg:w-1/2 h-auto lg:h-[65vh]">
    <!-- Card header -->
    <div class="ml-2 rounded-xl px-4 py-2 bg-white flex items-center w-fit">
        <img src="https://em-content.zobj.net/thumbs/120/apple/325/rolled-up-newspaper_1f5de-fe0f.png" class="w-7 h-7" alt="">

        <p class="text-lg font-medium ml-3">News</p>
    </div>

    <!-- Card itself -->
    <div class="w-full h-full p-2">
        <div class="w-full h-full px-8 py-12 lg:py-0 flex flex-col justify-center { isLoading ? "bg-white" : "bg-gradient-to-tr from-sky-400 via-violet-500 to-fuchsia-400" } { isLoading || isPanicked ? "items-center" : "items-start" } transition-all duration-700 rounded-xl shadow-xl relative">
            { #if isLoading }
                <div class="flex gap-2">
                    <TextPlaceholder class="w-24 h-8" />
                    <TextPlaceholder class="w-16 h-8" />
                </div>

                <div class="w-2/3 flex items-center justify-center gap-2 flex-wrap mt-6">
                    <TextPlaceholder class="w-16 h-6" />
                    <TextPlaceholder class="w-24 h-6" />
                    <TextPlaceholder class="w-32 h-6" />
                    <TextPlaceholder class="w-12 h-6" />
                    <TextPlaceholder class="w-40 h-6" />
                    <TextPlaceholder class="w-24 h-6" />
                    <TextPlaceholder class="w-8 h-6" />
                </div>
            { :else }
                { #if isPanicked } 
                    <div class="text-center text-white">
                        <h1 class="text-xl font-bold">Error while fetching news</h1>
                        <p class="text-sm opacity-80">You could try to reload this page and see if this error is resolved or no. Otherwise I dunno</p>
                    </div>
                { :else }
                    <div class="w-full lg:w-2/3 text-white text-left">
                        <h1 class="text-6xl font-bold">{ currentEntry?.title }</h1>
                        <p class="text-base opacity-80">{ currentEntry?.description }</p>
                    </div>

                    <!--  -->
                    { #if currentEntry?.link }
                        <a href={currentEntry.link} in:fade class="rounded-full px-4 py-2 mt-4 bg-white hover:bg-gray-100 transition duration-100 flex items-center justify-center">
                            <CodiconLinkExternal class="w-5 h-5 text-black" />

                            <p class="text-sm text-black ml-2">Open article</p>
                        </a>
                    { /if }

                    <!-- Slides -->
                    <div in:fade class="absolute inset-x-0 bottom-0 pb-4 pt-8 bg-gradient-to-t from-slate-800 rounded-b-xl flex items-center justify-center">
                        { #each news as entry }
                            <button on:click={() => currentEntryId = entry.id} class="{ entry.id == currentEntryId ? "w-4 h-4" : "w-2 h-2 opacity-50" } rounded-full bg-white mx-4" />
                        { /each }
                      </div>
                { /if }
            { /if }
        </div>
    </div>
</section>