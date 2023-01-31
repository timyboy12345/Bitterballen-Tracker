<template>
  <div v-if="city">
    <img
      v-if="city.image"
      alt="Image for "
      class="mx-auto rounded shadow max-h-96 max-w-full object-contain mb-8"
      :src="`https://nprukzcs.directus.app/assets/${city.image}`"
    >

    <h1 class="text-xl font-bold">{{ city.name }}</h1>
    <article class="prose lg:prose-xl">
      {{ city.content }}
    </article>

    <RestaurantsList
      class="my-8"
      v-if="city.restaurants"
      :restaurants="city.restaurants"
    />
  </div>

  <div v-else>
    <Loader text="Data over deze stad wordt geladen"></Loader>
  </div>
</template>

<script>
import Loader from '~/components/Loader';
import RestaurantsList from '~/components/lists/RestaurantsList';

export default {
  name: 'CitiesShow',
  components: {Loader, RestaurantsList},
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
  }
}
</script>
