<template>
  <div class="popup-container">
    <div class="popup">
      <h2>
        <h2 v-if="gameStatus === 'win'">Congratulations, you won ! 😃</h2>
        <h2 v-if="gameStatus === 'lose'">You lost. 😕</h2>
      </h2>
      <h3 v-if="gameStatus === 'lose'">...word: {{ word }}</h3>
      <button @click="$emit('playAgain')">Сыграть еще раз</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameStatus } from './../types/Game';

interface Props {
  gameStatus: GameStatus;
  word: string;
}

interface Emits {
  (e: 'playAgain'): void;
}

defineEmits<Emits>();
defineProps<Props>();
</script>

<style scoped></style>
