<template>
  <div v-if="restaurant && bitterbal">
    <img
      v-if="bitterbal.image"
      alt="Image for "
      class="mx-auto rounded shadow max-h-96 max-w-full object-contain mb-8"
      :src="`https://nprukzcs.directus.app/assets/${bitterbal.image}`"
    >

    <h1 class="text-xl font-bold">{{ bitterbal.name }}</h1>
    <p class="text-gray-800">
      Verkrijgbaar bij
      <RouterLink class="underline" :to="`/restaurants/${restaurant.slug}`">{{ restaurant.name }}</RouterLink>
      / {{ bitterbal.checkins.length }}x beoordeeld
    </p>

    <p v-if="bitterbal.description" class="my-4 text-sm text-gray-600">
      {{ bitterbal.description }}
    </p>

    <Alert
      v-if="bitterbal && bitterbal.checkins.length === 0"
      title="Nog geen reviews ontvangen"
      content="Dit gerecht is nog nooit door ons beoordeeld."
      class="my-8"
    ></Alert>

    <div v-else class="my-8">
      <h2 class="text-lg text-yellow-900 font-bold">Ratings</h2>

      <div class="grid gap-4 mt-2">
        <Card
          v-for="checkin of bitterbal.checkins"
          :key="checkin.id"
          :title="checkin.date_created | parseDate"
          :hide-image="true"
        >
          <template #content>
            <div class="grid lg:grid-cols-4 text-gray-800 gap-4">
              <div class="grid grid-cols-2 lg:grid-cols-1 gap-2">
                <div>
                  <h3 class="text-sm text-gray-600">Krokantheid</h3>
                  <div class="text-gray-800">{{ checkin.crispyness + 3 }} / 5</div>
                </div>
                <div>
                  <h3 class="text-sm text-gray-600">Warm of koud</h3>
                  <div class="text-gray-800">{{ checkin.crispyness + 3 }} / 5</div>
                </div>
              </div>
              <div class="lg:col-span-3 prose max-w-none" v-html="$md.render(checkin.content)"></div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>

  <div v-else>
    <Loader text="Geselecteerde bittergarnituur wordt opgehaald"></Loader>
  </div>
</template>

<script>
import Loader from '~/components/Loader';
import Alert from '~/components/Alert';

export default {
  name: 'BitterbalShow',
  data() {
    return {
      restaurant: null,
      bitterbal: null
    }
  },
  components: {Loader, Alert},
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
    restaurant(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.$store.commit('meta/setPreviousText', 'Terug naar ' + newValue.name);
        this.$store.commit('meta/setPreviousLink', '/restaurants/' + newValue.slug);
      }
    }
  },
  head() {
    return {
      title: this.restaurant && this.bitterbal ? `${this.bitterbal.name} bij ${this.restaurant.name}` : 'Restaurant',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.restaurant && this.bitterbal ? `Bekijk alle recensies van ${this.bitterbal.name} bij ${this.restaurant.name}.` : null
        }
      ]
    }
  },
}
</script>
