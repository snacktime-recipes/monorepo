<script lang="ts">
  // Imports
  import CodiconArrowLeft from '~icons/codicon/arrow-left';
  import CodiconStarFull from '~icons/codicon/star-full';
  import CodiconBookmark from '~icons/codicon/bookmark';
  import CodiconHeart from '~icons/codicon/heart';
  import CodiconTrash from '~icons/codicon/trash';
  import CodiconHeartFilled from '~icons/codicon/heart-filled';
  import { onMount } from 'svelte';
  import { ApplicationConfig } from '../../../configs/ApplicationConfig.const';
  import { page } from '$app/stores';
  import type { Dish, DishProduct, Recipe } from '$types';
  import TextPlaceholder from '../../../components/Loaders/TextPlaceholder.svelte';
  import { fade } from 'svelte/transition';
  import Profile from '../../../stores/Profile.store';
  import type { AuthorizedProfile } from '../../../stores/Profile.store';

  onMount(async () => {
    const dishResponse = await fetch(`${ApplicationConfig.apiUrl}/dishes/${dishId}`)
      .then((response) => response.json())
      .catch(() => {
        isLoading = false;
        isPanicked = true;
      });

    const dishProducts = await fetch(`${ApplicationConfig.apiUrl}/dishes/${dishId}/products`)
      .then((response) => response.json())
      .catch(() => {
        isLoading = false;
        isPanicked = true;
      });
      
    const recipeREsponse = await fetch(`${ApplicationConfig.apiUrl}/dishes/${dishId}/recipe`)
      .then((response) => response.json())
      .catch(() => {
        isLoading = false;
        isPanicked = true;
      });

    dish = dishResponse;
    ingredients = dishProducts;
    recipe = recipeREsponse;
    
    isLoading = false;
  });

  let dish: Dish;
  let ingredients: Array<DishProduct>;
  let recipe: Recipe;

  $: profile = $Profile as AuthorizedProfile;

  $: isLiked = profile.likes?.includes(dish.id);
  $: isBookmarked = profile.bookmarks?.includes(dish.id);
  
  let isPanicked = false;
  let isLoading = true;
  const dishId = $page.params.slug;
</script>

<svelte:head>
  <title>snacktime - dish</title>
</svelte:head>

<div class="w-full h-full py-4 md:px-4">
  <div class="w-full h-full rounded-xl bg-white px-6 py-4 md:p-10">
    <!-- Card header (Mobile-only) -->
    <div class="w-full md:hidden py-4">
      <!-- Back button -->
      <button class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
        <CodiconArrowLeft class="w-6 h-6 text-black" />
      </button>
    </div>

    <!-- Recipe image and name -->
    <section class="w-full flex flex-col md:flex-row">
      <!-- Recipe image -->
      { #if isLoading }
        <div class="w-full md:w-1/2 relative">
          <TextPlaceholder class="rounded-xl w-full pt-[60%]" />
        </div>
      { :else }
        <div in:fade class="w-full md:w-1/2 relative">
          <div class="rounded-xl w-full pt-[60%]" style="background-image: url('{ dish.imageUrl }'); background-size: cover; background-position: center;"></div>
        </div>
        <!-- <div in:fade class="w-full md:w-1/2 relative">
          <div class="rounded-xl w-full pt-[60%]" style="background-image: url('https://www.wikihow.com/images_en/thumb/7/79/Care-for-a-Husky-Step-3-Version-2.jpg/v4-460px-Care-for-a-Husky-Step-3-Version-2.jpg.webp'); background-size: cover;"></div>
        
          Slides
          <div class="absolute inset-x-0 bottom-0 pb-4 pt-8 bg-gradient-to-t from-slate-800 rounded-b-xl flex items-center justify-center">
            { #each [1,2,3,4] as _ }
              <div class="{ _ == 1 ? "w-4 h-4" : "w-2 h-2 opacity-50" } rounded-full bg-white mx-4"></div>
            { /each }
          </div>
        </div> -->
      { /if }

      <!-- Texts -->
      <div class="w-full mt-12 md:mt-0 md:ml-12 md:w-1/3">
        <!-- Statistics badges -->
        <div class="flex items-center gap-3 mb-4 md:mb-2">
          <!-- Stars -->
          { #if isLoading }
            <TextPlaceholder class="h-7 w-24" />
            <TextPlaceholder class="h-7 w-32" />
          { :else }
            <div in:fade class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-r from-yellow-300 to-amber-400">
              <CodiconStarFull class="w-4 h-4 text-white mr-1" />
              
              <p class="text-white text-base md:text-xs">{ dish.likedBy?.length ?? 0 } likes</p>
            </div>

            <!-- Ingriedients -->
            { #if dish.meta?.doRecipeExists }
              <div in:fade class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-br from-slate-400 to-gray-300">
                <p class="text-white text-base md:text-xs">{ dish.meta.productsCount } ingredients</p>
              </div>
            { /if }
          { /if }
        </div>

        { #if isLoading }
          <div class="flex">
            <TextPlaceholder class="h-10 w-40 mr-4" />
            <TextPlaceholder class="h-10 w-36 mr-4" />
            <TextPlaceholder class="h-10 w-64 mr-4" />
          </div>

          <div class="mt-8 flex flex-wrap gap-2">
            <TextPlaceholder class="h-7 w-24 mr-4" />
            <TextPlaceholder class="h-7 w-12 mr-4" />
            <TextPlaceholder class="h-7 w-16 mr-4" />
            <TextPlaceholder class="h-7 w-36 mr-4" />
            <TextPlaceholder class="h-7 w-12 mr-4" />
            <TextPlaceholder class="h-7 w-40 mr-4" />
            <TextPlaceholder class="h-7 w-24 mr-4" />
            <TextPlaceholder class="h-7 w-16 mr-4" />
          </div>
        { :else }
          <h1 in:fade class="text-4xl font-bold">{ dish.name }</h1>
          <p in:fade class="text-base text-black opacity-60">{ dish.description }</p>
        { /if }

        <!-- Buttons -->
        { #if !$Profile.isLoaded || $Profile.isAuthorized }
          <div class="mt-6 flex gap-2 items-stretch">
            <!-- Add to favourites and like buttons -->
            { #if isLoading }
              <TextPlaceholder class="w-full h-10" />
            { :else }
              <button on:click|preventDefault|stopPropagation={() => {
                // bookmark();
              }} class="w-full py-2 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center hover:from-sky-600 hover:to-indigo-600 transition ease-in-out duration-200">
                <svelte:component this={ isBookmarked ? CodiconTrash : CodiconBookmark } class="text-white w-5 h-5" />

                <p class="text-white text-sm ml-1">{ isBookmarked ? "Remove from bookmarks" : "Bookmark" }</p>
              </button>
            { /if }

            { #if isLoading }
              <TextPlaceholder class="w-full h-10" />
            { :else }
              <button on:click|preventDefault|stopPropagation={() => {
                // like();
              }} class="w-full py-2 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 flex items-center justify-center hover:from-red-600 hover:to-pink-600 transition ease-in-out duration-200">
                  <svelte:component this={isLiked ? CodiconHeartFilled : CodiconHeart} class="text-white w-5 h-5" />

                  <p class="text-white text-sm ml-1">{ isLiked ? "Unlike" : "Like" }</p>
              </button>
            { /if }
          </div>
        { /if }
      </div>
    </section>

    { #if !isLoading }
      <!-- Ingredients section -->
      <section in:fade class="mt-16">
        <div class="rounded-xl px-4 py-2 bg-gray-100 flex items-center w-fit">
          <img src="https://em-content.zobj.net/thumbs/120/apple/325/basket_1f9fa.png" class="w-7 h-7" alt="">

          <p class="text-lg font-medium ml-3">Ingredients</p>
        </div>

        <!-- Ingredients themselves -->
        <div class="w-full grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
          { #each ingredients as ingredient }
            <div in:fade class="rounded-xl flex-1 p-4 bg-gray-100 flex flex-col items-start justify-center">
              <!-- Image -->
              <div class="w-full flex justify-center">
                <img src="{ ingredient.imageUrl }" class="w-16 h-16 rounded-full object-cover" alt="">
              </div>

              <!-- Name -->
              <div class="mt-4 text-left flex-1">
                <p class="text-sm font-medium opacity-60">{ ingredient.count }</p>
                <h1 class="text-lg font-medium">{ ingredient.name }</h1>
              </div>
            </div>
          { /each }
        </div>
      </section>

      <!-- Recipe itself -->
      <section in:fade class="mt-16">
        <div class="rounded-xl px-4 py-2 bg-gray-100 flex items-center w-fit">
          <img src="https://em-content.zobj.net/thumbs/120/apple/325/memo_1f4dd.png" class="w-7 h-7" alt="">

          <p class="text-lg font-medium ml-3">Recipe</p>
        </div>

        <!-- Steps themselves -->
        { #each recipe.steps as step }
          { @const stepIndex = recipe.steps.findIndex((x) => x == step) }

          <div class="mt-4 w-full rounded-xl py-4 px-6 bg-gray-100 relative">
            <!-- Step number -->
            <div class="absolute top-0 left-[-20px]">
              <div class="rounded-full w-10 h-10 flex items-center justify-center bg-sky-400 opacity-50">
                <p class="text-md font-medium text-white">{ stepIndex +1 }</p>
              </div>
            </div>

            <h1 class="text-lg font-medium">{ step.title }</h1>
            <p class="text-md opacity-80">{ step.description }</p>
          </div>
        { /each }
      </section>
    { /if }
  </div>
</div>