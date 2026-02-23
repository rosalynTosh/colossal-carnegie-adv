import { Room } from "./rooms";
import { World } from "./world";

interface WanderMode {
    type: "wander";
}

interface TriggeredMode {
    type: "triggered";
    targRoomId: string;
}

type Mode = WanderMode | TriggeredMode;

export class Farnam {
    private world: World;

    private room: Room;

    private mode: Mode;

    constructor(world: World, initRoom: Room) {
        this.world = world;

        this.room = initRoom;

        this.mode = {
            type: "wander"
        };
    }

    public getRoom(): Room {
        return this.room;
    }

    public trigger(targRoomId: string) {
        this.mode = {
            type: "triggered",
            targRoomId
        };
    }

    public tick() {
        switch (this.mode.type) {
            case "wander": {
                this.wander();

                break;
            }
            case "triggered": {
                const dist = this.pathfindTo(this.mode.targRoomId);

                if (dist == 0 || dist == Infinity) {
                    this.mode = {
                        type: "wander"
                    };
                }

                break;
            }
        }
    }

    private wander() {
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

    private pathfindTo(targRoomId: string): number {
        if (this.room.id == targRoomId) {
            return 0;
        }

        interface FrontNode {
            i: number;
            stepRoom: Room | null;
            room: Room;
        }

        const seen = new Set([this.room.id]);
        const front: FrontNode[] = [{
            i: 0,
            stepRoom: null,
            room: this.room
        }];

        while (front.length != 0) {
            const node = front.shift()!;

            for (const dir in node.room.dirs) {
                const roomDir = node.room.dirs[dir as keyof typeof node.room.dirs];

                if (roomDir !== undefined && roomDir.type == "goto") {
                    const dstRoom = this.world.findRoom(roomDir.roomId);

                    if (dstRoom !== undefined && !seen.has(roomDir.roomId)) {
                        if (roomDir.roomId == targRoomId) {
                            this.room = node.stepRoom ?? dstRoom;

                            console.log(node);

                            return node.i;
                        }

                        seen.add(roomDir.roomId);
                        front.push({
                            i: node.i + 1,
                            stepRoom: node.stepRoom ?? dstRoom,
                            room: dstRoom
                        });
                    }
                }
            }
        }

        return Infinity;
    }
}