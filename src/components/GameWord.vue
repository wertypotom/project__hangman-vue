<template>
  <div class="word">
    <span v-for="(w, index) in word" :key="index" class="letter">
      <template v-if="correctLetters.includes(w)">{{ w }}</template>
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  word: string;
  correctLetters: string[];
}

defineProps<Props>();
</script>

<style scoped></style>
