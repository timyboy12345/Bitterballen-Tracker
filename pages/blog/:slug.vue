<template>
  <div v-if="blogPost">
    <img
      v-if="blogPost.image"
      :src="`https://nprukzcs.directus.app/assets/${blogPost.image}`"
      alt="Afbeelding voor blogpost"
      class="mx-auto rounded shadow max-h-96 max-w-full object-contain mb-8"
    >

    <h1 class="text-2xl font-bold">{{ blogPost.title }}</h1>
    <div class="text-xs text-gray-600 mb-2">{{ blogPost.date_created | parseDate }}</div>

    <div class="grid gap-y-4">
      <div v-for="content of blogPost.cms_content">
        <article
          v-if="content.collection === 'blog_section_text'"
          class="prose max-w-none"
          v-html="$md.render(content.item.content)"
        />

        <div
          v-if="content.collection === 'blog_section_restaurant'"
          class="grid md:grid-cols-3 items-center my-8 md:my-4 gap-y-4 md:gap-x-4"
        >
          <div class="gap-y-1 md:col-span-2">
            <h3 class="font-bold text-lg">{{ content.item.restaurant.name }}</h3>
            <article v-html="$md.render(content.item.content)" class="prose max-w-none"/>
            <RouterLink class="underline" :to="`/restaurants/${content.item.restaurant.slug}`">Lees meer</RouterLink>
          </div>

          <RouterLink class="order-first md:order-last overflow-hidden" :to="`/restaurants/${content.item.restaurant.slug}`">
            <img
              :alt="`Afbeelding van ${content.item.restaurant.name}`"
              :src="`https://nprukzcs.directus.app/assets/${content.item.restaurant.image}`"
              class="rounded shadow overflow-hidden mx-auto"
            />
          </RouterLink>
        </div>
      </div>
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
            'fields': 'cms_content.item.*,cms_content.*,cms_content.item.restaurant.*,image,title,content,description,date_created'
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
