import { generateId } from "@/utils/GenerateId.js";

export class Character {
    constructor(data) {
        this.id = data.id || generateId()
        this.name = data.name
        this.img = data.img
        //Add several clue types
    }
}