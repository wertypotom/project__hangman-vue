<template>
  <GameHeader />
  {{ correctLetters }}
  {{ incorrectLetters }}
  <div class="game-container">
    <GamePicture :error-count="incorrectLetters.length" />
    <GameError :incorrectLetters="incorrectLetters" />

    <GameWord :word="word" :correctLetters="correctLetters" />
  </div>

  <!-- Container for final message -->
  <GameResponse
    v-if="!!gameStatus"
    :game-status="gameStatus"
    :word="word"
    @playAgain="playAgain"
  />

  <!-- Notification -->
  <GameLetterStatus ref="letterStatus" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import {
  GameError,
  GameHeader,
  GameLetterStatus,
  GamePicture,
  GameResponse,
  GameWord,
} from './components';
import { GameStatus } from './types/Game';

const word = ref<string>('chelovek');
const letters = ref<string[]>([]);
const letterStatus = ref<InstanceType<typeof GameLetterStatus> | null>(null);
const gameStatus = ref<GameStatus | null>(null);
const isPlaying = ref<boolean>(true);

const correctLetters = computed(() => {
  return letters.value.filter((l) => word.value.includes(l));
});

const incorrectLetters = computed(() => {
  return letters.value.filter((l) => !word.value.includes(l));
});

const getRandomWord = async () => {
  try {
    const data = await fetch('https://random-word-api.herokuapp.com/word');
    const res = await data.json();
    word.value = res[0];
  } catch (err) {
    alert((err as Error).message);
  }
};

const playAgain = () => {
  getRandomWord();
  isPlaying.value = true;
  gameStatus.value = null;
  letters.value = [];
};

onMounted(getRandomWord);

document.addEventListener('keydown', ({ key }) => {
  if (!isPlaying.value) return;

  if (letters.value.includes(key)) {
    letterStatus.value?.toggleShow();

    setTimeout(() => letterStatus.value?.toggleShow(), 2000);
    return;
  }

  if (/^[A-Za-z]$/.test(key)) letters.value.push(key.toLowerCase());
});

watch(correctLetters, () => {
  if (
    correctLetters.value.length === Array.from(new Set([...word.value])).length
  ) {
    gameStatus.value = 'win';
    isPlaying.value = false;
  }
});

watch(incorrectLetters, () => {
  if (incorrectLetters.value.length === 5) {
    gameStatus.value = 'lose';
    isPlaying.value = false;
  }
});
</script>

<style scoped></style>
