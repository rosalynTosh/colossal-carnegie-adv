import { Item } from "../items";
import { basicRoom, goto, Room, say } from "../rooms";

function ord(n: number) {
    return n + (n >= 11 && n <= 13 ? "th" : n == 1 ? "st" : n == 2 ? "nd" : n == 3 ? "rd" : "th");
}

function weanRoom(floor: number, idPart: string, short: string, long: string, dirs: Room["dirs"], items: Item[] = [], itemStrs: { [itemId: string]: string } = {}): Room {
    return basicRoom(
        "wean." + floor + "." + idPart,
        short,
        long,
        dirs,
        items,
        itemStrs
    );
}

function weanStairRoomBuilder(stairId: string, minFloor: number, maxFloor: number): (floor: number, long: string, dirs: Room["dirs"]) => Room {
    return function (floor: number, long: string, dirs: Room["dirs"] = {}): Room {
        return basicRoom(
            "wean.stairs." + stairId + "." + floor,
            "Wean Stairwell " + stairId.toUpperCase() + ": Floor " + floor,
            (long == "" ? "" : long + " ") + "You can go " + (floor == minFloor ? "up" : floor == maxFloor ? "down" : "up or down"),
            {
                down: floor == minFloor ? undefined : goto("wean.stairs." + stairId + "." + (floor - 1)),
                up: floor == maxFloor ? undefined : goto("wean.stairs." + stairId + "." + (floor + 1)),
                ...dirs
            }
        );
    };
}

const weanStairA2Room = weanStairRoomBuilder("a2", 1, 9);
const weanStairBRoom = weanStairRoomBuilder("b", 3, 8);
const weanStairC1Room = weanStairRoomBuilder("c1", 3, 4);
const weanStairC2Room = weanStairRoomBuilder("c2", 3, 4);
const weanStairDRoom = weanStairRoomBuilder("d", 3, 9);

const LOBBY_MIN_FLOOR = 1;
const LOBBY_MAX_FLOOR = 8;

function weanLobbyNorthRoom(floor: number, long: string, dirs: Room["dirs"] = {}): Room {
    return weanRoom(
        floor,
        "north",
        "Wean " + floor + " Lobby North",
        (long == "" ? "" : long + " ") + "Staircase A1 goes " + (floor == LOBBY_MIN_FLOOR ? "up" : floor == LOBBY_MAX_FLOOR ? "down" : "up or down"),
        {
            west: goto("wean." + floor + ".200"),
            east: goto("wean." + floor + ".300"),
            south: goto("wean." + floor + ".south"),
            down: floor == LOBBY_MIN_FLOOR ? undefined : goto("wean." + (floor - 1) + ".north"),
            up: floor == LOBBY_MAX_FLOOR ? undefined : goto("wean." + (floor + 1) + ".north"),
            ...dirs
        }
    );
}

function weanLobbySouthRoom(floor: number, long: string, dirs: Room["dirs"] = {}): Room {
    return weanRoom(
        floor,
        "south",
        "Wean " + floor + " Lobby South",
        long,
        {
            west: goto("wean." + floor + ".100"),
            east: goto("wean." + floor + ".400"),
            north: goto("wean." + floor + ".north"),
            ...dirs
        }
    );
}

function weanCorridor100Room(floor: number, long: string, dirs: Room["dirs"] = {}): Room {
    return weanRoom(
        floor,
        "100",
        "Wean " + floor + "100 Corridor",
        long,
        {
            east: goto("wean." + floor + ".south"),
            north: goto("wean." + floor + ".200"),
            south: goto("wean.stairs.d." + floor),
            ...dirs
        }
    );
}

function weanCorridor200Room(floor: number, long: string, dirs: Room["dirs"] = {}): Room {
    return weanRoom(
        floor,
        "200",
        "Wean " + floor + "200 Corridor",
        long,
        {
            east: goto("wean." + floor + ".north"),
            south: goto("wean." + floor + ".100"),
            ...dirs
        }
    );
}

function weanCorridor300Room(floor: number, long: string, dirs: Room["dirs"] = {}): Room {
    return weanRoom(
        floor,
        "300",
        "Wean " + floor + "300 Corridor",
        long,
        {
            west: goto("wean." + floor + ".north"),
            south: goto("wean." + floor + ".400"),
            north: goto("wean.stairs.a2." + floor),
            ...dirs
        }
    );
}

function weanCorridor400Room(floor: number, long: string, dirs: Room["dirs"] = {}): Room {
    return weanRoom(
        floor,
        "400",
        "Wean " + floor + "400 Corridor",
        long,
        {
            west: goto("wean." + floor + ".south"),
            north: goto("wean." + floor + ".300"),
            south: goto("wean.stairs.b." + floor),
            ...dirs
        }
    );
}

export const WEAN_ROOMS: Room[] = [
    // 1

    weanRoom(
        1,
        "lobby",
        "Wean 1 Lobby",
        "You're in the wood-panelled 1st floor lobby of Wean Hall. Hamerschlag Drive is visible through pair of glass doors to your north. The 1300 corridor is to your east. Staircase A2 goes up.",
        {
            east: goto("wean.1.300"),
            up: goto("wean.2.lobby"),
            north: goto("hamerschlag_drive.outside_wean_1")
        }
    ),
    weanCorridor300Room(
        1,
        "You're in an uninteresting corridor. The 1st floor lobby is to your west. A door to stairwell A2 is to your north.",
        {
            west: goto("wean.1.lobby"),
            south: undefined
        }
    ),
    weanRoom(
        1,
        "340",
        "Wean 2340",
        "You stand in a room with a high ceiling. It's filled to the brim with boxes, crates, and ancient computer equipment. There is a door to the outside to your north. To your west, there is a door at the base of several steps down, and another at a landing at the top of a short flight of stairs.",
        {
            north: goto("hamerschlag_drive.wean_loading_dock"),
            west: goto("wean.1.300"),
            down: goto("wean.1.300", "You walk down the steps and out the door."),
            up: goto("wean.2.340")
        }
    ),
    
    // 2

    weanRoom(
        2,
        "lobby",
        "Wean 2 Lobby",
        "You're in the depressing 2nd floor lobby of Wean Hall. Dingy vending machines line the wall to your south, one of which promises hot coffee for a single quarter. A door stamped \"authorized personnel only\" sits to your west under a large klaxon. The 2300 corridor is to your east. Staircase A2 goes up or down.",
        {
            east: goto("wean.2.300"),
            west: say("The door is securely locked."),
            down: goto("wean.1.lobby"),
            up: goto("wean.3.north")
        }
    ),
    weanCorridor300Room(
        2,
        "You're in an uninteresting corridor. A door stands ajar at the east end of the hallway. The 2nd floor lobby is to your west. A door to stairwell A2 is to your north.",
        {
            east: goto("wean.2.340_landing"),
            west: goto("wean.2.lobby"),
            south: undefined
        }
    ),
    weanRoom(
        2,
        "340",
        "Wean 2340 Landing",
        "You stand on a landing overlooking over a large room packed with crates and ancient computer equipment. A door to your west is ajar and stairs descend down into the clutter.",
        {
            west: goto("wean.2.300"),
            down: goto("wean.1.340"),
            east: goto("wean.1.340", "You descend the stairs.")
        }
    ),
    weanRoom(
        2,
        "chiller_plant",
        "Chiller Plant",
        "You find yourself surrounded by multicolored pipes and roaring machinery. This is not a place designed for humans. Stairs go up to a metal grate above your head. You spot doors on the east and west ends of the massive room.",
        {
            up: goto("wean.3.chiller_plant"),
            east: goto("wean.2.lobby"),
            west: goto("hamerschlag_drive.under_scott")
        }
    ),

    // 3

    weanLobbyNorthRoom(
        3,
        "You're in the 3rd floor lobby of Wean Hall, deep in its concrete underbelly. The lobby continues south. The 3200 corridor runs west and the 3300 corridor runs east.",
        {
            down: goto("wean.2.lobby")
        }
    ),
    weanLobbySouthRoom(
        3,
        "You're in the 3rd floor lobby of Wean Hall. The lobby continues north. The 3100 corridor runs west, the 3400 corridor runs east, and the 3500 corridor runs to your south.",
        {
            south: goto("wean.3.500"),
            east: goto("wean.3.400_by_700")
        }
    ),
    weanCorridor100Room(
        3,
        "You're in a corridor with white walls, a stark contrast to the usual concrete and wood panelling of Wean Hall. A door sits ajar to your southwest. The 3rd floor lobby is to your east. A door to stairwell D is to your south.",
        {
            southwest: goto("wean.3.scs_print_room")
        }
    ),
    weanCorridor200Room(
        3,
        "You're in a dingy corridor. Light streams out of an open office door to your west. The 3rd floor lobby is to your east. You can cut across to the 3100 corridor to your south.",
        {
            west: goto("wean.3.fms_office")
        }
    ),
    weanCorridor300Room(
        3,
        "You're in an uninteresting corridor. A glass door opens out onto a wooden balcony to your east. The 3rd floor lobby is to your west. A door to stairwell A2 is to your north.",
        {
            east: goto("wean.3.balcony"),
            south: undefined
        }
    ),
    weanCorridor400Room(
        3,
        "You're in an uninteresting corridor running west. A door to stairwell B is to your south.",
        {
            west: goto("wean.3.400_by_700"),
            north: undefined
        }
    ),
    weanRoom(
        3,
        "400_by_700",
        "Wean 3400 Corridor",
        "You're in an uninteresting corridor. The 3rd floor lobby is to your west. The 3700 corridor forks off to your south. You can continue east.",
        {
            west: goto("wean.3.south"),
            south: goto("wean.3.700"),
            east: goto("wean.3.400")
        }
    ),
    weanRoom(
        3,
        "500",
        "Wean 3500 Corridor",
        "You're in a short L-shaped corridor. The 3600 corridor is to your south and the 3700 corridor is to your east. The 3rd floor lobby is to your north. A door to stairwell C1 is to your west.",
        {
            south: goto("wean.3.600"),
            east: goto("wean.3.700"),
            north: goto("wean.3.south"),
            west: goto("wean.stairs.c1.3")
        }
    ),
    weanRoom(
        3,
        "600",
        "Wean 3600 Corridor",
        "You're in the northern half of a corridor deep under the Mall. The other side is locked behind wooden swinging doors. This is the site of the shitbit: a trove of cracked LCD screens, orphaned circuit boards, and outdated cables. The Office of Disability Resources has an office to your west. The 3rd floor lobby is several twists and turns to your north.",
        {
            north: goto("wean.3.500"),
            south: say("The doors are locked."),
            west: goto("wean.3.odr")
        },
        [
            {
                id: "floppy_disk",

                name: "floppy disk",
                aOrAn: "a",
                inspectStr: "A black floppy disk, resembling the save icon on your favorite graphical computer program. Scrawled in faded Sharpie on its label is the phrase \"C.MMP\"",

                nouns: [/floppy|(?:floppy )?disk/i]
            }
        ]
    ),
    weanRoom(
        3,
        "700",
        "Wean 3700 Corridor",
        "You're in a drab corridor lined by locked office doors. The 3400 corridor is to your north and the 3500 corridor is to your west.",
        {
            north: goto("wean.3.400_by_700"),
            west: goto("wean.3.500")
        }
    ),
    weanRoom(
        3,
        "scs_print_room",
        "SCS Print Closet",
        "You're in a small closet with a copy machine, a recycle bin, and a paper guillotine. The exit is to your northeast.",
        {
            northeast: goto("wean.3.100")
        }
    ),
    weanRoom(
        3,
        "fms_office",
        "FMS Office",
        "You're in a small office with a high ceiling. Stairs descend down into a noisy abyss to your north. Above the door to the stairs is an ominous klaxon. The door out to the hallway is to your east.",
        {
            north: goto("wean.3.chiller_plant"),
            down: goto("wean.3.chiller_plant"),
            east: goto("wean.3.200")
        }
    ),
    weanRoom(
        3,
        "balcony",
        "Wooden Balcony",
        "You're on a wooden balcony outside Wean 3 overlooking Hamerschlag Drive to your north. There is a small, unkempt garden under the deck to your south. A pair of glass doors lead inside to your west.",
        {
            north: say("The drop is considerable; you cannot go north."),
            south: goto("doherty.b.kiln_garden"),
            down: say("North or south?"),
            west: goto("wean.3.300")
        }
    ),
    weanRoom(
        3,
        "odr",
        "Office of Disability Resources",
        "You find yourself in a waiting room for the ODR testing center. A bright yellow door marked as a steam tunnel sits to your west. A dingy hallway sits to your east.",
        {
            west: {
                type: "door",

                roomId: "boiler_room_tunnel.wean_branch",

                doorId: "boiler_room_tunnel_wean",

                doorNouns: [], // TODO
                canOpen: false,
                canClose: true,
                closeOnUse: false,
                keyItem: null
            },
            east: goto("wean.3.600")
        }
    ),
    weanRoom(
        3,
        "spooky_closet",
        "Forboding Closet",
        "You're in a small, pitch black room. To your north is a cordoned-off restroom and a janitor's closet. The door to the east has a large sign indicating the hallway behind it is under video surveillance, and a push-door to a staircase is to your west.",
        {
            north: say("You look into the janitor's closet and catch a glimpse of a large, slumbering floor scrubber machine."),
            east: say("The door is securely locked."),
            west: goto("wean.stairs.c2.3")
        }
    ),
    weanRoom(
        3,
        "chiller_plant",
        "Chiller Plant: Upper Grate",
        "This is a dark and noisy place. Massive machines grumble underneath you. An office door is open to your south and stairs descend down.",
        {
            south: goto("wean.3.fms_office"),
            up: goto("wean.3.fms_office"),
            down: goto("wean.2.chiller_plant")
        }
    ),
    
    // // 4

    // weanLobbyNorthRoom(
    //     4,
    //     "You're in the 4th floor lobby of Wean Hall. "
    // ),
    // weanLobbySouthRoom(),
    // weanCorridor100Room(),
    // weanCorridor200Room(),
    // weanCorridor300Room(),
    // weanCorridor400Room(),
    // weanRoom(
    //     4,
    //     "600",
    //     "600 Corridor (Murder Hallway)"
    // ),
    // weanRoom(
    //     4,
    //     "600_south",
    //     "600 Corridor (Murder Hallway)"
    // ),
    // weanRoom(
    //     4,
    //     "700",
    //     "700 Corridor (Murder Hallway)"
    // ),
    // weanRoom(
    //     4,
    //     "700_south",
    //     "700 Corridor (Murder Hallway)"
    // ),
    // weanRoom(
    //     4,
    //     "sorrels",
    //     ": Sorrels Library"
    // ),
    // weanRoom(
    //     4,
    //     "703",
    //     "703"
    // ),
    // weanRoom(
    //     4,
    //     "706",
    //     "706"
    // ),
    
    // // 5

    // weanLobbyNorthRoom(),
    // weanLobbySouthRoom(),
    // weanCorridor100Room(),
    // weanCorridor200Room(),
    // weanCorridor300Room(),
    // weanCorridor400Room(),
    // weanRoom(
    //     5,
    //     "200_clusters",
    //     "200 Corridor"
    // ),
    // weanRoom(
    //     5,
    //     "201",
    //     "201 (Mac Cluster)"
    // ),
    // weanRoom(
    //     5,
    //     "202",
    //     "202 (Windows Cluster)"
    // ),
    // weanRoom(
    //     5,
    //     "207",
    //     "207 (Linux Cluster)"
    // ),
    // weanRoom(
    //     5,
    //     "403",
    //     "403"
    // ),

    // // 6

    // weanLobbyNorthRoom(),
    // weanLobbySouthRoom(),
    // weanCorridor100Room(),
    // weanCorridor200Room(),
    // weanCorridor300Room(),
    // weanCorridor400Room(),
    // weanRoom(
    //     6,
    //     "parapet",
    //     "Balacing above La Prima",
    //     "You're standing on a parapet about 8 inches wide, balancing above La Prima to your south or a safe hop down to Wean 6 to your north.",
    //     {
    //         north: goto("wean.6.south"),
    //         south: goto("la_prima_counter"),
    //         down: say("You have two options, and you should surely specify which.")
    //     }
    // ),
    
    // // 7

    // weanLobbyNorthRoom(),
    // weanLobbySouthRoom(),
    // weanCorridor100Room(),
    // weanCorridor200Room(),
    // weanCorridor300Room(),
    // weanCorridor400Room(),
    // weanRoom(
    //     7,
    //     "500",
    //     "500 (Inside the Turtle Head)"
    // ),

    // // 8

    // weanLobbyNorthRoom(),
    // weanLobbySouthRoom(),
    // weanCorridor100Room(),
    // weanCorridor200Room(),
    // weanCorridor300Room(),
    // weanCorridor400Room(),
    // weanRoom(
    //     8,
    //     "400_outside_427",
    //     "400 Corridor"
    // ),
    // weanRoom(
    //     8,
    //     "427",
    //     "427"
    // ),
    
    // // 9
];

// for (let i = 1; i <= 8; i++) {
//     WEAN_ROOMS.push(basicRoom(
//         "wean." + i + ".north",
//         "Wean " + i + " Lobby North",
//         "The " + (i >= 3 ? i + "200 corridor runs west and the " : "") + i + "300 corridor runs east. You can go south. Staircase A1 runs " + (i == 1 ? "up" : i == 8 ? "down" : "up and down") + ".",
//         {
//             west: goto("wean." + i + ".200"),
//             east: goto("wean." + i + ".300"),
//             south: goto("wean." + i + ".south"),
//             down: goto("wean." + (i - 1) + ".north"),
//             up: goto("wean." + (i + 1) + ".north")
//         }
//     ));

//     WEAN_ROOMS.push(basicRoom(
//         "wean." + i + ".south",
//         "Wean " + i + " Lobby South",
//         (i >= 3 ? "The " + i + "100 corridor runs west and the " + i + "400 corridor runs east. " : "") + "You can go north.",
//         {
//             west: goto("wean." + i + ".100"),
//             east: goto("wean." + i + ".400"),
//             north: goto("wean." + i + ".north")
//         }
//     ));

//     WEAN_ROOMS.push(basicRoom(
//         "wean." + i + ".300",
//         "Wean " + i + "300 Corridor",
//         "You're in a corridor. The " + ord(i) + " floor lobby is to your west." + (i >= 3 ? " You can cross over to the " + i + "400 corridor to your south." : "") + " A door to stairwell A2 is to your north.",
//         {
//             west: goto("wean." + i + ".north"),
//             south: goto("wean." + i + ".400"),
//             north: goto("wean.stairs.a2." + i)
//         }
//     ));

//     WEAN_ROOMS.push(basicRoom(
//         "wean.stairs.a2." + i,
//         "Wean Stairwell A2: Floor " + i,
//         "A door with a large " + i + " is to your south. You can go " + (i == 1 ? "up" : "up or down") + ".",
//         {
//             south: goto("wean." + i + ".300"),
//             down: goto("wean.stairs.a2." + (i - 1)),
//             up: goto("wean.stairs.a2." + (i + 1))
//         }
//     ));
// }

// for (let i = 3; i <= 8; i++) {
//     WEAN_ROOMS.push(basicRoom(
//         "wean." + i + ".200",
//         "Wean " + i + "200 Corridor",
//         "You're in a corridor. The " + ord(i) + " floor lobby is to your east. You can cross over to the " + i + "100 corridor to your south.",
//         {
//             east: goto("wean." + i + ".north"),
//             south: goto("wean." + i + ".100")
//         }
//     ));

//     WEAN_ROOMS.push(basicRoom(
//         "wean." + i + ".100",
//         "Wean " + i + "100 Corridor",
//         "You're in a corridor. The " + ord(i) + " floor lobby is to your east. You can cross over to the " + i + "200 corridor to your north. A door to stairwell D is to your south.",
//         {
//             east: goto("wean." + i + ".south"),
//             north: goto("wean." + i + ".200"),
//             south: goto("wean.stairs.d." + i)
//         }
//     ));

//     WEAN_ROOMS.push(basicRoom(
//         "wean." + i + ".400",
//         "Wean " + i + "400 Corridor",
//         "You're in a corridor. The " + ord(i) + " floor lobby is to your west. You can cross over to the " + i + "300 corridor to your north. A door to stairwell B is to your south.",
//         {
//             west: goto("wean." + i + ".south"),
//             north: goto("wean." + i + ".300"),
//             south: goto("wean.stairs.b." + i)
//         }
//     ));

//     WEAN_ROOMS.push(basicRoom(
//         "wean.stairs.b." + i,
//         "Wean Stairwell B: Floor " + i,
//         "A door with a large " + i + " is to your north. You can go " + (i == 3 ? "up" : i == 8 ? "down" : "up or down") + ".",
//         {
//             north: goto("wean." + i + ".400"),
//             down: goto("wean.stairs.b." + (i - 1)),
//             up: goto("wean.stairs.b." + (i + 1))
//         }
//     ));

//     WEAN_ROOMS.push(basicRoom(
//         "wean.stairs.d." + i,
//         "Wean Stairwell D: Floor " + i,
//         "A door with a large " + i + " is to your north. You can go " + (i == 3 ? "up" : "up or down") + ".",
//         {
//             north: goto("wean." + i + ".100"),
//             down: goto("wean.stairs.d." + (i - 1)),
//             up: goto("wean.stairs.d." + (i + 1))
//         }
//     ));
// }

// WEAN_ROOMS.push(basicRoom(
//     "wean.stairs.a2.1_2",
//     "Wean Stairwell A2: Floor 1 1/2",
//     "A door to the loading dock is to your north. You can go up or down.",
//     {
//         north: say("The door to your north is securely locked."),
//         down: goto("wean.stairs.a2.1"),
//         up: goto("wean.stairs.a2.2")
//     }
// ));

// WEAN_ROOMS.push(basicRoom(
//     "wean.stairs.a2.9",
//     "Wean Stairwell A2: Floor 9",
//     "You notice the stairwell has changed dimensions slightly. The roof is sloped and a gap in the south wall overlooks the door to floor 8. Graffiti covers the walls. A door with a card scanner is to your south. You can go down.",
//     {
//         south: say("The door is securely locked."),
//         down: goto("wean.stairs.a2.8")
//     }
// ));

// WEAN_ROOMS.push(basicRoom(
//     "wean.stairs.d.9",
//     "Wean Stairwell D: Floor 9",
//     "Unusual doors sit to your north and west. Light streams through a small hole drilled in the east wall. You can go down.",
//     {
//         north: say("The door to your north is securely locked."),
//         west: say("The door to your west is securely locked."),
//         down: goto("wean.stairs.d.8")
//     }
// ));

// WEAN_ROOMS.find(r => r.id == "wean.1.north")!.dirs.north = goto("hamerschlag_drive.outside_wean");
// WEAN_ROOMS.find(r => r.id == "wean.1.300")!.dirs.east = goto("wean.1.340");
// delete WEAN_ROOMS.find(r => r.id == "wean.1.300")!.dirs.south;

// WEAN_ROOMS.find(r => r.id == "wean.2.300")!.dirs.east = goto("wean.2.340");
// delete WEAN_ROOMS.find(r => r.id == "wean.2.300")!.dirs.south;

// WEAN_ROOMS.find(r => r.id == "wean.3.100")!.dirs.southwest = goto("wean.3.print_room");
// WEAN_ROOMS.find(r => r.id == "wean.3.south")!.dirs.south = goto("wean.3.600");
// WEAN_ROOMS.find(r => r.id == "wean.3.400")!.dirs.south = goto("wean.3.700");
// delete WEAN_ROOMS.find(r => r.id == "wean.3.300")!.dirs.south;
// delete WEAN_ROOMS.find(r => r.id == "wean.3.400")!.dirs.north;

// WEAN_ROOMS.find(r => r.id == "wean.stairs.a2.1")!.dirs.up = goto("wean.stairs.a2.1_2");
// WEAN_ROOMS.find(r => r.id == "wean.stairs.a2.2")!.dirs.down = goto("wean.stairs.a2.1_2");
// delete WEAN_ROOMS.find(r => r.id == "wean.stairs.a2.1")!.dirs.down;

// delete WEAN_ROOMS.find(r => r.id == "wean.stairs.b.3")!.dirs.down;
// delete WEAN_ROOMS.find(r => r.id == "wean.stairs.b.8")!.dirs.up;

// delete WEAN_ROOMS.find(r => r.id == "wean.stairs.d.3")!.dirs.down;

// delete WEAN_ROOMS.find(r => r.id == "wean.1.north")!.dirs.down;
// delete WEAN_ROOMS.find(r => r.id == "wean.8.north")!.dirs.up;

// WEAN_ROOMS.find(r => r.id == "wean.5.south")!.dirs.south = goto("la_prima");

// WEAN_ROOMS.find(r => r.id == "wean.4.400")!.dirs.east = goto("liminal.ramp");
// WEAN_ROOMS.find(r => r.id == "wean.4.400")!.dirs.down = goto("liminal.ramp");
// WEAN_ROOMS.find(r => r.id == "wean.5.400")!.dirs.east = goto("liminal.ground");
// WEAN_ROOMS.find(r => r.id == "wean.6.400")!.dirs.east = goto("liminal.6");
// WEAN_ROOMS.find(r => r.id == "wean.7.400")!.dirs.east = goto("liminal.7");
// WEAN_ROOMS.find(r => r.id == "wean.8.400")!.dirs.east = goto("liminal.8");