import { Room } from "./rooms";
import { World } from "./world";

export class Farnam {
    private world: World;

    private room: Room;

    constructor(world: World, initRoom: Room) {
        this.world = world;

        this.room = initRoom;
    }

    public getRoom(): Room {
        return this.room;
    }

    public tick() {
        const dstRooms = [];

        for (const dir in this.room.dirs) {
            const roomDir = this.room.dirs[dir as keyof typeof this.room.dirs];

            if (roomDir !== undefined && roomDir.type == "goto") {
                const dstRoom = this.world.findRoom(roomDir.roomId);

                if (dstRoom !== undefined) {
                    dstRooms.push(dstRoom);
                }
            }
        }

        if (dstRooms.length == 0) {
            // farnam is stuck

            return;
        }

        this.room = dstRooms[Math.floor(Math.random() * dstRooms.length)];
    }
}