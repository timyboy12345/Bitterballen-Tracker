<template>
  <div class="grid lg:grid-cols-2 gap-4">
    <RouterLink
      v-for="blogPost of blogPosts"
      :key="blogPost.id"
      :to="`/blog/${blogPost.slug}`"
      class="relative h-72 overflow-hidden rounded shadow bg-white hover:bg-gray-100 transition duration-100">
      <img
        v-if="blogPost.image"
        :src="`https://nprukzcs.directus.app/assets/${blogPost.image}`"
        alt="Afbeelding van blogpost"
        class="object-bottom object-cover w-full h-full"
      >

      <div class="-z-1 w-full h-full bg-gray-300"></div>

      <div class="bg-inherit w-full absolute bottom-0 left-0 p-4 overflow-hidden">
        <h2 class="font-bold">{{ blogPost.title }}</h2>
        <h3 class="text-xs text-gray-600 mb-2">{{ blogPost.date_created | parseDate }}</h3>
        <p class="text-xs text-gray-800">{{ blogPost.description }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'BlogPostsList',
  props: {
    blogPosts: {
      type: Array,
      required: true
    }
  }
}
</script>
