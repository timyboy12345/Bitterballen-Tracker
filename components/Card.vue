<template>
  <component
    :is="componentType"
    :class="{'hover:bg-gray-100': href, 'h-60': hideImage !== true}"
    :to="href"
    class="relative overflow-hidden rounded shadow bg-white transition duration-100"
  >
    <img v-if="image && hideImage !== true" :src="image">
    <div v-if="hideImage !== true" class="-z-1 w-full h-full bg-gray-300"></div>

    <div class="bg-inherit w-full bottom-0 left-0 p-4 overflow-hidden" :class="{'absolute': hideImage !== true}">
      <slot name="title">
        <h2 class="font-bold">{{ title }}</h2>
      </slot>
      <slot name="content">
        <p class="text-xs text-gray-800" v-if="content">{{ content }}</p>
      </slot>
    </div>
  </component>
</template>

<script>
export default {
  name: 'Card',
  props: ['image', 'title', 'content', 'href', 'hideImage'],
  computed: {
    componentType() {
      return Boolean(this.href) ? 'RouterLink' : 'div';
    }
  }
}
</script>
