<template>
  <div>
    <div class="my-20">
      <h1 class="text-4xl font-bold">Bitterballen</h1>
      <h2 class="text-2xl text-gray-600 xl:max-w-[50%]">Bekijk op welke terrassen je in jouw buurt de lekkerste
        bitterballen kan eten</h2>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
      <div v-for="image of images" class="rounded overflow-hidden h-60">
        <img :src="image" alt="Sfeerbeeld" class="w-full h-full object-cover object-center">
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-4 my-8">
      <div>
        <h2 class="text-lg text-yellow-900 font-bold">Waar kan ik het beste bitterballen eten?</h2>
        <p class="text-gray-800 text-sm">
          De perfecte plek om bitterballen te eten kan lastig te vinden zijn, vandaar dat we je met deze site proberen
          te helpen. Bekijk welke snacks je waar kan eten, wat wij er van vinden en waar je de beste
          prijs/kwaliteitsverhouding kan vinden.
        </p>
      </div>

      <div>
        <h2 class="text-lg text-yellow-900 font-bold">Wat maakt een bitterbal dé bitterbal?</h2>
        <p class="text-gray-800 text-sm">
          Niet elke bitterbal is hetzelfde. Sommige zijn te zacht, andere te hard, anderen hebben bijna geen vulling.
          Een perfecte bitterbal weet alle aspecten van de bitterbal in een perfecte verhouding te brengen.
        </p>
      </div>

      <div>
        <h2 class="text-lg text-yellow-900 font-bold">Wat maakt een bitterbal dé bitterbal?</h2>
        <p class="text-gray-800 text-sm">
          Niet elke bitterbal is hetzelfde. Sommige zijn te zacht, andere te hard, anderen hebben bijna geen vulling.
          Een perfecte bitterbal weet alle aspecten van de bitterbal in een perfecte verhouding te brengen.
        </p>
      </div>
    </div>

    <h2 class="text-lg text-yellow-900 font-bold">Steden</h2>
    <h3 class="text-sm text-gray-600">Klik hieronder op een stad om meer over de bittergarnituurcultuur van die specifieke stad te weten te komen.</h3>
    <CitiesList class="mt-2" v-if="cities" :cities="cities" />
  </div>
</template>

<script>
import Card from "~/components/Card";
import CitiesList from "~/components/lists/CitiesList";

export default {
  data() {
    return {
      images: [
        'https://images.unsplash.com/photo-1606820811250-10f94663a029?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2884&q=80',
        'https://images.unsplash.com/photo-1615829357916-33edf73fd9e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
        'https://images.unsplash.com/photo-1529943247435-a5974e63d6e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        'https://images.unsplash.com/photo-1602501560194-bd58bf42958e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80'
      ],
      cities: null
    }
  },
  components: {Card, CitiesList},
  head: {
    title: 'Home',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Wij maken het makkelijk om het perfecte terras te vinden in jouw stad! Bekijk waar je lekkere bitterballen kan eten en welke plekken je beter kan mijden.'
      }
    ]
  },
  async fetch() {
    this.cities = await this
      .$axios
      .$get('https://nprukzcs.directus.app/items/cities')
      .then((data) => {
        return data.data;
      });
  },
  created() {
    this.$store.commit('meta/resetPrevious');
  }
}
</script>
