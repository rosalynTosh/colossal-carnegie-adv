import { Door } from "./doors";
import { Farnam } from "./farnam";
import { Item } from "./items";
import { Dir, Room } from "./rooms";

const INV_DIRS: { [dir in Dir]: Dir } = {
    "north": "south",
    "east": "west",
    "south": "north",
    "west": "east",
    "up": "down",
    "down": "up",
    "northeast": "southwest",
    "northwest": "southeast",
    "southeast": "northwest",
    "southwest": "northeast"
};

export class World {
    public rooms: Map<string, Room>;
    public roomItems: Map<string, Item[]>;

    public doors: Map<string, Door>;
    public doorsOpen: Map<string, boolean>;

    public farnam: Farnam;

    constructor(roomsList: Room[], doorsList: Door[], farnamInitRoom: Room) {
        this.rooms = new Map();
        this.roomItems = new Map();

        for (const room of roomsList) {
            this.rooms.set(room.id, room);
            this.roomItems.set(room.id, [...room.items]);
        }

        this.doors = new Map();
        this.doorsOpen = new Map();

        for (const door of doorsList) {
            this.doors.set(door.id, door);
            this.doorsOpen.set(door.id, door.initOpen);
        }

        this.farnam = new Farnam(this, farnamInitRoom);
    }

    public findRoom(id: string): Room | undefined {
        return this.rooms.get(id);
    }

    public findRoomItems(id: string): Item[] | undefined {
        return this.roomItems.get(id);
    }

    public doorIsOpen(id: string): boolean | undefined {
        return this.doorsOpen.get(id);
    }

    public setDoorOpenState(id: string, open: boolean): boolean {
        if (this.doorsOpen.has(id)) {
            this.doorsOpen.set(id, open);

            return true;
        }

        return false;
    }

    public getFarnamRoom(): Room {
        return this.farnam.getRoom();
    }

    public triggerFarnam(targRoomId: string) {
        this.farnam.trigger(targRoomId);
    }

    public tick() {
        this.farnam.tick();
    }

    public validate(): string {
        const missingRooms: Map<string, string[]> = new Map();
        const incongruities: string[] = [];

        for (const room of this.rooms.values()) {
            for (const dir in room.dirs) {
                const roomDir = room.dirs[dir as keyof typeof room.dirs];

                if (roomDir === undefined) continue;

                if (roomDir.type == "goto" || roomDir.type == "door") {
                    const gotoRoom = this.rooms.get(roomDir.roomId);

                    if (gotoRoom === undefined) {
                        const sources = missingRooms.get(roomDir.roomId);
                        if (sources === undefined) {
                            missingRooms.set(roomDir.roomId, [room.id + "->" + dir]);
                        } else {
                            sources.push(room.id + "->" + dir);
                        }
                    } else {
                        if (roomDir.roomId == room.id) {
                            incongruities.push("loopback: " + room.id + " -> " + dir);
                        } else {
                            const invDir = gotoRoom.dirs[INV_DIRS[dir as Dir]];

                            if (invDir === undefined) {
                                incongruities.push("incongruity: " + room.id + "->" + dir + "; " + gotoRoom.id + "->" + INV_DIRS[dir as Dir] + " is missing");
                            } else if (invDir.type != roomDir.type) {
                                incongruities.push("incongruity: " + room.id + "->" + dir + "; " + gotoRoom.id + "->" + INV_DIRS[dir as Dir] + " is different type (" + roomDir.type + " vs. " + invDir.type + ")");
                            } else if (invDir.roomId != room.id) {
                                incongruities.push("incongruity: " + room.id + "->" + dir + "; " + gotoRoom.id + "->" + INV_DIRS[dir as Dir] + "->" + invDir.roomId);
                            }
                        }
                    }
                }
            }
        }

        return [...[...missingRooms].map(([roomId, sources]) => "missing room: " + roomId + " (" + sources.join(", ") + ")"), ...incongruities].join("\n");
    }
}