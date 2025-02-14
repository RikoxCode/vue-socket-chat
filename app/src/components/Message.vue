<script setup>
defineProps(['msg']);
</script>

<template>
  <div v-if="msg.isSpecial" class='p-2 text-sm bg-yellow-100 rounded-lg'>
    <span class='font-semibold text-gray-700'>{{ msg.username }}:</span>
    <span class='ml-4 text-gray-600'>{{ msg.message }}</span>
  </div>

  <div v-else class="p-2 text-sm bg-gray-100 rounded-lg inline-flex max-w-full">
    <div class="flex w-fit max-w-full">
      <span class="font-semibold text-gray-700 flex-shrink-0">{{ msg.username }}:</span>
      <span class="ml-4 text-gray-600 break-words w-fit max-w-full inline-block">{{ msg.message }}</span>
    </div>
  </div>

</template>

<style scoped>

</style>