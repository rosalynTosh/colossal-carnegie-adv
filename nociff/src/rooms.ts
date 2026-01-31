export type Dir = "north" | "east" | "south" | "west" | "up" | "down" | "northeast" | "northwest" | "southeast" | "southwest";

export interface Room {
    id: string;

    print(): string;

    dirs: { [dir in Dir]?: RoomDir };
}

interface GotoRoomDir {
    type: "goto";
    roomId: string;
}

interface DoorRoomDir {
    type: "door";
    doorId: string;
}

interface SayRoomDir {
    type: "say";
    say: string;
}

export type RoomDir = GotoRoomDir | DoorRoomDir | SayRoomDir;

export const ROOMS_OBJ = {
    mall: {
        id: "mall",

        print: () => "mall",

        dirs: {
            north: { type: "goto", roomId: "doherty.1.west" }
        }
    },
    doherty_1_west: {
        id: "doherty.1.west",

        print: () => "doherty.1.west",

        dirs: {
            south: { type: "goto", roomId: "mall" },
            up: { type: "goto", roomId: "doherty.2.west" }
        }
    }
} as const satisfies { [id: string]: Room };

for (const roomId in ROOMS_OBJ) {
    const room: Room = ROOMS_OBJ[roomId as keyof typeof ROOMS_OBJ];

    if (roomId.replace(/_/g, ".") !== room.id) {
        throw new Error("roomId mismatch for '" + roomId + "' vs. '" + room.id + "'");
    }
}