import { AppState } from "../AppState.js";
import { Location } from "../models/Location.js";

class GameService {
    /**
     * Initializes the game by:
     * - Creating the specified number of locations.
     * - Randomly assigning characters to locations.
     * - Selecting one character to be the murderer.
     */
    initializeGame(locationsCount = 4) {
        // Reset locations
        AppState.locations = [];
        for (let i = 1; i <= locationsCount; i++) {
            AppState.locations.push(new Location(`Location ${i}`));
        }

        // Reset game state
        AppState.gameState.round = 1;
        AppState.gameState.deaths = 0;
        AppState.gameState.gameOver = false;

        // ✅ Randomly assign characters to locations
        AppState.characters.forEach(character => {
            const randomLocation = AppState.locations[Math.floor(Math.random() * AppState.locations.length)];
            character.currentLocation = randomLocation.name;
            randomLocation.characters.push(character);
        });

        // ✅ Choose a murderer randomly
        const murdererIndex = Math.floor(Math.random() * AppState.characters.length);
        AppState.characters[murdererIndex].isMurderer = true;
        AppState.gameState.murderer = AppState.characters[murdererIndex];

        // ✅ Force Vue to recognize changes
        AppState.locations = [...AppState.locations];
        AppState.characters = [...AppState.characters];
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
     */
    resetGame() {
        this.initializeGame();
    }
}

export const gameService = new GameService();
