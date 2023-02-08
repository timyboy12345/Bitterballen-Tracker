<template>
  <div v-if="restaurants">
    <h1 class="text-xl font-bold">Restaurants</h1>
    <h2 class="text-gray-600 mb-4">Deze restaurants serveren goede bitterballen op goede plekken</h2>

    <RestaurantsList
      :restaurants="restaurants"
    ></RestaurantsList>

    <div class="grid lg:grid-cols-2 gap-4 my-8">
      <div>
        <h2 class="text-lg font-bold">Wat is belangrijk als ik een restaurant uitzoek?</h2>
        <p class="text-gray-800 text-sm">
          Het uitzoeken van het ideale borrelcafé kan lastig zijn. In onze ervaring moet je gewoon zo veel mogelijk
          plekken proberen en overal iets bestellen om een beeld te krijgen welke horecagelegenheden tijd en aandacht
          hebben gestoken in hun borrelkaart. Als ze alleen bitterballen op de kaart hebben is dat meestal geen goed
          teken, maar te veel items op de kaart kan er op wijzen dat ze heel erg veel dingen hebben met een matige
          kwaliteit.
        </p>
      </div>

      <div>
        <h2 class="text-lg font-bold">Wat maakt een café perfect?</h2>
        <p class="text-gray-800 text-sm">
          Iedereen verwacht andere dingen van een café of restaurant. Wij vinden een goede borrelplank ongelofelijk
          belangrijk! Er moeten verschillende hapjes op de kaart staan, zoals bitterballen, vlammetjes of
          gehaktballetjes, die allemaal een goede kwaliteit hebben. We proberen op zo veel mogelijk plekken de
          bittergarnituur, om jullie de beste plekken voor te kunnen schotelen.
        </p>
      </div>
    </div>
  </div>

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
        content: 'Bekijk alle restaurants in Nederland waar je een lekkere borrelplank, bruine fruitschaal of schaal bitterballen kan bestellen, allemaal door ons gekeurd.'
      }
    ]
  },
  created() {
    this.$store.commit('meta/resetPrevious');
  }
}
</script>
