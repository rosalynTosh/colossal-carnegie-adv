import { basicRoom, goto, Room, say } from "../rooms";

function ansysRoom(floor: string, idPart: string | null, short: string | null, long: string, dirs: Room["dirs"]): Room {
    return basicRoom(
        "ansys." + floor + (idPart === null ? "" : "." + idPart),
        "ANSYS Hall: Floor " + floor.toUpperCase() + (short === null ? "" : ", " + short),
        long,
        dirs
    );
}

const FLOORS = ["d", "c", "b", "a", "1", "2"];

function ansysStairRoomBuilder(stairIdPart: string, shortPart: string, longAdjs: string): (floor: string, long: string, dirs: Room["dirs"]) => Room {
    return function (floor: string, long: string, dirs: Room["dirs"]): Room {
        const floorIndex = FLOORS.indexOf(floor);

        return basicRoom(
            "ansys." + stairIdPart + "." + floor,
            shortPart + ": Floor " + floor.toUpperCase(),
            "You're " + (floorIndex == 0 ? "at the bottom" : floorIndex == FLOORS.length - 1 ? "at the top" : "in the middle") + " of a " + longAdjs + "flight of stairs." + (long == "" ? "" : " " + long),
            {
                down: floorIndex == 0 ? undefined : goto("ansys." + stairIdPart + "." + FLOORS[floorIndex - 1]),
                up: floorIndex == FLOORS.length - 1 ? undefined : goto("ansys." + stairIdPart + "." + FLOORS[floorIndex + 1]),
                ...dirs
            }
        );
    };
}

const ansysStairRoom = ansysStairRoomBuilder("stairs", "ANSYS Stairs", "");
const ansysBigStairRoom = ansysStairRoomBuilder("big_stairs", "ANSYS Big Stairs", "large ");

export const ANSYS_ROOMS: Room[] = [
    // D
    ansysRoom(
        "d",
        null,
        null,
        "This is a small corridor lined by locked labs and maintenance rooms. There is a door to a stairwell to the west.",
        {
            west: goto("ansys.stairs.d")
        }
    ),

    // C
    ansysRoom(
        "c",
        null,
        null,
        "This is the ground floor of ANSYS Hall, with an exit through a pair of glass double doors to the west, through which the Scaife Quad is visible. TechSpark is to the north, and there is a door to a stairwell to the south. To the east there is a hallway running north.",
        {
            west: goto("scaife_quad"),
            north: goto("techspark"),
            south: goto("ansys.stairs.c"),
            east: goto("ansys.c.courtyard_hallway")
        }
    ),
    ansysRoom(
        "c",
        "courtyard_hallway",
        "courtyard hallway",
        "This hallway runs north to a door into a small enclosed outdoor space. ANSYS C is to the west.",
        {
            north: goto("cursed_courtyard"),
            west: goto("ansys.c")
        }
    ),

    // B
    ansysRoom(
        "b",
        null,
        null,
        "This is a nice area with many chairs and windows. There are some locked classrooms nearby, and a door to a stairwell to the south.",
        {
            south: goto("ansys.stairs.b"),
            north: goto("ansys.big_stairs.b")
        }
    ),

    // A
    ansysRoom(
        "a",
        null,
        "The Belonging Center",
        "This is a nice quiet area with comfortable chairs and potted plants. To the east there's a ramp to Porter A, and a door to the south takes you to a stairwell. Another stairwell is through a large pair of double doors to your north.",
        {
            east: goto("porter.a"),
            south: goto("ansys.stairs.a"),
            north: goto("ansys.big_stairs.a")
        }
    ),

    // 1
    ansysRoom(
        "1",
        null,
        null,
        "This is a nice area with many chairs and windows. There are some locked classrooms nearby, and a door to a stairwell to the south.",
        {
            south: goto("ansys.stairs.1"),
            north: goto("ansys.big_stairs.1")
        }
    ),

    // 2
    ansysRoom(
        "2",
        null,
        null,
        "This is a small vestibule with glass doors to the north and west. A prominent sign indicates that this floor holds offices for the College of Engineering.",
        {
            north: goto("ansys.2.offices"),
            west: goto("ansys.2.kitchenette")
        }
    ),
    ansysRoom(
        "2",
        "offices",
        "offices",
        "This is a large, inviting space filled with cubicles and doors to offices. A door to the east goes to a stairwell, and a narrow hallway runs south.",
        {
            east: goto("ansys.big_stairs.2"),
            south: goto("ansys.2")
        }
    ),
    ansysRoom(
        "2",
        "kitchenette",
        "kitchenette",
        "This is a small kitchenette. There is a conference room just to the west, and a pair of glass double doors opposite it to the east. There is a door to a stairwell to the south.",
        {
            west: goto("ansys.2.conference_room"),
            east: goto("ansys.2"),
            south: goto("ansys.stairs.2")
        }
    ),
    ansysRoom(
        "2",
        "conference_room",
        "conference room",
        "This is a modern conference room with an exit to the east. All other walls are glass windows from floor to ceiling, showing a beautiful view of the Scaife Quad and the Oakland area.",
        {
            east: goto("ansys.2.kitchenette")
        }
    ),

    // stairs
    ansysStairRoom(
        "d",
        "A single door to your east has a card scanner showing red, but is unlocked.",
        {
            east: goto("ansys.d")
        }
    ),
    ansysStairRoom(
        "c",
        "A door to your north goes to floor C, a door to your west goes outside, and there is a locked door to your east. On the other side you see a kitchenette.",
        {
            north: goto("ansys.c"),
            west: goto("scaife_quad"),
            east: say("The door is locked.")
        }
    ),
        ansysStairRoom(
        "b",
        "A door to your north goes to floor B, a door to your west goes outside, and there is a short, unmarked, unlocked door to your east.",
        {
            north: goto("ansys.b"),
            west: goto("porter.b.patio"),
            east: goto("porter.a.18")
        }
    ),
        ansysStairRoom(
        "a",
        "A door to your north goes to floor A.",
        {
            north: goto("ansys.a")
        }
    ),
        ansysStairRoom(
        "1",
        "A door to your north goes to floor 1, and there is a locked door to your east.",
        {
            north: goto("ansys.1"),
            east: say("The door is locked.")
        }
    ),
        ansysStairRoom(
        "2",
        "A door to your north goes to floor 2, there is a pair of locked double doors to your west, and there is a short locked door to your east.",
        {
            north: goto("ansys.2.kitchenette"),
            west: say("The doors are locked."),
            east: say("The door is locked.")
        }
    ),

    // big stairs
    ansysBigStairRoom(
        "d",
        "A single door to your west has a card scanner showing red.",
        {
            west: say("The door is locked.")
        }
    ),
        ansysBigStairRoom(
        "c",
        "TechSpark is visible through a pair of glass doors to your west.",
        {
            west: goto("techspark")
        }
    ),
        ansysBigStairRoom(
        "b",
        "You can see TechSpark below you to the west, and an outside wall of Porter Hall to your east. A door leads outside to a walkway to your north, and floor B is through a large pair of double doors to the south.",
        {
            north: goto("scaife_walkway"),
            south: goto("ansys.b")
        }
    ),
        ansysBigStairRoom(
        "a",
        "A large pair of double doors to the south goes to floor A.",
        {
            south: goto("ansys.a")
        }
    ),
        ansysBigStairRoom(
        "1",
        "A large pair of double doors to the south goes to floor 1.",
        {
            south: goto("ansys.1")
        }
    ),
        ansysBigStairRoom(
        "2",
        "A single door to your west goes to floor 2.",
        {
            west: goto("ansys.2.offices")
        }
    ),
];