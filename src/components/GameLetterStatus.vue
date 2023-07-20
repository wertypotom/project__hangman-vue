<template>
  <div class="notification-container" :class="{ show: show }">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);

const toggleShow = () => {
  show.value = !show.value;
};

defineExpose({
  toggleShow,
});
</script>

<style scoped></style>
