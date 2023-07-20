import { ref, onMounted } from 'vue';

export default function useGetRandomWord() {
  const word = ref<string>('');

  const getRandomWord = async () => {
    try {
      const data = await fetch('https://random-word-api.herokuapp.com/word');
      const res = await data.json();
      word.value = res[0];
    } catch (err) {
      alert((err as Error).message);
    }
  };

  onMounted(getRandomWord);

  return { word, getRandomWord };
}
