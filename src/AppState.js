import { reactive } from "vue";
import { Character } from "./models/Character.js";
import { GameState } from "./models/GameState.js";
import { Location } from "./models/Location.js";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  gameState: new GameState(),

  // Predefined characters
  characters: [
    new Character({ name: "Mr. Glope" }),
    new Character({ name: "Miss Scarlet" }),
    new Character({ name: "Professor Plum" }),
    new Character({ name: "Colonel Mustard" }),
    new Character({ name: "Florpentine" }),
    new Character({ name: "Captain Sun" }),
    new Character({ name: "Mr Labalaba" }),
    new Character({ name: "Mr Bobostic" }),
  ],

  // ✅ Predefined locations (Only a subset will be used per game)
  allLocations: [
    new Location("Library"),
    new Location("Kitchen"),
    new Location("Ballroom"),
    new Location("Study"),
    new Location("Hall"),
    new Location("Conservatory"),
    new Location("Lounge"),
    new Location("Dining Room"),
    new Location("Billiard Room"),
    new Location("Cellar")
  ],

  locations: [], // Selected locations for this game

  // Game tracking variables
  leaderboard: [],
  round: 1,
  deaths: 0,
  gameOver: false
});
