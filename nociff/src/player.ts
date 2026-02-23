import { fault, Printout, output, dbg } from "./formatting";
import { Item } from "./items";
import { Dir, Room, RoomDir } from "./rooms";
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

    public initialPrintout(): Printout[] {
        return [{ type: "output", str: "Colossal Carnegie Adventure I\n\n" }, ...this.printRoom()];
    }

    private printRoom(): Printout[] {
        const room = this.room.print(this.world.findRoomItems(this.room.id)!, this.world, this);
        const items = this.world.findRoomItems(this.room.id)!.flatMap(i => output(i.id in this.room.itemStrs ? this.room.itemStrs[i.id] : "\n" + uppercase(i.aOrAn[0]) + " " + i.name + " is lying on the ground."));
        const farnam = this.printFarnamStatus();

        return [...room, ...items, ...(farnam === null ? [] : [{ type: "output", str: "\n" } as Printout, ...farnam])];
    }

    private printFarnamStatus(): Printout[] | null {
        const farnamRoom = this.world.getFarnamRoom();

        if (this.room.id == farnamRoom.id) {
            return output("Farnam Jahanian is standing just over your shoulder.");
        }

        for (const dir in farnamRoom.dirs) {
            const roomDir = farnamRoom.dirs[dir as keyof typeof farnamRoom.dirs];

            if (roomDir === undefined) continue;

            if (roomDir.type == "goto" || roomDir.type == "door") {
                if (roomDir.roomId == this.room.id) {
                    return output("You hear footsteps " + ({
                        "north": "to your south",
                        "east": "to your west",
                        "south": "to your north",
                        "west": "to your east",
                        "up": "under you",
                        "down": "above you",
                        "northeast": "to your southwest",
                        "northwest": "to your southeast",
                        "southeast": "to your northwest",
                        "southwest": "to your northeast"
                    } as const satisfies { [dir in Dir]: string })[dir] + ".");
                }
            }
        }

        return null;
    }

    private runUserInputInner(input: string): Printout[] {
        const words = input.replace(/\s+/g, " ").trim().split(" ");

        if (words[0].startsWith("~")) {
            return this.runCommand(words);
        }

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
            case "fetch":
            case "claim": {
                return this.pickUp(words.slice(1), firstWord);
            }
            case "pick": {
                if (words[1].toLowerCase() == "up") {
                    return this.pickUp(words.slice(2), words.slice(0, 2).join(" "));
                } else {
                    return output("Don't know how to 'pick'. Did you want to say 'pick up' ('get' for short)?");
                }
            }
            case "drop":
            case "release": {
                return this.drop(words.slice(1), firstWord);
            }
            case "put": {
                if (["down", "away", "up", "aside"].includes(words[1].toLowerCase())) {
                    return this.drop(words.slice(2), words.slice(0, 2).join(" ").toLowerCase());
                } else {
                    return output("Don't know how to 'put'. Did you want to say 'put down' ('drop' for short)?");
                }
            }
            case "open": {
                return this.openDoor(words.slice(1));
            }
            case "close":
            case "slam": {
                return this.closeDoor(words.slice(1));
            }
            default: {
                if (firstWord in DIR_WORDS && words.length == 1) {
                    return this.move(DIR_WORDS[firstWord]);
                }

                return output("Don't know how to '" + words[0] + "'");
            }
        }
    }

    public runUserInput(input: string): Printout[] {
        return this.runUserInputInner(input);
    }

    private runCommand(words: string[]): Printout[] {
        switch (words[0].slice(1)) {
            case "goto": {
                const roomId = words[1] ?? "";
                const foundRoom = this.world.findRoom(roomId);

                if (foundRoom === undefined) {
                    return fault("FAULT: no room with id '" + roomId + "'");
                }

                this.room = foundRoom;

                return this.printRoom();
            }
            case "room": {
                return dbg(JSON.stringify(this.room, null, 4));
            }
            case "inv": {
                return dbg(JSON.stringify(this.inv));
            }
            case "farnam": {
                return dbg(this.world.getFarnamRoom().id);
            }
            case "open": {
                const doorId = words[1] ?? "";
                const foundDoor = this.world.setDoorOpenState(doorId, true);

                if (!foundDoor) {
                    return fault("FAULT: no door with id '" + doorId + "'");
                }

                return dbg("true");
            }
            case "close": {
                const doorId = words[1] ?? "";
                const foundDoor = this.world.setDoorOpenState(doorId, false);

                if (!foundDoor) {
                    return fault("FAULT: no door with id '" + doorId + "'");
                }

                return dbg("true");
            }
            case "validate": {
                return dbg(this.world.validate());
            }
            default: {
                return fault("FAULT: unknown command '" + words[0] + "'");
            }
        }
    }

    private move(dir: Dir): Printout[] {
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

                return [...output(roomDir.say === undefined ? "" : roomDir.say + "\n\n"), ...this.printRoom()];
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

                    return [...output((roomDir.say === undefined ? "" : roomDir.say + "\n\n")), ...this.printRoom()];
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

    private pickUp(nounPhrase: string[], commandWord: string): Printout[] {
        const noun = nounPhrase.join(" ");

        if (noun == "") {
            return output("What are you trying to " + commandWord + "?");
        }

        const roomItems = this.world.findRoomItems(this.room.id)!;

        let pfixMatch: string | null = null;
        for (let i = 0; i < roomItems.length; i++) {
            const item = this.room.items[i];

            for (const match of item.nouns.map(r => noun.match(r))) {
                if (match === null || match.index != 0) continue;

                if (noun.length != match[0].length) {
                    if (pfixMatch === null || match[0].length < pfixMatch.length) {
                        pfixMatch = match[0];
                    }

                    continue;
                }

                this.inv.push(item);
                roomItems.splice(i, 1);

                this.world.tick();

                return output("Picked up " + noun + ".");
            }
        }

        if (pfixMatch !== null) {
            return output("Not sure how to interpret that. Do you want to '" + commandWord + " " + pfixMatch + "'?");
        }

        return output("Can't find any '" + noun + "'.");
    }

    private drop(nounPhrase: string[], commandWord: string): Printout[] {
        const noun = nounPhrase.join(" ");

        if (noun == "") {
            return output("What are you trying to " + commandWord + "?");
        }

        let pfixMatch: string | null = null;
        for (let i = 0; i < this.inv.length; i++) {
            const item = this.inv[i];

            for (const match of item.nouns.map(r => noun.match(r))) {
                if (match === null || match.index != 0) continue;

                if (noun.length != match[0].length) {
                    if (pfixMatch === null || match[0].length < pfixMatch.length) {
                        pfixMatch = match[0];
                    }

                    continue;
                }

                this.world.findRoomItems(this.room.id)!.push(item);
                this.inv.splice(i, 1);

                this.world.tick();

                return output("Dropped " + noun + ".");
            }
        }

        if (pfixMatch !== null) {
            return output("Not sure how to interpret that. Do you want to '" + commandWord + " " + pfixMatch + "'?");
        }

        return output("Can't find any '" + noun + "'.");
    }

    private openDoor(nounPhrase: string[]): Printout[] {
        const noun = nounPhrase.join(" ");

        const roomDoors = [];
        let door: RoomDir | undefined = undefined;

        let pfixMatch: string | null = null;
        dirs: for (const dir in this.room.dirs) {
            const roomDir = this.room.dirs[dir as keyof typeof this.room.dirs];

            if (roomDir !== undefined && roomDir.type == "door") {
                roomDoors.push(roomDir);

                for (const match of roomDir.doorNouns.map(r => noun.match(r))) {
                    if (match === null || match.index != 0) continue;

                    if (noun.length != match[0].length) {
                        if (pfixMatch === null || match[0].length < pfixMatch.length) {
                            pfixMatch = match[0];
                        }

                        continue;
                    }

                    door = roomDir;

                    break dirs;
                }
            }
        }

        if (noun == "" && roomDoors.length == 1) {
            door = roomDoors[0];
        }

        if (door === undefined) {
            if (noun == "" && roomDoors.length != 0) {
                return output("What are you trying to open?");
            } else if (noun == "") {
                return output("Can't find any doors to open.");
            } else if (pfixMatch !== null) {
                return output("Not sure how to interpret that. Do you want to 'open " + pfixMatch + "'?");
            } else {
                return output("Can't find any '" + noun + "' to open.");
            }
        }

        if (this.world.doorIsOpen(door.doorId)) {
            return output(door.sayOnAlreadyOpen ?? "It's already open.");
        }

        if (!door.canOpen && (door.keyItem === null || !this.inv.some(i => i.id == door.keyItem))) {
            return output(door.sayOnNoItem ?? "You can't open this door.");
        }

        this.world.setDoorOpenState(door.doorId, true);

        return output(door.sayOnOpen ?? "You open it.");
    }

    private closeDoor(nounPhrase: string[]): Printout[] {
        const noun = nounPhrase.join(" ");

        const roomDoors = [];
        let door: RoomDir | undefined = undefined;

        let pfixMatch: string | null = null;
        dirs: for (const dir in this.room.dirs) {
            const roomDir = this.room.dirs[dir as keyof typeof this.room.dirs];

            if (roomDir !== undefined && roomDir.type == "door") {
                roomDoors.push(roomDir);

                for (const match of roomDir.doorNouns.map(r => noun.match(r))) {
                    if (match === null || match.index != 0) continue;

                    if (noun.length != match[0].length) {
                        if (pfixMatch === null || match[0].length < pfixMatch.length) {
                            pfixMatch = match[0];
                        }

                        continue;
                    }

                    door = roomDir;

                    break dirs;
                }
            }
        }

        if (noun == "" && roomDoors.length == 1) {
            door = roomDoors[0];
        }

        if (door === undefined) {
            if (noun == "" && roomDoors.length != 0) {
                return output("What are you trying to close?");
            } else if (noun == "") {
                return output("Can't find any doors to close.");
            } else if (pfixMatch !== null) {
                return output("Not sure how to interpret that. Do you want to 'close " + pfixMatch + "'?");
            } else {
                return output("Can't find any '" + noun + "' to close.");
            }
        }

        if (!this.world.doorIsOpen(door.doorId)) {
            return output(door.sayOnAlreadyOpen ?? "It's already closed.");
        }

        if (!door.canClose) {
            return output(door.sayOnClose ?? "You can't close this door.");
        }

        this.world.setDoorOpenState(door.doorId, false);

        this.world.triggerFarnam(this.room.id);

        return output(door.sayOnClose ?? "You close it.");
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