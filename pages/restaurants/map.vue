<template>
  <div>
    <h1 class="text-xl font-bold">Bitterballenkaart</h1>
    <h2 class="text-gray-600 mb-4">Op deze kaart vind je alle plekken waar wij ooit bittergarnituur hebben geprobeerd</h2>

    <div class="w-full bg-gray-300 relative h-96 shadow overflow-hidden">
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
              <RouterLink class="underline" :to="`/restaurants/${restaurant.slug}`">
                Meer over dit restaurant
              </RouterLink>
            </l-popup>
          </l-marker>
        </l-map>
      </client-only>
    </div>

    <div class="grid lg:grid-cols-2 gap-4 my-8">
      <div>
        <div class="text-lg text-yellow-900 font-bold">Waarom een bitterballenkaart?</div>
        <p class="text-gray-800 text-sm">
          Je wil naar het terras, wil daar lekker genieten, en krijgt een schaal slappe bitterballen voorgeschoteld. Dat
          wil je natuurlijk niet! Daarom kan je op bovenstaande kaart snel zien welke terrasjes in de door jou gekozen
          stad goed bitterballen serveren, en welke nog wat verbeterpunten hebben.
        </p>
      </div>

      <div>
        <div class="text-lg text-yellow-900 font-bold">Ik wil meer weten over een specifieke stad</div>
        <p class="text-gray-800 text-sm">
          Wil je meer weten over de bittergarnituurcultuur in een specifieke stad? Kijk dan eens op onze
          <RouterLink class="underline text-yellow-900" to="/cities">steden-pagina</RouterLink>
          , waar je meer kan lezen over enkele grotere en kleinere steden die we hebben bezocht.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: null
    }
  },
  name: 'MapShow',
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
  },
  head: {
    title: 'Kaart',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Bekijk op deze kaart alle cafés en restaurants in Nederland waar je een bruine fruitschaal, lekkere borrelplank of schaal bitterballen kan bestellen, allemaal door ons persoonlijk gekeurd.'
      }
    ]
  },
}
</script>
