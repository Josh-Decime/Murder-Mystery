import { reactive } from "vue";
import { Character } from "./models/Character.js";
import { GameState } from "./models/GameState.js";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  gameState: new GameState(),

  // Predefined characters (AppState should hold character data)
  characters: [
    new Character({ name: "Mr. Glope" }),
    new Character({ name: "Miss Scarlet" }),
    new Character({ name: "Professor Plum" }),
    new Character({ name: "Colonel Mustard" })
  ],

  locations: [], // Locations will be generated dynamically

  // Game tracking variables (AppState should hold state, not logic)
  leaderboard: [],
  round: 1,
  deaths: 0,
  gameOver: false
});
