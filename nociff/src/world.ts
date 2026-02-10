import { Door } from "./doors";
import { Farnam } from "./farnam";
import { Item } from "./items";
import { Room } from "./rooms";

export class World {
    private rooms: Map<string, Room>;
    private roomItems: Map<string, Item[]>;

    private doors: Map<string, Door>;
    private doorsOpen: Map<string, boolean>;

    private farnam: Farnam;

    constructor(roomsList: Room[], doorsList: Door[], farnamInitRoom: Room) {
        this.rooms = new Map();
        this.roomItems = new Map();

        for (const room of roomsList) {
            this.rooms.set(room.id, room);
            this.roomItems.set(room.id, room.items);
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
}