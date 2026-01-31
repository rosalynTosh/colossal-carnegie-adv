import { CAMPUS_ROOMS_OBJ } from "./rooms/campus";
import { DOHERTY_ROOMS_OBJ } from "./rooms/doherty";

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

export function goto(roomId: string): RoomDir {
    return {
        type: "goto",
        roomId
    };
}

export function say(say: string): RoomDir {
    return {
        type: "say",
        say
    };
}

export function basicRoom(id: string, short: string, long: string, dirs: Room["dirs"]): Room {
    return {
        id,

        print: () => short + "\n" + long,

        dirs
    };
}

export const ROOMS_OBJ = {
    ...CAMPUS_ROOMS_OBJ,

    ...DOHERTY_ROOMS_OBJ
} as const satisfies { [id: string]: Room };

for (const roomId in ROOMS_OBJ) {
    const room: Room = ROOMS_OBJ[roomId as keyof typeof ROOMS_OBJ];

    if (roomId.replace(/_/g, ".") !== room.id) {
        throw new Error("roomId mismatch for '" + roomId + "' vs. '" + room.id + "'");
    }
}