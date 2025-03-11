<template>
  <section class="container mt-4">
    <h2>Round: {{ round }}</h2>
    <h3>Deaths: {{ deaths }}</h3>

    <div class="row g-3">
      <div class="col-md-4" v-for="location in locations" :key="location.name">
        <div class="location-box">
          <h3>{{ location.name }}</h3>
          <div v-for="character in location.characters" :key="character.id" class="character-box">
            <img :src="character.img" class="character-img" />
            <p>{{ character.name }} <span v-if="character.isDead">(Dead)</span></p>
          </div>
        </div>
      </div>
    </div>

    <button class="btn btn-primary mt-3" @click="nextRound">Next Round</button>
    <button class="btn btn-success mt-3" @click="resetGame">Restart Game</button>
  </section>
</template>

<script>
import { gameService } from "../services/GameService.js";
import { AppState } from "../AppState.js";
import { computed, onMounted } from "vue";

export default {
  setup() {
    const locations = computed(() => AppState.locations);
    const round = computed(() => AppState.gameState.round);
    const deaths = computed(() => AppState.gameState.deaths);

    /**
     * Resets the game when the player clicks "Restart Game".
     */
    function resetGame() {
      gameService.resetGame();
    }

    /**
     * Moves to the next round when the player clicks "Next Round".
     */
    function nextRound() {
      gameService.nextRound();
    }

    // Initialize game on first load
    onMounted(() => {
      gameService.initializeGame();
    });

    return {
      locations,
      round,
      deaths,
      nextRound,
      resetGame
    };
  }
};
</script>

<style scoped>
.location-box {
  border: 2px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  background: #f9f9f9;
}

.character-box {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.character-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
