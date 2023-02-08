<template>
  <div v-if="city">
    <img
      v-if="city.image"
      :src="`https://nprukzcs.directus.app/assets/${city.image}`"
      alt="Image for "
      class="mx-auto rounded shadow max-h-96 max-w-full object-contain mb-8"
    >

    <h1 class="text-xl font-bold">{{ city.name }}</h1>
    <article class="prose max-w-none" v-html="$md.render(city.content)"></article>

    <RestaurantsList
      v-if="city.restaurants.length > 0"
      :restaurants="city.restaurants"
      class="my-8"
    />

    <Alert
      v-else
      class="my-8"
      content="Er zijn geen restaurants gevonden voor deze stad"
      title="Geen restaurants gevonden"
    ></Alert>
  </div>

  <div v-else>
    <Loader text="Data over deze stad wordt geladen"></Loader>
  </div>
</template>

<script>
import Loader from '~/components/Loader';
import Alert from '~/components/Alert';
import RestaurantsList from '~/components/lists/RestaurantsList';

export default {
  name: 'CitiesShow',
  components: {Loader, Alert, RestaurantsList},
  data() {
    return {
      city: null
    }
  },
  async fetch() {
    await this.fetchData();
  },
  head() {
    return {
      title: this.city ? this.city.name : 'Stad'
    }
  },
  methods: {
    async fetchData() {
      this.city = await this
        .$axios
        .$get('https://nprukzcs.directus.app/items/cities', {
          params: {
            'filter[slug][_eq]': this.$route.params.slug,
            'fields': 'restaurants.*,image,name,content,description'
          },
        })
        .then((data) => {
          return data.data[0];
        });
    }
  },
  created() {
    this.$store.commit('meta/setPreviousText', 'Terug naar alle steden');
    this.$store.commit('meta/setPreviousLink', '/cities');
  },
}
</script>
