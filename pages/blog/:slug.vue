<template>
  <div v-if="blogPost">
    <img
      v-if="blogPost.image"
      :src="`https://nprukzcs.directus.app/assets/${blogPost.image}`"
      alt="Image for "
      class="mx-auto rounded shadow max-h-96 max-w-full object-contain mb-8"
    >

    <h1 class="text-2xl font-bold">{{ blogPost.title }}</h1>
    <div class="text-xs text-gray-600 mb-2">{{ blogPost.date_created | parseDate }}</div>

    <article v-html="$md.render(this.blogPost.content)" class="prose max-w-none"></article>

    <div v-if="blogPost.restaurants.length > 0" class="my-8">
      <h2 class="mb-2 font-bold">Restaurants gekoppeld aan deze blogpost</h2>
      <RestaurantsList
        :restaurants="blogPost.restaurants"
      />
    </div>
  </div>

  <div v-else>
    <Loader text="Blogpost wordt geladen"></Loader>
  </div>
</template>

<script>
import Loader from '~/components/Loader';
import Alert from '~/components/Alert';
import RestaurantsList from '~/components/lists/RestaurantsList';

export default {
  name: 'BlogPostsShow',
  components: {Loader, Alert, RestaurantsList},
  data() {
    return {
      blogPost: null
    }
  },
  async fetch() {
    await this.fetchData();
  },
  head() {
    return {
      title: this.blogPost ? this.blogPost.title : 'Blogpost',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.blogPost ? this.blogPost.description : null
        }
      ]
    }
  },
  methods: {
    async fetchData() {
      this.blogPost = await this
        .$axios
        .$get('https://nprukzcs.directus.app/items/blog_posts', {
          params: {
            'filter[slug][_eq]': this.$route.params.slug,
            'fields': 'restaurants.*,image,title,content,description,date_created'
          },
        })
        .then((data) => {
          return data.data[0];
        });
    }
  },
  created() {
    this.$store.commit('meta/setPreviousText', 'Terug naar alle blog posts');
    this.$store.commit('meta/setPreviousLink', '/blog');
  }
}
</script>
