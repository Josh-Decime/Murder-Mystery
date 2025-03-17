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

  // ✅ Updated character list with names & images
  characters: [
    new Character({ name: "Ator", img: "/src/assets/img/Ator.png" }),
    new Character({ name: "Batty", img: "/src/assets/img/Batty.png" }),
    new Character({ name: "Blanth", img: "/src/assets/img/Blanth.png" }),
    new Character({ name: "Catado", img: "/src/assets/img/Catado.png" }),
    new Character({ name: "Daisy", img: "/src/assets/img/Daisy.png" }),
    new Character({ name: "Florpentine", img: "/src/assets/img/Florpentine.png" }),
    new Character({ name: "Froz", img: "/src/assets/img/Froz.png" }),
    new Character({ name: "Guan", img: "/src/assets/img/Guan.png" }),
    new Character({ name: "Harple", img: "/src/assets/img/Harple.png" }),
    new Character({ name: "Harto", img: "/src/assets/img/Harto.png" }),
    new Character({ name: "Hoooot", img: "/src/assets/img/Hoooot.png" }),
    new Character({ name: "Kiwi", img: "/src/assets/img/Kiwi.png" }),
    new Character({ name: "Larpy", img: "/src/assets/img/Larpy.png" }),
    new Character({ name: "Liean", img: "/src/assets/img/Liean.png" }),
    new Character({ name: "Mr Bombostic", img: "/src/assets/img/Mr Bombostic.png" }),
    new Character({ name: "Mr Glorp", img: "/src/assets/img/Mr Glorp.png" }),
    new Character({ name: "Mr Labalaba", img: "/src/assets/img/Mr Labalaba.png" }),
    new Character({ name: "Ninacado", img: "/src/assets/img/Ninacado.png" }),
    new Character({ name: "Shooby", img: "/src/assets/img/Shooby.png" }),
    new Character({ name: "Spec", img: "/src/assets/img/Spec.png" }),
    new Character({ name: "Swirl", img: "/src/assets/img/Swirl.png" }),
    new Character({ name: "Timtam", img: "/src/assets/img/Timtam.png" }),
    new Character({ name: "Toc", img: "/src/assets/img/Toc.png" }),
    new Character({ name: "Tus", img: "/src/assets/img/Tus.png" }),
    new Character({ name: "Uhm", img: "/src/assets/img/Uhm.png" }),
    new Character({ name: "Worble", img: "/src/assets/img/Worble.png" })
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
