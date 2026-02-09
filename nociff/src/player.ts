import { FormatString } from "./formatting";
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

function output(str: string): FormatString {
    return [{ type: "output", str }];
}

function fault(str: string): FormatString {
    return [{ type: "fault", str }];
}

export class Player {
    private world: World;

    private room: Room;

    constructor(world: World, initRoom: Room) {
        this.world = world;
        this.room = initRoom;
    }

    public initialPrintout(): FormatString {
        return [{ type: "output", str: "Colossal Carnegie Adventure I\n\n" }, ...this.room.print(), { type: "dbg", str: "\nFarnam is in: " + this.world.getFarnamRoom().id }];
    }

    public runUserInputInner(input: string): FormatString {
        const words = input.replace(/\s+/g, " ").trim().split(" ");

        if (words.length == 0 || words[0] == "") {
            return output("Come again?");
        }

        const firstWord = words[0].toLowerCase();

        switch (firstWord) {
            case "look":
            case "l": {
                return this.room.print();
            }
            case "pause":
            case "still":
            case "stay":
            case "wait": {
                this.world.tick();

                return this.room.print();
            }
            case "move":
            case "go":
            case "walk": {
                if (words.length < 2 || words[1] == "") {
                    return output("Which way?");
                }

                const sndWord = words[1].toLowerCase();

                if (sndWord in DIR_WORDS) {
                    return this.move(DIR_WORDS[sndWord]);
                }

                return output("Don't know which way '" + words[1] + "' is");
            }
            default: {
                if (firstWord in DIR_WORDS) {
                    return this.move(DIR_WORDS[firstWord]);
                }

                return output("Don't know how to '" + words[0] + "'");
            }
        }
    }

    public runUserInput(input: string): FormatString {
        return [...this.runUserInputInner(input), { type: "dbg", str: "\nFarnam is in: " + this.world.getFarnamRoom().id }];
    }

    private move(dir: Dir): FormatString {
        const roomDir = this.room.dirs[dir];

        if (roomDir === undefined) {
            return output("You cannot go " + dir + ".");
        }

        switch (roomDir.type) {
            case "goto": {
                const gotoRoom = this.world.findRoom(roomDir.roomId);

                if (gotoRoom === undefined) {
                    return fault("FAULT: missing room " + roomDir.roomId);
                }

                this.room = gotoRoom;

                this.world.tick();

                return output((roomDir.say === undefined ? "" : roomDir.say + "\n\n") + gotoRoom.print());
            }
            case "door": {
                return fault("FAULT: doors unimplemented");
            }
            case "say": {
                return output(roomDir.say);
            }
        }
    }
}