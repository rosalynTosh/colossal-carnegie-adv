import { CAMPUS_ROOMS } from "./rooms/campus";
import { DOHERTY_ROOMS } from "./rooms/doherty";
import { LIMINAL_ROOMS } from "./rooms/liminal";
import { WEAN_ROOMS } from "./rooms/wean";

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

export const ROOMS: Room[] = [
    ...CAMPUS_ROOMS,

    ...DOHERTY_ROOMS,
    ...LIMINAL_ROOMS,
    ...WEAN_ROOMS
];

for (let i = 1; i < ROOMS.length; i++) {
    for (let j = 0; j < i; j++) {
        if (ROOMS[i].id == ROOMS[j].id) {
            throw new Error("duplicate roomId '" + ROOMS[i].id + " for indices " + i + ", " + j);
        }
    }
}