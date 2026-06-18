import { Item } from "../items";
import { basicRoom, goto, Room, say } from "../rooms";

// function ord(n: number) {
//     return n + (n >= 11 && n <= 13 ? "th" : n == 1 ? "st" : n == 2 ? "nd" : n == 3 ? "rd" : "th");
// }

function weanRoom(floor: number, idPart: string | null, short: string, long: string, dirs: Room["dirs"], items: Item[] = [], itemStrs: { [itemId: string]: string } = {}): Room {
    return basicRoom(
        "wean." + floor + (idPart === null ? "" : "." + idPart),
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
            (long == "" ? "" : long + " ") + "You can go " + (floor == minFloor ? "up" : floor == maxFloor ? "down" : "up or down") + ".",
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
        (long == "" ? "" : long + " ") + "Staircase A1 runs " + (floor == LOBBY_MIN_FLOOR ? "up" : floor == LOBBY_MAX_FLOOR ? "down" : "up and down") + ".",
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
        "You're in the wood-panelled 1st floor lobby of Wean Hall. Hamerschlag Drive is visible through pair of glass doors to your north. The 1300 corridor is to your east. Staircase A1 runs up.",
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
        "You're in the depressing 2nd floor lobby of Wean Hall. Dingy vending machines line the wall to your south, one of which promises hot coffee for a single quarter. A door stamped \"authorized personnel only\" sits to your west under a large klaxon. The 2300 corridor is to your east. Staircase A1 runs up and down.",
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
            east: goto("wean.2.340"),
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
        "You're in the 3rd floor lobby of Wean Hall, deep in its concrete underbelly. The lobby continues to your south. The 3200 corridor runs west and the 3300 corridor runs east.",
        {
            down: goto("wean.2.lobby")
        }
    ),
    weanLobbySouthRoom(
        3,
        "You're in the 3rd floor lobby of Wean Hall. The lobby continues to your north. The 3100 corridor runs west, the 3400 corridor runs east, and the 3500 corridor runs to your south.",
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
        "You're in the northern half of a corridor deep under the Mall. The other side is locked behind wooden swinging doors. This is the site of the shitbin: a trove of cracked LCD screens, orphaned circuit boards, and outdated cables. The Office of Disability Resources has an office to your west. The 3rd floor lobby is several twists and turns to your north.",
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
    
    // 4

    weanLobbyNorthRoom(
        4,
        "You're in the 4th floor lobby of Wean Hall. The lobby continues to your south. The 4200 corridor runs west, the 4300 corridor runs east, and the bridge to Newell-Simon Hall is to your north.",
        {
            north: goto("nsh_bridge")
        }
    ),
    weanLobbySouthRoom(
        4,
        "You're in the 4th floor lobby of Wean Hall. The lobby continues to your north. The 4100 corridor runs west, Sorrels library is to your east, the 4600 corridor runs south, and the connection to Scott Hall and Hamerschlag Hall is to your southwest. A large bulletin board wall on the north prominently displays an ad for \"KGBuggy\" in a place called the \"Kage,\" which it describes as being located in the Stever basement.",
        {
            east: goto("wean.4.sorrels"),
            south: goto("wean.4.600"),
            southwest: goto("scott.4s.from_wean_lobby")
        }
    ),
    weanCorridor100Room(
        4,
        "You're in a tall corridor with whitewashed concrete walls. A hushed silence fills the space. You presume some very serious work is ongoing. The 4th floor lobby is to your east. A door to stairwell D is to your south. At the west end of the corridor is a door to Scott Hall's 4th floor.",
        {
            west: goto("scott.4s.ruge")
        }
    ),
    weanCorridor200Room(
        4,
        "You're in a tall corridor with cozy decor. It's confortably quiet. The 4th floor lobby is to your east. You can cut across to the 4100 corridor to your south."
    ),
    weanCorridor300Room(
        4,
        "You're in a long corridor with squeaky wooden floors. The 4th floor lobby is to your west. You can cross over to the 4400 corridor to your south. A door to stairwell A2 is to your north."
    ),
    weanCorridor400Room(
        4,
        "You're in a small section of corridor cut off from the 4th floor lobby by Sorrels library. You can cross over to the 4300 corridor to your north or into Doherty B to your east. A door to stairwell B is to your south.",
        {
            west: say("The door to Sorrels is locked and alarmed from this direction."),
            east: goto("liminal.ramp"),
            down: goto("liminal.ramp")
        }
    ),
    weanRoom(
        4,
        "600",
        "Murder Hallway (Wean 4600 Corridor)",
        "You're in a corridor buried under the Mall. The 4th floor lobby is to your north. You can continue further south. A narrower corridor forks off to your east. A door to stairwell C1 is to your west.",
        {
            north: goto("wean.4.south"),
            south: goto("wean.4.600_south"),
            east: goto("wean.4.700"),
            west: goto("wean.stairs.c1.4")
        }
    ),
    weanRoom(
        4,
        "600_south",
        "Murder Hallway (Wean 4600 Corridor)",
        "You're further down in a corridor buried under the Mall. The 4th floor lobby is to your north, but out of sight in the twisty hallways. A narrow corridor branches off to your east. A door to stairwell C2 is to your west.",
        {
            north: goto("wean.4.600"),
            east: goto("wean.4.700_south"),
            west: goto("wean.stairs.c2.4")
        }
    ),
    weanRoom(
        4,
        "700",
        "Murder Hallway (Wean 4700 Corridor)",
        "You're in a loop just off of the main murder hallway, which is to your west. The walls are drywall instead of concrete, and the floor is carpeted. You can continue southwest.",
        {
            west: goto("wean.4.600"),
            southwest: goto("wean.4.700_south"),
            east: {
                type: "door",

                roomId: "wean.4.703",

                doorId: "wean_4703",

                doorNouns: [], // TODO
                canOpen: false,
                canClose: true,
                closeOnUse: false,
                keyItem: null
            }
        }
    ),
    weanRoom(
        4,
        "700_south",
        "Murder Hallway (Wean 4700 Corridor)",
        "You're in a loop just off of the main murder hallway, the more distant side of which is now to your west. The 4700 corridor runs north. You note an abnormally large parcel slot in the wall around the corner.",
        {
            northeast: goto("wean.4.700"),
            west: goto("wean.4.600_south"),
            north: {
                type: "door",
                say: "You climb through the parcel slot with some difficulty, landing face-first in a colorful lavender-scented sea of hanging shirts. After wading through the clothes rack, you emerge into a softly lit room.",

                roomId: "wean.4.706",

                doorId: "wean_4706",

                doorNouns: [], // TODO
                canOpen: true,
                canClose: true,
                closeOnUse: false,
                keyItem: null
            }
        }
    ),
    weanRoom(
        4,
        "sorrels",
        "Sorrels Library",
        "You find yourself in a modestly sized, skylit library on the 4th floor of Wean Hall. The lobby is to your west. You notice a print station just to the side of the door, at which a partially-folded README is present.",
        {
            west: goto("wean.4.south"),
            east: goto("wean.4.400")
        }
    ),
    weanRoom(
        4,
        "703",
        "Faculty Senate Conference Room (Wean 4703)",
        "You find yourself in a room with a large table and a dozen or so green-upholstered chairs. The furniture and decor of the room harkens back to the 1980's. You note a door on the east wall which looks particularly out of place. The hallway is to your west.",
        {
            east: {
                type: "door",

                roomId: "steam_tunnel.wean",

                doorId: "steam_tunnel_to_4703",

                doorNouns: [], // TODO
                canOpen: false,
                canClose: true,
                closeOnUse: false,
                keyItem: null
            },
            west: {
                type: "door",

                roomId: "wean.4.700",

                doorId: "wean_4703",

                doorNouns: [], // TODO
                canOpen: true,
                canClose: true,
                closeOnUse: false,
                keyItem: null
            }
        }
    ),
    weanRoom(
        4,
        "706",
        "Wean 4706",
        "You find yourself in a cozy room which seems to be someone's home. You note the presence of a twin XL mattress, a nightstand, a dresser, a rack of hanging shirts, a minifridge, a standalone sink rigged up to a tank of water, and numerous pride flags and protest signs adorning the walls. You best not disrupt this place. The parcel slot you climbed in through is to your south.",
        {
            south: {
                type: "door",

                roomId: "wean.4.700_south",

                doorId: "wean_4706",

                doorNouns: [],
                canOpen: true,
                canClose: false,
                closeOnUse: false,
                keyItem: null
            }
        }
    ),
    
    // // 5

    weanLobbyNorthRoom(
        5,
        "You're in the 5th floor lobby of Wean Hall. The lobby continues to your south. The 5200 corridor runs west and the 4300 corridor runs east.",
        {
            west: goto("wean.5.200_clusters")
        }
    ),
    weanLobbySouthRoom(
        5,
        "You're in the 5th floor lobby of Wean Hall. The lobby continues to your north. The 5100 corridor runs west, the 5400 corridor runs east, and La Prima is just to your south.",
        {
            south: goto("la_prima")
        }
        // PUT A README HERE
    ),
    weanCorridor100Room(
        5,
        "You're in a tall corridor with whitewashed concrete walls. The 5th floor lobby is to your east. A door to stairwell D is to your south. At the west end of the corridor is a connection to Scott Hall's 5th floor.",
        {
            west: goto("scott.5")
        }
    ),
    weanCorridor200Room(
        5,
        "You're in a narrow corridor with many twists and turns. The walls are white with red trim. You can pass through a door to your east to access the rest of the 5200 corridor, or cut across to the 5100 corridor to your south.",
        {
            east: goto("wean.5.200_clusters")
        }
    ),
    weanCorridor300Room(
        5,
        "You're in an uninteresting corridor lined with classrooms. The 5th floor lobby is to your west. You can cross over to the 5400 corridor to your south. A door to stairwell A2 is to your north."
    ),
    weanCorridor400Room(
        5,
        "You're in a corridor overlooking Sorrels library, lined with classrooms on its north wall. One to your northwest has its doors open and a strange humming noise seems to be emanating from within it. You can cross over to the 4300 corridor to your north or into Doherty A to your east. A door to stairwell B is to your south.",
        {
            northwest: goto("wean.5.403"),
            east: goto("liminal.ground"),
            down: say("The balcony overlooking Sorrels is lined with glass; jumping down is infeasible.")
        }
    ),
    weanRoom(
        5,
        "200_clusters",
        "Wean 5200 Corridor",
        "You're in a short stretch of corridor lined with open doors. The 5th floor lobby is to your east. To your north, south, and southwest are the Windows, Mac, and Linux clusters respectively.",
        {
            north: goto("wean.5.202"),
            south: goto("wean.5.201"),
            southwest: goto("wean.5.207"),
            west: say("The door to the rest of the 5200 corridor is alarmed."),
            east: goto("wean.5.north")
        }
    ),
    weanRoom(
        5,
        "201",
        "Mac Cluster (Wean 5201)",
        "You find yourself in a warped mockery of Cluster, which is full of Mac workstations, whiteboards, and green chairs. Doors to the hallway are to your north.",
        {
            north: goto("wean.5.200_clusters")
        }
    ),
    weanRoom(
        5,
        "202",
        "Windows Cluster (Wean 5202)",
        "You find yourself in Cluster, a room full of Windows workstations, whiteboards, and green chairs. Doors to the hallway are to your south.",
        {
            south: goto("wean.5.200_clusters")
        }
        // TODO: add gong
    ),
    weanRoom(
        5,
        "207",
        "Linux Cluster (Wean 5207)",
        "You find yourself in the Linux cluster, a claustrophic room full of Linux workstations, whiteboards, and green chairs. A door to the hallway is to your northeast.",
        {
            northeast: goto("wean.5.200_clusters")
        }
    ),
    weanRoom(
        5,
        "403",
        "GBM Room (Wean 54xx)",
        "You're in a moderately sized lecture hall. A humming noise, reminiscent of the call of the plainfin midshipman, reverberates through the room from an unidentifiable source. The room is empty, but [TODO] is scrawled upon the blackboard. The door is to your southeast.",
        {
            southeast: goto("wean.5.400")
        }
    ),

    // 6

    weanLobbyNorthRoom(
        6,
        "You're in the 6th floor lobby of Wean Hall. The lobby continues to your south. The 6200 corridor runs west and the 6300 corridor runs east."
    ),
    weanLobbySouthRoom(
        6,
        "You're in the 6th floor lobby of Wean Hall, which overlooks La Prima to your south. You could possibly climb up onto the parapet. The lobby continues to your north. The 6100 corridor runs west and the 6400 corridor runs east.",
        {
            south: goto("wean.6.parapet"),
            up: goto("wean.6.parapet")
        }
    ),
    weanCorridor100Room(
        6,
        "You're in a dull corridor with a large map of Pittsburgh hanging on one wall. The 6th floor lobby is to your east. A door to stairwell D is to your south. At the west end of the corridor is a connection to Scott Hall's 6th floor.",
        {
            west: goto("scott.6")
        }
    ),
    weanCorridor200Room(
        6,
        "You're in a dull corridor. The 6th floor lobby is to your east. At the far west end you notice a jail glyph on the wall. You can cut across to the 6100 corridor to your south."
    ),
    weanCorridor300Room(
        6,
        "You're in a dull corridor. The 6th floor lobby is to your west. You can cross over to the 6400 corridor to your south. A door to stairwell A2 is to your north."
    ),
    weanCorridor400Room(
        6,
        "You're in a dull corridor. The 6th floor lobby is to your west. You can cross over to the 6300 corridor to your north or into Doherty Hall to your east. A door to stairwell B is to your south.",
        {
            east: goto("liminal.6")
        }
    ),
    weanRoom(
        6,
        "parapet",
        "Balacing above La Prima",
        "You're standing on a parapet about 8 inches wide, balancing above La Prima to your south or a safe hop down to Wean 6 to your north.",
        {
            north: goto("wean.6.south"),
            south: goto("la_prima_counter"),
            down: say("You have two options, and you surely should specify which.")
        }
    ),
    
    // 7

    weanLobbyNorthRoom(
        7,
        "You're in the 7th floor lobby of Wean Hall. The lobby continues to your south. The 7200 corridor runs west and the 7300 corridor runs east."
    ),
    weanLobbySouthRoom(
        7,
        "You're in the 7th floor lobby of Wean Hall. The lobby continues to your north. The 7100 corridor runs west, the 7400 corridor runs east, and two pairs of double doors to your south go to the auditorium inside Wean Hall's turtle head.",
        {
            south: goto("wean.7.500")
        }
    ),
    weanCorridor100Room(
        7,
        "You're in an uninteresting corridor. The 7th floor lobby is to your east. A door to stairwell D is to your south."
    ),
    weanCorridor200Room(
        7,
        "You're in an uninteresting corridor. The 7th floor lobby is to your east. You can cut across to the 7100 corridor to your south."
    ),
    weanCorridor300Room(
        7,
        "You're in an uninteresting corridor. The 7th floor lobby is to your west. You can cross over to the 6400 corridor to your south. A door to stairwell A2 is to your north."
    ),
    weanCorridor400Room(
        7,
        "You're in an uninteresting corridor. The 7th floor lobby is to your west. You can cross over to the 7300 corridor to your north or into Doherty Hall to your east. A door into stairwell B is to your south.",
        {
            east: goto("liminal.7")
        }
    ),
    weanRoom(
        7,
        "500",
        "Inside the Turtle Head (Wean 7500)",
        "You find yourself in a wood-panelled lecture hall of great size. To your west is an emergency exit door, and the double doors back to Wean 7 are at the back of the lecture hall to your north.",
        {
            west: goto("outside_la_prima", "Outside the door, stairs take you down to the mall."),
            north: goto("wean.7.south")
        }
    ),

    // 8

    weanLobbyNorthRoom(
        8,
        "You're in the 8th floor lobby of Wean Hall. The lobby continues to your south. The 8200 corridor runs west and the 8300 corridor runs east."
    ),
    weanLobbySouthRoom(
        8,
        "You're in the 8th floor lobby of Wean Hall. The lobby continues to your north. The 8100 corridor runs west and the 8400 corridor runs east.",
        {
            east: goto("wean.8.400_outside_427")
        }
    ),
    weanCorridor100Room(
        8,
        "You're in an uninteresting corridor. The 8th floor lobby is to your east. A door to stairwell D is to your south."
    ),
    weanCorridor200Room(
        8,
        "You're in an uninteresting corridor. The 8th floor lobby is to your east. You can cut across to the 8100 corridor to your south."
    ),
    weanCorridor300Room(
        8,
        "You're in an uninteresting corridor. The 8th floor lobby is to your west. You can cross over to the 8400 corridor to your south. A door to stairwell A2 is to your north."
    ),
    weanCorridor400Room(
        8,
        "You're in an uninteresting corridor. The 8th floor lobby is in the distance to your west, past some strips of blue tape on the floor. You can cross over to the 8300 corridor to your north or into Doherty Hall to your east. A door into stairwell B is to your south.",
        {
            west: goto("wean.8.400_outside_427"),
            east: goto("liminal.8")
        }
    ),
    weanRoom(
        8,
        "400_outside_427",
        "Wean 8400 Corridor",
        "You're standing between several strips of blue floor tape in an uninteresting corridor. The 8th floor lobby is to your west and the corridor continues east. Room 8427 is open to your north.",
        {
            west: goto("wean.8.south"),
            east: goto("wean.8.400"),
            north: goto("wean.8.427")
        }
    ),
    weanRoom(
        8,
        "427",
        "CtFwS Judges' Room (Wean 8427)",
        "You find yourself in a small classroom which seems to be serving the purpose of Judges' Room for a game of Capture the Flag with Stuff. The door is to your south.", // TODO: add stuff
        {
            south: goto("wean.8.400_outside_427")
        }
    ),
    
    // 9

    weanRoom(
        9,
        "lobby",
        "Wean 9",
        "You find yourself in a small room with a high ceiling. The space opens into a large mechanical penthouse to your south. A door with a warning about non-ionizing radiation sits to your west. A door to stairwell A2 is to your north.",
        {
            south: goto("wean.9.by_roof"),
            north: goto("wean.stairs.a2.9")
        }
    ),
    weanRoom(
        9,
        "by_roof",
        "Wean 9",
        "You're on the far east end of a large mechanical penthouse. You can pass through a chain link gate to your north, through a pair of double doors to your east, or further into the penthouse to your west.",
        {
            north: goto("wean.9.lobby"),
            east: goto("wean.9.ladder"),
            west: goto("wean.9.c_mmp")
        }
    ),
    weanRoom(
        9,
        "c_mmp",
        "Wean 9: C.mmp Cage",
        "You're on the east side of a large mechanical penthouse. To your north is a metal grate cage containing C.mmp, a multiprocessor computer system built in 1972 from 16 PDP-11s. You can go east or west along the row of storage cages.",
        {
            east: goto("wean.9.by_roof"),
            west: goto("wean.9.inside_ladder")
        }
    ),
    weanRoom(
        9,
        "inside_ladder",
        "Wean 9",
        "You're in the center of a large mechanical penthouse. A ladder ascends from here to an unlocked hatch. You observe HVAC machines with windows into bright blue glowing chambers. You can go east or west.",
        {
            up: goto("wean.10.center"),
            east: goto("wean.9.c_mmp"),
            west: goto("wean.9.west")
        }
    ),
    weanRoom(
        9,
        "west",
        "Wean 9",
        "You're on the west end of a large mechanical penthouse. A door sits to your southwest. You can go east within the penthouse.",
        {
            southwest: goto("wean.9.southwest_roof"),
            east: goto("wean.9.inside_ladder")
        }
    ),
    weanRoom(
        9,
        "ladder",
        "Wean 9: Roof",
        "You find yourself on the roof of Wean Hall. A pair of double doors to the inside sit to your west. A ladder with sturdy square rungs ascends the wall. You can go south along a narrow section of the building's east roof, flanked on one side by the penthouse wall and on the other by concrete sheds containing cellular equipment.",
        {
            west: goto("wean.9.by_roof"),
            up: goto("wean.10.two_ladders"),
            south: goto("wean.9.camera")
        }
    ),
    weanRoom(
        9,
        "camera",
        "Wean 9: Roof",
        "You stand on the southeast corner of the roof of Wean Hall, overlooking the Mall. In front of you is a domed security camera hanging off the side of the building. You can go north or west on the roof.",
        {
            north: goto("wean.9.ladder"),
            west: goto("wean.9.over_turtle")
        }
    ),
    weanRoom(
        9,
        "over_turtle",
        "Wean 9: Roof",
        "You stand on the roof of Wean Hall under the slanty bits of its roof. You can see the top of the turtle head, which is uniformly brown, and the Mall sprawling out below you. You can go east or west.",
        {
            east: goto("wean.9.camera"),
            west: goto("wean.9.southwest_roof")
        }
    ),
    weanRoom(
        9,
        "southwest_roof",
        "Wean 9: Roof",
        "You find yourself on a large, flat section of the roof of Wean Roof. The top of staircase D protrudes from the corner of the building. It has a door, which is to your south. You can enter the penthouse through a door to your northeast. The rest of the roof is to your east.",
        {
            south: goto("wean.stairs.d.9"),
            northeast: goto("wean.9.west"),
            east: goto("wean.9.over_turtle")
        }
    ),
    weanRoom(
        10,
        "two_ladders",
        "Wean 10: Two ladders",
        "You're on a small square of concrete overlooking two sections of Wean's lower roof. There's one short ladder going up to your south and one long ladder going up to your north. To your east, a ladder descends back down.",
        {
            north: goto("wean.11"),
            south: goto("wean.10.east"),
            up: say("North or south?"),
            down: goto("wean.9.ladder"),
            east: goto("wean.9.ladder")
        }
    ),
    weanRoom(
        10,
        "east",
        "Wean 10: Roof",
        "You're on the east side of the roof of Wean Hall's penthouse. You have an unparalleled view of campus. It's relatively barren, but you note some solar panels and HVAC equipment. You can descend a ladder to your north, or continue on the roof to the west.",
        {
            north: goto("wean.10.two_ladders"),
            down: goto("wean.10.two_ladders"),
            west: goto("wean.10.center")
        }
    ),
    weanRoom(
        10,
        "center",
        "Wean 10: Roof",
        "You're in the center of the roof of Wean Hall's penthouse. A large area nearby is raised up onto a platform to cover numerous HVAC ducts. A hatch covers a ladder descending into the penthouse. You can go north, east, or west.",
        {
            north: goto("wean.10.jacuzzi"),
            east: goto("wean.10.east"),
            west: goto("wean.10.west"),
            down: goto("wean.9.inside_ladder")
        }
    ),
    weanRoom(
        10,
        "west",
        "Wean 10: Roof",
        "You're on the west side of the roof of Wean Hall's penthouse. You note some sort of tripod which has tipped over, but not much else. You can go east.",
        {
            east: goto("wean.10.center")
        }
    ),
    weanRoom(
        10,
        "jacuzzi",
        "Wean 10: Roof",
        "You're in a strange part of Wean's roof, sunken below the rest. It almost resembles a jacuzzi, if it were to be filled with water. This would be a sick place to host a party.",
        {
            south: goto("wean.10.center")
        }
    ),
    weanRoom(
        11,
        null,
        "Wean 11",
        "You're now on the highest part of Wean's roof. You're surrounded on all sides by high-power cellular and radio antennas. Your core becomes suspiciously warm. Good thing you weren't planning on having kids. The ladder down is to your south.", // WARM COFFEE
        {
            south: goto("wean.10.two_ladders"),
            down: goto("wean.10.two_ladders")
        }
    ),

    // Stair A2

    weanStairA2Room(
        1,
        "A door with a large 1 is to your south.",
        {
            south: goto("wean.1.300"),
            up: goto("wean.stairs.a2.1_1_2")
        }
    ),
    basicRoom(
        "wean.stairs.a2.1_1_2",
        "Wean Stairwell A2: Floor 1\xbd",
        "A door to the loading dock is to your north. You can go up or down.",
        {
            north: goto("hamersclag_drive.wean_loading_dock"),
            down: goto("wean.stairs.a2.1"),
            up: goto("wean.stairs.a2.2")
        }
    ),
    weanStairA2Room(
        2,
        "A door with a large 2 is to your south.",
        {
            south: goto("wean.2.300"),
            down: goto("wean.stairs.a2.1_1_2")
        }
    ),
    weanStairA2Room(
        3,
        "A door with a large 3 is to your south.",
        {
            south: goto("wean.3.300")
        }
    ),
    weanStairA2Room(
        4,
        "A door with a large 4 is to your south.",
        {
            south: goto("wean.4.300")
        }
    ),
    weanStairA2Room(
        5,
        "A door with a large 5 is to your south.",
        {
            south: goto("wean.5.300")
        }
    ),
    weanStairA2Room(
        6,
        "A door with a large 6 is to your south.",
        {
            south: goto("wean.6.300")
        }
    ),
    weanStairA2Room(
        7,
        "A door with a large 7 is to your south.",
        {
            south: goto("wean.7.300")
        }
    ),
    weanStairA2Room(
        8,
        "A door with a large 8 is to your south.",
        {
            south: goto("wean.8.300")
        }
    ),
    weanStairA2Room(
        9,
        "You notice the stairwell has changed dimensions slightly. The roof is sloped and a gap in the south wall overlooks the door to floor 8. Graffiti covers the walls. A door with a card scanner is to your south.",
        {
            south: say("The door is securely locked.")
        }
    ),

    // Stair B

    weanStairBRoom(
        3,
        "A door with a large 3 is to your north.",
        {
            north: goto("wean.3.400")
        }
    ),
    weanStairBRoom(
        4,
        "A door with a large 4 is to your north.",
        {
            north: goto("wean.4.400")
        }
    ),
    weanStairBRoom(
        5,
        "A door with a large 5 is to your north.",
        {
            north: goto("wean.5.400")
        }
    ),
    weanStairBRoom(
        6,
        "A door with a large 6 is to your north.",
        {
            north: goto("wean.6.400")
        }
    ),
    weanStairBRoom(
        7,
        "A door with a large 7 is to your north.",
        {
            north: goto("wean.7.400")
        }
    ),
    weanStairBRoom(
        8,
        "A door with a large 8 is to your north.",
        {
            north: goto("wean.8.400")
        }
    ),

    // Stair C1

    weanStairC1Room(
        3,
        "stair 3",
        {
            east: goto("wean.3.500")
        }
    ),
    weanStairC1Room(
        4,
        "stair 4",
        {
            east: goto("wean.4.600")
        }
    ),

    // Stair C2

    weanStairC2Room(
        3,
        "stair 3",
        {
            east: goto("wean.3.spooky_closet")
        }
    ),
    weanStairC2Room(
        4,
        "stair 4",
        {
            east: goto("wean.4.600_south")
        }
    ),

    // Stair D

    weanStairDRoom(
        3,
        "A door with a large 3 is to your north.",
        {
            north: goto("wean.3.100")
        }
    ),
    weanStairDRoom(
        4,
        "A door with a large 4 is to your north.",
        {
            north: goto("wean.4.100")
        }
    ),
    weanStairDRoom(
        5,
        "A door with a large 5 is to your north.",
        {
            north: goto("wean.5.100")
        }
    ),
    weanStairDRoom(
        6,
        "A door with a large 6 is to your north.",
        {
            north: goto("wean.6.100")
        }
    ),
    weanStairDRoom(
        7,
        "A door with a large 7 is to your north.",
        {
            north: goto("wean.7.100")
        }
    ),
    weanStairDRoom(
        8,
        "A door with a large 8 is to your north.",
        {
            north: goto("wean.8.100")
        }
    ),
    weanStairDRoom(
        9,
        "Unusual doors sit to your north and west. Light streams through a small hole drilled in the east wall.",
        {
            north: say("The door to your north is securely locked."),
            west: say("The door to your west is securely locked.")
        }
    ),
];