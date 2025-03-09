import { AppState } from "../AppState.js";

class GameService {
    nextRound() {
        if (AppState.gameState.gameOver) return;

        const murderer = AppState.gameState.murderer;
        const murderLocation = AppState.locations.find(loc => loc.name === murderer.currentLocation);
        const victims = murderLocation.characters.filter(char => !char.isMurderer && !char.isDead);

        if (victims.length > 0) {
            const victim = victims[Math.floor(Math.random() * victims.length)];
            victim.isDead = true;
            AppState.gameState.deaths++;
        }

        AppState.characters.forEach(character => {
            if (!character.isDead) {
                const newLocation = AppState.locations[Math.floor(Math.random() * AppState.locations.length)];
                character.currentLocation = newLocation.name;
            }
        });

        AppState.gameState.round++;
    }

    resetGame() {
        AppState.initializeGame();
    }
}

export const gameService = new GameService();
