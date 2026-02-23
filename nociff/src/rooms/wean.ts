import { basicRoom, goto, Room, say } from "../rooms";

function ord(n: number) {
    return n + (n >= 11 && n <= 13 ? "th" : n == 1 ? "st" : n == 2 ? "nd" : n == 3 ? "rd" : "th");
}

export const WEAN_ROOMS: Room[] = [];

for (let i = 1; i <= 8; i++) {
    WEAN_ROOMS.push(basicRoom(
        "wean." + i + ".north",
        "Wean " + i + " Lobby North",
        "The " + (i >= 3 ? i + "200 corridor runs west and the " : "") + i + "300 corridor runs east. You can go south. Staircase A1 runs " + (i == 1 ? "up" : i == 8 ? "down" : "up and down") + ".",
        {
            west: goto("wean." + i + ".200"),
            east: goto("wean." + i + ".300"),
            south: goto("wean." + i + ".south"),
            down: goto("wean." + (i - 1) + ".north"),
            up: goto("wean." + (i + 1) + ".north")
        }
    ));

    WEAN_ROOMS.push(basicRoom(
        "wean." + i + ".south",
        "Wean " + i + " Lobby South",
        (i >= 3 ? "The " + i + "100 corridor runs west and the " + i + "400 corridor runs east. " : "") + "You can go north.",
        {
            west: goto("wean." + i + ".100"),
            east: goto("wean." + i + ".400"),
            north: goto("wean." + i + ".north")
        }
    ));

    WEAN_ROOMS.push(basicRoom(
        "wean." + i + ".300",
        "Wean " + i + "300 Corridor",
        "You're in a corridor. The " + ord(i) + " floor lobby is to your west." + (i >= 3 ? " You can cross over to the " + i + "400 corridor to your south." : "") + " A door to stairwell A2 is to your north.",
        {
            west: goto("wean." + i + ".north"),
            south: goto("wean." + i + ".400"),
            north: goto("wean.stairs.a2." + i)
        }
    ));

    WEAN_ROOMS.push(basicRoom(
        "wean.stairs.a2." + i,
        "Wean Stairwell A2: Floor " + i,
        "A door with a large " + i + " is to your south. You can go " + (i == 1 ? "up" : "up or down") + ".",
        {
            south: goto("wean." + i + ".300"),
            down: goto("wean.stairs.a2." + (i - 1)),
            up: goto("wean.stairs.a2." + (i + 1))
        }
    ));
}

for (let i = 3; i <= 8; i++) {
    WEAN_ROOMS.push(basicRoom(
        "wean." + i + ".200",
        "Wean " + i + "200 Corridor",
        "You're in a corridor. The " + ord(i) + " floor lobby is to your east. You can cross over to the " + i + "100 corridor to your south.",
        {
            east: goto("wean." + i + ".north"),
            south: goto("wean." + i + ".100")
        }
    ));

    WEAN_ROOMS.push(basicRoom(
        "wean." + i + ".100",
        "Wean " + i + "100 Corridor",
        "You're in a corridor. The " + ord(i) + " floor lobby is to your east. You can cross over to the " + i + "200 corridor to your north. A door to stairwell D is to your south.",
        {
            east: goto("wean." + i + ".south"),
            north: goto("wean." + i + ".200"),
            south: goto("wean.stairs.d." + i)
        }
    ));

    WEAN_ROOMS.push(basicRoom(
        "wean." + i + ".400",
        "Wean " + i + "400 Corridor",
        "You're in a corridor. The " + ord(i) + " floor lobby is to your west. You can cross over to the " + i + "300 corridor to your north. A door to stairwell B is to your south.",
        {
            west: goto("wean." + i + ".south"),
            north: goto("wean." + i + ".300"),
            south: goto("wean.stairs.b." + i)
        }
    ));

    WEAN_ROOMS.push(basicRoom(
        "wean.stairs.b." + i,
        "Wean Stairwell B: Floor " + i,
        "A door with a large " + i + " is to your north. You can go " + (i == 3 ? "up" : i == 8 ? "down" : "up or down") + ".",
        {
            north: goto("wean." + i + ".400"),
            down: goto("wean.stairs.b." + (i - 1)),
            up: goto("wean.stairs.b." + (i + 1))
        }
    ));

    WEAN_ROOMS.push(basicRoom(
        "wean.stairs.d." + i,
        "Wean Stairwell D: Floor " + i,
        "A door with a large " + i + " is to your north. You can go " + (i == 3 ? "up" : "up or down") + ".",
        {
            north: goto("wean." + i + ".100"),
            down: goto("wean.stairs.d." + (i - 1)),
            up: goto("wean.stairs.d." + (i + 1))
        }
    ));
}

WEAN_ROOMS.push(basicRoom(
    "wean.stairs.a2.1_2",
    "Wean Stairwell A2: Floor 1 1/2",
    "A door to the loading dock is to your north. You can go up or down.",
    {
        north: say("The door to your north is securely locked."),
        down: goto("wean.stairs.a2.1"),
        up: goto("wean.stairs.a2.2")
    }
));

WEAN_ROOMS.push(basicRoom(
    "wean.stairs.a2.9",
    "Wean Stairwell A2: Floor 9",
    "You notice the stairwell has changed dimensions slightly. The roof is sloped and a gap in the south wall overlooks the door to floor 8. Graffiti covers the walls. A door with a card scanner is to your south. You can go down.",
    {
        south: say("The door is securely locked."),
        down: goto("wean.stairs.a2.8")
    }
));

WEAN_ROOMS.push(basicRoom(
    "wean.stairs.d.9",
    "Wean Stairwell D: Floor 9",
    "Unusual doors sit to your north and west. Light streams through a small hole drilled in the east wall. You can go down.",
    {
        north: say("The door to your north is securely locked."),
        west: say("The door to your west is securely locked."),
        down: goto("wean.stairs.d.8")
    }
));

WEAN_ROOMS.find(r => r.id == "wean.1.north")!.dirs.north = goto("hamerschlag_drive.outside_wean");
WEAN_ROOMS.find(r => r.id == "wean.1.300")!.dirs.east = goto("wean.1.340");
delete WEAN_ROOMS.find(r => r.id == "wean.1.300")!.dirs.south;

WEAN_ROOMS.find(r => r.id == "wean.2.300")!.dirs.east = goto("wean.2.340");
delete WEAN_ROOMS.find(r => r.id == "wean.2.300")!.dirs.south;

WEAN_ROOMS.find(r => r.id == "wean.3.100")!.dirs.southwest = goto("wean.3.print_room");
WEAN_ROOMS.find(r => r.id == "wean.3.south")!.dirs.south = goto("wean.3.600");
WEAN_ROOMS.find(r => r.id == "wean.3.400")!.dirs.south = goto("wean.3.700");
delete WEAN_ROOMS.find(r => r.id == "wean.3.300")!.dirs.south;
delete WEAN_ROOMS.find(r => r.id == "wean.3.400")!.dirs.north;

WEAN_ROOMS.find(r => r.id == "wean.stairs.a2.1")!.dirs.up = goto("wean.stairs.a2.1_2");
WEAN_ROOMS.find(r => r.id == "wean.stairs.a2.2")!.dirs.down = goto("wean.stairs.a2.1_2");
delete WEAN_ROOMS.find(r => r.id == "wean.stairs.a2.1")!.dirs.down;

delete WEAN_ROOMS.find(r => r.id == "wean.stairs.b.3")!.dirs.down;
delete WEAN_ROOMS.find(r => r.id == "wean.stairs.b.8")!.dirs.up;

delete WEAN_ROOMS.find(r => r.id == "wean.stairs.d.3")!.dirs.down;

delete WEAN_ROOMS.find(r => r.id == "wean.1.north")!.dirs.down;
delete WEAN_ROOMS.find(r => r.id == "wean.8.north")!.dirs.up;

WEAN_ROOMS.find(r => r.id == "wean.5.south")!.dirs.south = goto("la_prima");

WEAN_ROOMS.find(r => r.id == "wean.4.400")!.dirs.east = goto("liminal.ramp");
WEAN_ROOMS.find(r => r.id == "wean.4.400")!.dirs.down = goto("liminal.ramp");
WEAN_ROOMS.find(r => r.id == "wean.5.400")!.dirs.east = goto("liminal.ground");
WEAN_ROOMS.find(r => r.id == "wean.6.400")!.dirs.east = goto("liminal.6");
WEAN_ROOMS.find(r => r.id == "wean.7.400")!.dirs.east = goto("liminal.7");
WEAN_ROOMS.find(r => r.id == "wean.8.400")!.dirs.east = goto("liminal.8");