<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <RouterLink
      v-for="city of cities"
      :key="city.id"
      :to="`/cities/${city.slug}`"
      class="relative h-60 overflow-hidden rounded shadow bg-white hover:bg-gray-100 transition duration-100">
      <img
        v-if="city.image"
        :alt="`Afbeelding van ${city.name}`"
        :src="`https://nprukzcs.directus.app/assets/${city.image}?key=card`"
        class="object-bottom object-cover w-full h-full"
      >

      <div class="-z-1 w-full h-full bg-gray-300"></div>

      <div class="bg-inherit w-full absolute bottom-0 left-0 p-4 overflow-hidden">
        <h2 class="font-bold">{{ city.name }}</h2>
        <p class="text-xs text-gray-800">{{ city.catchphrase }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'CitiesList',
  props: {
    cities: {
      type: Array,
      required: true
    }
  }
}
</script>
