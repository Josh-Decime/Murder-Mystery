import { generateId } from "@/utils/GenerateId.js";

export class Character {
    constructor(data) {
        this.id = data.id || generateId();
        this.name = data.name;
        this.img = data.img;
        this.isMurdered = false;
        this.isDead = false;
        this.currentLocation = data.currentLocation || null;
        //Add several clue types
    }
}