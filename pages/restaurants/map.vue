<template>
  <div class="w-full h-96 rounded shadow overflow-hidden">
    <client-only v-if="restaurants">
      <l-map @ready="handleMapReady" :zoom=13 ref="restaurantsMap" :center="[55.9464418,8.1277591]">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker
          v-for="restaurant of restaurants"
          :key="restaurant.id"
          :lat-lng="[restaurant.location.coordinates[1], restaurant.location.coordinates[0]]"
        >
          <l-popup>
            <div>{{ restaurant.name }}</div>
            <RouterLink class="underline" :to="`/restaurants/${restaurant.slug}`">Meer over dit restaurant</RouterLink>
          </l-popup>
        </l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: null
    }
  },
  name: 'Map',
  head: {
    title: 'Kaart'
  },
  async fetch() {
    this.restaurants = await this
      .$axios
      .$get('https://nprukzcs.directus.app/items/restaurants')
      .then((data) => {
        return data.data;
      });
  },
  methods: {
    handleMapReady() {
      this.$refs.restaurantsMap.mapObject.fitBounds(this.restaurants.map((r) => {
        return [r.location.coordinates[1], r.location.coordinates[0]]
      }))
    }
  },
  created() {
    this.$store.commit('meta/resetPrevious');
  }
}
</script>
