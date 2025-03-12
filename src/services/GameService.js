import { AppState } from "../AppState.js";
import { Location } from "../models/Location.js";

class GameService {
    /**
      * Initializes the game by:
      * - Selecting a subset of locations without adding duplicates.
      * - Assigning characters without re-creating them.
      * - Choosing a murderer.
      */
    initializeGame(locationsCount = 4) {
        // ✅ Select a new set of locations WITHOUT duplicating them
        AppState.locations = this.getRandomLocations(locationsCount);

        // ✅ Reset characters (but do not duplicate them)
        AppState.characters.forEach(character => {
            character.isDead = false;
            character.currentLocation = null;
            character.isMurderer = false;
        });

        // ✅ Assign characters to locations
        AppState.characters.forEach(character => {
            const randomLocation = AppState.locations[Math.floor(Math.random() * AppState.locations.length)];
            character.currentLocation = randomLocation.name;
            randomLocation.characters.push(character);
        });

        // ✅ Choose a new murderer
        const murdererIndex = Math.floor(Math.random() * AppState.characters.length);
        AppState.characters[murdererIndex].isMurderer = true;
        AppState.gameState.murderer = AppState.characters[murdererIndex];

        // ✅ Reset game state without duplication
        AppState.gameState.round = 1;
        AppState.gameState.deaths = 0;
        AppState.gameState.gameOver = false;

        // ✅ Force Vue to detect changes
        AppState.locations = [...AppState.locations];
        AppState.characters = [...AppState.characters];
    }


    /**
 * Selects a random subset of locations from all available locations.
 * @param {number} count - The number of locations to select.
 * @returns {Location[]} - The selected locations.
 */
    getRandomLocations(count) {
        const shuffled = [...AppState.allLocations].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }


    /**
     * Advances the game by one round:
     * - The murderer kills **one** random character in their location.
     * - All **living** characters move to a new random location.
     * - Dead characters remain in place as a visual indicator.
     */
    nextRound() {
        if (AppState.gameState.gameOver) return;

        const murderer = AppState.gameState.murderer;
        const murderLocation = AppState.locations.find(loc => loc.name === murderer.currentLocation);

        // ✅ Murderer can only kill ONE character in their current location
        const potentialVictims = murderLocation.characters.filter(char => !char.isMurderer && !char.isDead);
        if (potentialVictims.length > 0) {
            const victim = potentialVictims[Math.floor(Math.random() * potentialVictims.length)];
            victim.isDead = true;
            AppState.gameState.deaths++;
        }

        // ✅ Clear all locations before moving characters (except dead ones)
        AppState.locations.forEach(location => {
            location.characters = location.characters.filter(character => character.isDead);
        });

        // ✅ Move all non-dead characters (including the murderer)
        AppState.characters.forEach(character => {
            if (!character.isDead) {
                const newLocation = AppState.locations[Math.floor(Math.random() * AppState.locations.length)];
                character.currentLocation = newLocation.name;
                newLocation.characters.push(character);
            }
        });

        AppState.gameState.round++;

        // ✅ Force Vue to detect changes in reactive properties
        AppState.locations = [...AppState.locations];
        AppState.characters = [...AppState.characters];
    }


    /**
    * Resets the game and starts a new session.
    * - Clears previous assignments without duplicating characters or locations.
    * - Keeps the original characters and location list intact.
    */
    resetGame() {
        // ✅ Clear locations but do NOT add duplicates
        AppState.locations.forEach(location => {
            location.characters = [];
        });

        // ✅ Restart the game with a fresh setup
        this.initializeGame(AppState.locations.length);
    }

}

export const gameService = new GameService();
