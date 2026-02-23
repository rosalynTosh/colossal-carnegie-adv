import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { MovingNode, printNode } from './node';
import { physicsTicker } from './tickers';
import { ROOM_NODE_SPECS } from './rooms';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate(_time: number) {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

const controls = new OrbitControls(camera, renderer.domElement); controls;

interface MovingNodeWithSphere extends MovingNode {
    sphere?: THREE.Mesh;
}

const nodes: MovingNodeWithSphere[] = [];

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    h = (h % 360 + 360) % 360;

    h /= 360;
    s /= 100;
    l /= 100;

    var r = l;
    var g = l;
    var b = l;

    if (s != 0) {
        function color_to_rgb(p: number, q: number, t: number): number {
            if (t < 0)
                t++;

            if (t > 1)
                t--;

            if (t < 1 / 6)
                return p + (q - p) * 6 * t;

            if (t < 1 / 2)
                return q;

            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;

            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;

        var p = 2 * l - q;

        r = color_to_rgb(p, q, h + 1 / 3);
        g = color_to_rgb(p, q, h);
        b = color_to_rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

for (const [i, node] of ROOM_NODE_SPECS.entries()) {
    const color = "#" + hslToRgb(i / ROOM_NODE_SPECS.length * 300, 80, 80).map(x => Math.round(x).toString(16).padStart(2, "0")).join("");

    const material = new THREE.MeshBasicMaterial({ color });
    const geometry = new THREE.SphereGeometry(0.1);

    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    nodes.push({
        ...node,

        color,

        x: 0,
        y: 0,
        z: 0,
        dx: 0,
        dy: 0,
        dz: 0,

        sphere
    });
}

const nodeLookup: Map<string, MovingNodeWithSphere> = new Map(nodes.map(n => [n.id, n]));

interface Line {
    node_0: MovingNodeWithSphere;
    node_1: MovingNodeWithSphere;
    line: THREE.Line;
}

const lines: Line[] = [];

for (const [i, node] of nodes.entries()) {
    for (const dir in node.dirs) {
        const otherId = node.dirs[dir as keyof typeof node.dirs];

        if (otherId === undefined) continue;

        const other = nodeLookup.get(otherId)!;
        const otherIndex = nodes.indexOf(other);

        const [node_0, node_1] = i < otherIndex ? [node, other] : [other, node];

        if (!lines.some(l => l.node_0 == node_0 && l.node_1 == node_1)) {
            const material = new THREE.LineBasicMaterial({ color: 0xc0c0c0 });
            const geometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, 0)
            ]);
            const line = new THREE.Line(geometry, material);

            lines.push({
                node_0,
                node_1,
                line
            });

            scene.add(line);
        }
    }
}

setInterval(() => {
    physicsTicker(nodes, 0.01, 1, 0.5);

    for (const node of nodes) {
        node.sphere!.position.set(node.x, node.z, node.y);
    }

    for (const line of lines) {
        line.line.geometry.setFromPoints([
            new THREE.Vector3(line.node_0.x, line.node_0.z, line.node_0.y),
            new THREE.Vector3(line.node_1.x, line.node_1.z, line.node_1.y)
        ]);
    }
});

window.addEventListener("mousedown", (event) => {
    const raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(new THREE.Vector2(
        event.offsetX / window.innerWidth * 2 - 1,
        event.offsetY / window.innerHeight * -2 + 1
    ), camera);

    const objs = raycaster.intersectObjects(scene.children);

    for (const node of nodes) {
        for (const obj of objs) {
            if (node.sphere === obj.object) {
                console.log(printNode(node));
            }
        }
    }
});