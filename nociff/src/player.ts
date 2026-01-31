import { Dir, Room } from "./rooms";
import { World } from "./world";

const DIR_WORDS: { [word: string]: Dir } = {
    "north": "north",
    "n": "north",

    "northeast": "northeast",
    "northe": "northeast",
    "neast": "northeast",
    "ne": "northeast",

    "east": "east",
    "e": "east",

    "southeast": "southeast",
    "southe": "southeast",
    "seast": "southeast",
    "se": "southeast",

    "south": "south",
    "s": "south",

    "southwest": "southwest",
    "southw": "southwest",
    "swest": "southwest",
    "sw": "southwest",

    "west": "west",
    "w": "west",

    "northwest": "northwest",
    "northw": "northwest",
    "nwest": "northwest",
    "nw": "northwest",

    "down": "down",
    "d": "down",

    "up": "up",
    "u": "up",
} as const satisfies { [word: string]: Dir };

export class Player {
    private world: World;

    private room: Room;

    constructor(world: World, initRoom: Room) {
        this.world = world;
        this.room = initRoom;
    }

    public initialPrintout(): string {
        return "Colossal Carnegie Adventure I\n\n" + this.room.print();
    }

    public runUserInput(input: string): string {
        const words = input.replace(/\s+/g, " ").trim().split(" ");

        if (words.length == 0 || words[0] == "") {
            return "Come again?";
        }

        const firstWord = words[0].toLowerCase();

        switch (firstWord) {
            case "move":
            case "go":
            case "walk": {
                if (words.length < 2 || words[1] == "") {
                    return "Which way?";
                }

                const sndWord = words[1].toLowerCase();

                if (sndWord in DIR_WORDS) {
                    return this.move(DIR_WORDS[sndWord]);
                }

                return "Don't know which way '" + words[1] + "' is";
            }
            default: {
                if (firstWord in DIR_WORDS) {
                    return this.move(DIR_WORDS[firstWord]);
                }

                return "Don't know how to '" + words[0] + "'";
            }
        }
    }

    private move(dir: Dir): string {
        const roomDir = this.room.dirs[dir];

        if (roomDir === undefined) {
            return "You cannot go " + dir + ".";
        }

        switch (roomDir.type) {
            case "goto": {
                const gotoRoom = this.world.findRoom(roomDir.roomId);

                if (gotoRoom === undefined) {
                    return "\xffFAULT: missing room " + roomDir.roomId;
                }

                this.room = gotoRoom;

                return gotoRoom.print();
            }
            case "door": {
                return "\xffFAULT: doors unimplemented";
            }
            case "say": {
                return roomDir.say;
            }
        }
    }
}