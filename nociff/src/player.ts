import { FormatString } from "./formatting";
import { Item } from "./items";
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

    private inv: Item[];
    private counters: Map<string, number>;

    constructor(world: World, initRoom: Room) {
        this.world = world;

        this.room = initRoom;

        this.inv = [];
        this.counters = new Map();
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
                if (this.world.doorIsOpen(roomDir.doorId)) {
                    const gotoRoom = this.world.findRoom(roomDir.roomId);

                    if (gotoRoom === undefined) {
                        return fault("FAULT: missing room " + roomDir.roomId);
                    }

                    const oldRoomId = this.room.id;

                    this.room = gotoRoom;

                    this.world.tick();

                    if (roomDir.closeOnUse) {
                        this.world.setDoorOpenState(roomDir.doorId, false);

                        this.world.triggerFarnam(oldRoomId);
                    }

                    return output((roomDir.say === undefined ? "" : roomDir.say + "\n\n") + gotoRoom.print());
                } else {
                    if (roomDir.sayIfClosed === undefined) {
                        return output("The door is closed.");
                    } else {
                        return output(roomDir.sayIfClosed);
                    }
                }
            }
            case "say": {
                return output(roomDir.say);
            }
        }
    }

    public getCounter(id: string): number {
        return this.counters.get(id) ?? 0;
    }

    public incCounter(id: string, by: number = 1) {
        this.counters.set(id, (this.counters.get(id) ?? 0) + by);
    }

    public setCounter(id: string, to: number) {
        this.counters.set(id, to);
    }

    public addItem(item: Item) {
        this.inv.push(item);
    }

    public hasItem(itemId: string): boolean {
        return this.inv.some(i => i.id == itemId);
    }

    public deleteItem(itemId: string) {
        const index = this.inv.findIndex(i => i.id == itemId);

        if (index == -1) return;

        this.inv = [...this.inv.slice(0, index), ...this.inv.slice(index + 1)];
    }
}