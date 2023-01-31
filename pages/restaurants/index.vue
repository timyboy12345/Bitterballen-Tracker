<template>
  <RestaurantsList
    v-if="restaurants"
    :restaurants="restaurants"
  ></RestaurantsList>

  <div v-else>
    <Loader text="Alle restaurants worden geladen"></Loader>
  </div>
</template>

<script>
import Loader from '~/components/Loader';
import RestaurantsList from '~/components/lists/RestaurantsList';

export default {
  name: 'RestaurantIndex',
  components: {Loader, RestaurantsList},
  data() {
    return {
      restaurants: null
    }
  },
  async fetch() {
    this.restaurants = await this
      .$axios
      .$get('https://nprukzcs.directus.app/items/restaurants')
      .then((data) => {
        return data.data;
      });
  },
  head: {
    title: 'Restaurants',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ]
  },
  created() {
    this.$store.commit('meta/resetPrevious');
  }
}
</script>
