import { World } from "./world";

export class Player {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    public initialPrintout(): string {
        return "Colossal Carnegie Adventure I";
    }

    public runUserInput(input: string): string {
        return input;
    }
}