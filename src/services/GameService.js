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
        if (AppState.characters.length > 0 && AppState.locations.length > 0) {
            console.warn("Game is already initialized. Skipping re-initialization.");
            return;
        }
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
     * Resets the game and starts fresh.
     * - Ensures full reinitialization even if the game was already initialized.
     */
    resetGame() {
        console.log("Resetting game...");

        // ✅ Clear all locations and characters
        AppState.locations = [];
        AppState.characters.forEach(character => {
            character.isDead = false;
            character.currentLocation = null;
            character.isMurderer = false;
        });

        // ✅ Force reinitialize the game
        this.initializeGame(4); // Change 4 to the default number of locations you want

        console.log("Game has been reset.");
    }


    /**
  * Allows the player to accuse a character.
  * - Works for both typing a name and clicking a character.
  * - If correct, the player wins and UI updates.
  * - If incorrect, the game continues to the next round.
  */
    accuseMurderer(input) {
        console.log("Accusation received:", input);

        const suspect = AppState.characters.find(char =>
            char.name.toLowerCase() === input.toLowerCase() || String(char.id) === String(input)
        );

        if (!suspect) {
            window.alert("That character doesn't exist. Try again!");
            return;
        }

        if (suspect.isMurderer) {
            window.alert(`You got them! ${suspect.name} was the murderer! 🎉`);
            AppState.gameState.gameOver = true;

            // ✅ Store the final game summary
            AppState.gameState.finalMessage = `${suspect.name} killed ${AppState.gameState.deaths} people, in ${AppState.gameState.round} rounds, before they were caught.`;

            // ✅ Save to local leaderboard
            const newEntry = {
                murderer: suspect.name,
                deaths: AppState.gameState.deaths,
                rounds: AppState.gameState.round
            };

            let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
            leaderboard.push(newEntry);
            leaderboard.sort((a, b) => a.deaths - b.deaths || a.rounds - b.rounds); // ✅ Sort by least deaths, then rounds
            localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
        } else {
            window.alert(`Wrong guess! ${suspect.name} was innocent. Another round begins.`);
            this.nextRound();
        }
    }









}

export const gameService = new GameService();
