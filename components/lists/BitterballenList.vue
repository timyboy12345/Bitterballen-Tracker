<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <RouterLink
      v-for="bitterbal of bitterballen"
      :key="bitterbal.id"
      :to="`/restaurants/${restaurant.slug}/${bitterbal.id}`"
      class="relative h-60 overflow-hidden rounded shadow bg-white hover:bg-gray-100 transition duration-100">
      <img
        v-if="bitterbal.image"
        :alt="`Afbeelding van ${bitterbal.name}`"
        :src="`https://nprukzcs.directus.app/assets/${bitterbal.image}?key=card`"
        class="object-bottom object-cover w-full h-full"
      >

      <div class="-z-1 w-full h-full bg-gray-300"></div>

      <div class="bg-inherit w-full absolute bottom-0 left-0 p-4 overflow-hidden">
        <h2 class="font-bold">{{ bitterbal.name }}</h2>
        <p class="text-xs text-gray-800">{{ bitterbal.amount }} stuks / &euro;{{ Math.round(bitterbal.price * 100) / 100 }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'BitterballenList',
  props: {
    bitterballen: {
      type: Array,
      required: true
    },
    restaurant: {
      type: Object,
      required: true
    }
  }
}
</script>
