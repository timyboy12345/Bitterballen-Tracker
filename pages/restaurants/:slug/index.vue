<template>
  <div v-if="restaurant">
    <img
      v-if="restaurant.image"
      :alt="`Afbeelding van ${restaurant.name}`"
      :src="`https://nprukzcs.directus.app/assets/${restaurant.image}`"
      class="mx-auto rounded shadow max-h-96 max-w-full object-contain mb-8"
    >

    <div class="flex flex-row gap-x-4 my-4" v-if="restaurant.website || restaurant.menu">
      <div class="text-sm text-gray-600" v-if="restaurant.website"><a :href="restaurant.website" class="underline"
                                                                      target="_blank">Bekijk website</a></div>
      <div class="text-sm text-gray-600" v-if="restaurant.menu"><a :href="restaurant.menu" class="underline"
                                                                   target="_blank">Bekijk menu</a></div>
    </div>

    <h1 class="text-xl font-bold">{{ restaurant.name }}</h1>
    <article class="prose max-w-none" v-html="$md.render(restaurant.content)"></article>

    <BitterballenList
      v-if="bitterballen && bitterballen.length > 0"
      :bitterballen="bitterballen"
      :restaurant="restaurant"
      class="my-8"
    />

    <Alert
      v-else-if="bitterballen && bitterballen.length === 0"
      class="my-8"
      content="Er zijn geen bitterballen gevonden voor dit restaurant"
      title="Geen bittergarnituur gevonden"
    />

    <Loader
      text="Bittergarnituur wordt geladen"
      class="my-8"
      v-else
    />

    <iframe
      v-if="restaurant.youtube_link" class="w-full h-96"
      :src="youtubeEmbed" allow="autoplay; encrypted-media" allowfullscreen
    ></iframe>
  </div>

  <div v-else-if="restaurantError">
    <Alert title="Restaurant niet gevonden" content="Er kon geen restaurant worden gevonden met deze titel"></Alert>
  </div>

  <div v-else>
    <Loader text="Restaurant wordt geladen"></Loader>
  </div>
</template>

<script>
import BitterballenList from "@/components/lists/BitterballenList";
import Alert from "@/components/Alert";

export default {
  name: 'RestaurantShow',
  data() {
    return {
      restaurant: null,
      bitterballen: null,
      restaurantError: null
    }
  },
  components: {Alert, BitterballenList},
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
            this.restaurantError = error;
          });
      })
    }
  },
  computed: {
    youtubeEmbed() {
      const id = this.restaurant.youtube_link.replace('https://www.youtube.com/watch?v=', '');

      return 'https://www.youtube-nocookie.com/embed/' + id;
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
