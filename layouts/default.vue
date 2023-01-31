<template>
  <div>
    <div class="w-full left-0 top-0 p-4 lg:px-10 xl:px-20">
      <div class="flex justify-between">
        <RouterLink to="/" class="font-bold">BitterBallen</RouterLink>

        <div class="flex flex-row gap-x-4">
          <RouterLink to="/restaurants/map">Kaart</RouterLink>
          <RouterLink to="/restaurants">Restaurants</RouterLink>
          <!--        <RouterLink to="/blog">Blog</RouterLink>-->
          <!--        <RouterLink to="/brands">Merken</RouterLink>-->
        </div>
      </div>

      <div v-if="previousLink && previousText">
        <RouterLink class="text-gray-600 text-sm mt-2 block" :to="previousLink">
          < {{ previousText }}
        </RouterLink>
      </div>
    </div>

    <div class="mx-4 sm:mx-8 md:max-w-2xl md:mx-auto lg:max-w-3xl xl:max-w-4xl mt-8 mb-8">
      <Nuxt keep-alive/>
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
