<template>
  <div class="grid gap-4 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
    <RouterLink
      v-for="restaurant of restaurants"
      :key="restaurant.id"
      :to="`/restaurants/${restaurant.slug}`"
      class="relative h-60 overflow-hidden rounded shadow bg-white hover:bg-gray-100 transition duration-100">
      <img
        v-if="restaurant.image"
        :alt="`Afbeelding van ${restaurant.name}`"
        :src="`https://nprukzcs.directus.app/assets/${restaurant.image}?key=card`"
        class="object-bottom object-cover w-full h-full"
      >

      <div class="-z-1 w-full h-full bg-gray-300"></div>

      <div class="bg-inherit w-full absolute bottom-0 left-0 p-4 overflow-hidden">
        <h2 class="font-bold">{{ restaurant.name }}</h2>
        <p class="text-xs text-gray-800">{{ restaurant.description }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'RestaurantsList',
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
}
</script>
