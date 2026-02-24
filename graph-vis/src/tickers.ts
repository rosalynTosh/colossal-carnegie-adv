import { Dir, MovingNode } from "./node";

export function physicsTicker(nodes: MovingNode[], ts: number, k: number, cof: number) {
    const nodeLookup: Map<string, MovingNode> = new Map(nodes.map(n => [n.id, n]));

    for (const node of nodes) {
        for (const dir in node.dirs) {
            const otherId = node.dirs[dir as keyof typeof node.dirs];

            if (otherId === undefined) continue;

            const other = nodeLookup.get(otherId)!;

            const targOffset = ({
                "north": [0, -1, 0],
                "east": [1, 0, 0],
                "south": [0, 1, 0],
                "west": [-1, 0, 0],
                "up": [0, 0, 1],
                "down": [0, 0, -1],
                "northeast": [1, -1, 0],
                "northwest": [-1, -1, 0],
                "southeast": [1, 1, 0],
                "southwest": [-1, 1, 0]
            } as const satisfies { [dir in Dir]: [number, number, number] })[dir as Dir];
            const targPos = {
                x: node.x + targOffset[0],
                y: node.y + targOffset[1],
                z: node.z + targOffset[2]
            };
            const dist = Math.hypot(other.x - targPos.x, other.y - targPos.y, other.z - targPos.z);

            if (dist < 2 ** -10) continue;

            const unitDir = {
                x: (targPos.x - other.x) / dist,
                y: (targPos.y - other.y) / dist,
                z: (targPos.z - other.z) / dist
            };

            other.dx *= cof ** ts;
            other.dy *= cof ** ts;
            other.dz *= cof ** ts;

            other.dx += unitDir.x * k * dist * ts;
            other.dy += unitDir.y * k * dist * ts;
            other.dz += unitDir.z * k * dist * ts;
        }
    }

    for (const node of nodes) {
        node.x += node.dx * ts;
        node.y += node.dy * ts;
        node.z += node.dz * ts;
    }
}