import { Room } from "./rooms";

export class World {
    private rooms: Map<string, Room>;

    constructor(roomsList: Room[]) {
        this.rooms = new Map();

        for (const [i, room] of roomsList.entries()) {
            this.rooms.set(i.toString(), room);
        }
    }

    public findRoom(id: string): Room | undefined {
        return this.rooms.get(id);
    }
}