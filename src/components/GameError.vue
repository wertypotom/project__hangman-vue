<template>
  <div class="wrong-letters-container">
    <div class="wrong-letters">
      <p>Ошибки</p>
      <span>
        {{ incorrectLetters.join(', ') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  incorrectLetters: string[];
}

defineProps<Props>();
</script>

<style scoped></style>
