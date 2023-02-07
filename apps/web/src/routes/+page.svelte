<script lang="ts">
    // Imports
    import SearchableDishes from '../components/Lists/SearchableDishes.svelte';
    import NewsSlider from './_landing/NewsSlider.svelte';
    import LatestRecipes from './_landing/LatestRecipes.svelte';
</script>

<svelte:head>
    <title>snacktime</title>
</svelte:head>

<!-- Hero -->
<section class="w-full flex flex-wrap md:px-2">
    <NewsSlider />

    <LatestRecipes />
</section>

<!-- Content -->
<section class="w-full mt-10 md:mt-24 px-4">
    <SearchableDishes />
</section>