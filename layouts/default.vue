<template>
  <div>
    <div class="w-full left-0 top-0 p-4 lg:px-10 xl:px-20">
      <div class="flex justify-between items-center">
        <RouterLink to="/" class="font-bold">BitterballenCultuur</RouterLink>

        <div class="text-sm sm:text-base flex flex-row gap-x-2 sm:gap-x-4">
          <RouterLink to="/blog">Blog</RouterLink>
          <RouterLink to="/cities">Steden</RouterLink>
          <RouterLink to="/restaurants/map">Kaart</RouterLink>
          <RouterLink to="/restaurants">Restaurants</RouterLink>
        </div>
      </div>

      <client-only v-if="previousLink && previousText">
        <RouterLink class="text-gray-600 text-sm mt-2 block" :to="previousLink">
          < {{ previousText }}
        </RouterLink>
      </client-only>
    </div>

    <div class="mx-4 sm:mx-8 md:max-w-2xl md:mx-auto lg:max-w-3xl xl:max-w-4xl mt-2 md:mt-4 lg:mt-8 mb-8">
      <Nuxt/>
    </div>

    <div class="mt-8 p-4 text-gray-600">
      Gemaakt met ❤️ door Tim - <a target="_blank" class="underline text-gray-700" href="https://arendz.nl/?utm_source=bitterballen&utm_medium=backlink">Arendz.nl</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    previousLink() {
      return this.$store.state.meta.previousLink;
    },
    previousText() {
      return this.$store.state.meta.previousText;
    },
  }
}
</script>
