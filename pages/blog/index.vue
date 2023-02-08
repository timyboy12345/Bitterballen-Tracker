<template>
  <div v-if="blogPosts">
    <h1 class="text-xl font-bold">Blog</h1>
    <h2 class="text-gray-600 mb-4">Hieronder lees je meer over al het bittergarnituurnieuws, van nieuwe restaurants tot
      nieuwe snacks</h2>

    <BlogPostsList
      :blog-posts="blogPosts"
    ></BlogPostsList>

    <div class="grid lg:grid-cols-2 gap-4 my-8">
      <div>
        <div class="text-lg font-bold">Wat kan ik lezen op de bitterballenblog?</div>
        <p class="text-gray-800 text-sm">
          In deze bitterballenblog kan je allerlei verschillende dingen lezen. We schrijven over nieuwe cafés die
          openen, nieuwe snacks die worden uitgebracht en schrijven over leuke plekken die al een tijdje bestaan.
        </p>
      </div>

      <!--      <div>-->
      <!--        <div class="text-lg font-bold">Ik wil meer weten over een specifieke stad</div>-->
      <!--        <p class="text-gray-800 text-sm">-->
      <!--          Wil je meer weten over de bittergarnituurcultuur in een specifieke stad? Kijk dan eens op onze-->
      <!--          <RouterLink class="underline text-yellow-900" to="/cities">steden-pagina</RouterLink>-->
      <!--          , waar je meer kan lezen over enkele grotere en kleinere steden die we hebben bezocht.-->
      <!--        </p>-->
      <!--      </div>-->
    </div>
  </div>

  <div v-else>
    <Loader text="Alle blog posts worden geladen"></Loader>
  </div>
</template>

<script>
import Loader from '~/components/Loader';
import BlogPostsList from '~/components/lists/BlogPostsList';

export default {
  name: 'BlogPostsIndex',
  components: {Loader, BlogPostsList},
  data() {
    return {
      blogPosts: null
    }
  },
  async fetch() {
    this.blogPosts = await this
      .$axios
      .$get('https://nprukzcs.directus.app/items/blog_posts', {
        params: {
          'filter[status][_eq]': 'published',
          'fields': 'image,title,description,slug,user_created,date_created'
        }
      })
      .then((data) => {
        return data.data.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      });
  },
  head: {
    title: 'Blog',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Bekijk hier alle blog-posts die we hebben geschreven over bitterballen, bittergarnituur en terrassen en restaurants in verschillende steden.'
      }
    ]
  },
  created() {
    this.$store.commit('meta/resetPrevious');
  }
}
</script>
