<script lang="ts">
  // Imports
  import CodiconArrowLeft from '~icons/codicon/arrow-left';
  import CodiconStarFull from '~icons/codicon/star-full';
  import CodiconBookmark from '~icons/codicon/bookmark';
  import CodiconHeart from '~icons/codicon/heart';

  // /** @type {import('./$types').PageData} */
  // export let data;
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
      <div class="w-full md:w-1/2 relative">
        <div class="rounded-xl w-full pt-[60%]" style="background-image: url('https://www.wikihow.com/images_en/thumb/7/79/Care-for-a-Husky-Step-3-Version-2.jpg/v4-460px-Care-for-a-Husky-Step-3-Version-2.jpg.webp'); background-size: cover;"></div>
      
        <!-- Slides -->
        <div class="absolute inset-x-0 bottom-0 pb-4 pt-8 bg-gradient-to-t from-slate-800 rounded-b-xl flex items-center justify-center">
          { #each [1,2,3,4] as _ }
            <div class="{ _ == 1 ? "w-4 h-4" : "w-2 h-2 opacity-50" } rounded-full bg-white mx-4"></div>
          { /each }
        </div>
      </div>

      <!-- Texts -->
      <div class="w-full mt-12 md:mt-0 md:ml-12 md:w-1/3">
        <!-- Statistics badges -->
        <div class="flex items-center gap-3 mb-4 md:mb-2">
          <!-- Stars -->
          <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-r from-yellow-300 to-amber-400">
            <CodiconStarFull class="w-4 h-4 text-white mr-1" />
            
            <p class="text-white text-base md:text-xs">4.5</p>
          </div>

          <!-- Ingriedients -->
          <div class="rounded-xl flex items-center px-2 py-1.5 bg-gradient-to-br from-slate-400 to-gray-300">
            <p class="text-white text-base md:text-xs">18 ингридиентов</p>
          </div>
        </div>

        <h1 class="text-4xl font-bold">Lorem ipsum dolor sit.</h1>
        <p class="text-base text-black opacity-60">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, veritatis aut harum placeat laborum sint excepturi tenetur vero recusandae? Velit neque dignissimos obcaecati blanditiis aperiam.<br /><br />Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, quis?</p>
      
        <!-- Buttons -->
        <div class="mt-6 flex gap-2 items-stretch">
          <!-- Share buttons -->

          <!-- Add to favourites and like buttons -->
          <button class="w-full md:w-1/2 py-2 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center">
            <CodiconBookmark class="text-white w-6 h-6 md:w-5 md:h-5" />

            <p class="text-white text-md md:text-sm ml-1">Bookmark</p>
          </button>

          <button class="w-full md:w-1/2 py-2 rounded-full bg-gradient-to-tr from-slate-400 to-gray-300 flex items-center justify-center">
            <CodiconHeart class="text-white w-6 h-6 md:w-5 md:h-5" />

            <p class="text-white text-md md:text-sm ml-1">Like</p>
          </button>

        </div>
      </div>
    </section>

    <!-- Ingredients section -->
    <section class="mt-16">
      <div class="rounded-xl px-4 py-2 bg-gray-100 flex items-center w-fit">
        <img src="https://em-content.zobj.net/thumbs/120/apple/325/basket_1f9fa.png" class="w-7 h-7" alt="">

        <p class="text-lg font-medium ml-3">Ingredients</p>
      </div>

      <!-- Ingredients themselves -->
      <div class="w-full grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
        { #each [1,2,3,4,5,6,7,8,9,10,11,12] as _ }
          <div class="rounded-xl flex-1 p-4 bg-gray-100 flex flex-col md:flex-row items-center justify-center">
            <!-- Image -->
            <img src="https://em-content.zobj.net/thumbs/120/apple/325/chicken_1f414.png" class="w-10 md:w-8" alt="">

            <!-- Name -->
            <div class="mt-4 md:mt-0 md:ml-4">
              <div class="flex items-center">
                <h1 class="text-lg font-medium">Chicken</h1>
                
                <!-- Desktop-only -->
                <div class="hidden md:block ml-2 rounded-xl px-2 py-1 w-fit bg-gradient-to-tr from-green-400 to-lime-500">
                  <p class="text-xs text-white">Есть</p>
                </div>
              </div>
              <p class="text-sm opacity-60">1/2 часть</p>
            </div>
          </div>
        { /each }
      </div>
    </section>
  </div>
</div>