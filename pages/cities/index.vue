<template>
  <div v-if="cities">
    <h1 class="text-xl font-bold">Steden</h1>
    <h2 class="text-gray-600 mb-4">Hieronder vind je alle steden waar wij leuke cafés en restaurants hebben bezocht met
      een lekkere borrelplank</h2>

    <CitiesList
      :cities="cities"
    ></CitiesList>

    <div class="grid lg:grid-cols-2 gap-4 my-8">
      <div>
        <div class="text-lg text-yellow-900 font-bold">Wat maakt een stad de perfecte bittergarnituurstad?</div>
        <p class="text-gray-800 text-sm">
          Vaak ga je borrelen in de stad waar je al bent, maar als je een dag over hebt is het ook hartstikke leuk om
          een nieuwe stad te ontdekken. Dat kan vaak per trein, bus of fiets, dan kan je ook nog genieten van een
          biertje bij je bitterballen. Wij houden van steden met een oude binnenstad, lekker knus bebouwd en goed onderhouden.
        </p>
      </div>

<!--      <div>-->
<!--        <div class="text-lg text-yellow-900 font-bold">Ik wil meer weten over een specifieke stad</div>-->
<!--        <p class="text-gray-800 text-sm">-->
<!--          Wil je meer weten over de bittergarnituurcultuur in een specifieke stad? Kijk dan eens op onze-->
<!--          <RouterLink class="underline text-yellow-900" to="/cities">steden-pagina</RouterLink>-->
<!--          , waar je meer kan lezen over enkele grotere en kleinere steden die we hebben bezocht.-->
<!--        </p>-->
<!--      </div>-->
    </div>
  </div>

  <div v-else>
    <Loader text="Alle steden worden geladen"></Loader>
  </div>
</template>

<script>
import Loader from '~/components/Loader';
import CitiesList from '~/components/lists/CitiesList';

export default {
  name: 'CitiesIndex',
  components: {Loader, CitiesList},
  data() {
    return {
      cities: null
    }
  },
  async fetch() {
    this.cities = await this
      .$axios
      .$get('https://nprukzcs.directus.app/items/cities')
      .then((data) => {
        return data.data;
      });
  },
  head: {
    title: 'Steden',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Bekijk hier alle grote en kleine steden waar je een lekkere schaal bittergarnituur kan bestellen en in welk café je wel en niet moet zijn.'
      }
    ]
  },
  created() {
    this.$store.commit('meta/resetPrevious');
  }
}
</script>
