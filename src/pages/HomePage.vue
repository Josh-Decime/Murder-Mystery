<template>
  <section class="container mt-4">
    <h2 v-if="!gameOver">Round: {{ round }}</h2>
    <h3 v-if="!gameOver">Deaths: {{ deaths }}</h3>

    <!-- Game Over Screen -->
    <div v-if="gameOver" class="game-over-message">
      <h2>{{ finalMessage }}</h2>
    </div>

    <!-- Show locations only if the game isn't over -->
    <div v-if="!gameOver" class="row g-3">
      <div class="col-md-4" v-for="location in locations" :key="location.name">
        <div class="location-box">
          <h3>{{ location.name }}</h3>
          <div v-for="character in location.characters" :key="character.id" class="character-box"
            :class="{ 'dead': character.isDead }" @click="accuseMurderer(character.id)">
            <img :src="character.img" class="character-img" />
            <p>{{ character.name }} <span v-if="character.isDead">(Dead)</span></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Buttons: Only "Play Another?" is shown when gameOver is true -->
    <button v-if="!gameOver" class="btn btn-primary mt-3" @click="nextRound">Next Round</button>
    <button v-if="!gameOver" class="btn btn-danger mt-3" @click="guessMurderer">Guess the Murderer (Type Name)</button>
    <button class="btn btn-success mt-3" @click="resetGame">{{ restartButtonText }}</button>

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
    const gameOver = computed(() => AppState.gameState.gameOver);
    const finalMessage = computed(() => AppState.gameState.finalMessage);
    const restartButtonText = computed(() => gameOver.value ? "Play Another?" : "Restart Game");

    function resetGame() {
      gameService.resetGame();
    }

    function nextRound() {
      gameService.nextRound();
    }

    function guessMurderer() {
      const suspectName = prompt("Enter the name of your suspect:");
      if (suspectName) {
        gameService.accuseMurderer(suspectName);
      }
    }

    function accuseMurderer(suspectId) {
      gameService.accuseMurderer(suspectId);
    }

    onMounted(() => {
      gameService.initializeGame();
    });

    return {
      locations,
      round,
      deaths,
      gameOver,
      finalMessage,
      restartButtonText,
      nextRound,
      resetGame,
      guessMurderer,
      accuseMurderer
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
  cursor: pointer;
  transition: transform 0.2s ease;
}

.character-box:hover {
  transform: scale(1.1);
}

.character-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.dead {
  opacity: 0.5;
  pointer-events: none;
}

.game-over-message {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0;
}
</style>
