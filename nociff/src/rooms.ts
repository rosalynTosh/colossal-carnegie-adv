import { Printout } from "./formatting";
import { Item, ItemSpec } from "./items";
import { Player } from "./player";
import { ANSYS_ROOMS } from "./rooms/ansys";
import { BAKER_PORTER_ROOMS } from "./rooms/baker_porter";
import { CAMPUS_ROOMS } from "./rooms/campus";
import { DOHERTY_ROOMS } from "./rooms/doherty";
import { LIMINAL_ROOMS } from "./rooms/liminal";
import { STEAM_TUNNEL_ROOMS } from "./rooms/steam_tunnel";
import { WEAN_ROOMS } from "./rooms/wean";
import { World } from "./world";

export type Dir = "north" | "east" | "south" | "west" | "up" | "down" | "northeast" | "northwest" | "southeast" | "southwest";

export interface Room {
    id: string;

    print: (roomItems: Item[], world: World, player: Player) => Printout[];

    dirs: { [dir in Dir]?: RoomDir };

    items: ItemSpec[];
    itemStrs: { [itemId: string]: string };
}

export interface RoomSpec {
    readonly id: string;

    readonly print: (roomItems: Item[], world: World, player: Player) => Printout[];

    readonly dirs: { readonly [dir in Dir]?: RoomDirSpec };

    readonly items: ReadonlyArray<ItemSpec>;
    readonly itemStrs: { readonly [itemId: string]: string };
}

interface GotoRoomDir {
    type: "goto";
    roomId: string;
    say?: string | undefined;
}

interface DoorRoomDir {
    type: "door";

    roomId: string;
    say?: string | undefined;

    doorId: string;

    doorNouns: ReadonlyArray<RegExp>;

    canOpen: boolean;
    canClose: boolean;
    closeOnUse: boolean;
    keyItem: string | null;

    sayIfClosed?: string | undefined;
    sayOnOpen?: string | undefined;
    sayOnNoItem?: string | undefined;
    sayOnWrongItem?: string | undefined;
    sayOnAlreadyOpen?: string | undefined;
    sayOnClose?: string | undefined;
    sayOnAlreadyClosed?: string | undefined;
}

interface SayRoomDir {
    type: "say";
    say: string;
}

export type RoomDir = GotoRoomDir | DoorRoomDir | SayRoomDir;
export type RoomDirSpec = Readonly<RoomDir>;

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

export const ROOMS: RoomSpec[] = [
    ...CAMPUS_ROOMS,

    ...ANSYS_ROOMS,
    ...BAKER_PORTER_ROOMS,
    ...DOHERTY_ROOMS,
    ...LIMINAL_ROOMS,
    ...STEAM_TUNNEL_ROOMS,
    ...WEAN_ROOMS
];

for (let i = 1; i < ROOMS.length; i++) {
    for (let j = 0; j < i; j++) {
        if (ROOMS[i].id == ROOMS[j].id) {
            throw new Error("duplicate roomId '" + ROOMS[i].id + " for indices " + i + ", " + j);
        }
    }
}