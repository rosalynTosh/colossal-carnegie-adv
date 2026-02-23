export interface NodeSpec {
    readonly id: string;

    readonly dirs: { readonly [dir in Dir]?: string };
}

export type Dir = "north" | "east" | "south" | "west" | "up" | "down" | "northeast" | "northwest" | "southeast" | "southwest";

export interface MovingNode extends NodeSpec {
    readonly color: string;

    x: number;
    y: number;
    z: number;
    dx: number;
    dy: number;
    dz: number;
}

export function printNode(node: MovingNode): string {
    return (
        "Node " + node.id + ":\n" +
        "color: " + node.color + "\n" +
        "x: " + node.x + "\n" +
        "y: " + node.y + "\n" +
        "z: " + node.z + "\n" +
        "dx: " + node.dx + "\n" +
        "dy: " + node.dy + "\n" +
        "dz: " + node.dz
    );
}