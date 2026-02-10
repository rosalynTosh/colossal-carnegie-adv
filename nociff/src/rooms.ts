import { FormatString } from "./formatting";
import { Item, ItemSpec } from "./items";
import { Player } from "./player";
import { CAMPUS_ROOMS } from "./rooms/campus";
import { DOHERTY_ROOMS } from "./rooms/doherty";
import { LIMINAL_ROOMS } from "./rooms/liminal";
import { WEAN_ROOMS } from "./rooms/wean";
import { World } from "./world";

export type Dir = "north" | "east" | "south" | "west" | "up" | "down" | "northeast" | "northwest" | "southeast" | "southwest";

export interface Room {
    readonly id: string;

    readonly print: (roomItems: Item[], world: World, player: Player) => FormatString;

    readonly dirs: { readonly [dir in Dir]?: RoomDir };

    readonly items: ReadonlyArray<ItemSpec>;
    readonly itemStrs: { readonly [itemId: string]: string };
}

interface GotoRoomDir {
    readonly type: "goto";
    readonly roomId: string;
    readonly say?: string | undefined;
}

interface DoorRoomDir {
    readonly type: "door";

    readonly roomId: string;
    readonly say?: string | undefined;

    readonly doorId: string;

    readonly doorNouns: ReadonlyArray<RegExp>;

    readonly canOpen: boolean;
    readonly canClose: boolean;
    readonly closeOnUse: boolean;
    readonly keyItem: string | null;

    readonly sayIfClosed?: string | undefined;
    readonly sayOnOpen?: string | undefined;
    readonly sayOnNoItem?: string | undefined;
    readonly sayOnWrongItem?: string | undefined;
    readonly sayOnAlreadyOpen?: string | undefined;
    readonly sayOnClose?: string | undefined;
    readonly sayOnAlreadyClosed?: string | undefined;
}

interface SayRoomDir {
    readonly type: "say";
    readonly say: string;
}

export type RoomDir = GotoRoomDir | DoorRoomDir | SayRoomDir;

export function goto(roomId: string, say?: string): RoomDir {
    return {
        type: "goto",
        roomId,
        say
    };
}

export function say(say: string): RoomDir {
    return {
        type: "say",
        say
    };
}

export function basicRoom(id: string, short: string, long: string, dirs: Room["dirs"], items: Item[] = [], itemStrs: { [itemId: string]: string } = {}): Room {
    return {
        id,

        print: () => [{
            type: "output",
            str: short + "\n" + long
        }],

        dirs,

        items,
        itemStrs
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