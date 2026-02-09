import { Farnam } from "./farnam";
import { Room } from "./rooms";

export class World {
    private rooms: Map<string, Room>;
    private farnam: Farnam;

    constructor(roomsList: Room[], farnamInitRoom: Room) {
        this.rooms = new Map();

        for (const room of roomsList) {
            this.rooms.set(room.id, room);
        }

        this.farnam = new Farnam(this, farnamInitRoom);
    }

    public findRoom(id: string): Room | undefined {
        return this.rooms.get(id);
    }

    public getFarnamRoom(): Room {
        return this.farnam.getRoom();
    }

    public tick() {
        this.farnam.tick();
    }
}