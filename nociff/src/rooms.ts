export type Dir = "north" | "east" | "south" | "west" | "up" | "down" | "northeast" | "northwest" | "southeast" | "southwest";

export abstract class Room {
    public abstract print(): string;

    public abstract readonly dirs: { [dir in Dir]?: RoomDir };
}

export type RoomDir = { type: "goto", roomId: string } | { type: "door", doorId: string } | { type: "say", say: string };