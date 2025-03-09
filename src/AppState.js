import { reactive } from 'vue';
import { Character } from './models/Character.js';
import { Location } from "./models/Location.js";
import { GameState } from "./models/GameState.js";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  gameState: new GameState(),
  locations: [],
  characters: [],
  leaderboard: [],

  initializeGame(locationsCount = 4) {
    // Create locations
    this.locations = [];
    for (let i = 1; i <= locationsCount; i++) {
      this.locations.push(new Location(`Location ${i}`));
    }

    // Create characters
    this.characters = [
      new Character({ name: "Mr. Glope" }),
      new Character({ name: "Miss Scarlet" }),
      new Character({ name: "Professor Plum" }),
      new Character({ name: "Colonel Mustard" })
    ];

    // Randomly assign characters to locations
    this.characters.forEach(character => {
      const randomLocation = this.locations[Math.floor(Math.random() * this.locations.length)];
      character.currentLocation = randomLocation.name;
      randomLocation.characters.push(character);
    });

    // Randomly choose murderer
    const murdererIndex = Math.floor(Math.random() * this.characters.length);
    this.characters[murdererIndex].isMurderer = true;
    this.gameState.murderer = this.characters[murdererIndex];

    this.gameState.round = 1;
    this.gameState.deaths = 0;
    this.gameState.gameOver = false;
  }
});

