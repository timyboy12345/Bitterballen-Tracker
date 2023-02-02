<template>
  <div v-if="restaurant">
    <img
      v-if="restaurant.image"
      alt="Image for "
      class="mx-auto rounded shadow max-h-96 max-w-full object-contain mb-8"
      :src="`https://nprukzcs.directus.app/assets/${restaurant.image}`"
    >

    <h1 class="text-xl font-bold">{{ restaurant.name }}</h1>
    <article class="prose lg:prose-xl">
      {{ restaurant.content }}
    </article>

    <BitterballenList
      v-if="restaurant && bitterballen"
      :bitterballen="bitterballen"
      :restaurant="restaurant"
      class="my-8"
    />

    <Loader text="Bittergarnituur wordt geladen" class="my-8" v-else />
  </div>

  <div v-else>
    <Loader text="Restaurant wordt geladen"></Loader>
  </div>
</template>

<script>
import BitterballenList from "@/components/lists/BitterballenList";

export default {
  name: 'RestaurantShow',
  data() {
    return {
      restaurant: null,
      bitterballen: null
    }
  },
  components: {BitterballenList},
  async fetch() {
    await this.fetchData();
  },
  methods: {
    fetchData() {
      return new Promise((resolve, reject) => {
        this
          .$axios
          .$get('https://nprukzcs.directus.app/items/restaurants', {
            params: {
              'filter[slug][_eq]': this.$route.params.slug
            },
          })
          .then((data) => {
            this.restaurant = data.data[0];

            this
              .$axios
              .$get('https://nprukzcs.directus.app/items/bitterballen', {
                params: {
                  'filter[restaurant][_eq]': this.restaurant.id
                },
              })
              .then((data) => {
                this.bitterballen = data.data;

                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      })
    }
  },
  created() {
    this.$store.commit('meta/setPreviousText', 'Terug naar alle restaurants');
    this.$store.commit('meta/setPreviousLink', '/restaurants');
  },
  head() {
    return {
      title: this.restaurant ? this.restaurant.name : 'Restaurant',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.restaurant ? this.restaurant.description : null
        }
      ]
    }
  },
}
</script>
