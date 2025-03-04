<template>
  <!-- <Example /> -->
  <section>
    <h1 v-for="character in characters">{{ character.name }}</h1>
  </section>
</template>

<script>
// import Example from '@/components/Example.vue';
import { AppState } from '../AppState.js';
import { computed, ref, watch, onMounted } from 'vue';
export default {
  setup() {
    const characters = computed(() => AppState.Characters)


    return {
      characters,
    }
  }
}


</script>


<style scoped lang="scss"></style>
