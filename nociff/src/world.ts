import { Room } from "./rooms";

export class World {
    private rooms: Map<string, Room>;

    constructor(roomsList: Room[]) {
        this.rooms = new Map();

        for (const room of roomsList) {
            this.rooms.set(room.id, room);
        }
    }

    public findRoom(id: string): Room | undefined {
        return this.rooms.get(id);
    }
}