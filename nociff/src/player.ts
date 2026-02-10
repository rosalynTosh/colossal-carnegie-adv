import { fault, FormatString, output } from "./formatting";
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

const SHORT_DIR_WORD: { [dir in Dir]: string } = {
    "north": "n",
    "northeast": "ne",
    "east": "e",
    "southeast": "se",
    "south": "s",
    "southwest": "sw",
    "west": "w",
    "northwest": "nw",
    "down": "d",
    "up": "u"
} as const satisfies { [word in Dir]: string };

function uppercase(str: string): string {
    if (str != str.toLowerCase()) {
        return str;
    }

    const words = str.split(" ");

    return words.map((w) => /*["a", "an", "the", "of"].includes(w) && i != 0 ? w : */w[0].toUpperCase() + w.slice(1)).join(" ");
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
        return [{ type: "output", str: "Colossal Carnegie Adventure I\n\n" }, ...this.printRoom(), { type: "dbg", str: "\nFarnam is in: " + this.world.getFarnamRoom().id }];
    }

    private printRoom(): FormatString {
        const room = this.room.print(this.world.findRoomItems(this.room.id)!, this.world, this);
        const items = this.world.findRoomItems(this.room.id)!.flatMap(i => output(i.id in this.room.itemStrs ? this.room.itemStrs[i.id] : "\n" + uppercase(i.aOrAn[0]) + " " + i.name + " is lying on the ground."));

        return [...room, ...items];
    }

    private runUserInputInner(input: string): FormatString {
        const words = input.replace(/\s+/g, " ").trim().split(" ");

        if (words.length == 0 || words[0] == "") {
            return output("Come again?");
        }

        const firstWord = words[0].toLowerCase();

        switch (firstWord) {
            case "look":
            case "l": {
                if (words.length > 1) {
                    return output("Don't know how to do that. Did you want to say 'look' ('l' for short)?");
                }

                return this.printRoom();
            }
            case "inventory":
            case "inv":
            case "i":
            case "carrying":
            case "holding":
            case "items": {
                if (words.length > 1) {
                    return output("Don't know how to do that. Did you want to say 'inventory' ('inv'/'i' for short)?");
                }

                return output(this.inv.length == 0 ? "You're not holding anything." : "You're holding the following items:\n" + this.inv.map(i => "- " + uppercase(i.name)).join("\n"));
            }
            case "pause":
            case "still":
            case "stay":
            case "wait": {
                if (words.length > 1 && !(firstWord == "stay" && words[1].toLowerCase() == "still")) {
                    return output("Don't know how to do that. Did you want to say 'stay still' ('wait' for short)?");
                }

                this.world.tick();

                return this.printRoom();
            }
            case "move":
            case "go":
            case "walk": {
                if (words.length < 2 || words[1] == "") {
                    return output("Which way?");
                }

                const sndWord = words[1].toLowerCase();

                if (sndWord in DIR_WORDS) {
                    const dir = DIR_WORDS[sndWord];

                    if (words.length > 2) {
                        return output("Don't know how to do that. Did you want to say 'move " + dir + "' ('" + dir + "'/'" + SHORT_DIR_WORD[dir] + "' for short)?");
                    }

                    return this.move(dir);
                }

                return output("Don't know which way '" + words[1] + "' is");
            }
            case "take":
            case "get":
            case "grab":
            case "hold":
            case "collect":
            case "fetch": {
                return this.pickUp(words.slice(1), words[0]);
            }
            case "pick": {
                if (words[1] == "up") {
                    return this.pickUp(words.slice(2), words.slice(0, 2).join(" "));
                } else {
                    return output("I don't know how to 'pick'. Did you want to say 'pick up' ('get' for short)?");
                }
            }
            default: {
                if (firstWord in DIR_WORDS && words.length == 1) {
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

                return output((roomDir.say === undefined ? "" : roomDir.say + "\n\n") + this.printRoom());
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

                    return output((roomDir.say === undefined ? "" : roomDir.say + "\n\n") + this.printRoom());
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

    private pickUp(nounPhrase: string[], commandWord: string): FormatString {
        const noun = nounPhrase.join(" ");

        if (noun == "") {
            return output("What should I " + commandWord.toLowerCase() + "?");
        }

        const roomItems = this.world.findRoomItems(this.room.id)!;

        for (let i = 0; i < roomItems.length; i++) {
            const item = this.room.items[i];

            if (item.nouns.includes(noun)) {
                this.inv.push(item);
                roomItems.splice(i, 1);

                return output("Picked up " + noun + ".");
            }
        }

        return output("I can't find any '" + noun + "'.");
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