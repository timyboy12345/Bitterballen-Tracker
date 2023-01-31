<template>
  <div v-if="restaurant && bitterbal">
    <div class="grid md:grid-cols-2 gap-4">
      <!--      <Card-->
      <!--        :image="restaurant.image ? `https://nprukzcs.directus.app/assets/${restaurant.image}` : null"-->
      <!--        :title="restaurant.name"-->
      <!--        :content="restaurant.description"-->
      <!--        :href="`/restaurants/${restaurant.slug}`"-->
      <!--      ></Card>-->
      <Card
        :image="restaurant.image ? `https://nprukzcs.directus.app/assets/${restaurant.image}` : null"
        :title="restaurant.name"
        :content="restaurant.description"
      ></Card>

      <Card
        :image="bitterbal.image ? `https://nprukzcs.directus.app/assets/${bitterbal.image}` : null"
        :title="bitterbal.name"
        :content="`${bitterbal.amount} stuks / ${Math.round(bitterbal.price * 100) / 100} euro`"
      ></Card>
    </div>

    <Card
      class="my-8"
      v-for="checkin of bitterbal.checkins"
      :key="checkin.id"
      :content="checkin.content"
      :title="Date(checkin.date_created).toLocaleLowerCase()"
      :hide-image="true"
    ></Card>
  </div>

  <div v-else>
    <Loader text="Alle bittergarnituur van dit restaurant wordt opgehaald"></Loader>
  </div>
</template>

<script>
import Loader from '~/components/Loader';

export default {
  name: 'BitterbalShow',
  data() {
    return {
      restaurant: null,
      bitterbal: null
    }
  },
  components: {Loader},
  async fetch() {
    await this.fetchData();
  },
  methods: {
    fetchData() {
      return Promise.all([
        this
          .$axios
          .$get('https://nprukzcs.directus.app/items/restaurants', {
            params: {
              'filter[slug][_eq]': this.$route.params.slug
            },
          })
          .then((data) => {
            this.restaurant = data.data[0];
          }),
        this
          .$axios
          .$get('https://nprukzcs.directus.app/items/bitterballen', {
            params: {
              'filter[id][_eq]': this.$route.params.id,
              'fields': '*,checkins.*'
            },
          })
          .then((data) => {
            this.bitterbal = data.data[0];
          })
      ])
    }
  },
  watch: {
    restaurant(newValue) {
      this.$store.commit('meta/setPreviousText', 'Terug naar ' + newValue.name);
      this.$store.commit('meta/setPreviousLink', '/restaurants/' + newValue.slug);
    }
  }
}
</script>
