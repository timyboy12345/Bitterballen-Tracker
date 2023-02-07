<template>
  <div class="p-4 pl-5 relative overflow-hidden rounded shadow bg-white">
    <div class="absolute bg-red-700 h-full w-1 left-0 top-0"></div>

    <slot name="title">
      <div class="text-md font-bold">{{ title }}</div>
    </slot>
    <slot name="content">
      <div class="text-gray-600 text-sm">{{ content }}</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['title', 'content']
}
</script>
