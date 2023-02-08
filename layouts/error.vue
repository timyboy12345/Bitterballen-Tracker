<template>
  <div>
    <h1 class="text-xl font-bold" v-if="error.statusCode === 404">Pagina niet gevonden</h1>
    <h1 class="text-xl font-bold" v-else>An error occurred</h1>
    <NuxtLink class="underline block mt-4" to="/">Ga terug naar de homepagina</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default' // you can set a custom layout for the error page
}
</script>

