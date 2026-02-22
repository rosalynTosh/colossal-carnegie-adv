import { basicRoom, goto, Room, say } from "../rooms";

export const ANSYS_ROOMS: Room[] = [
    // D
    basicRoom(
        "ansys.d",
        "ANSYS Hall: Floor D",
        "This is a small corridor lined by locked labs and maintenance rooms. There is a door to a stairwell to the west.",
        {
            west: goto("ansys.stairs.d")
        }
    ),

    // C
    basicRoom(
        "ansys.c",
        "ANSYS Hall: Floor C",
        "This is the ground floor of ANSYS Hall, with an exit through a pair of glass double doors to the west, through which the Scaife Quad is visible. TechSpark is to the north, and there is a door to a stairwell to the south. To the east there is a hallway running north.",
        {
            west: goto("scaife_quad"),
            north: goto("techspark"),
            south: goto("ansys.stairs.c"),
            east: goto("ansys.c.courtyard_hallway")
        }
    ),
    basicRoom(
        "ansys.c.courtyard_hallway",
        "ANSYS Hall: Floor C, courtyard hallway",
        "This hallway runs north to a door into a small enclosed outdoor space. ANSYS C is to the west.",
        {
            north: goto("cursed_courtyard"),
            west: goto("ansys.c")
        }
    ),

    // B
    basicRoom(
        "ansys.b",
        "ANSYS Hall: Floor B",
        "This is a nice area with many chairs and windows. There are some locked classrooms nearby, and a door to a stairwell to the south.",
        {
            south: goto("ansys.stairs.b"),
            north: goto("ansys.big_stairs.b")
        }
    ),

    // A
    basicRoom(
        "ansys.a",
        "ANSYS Hall: Floor A, The Belonging Center",
        "This is a nice quiet area with comfortable chairs and potted plants. To the east there's a ramp to Porter A, and a door to the south takes you to a stairwell. Another stairwell is through a large pair of double doors to your north.",
        {
            east: goto("porter.a"),
            south: goto("ansys.stairs.a"),
            north: goto("ansys.big_stairs.a")
        }
    ),

    // 1
    basicRoom(
        "ansys.1",
        "ANSYS Hall: Floor 1",
        "This is a nice area with many chairs and windows. There are some locked classrooms nearby, and a door to a stairwell to the south.",
        {
            south: goto("ansys.stairs.b"),
            north: goto("ansys.big_stairs.1")
        }
    ),

    // 2
    basicRoom(
        "ansys.2",
        "ANSYS Hall: Floor 2",
        "This is a small vestibule with glass doors to the north and west. A prominent sign indicates that this floor holds offices for the College of Engineering.",
        {
            north: goto("ansys.2.offices"),
            west: goto("ansys.2.kitchenette")
        }
    ),
    basicRoom(
        "ansys.2.offices",
        "ANSYS Hall: Floor 2, offices",
        "This is a large, inviting space filled with cubicles and doors to offices. A door to the east goes to a stairwell, and a narrow hallway runs south.",
        {
            east: goto("ansys.big_stairs.2"),
            south: goto("ansys.2.kitchenette")
        }
    ),
    basicRoom(
        "ansys.2.kitchenette",
        "ANSYS Hall: Floor 2, kitchenette",
        "This is a small kitchenette. There is a conference room just to the west, and a pair of glass double doors opposite it to the east. A narrow hallway runs north, and a there is a door to a stairwell to the south.",
        {
            west: goto("ansys.2.conference_room"),
            east: goto("ansys.2"),
            north: goto("ansys.2.offices"),
            south: goto("ansys.stairs.2")
        }
    ),
    basicRoom(
        "ansys.2.conference_room",
        "ANSYS Hall: Floor 2, conference room",
        "This is a modern conference room with an exit to the east. All other walls are glass windows from floor to ceiling, showing a beautiful view of the Scaife Quad and the Oakland area.",
        {
            east: goto("ansys.2.kitchenette")
        }
    )
];

const FLOORS = ["X", "d", "c", "b", "a", "1", "2", "X"];

for (let i = 1; i <= 6; i++) {
    const floor = FLOORS[i];

    ANSYS_ROOMS.push(basicRoom(
        "ansys.stairs." + floor,
        "ANSYS Stairs: Floor " + floor.toUpperCase(),
        "You're " + (floor == "d" ? "at the bottom" : floor == "2" ? "at the top" : "in the middle") + " of a flight of stairs. " + ({
            "d": "A single door to your east has a card scanner showing red, but is unlocked.",
            "c": "A door to your north goes to floor C, a door to your west goes outside, and there is a locked door to your east. On the other side you see a kitchenette.",
            "b": "A door to your north goes to floor B, a door to your west goes outside, and there is a short, unmarked, unlocked door to your east.",
            "a": "A door to your north goes to floor A.",
            "1": "A door to your north goes to floor 1, and there is a locked door to your east.",
            "2": "A door to your north goes to floor 2, there is a pair of locked double doors to your west, and there is a short locked door to your east."
        } as const)[floor],
        {
            down: goto("ansys.stairs." + FLOORS[i - 1]),
            up: goto("ansys.stairs." + FLOORS[i + 1]),
            north: goto("ansys." + floor)
        }
    ));

    ANSYS_ROOMS.push(basicRoom(
        "ansys.big_stairs." + floor,
        "ANSYS Big Stairs: Floor " + floor.toUpperCase(),
        "You're " + (floor == "d" ? "at the bottom" : floor == "2" ? "at the top" : "in the middle") + " of a large flight of stairs. " + ({
            "d": "A single door to your west has a card scanner showing red.",
            "c": "TechSpark is visible through a pair of glass doors to your west.",
            "b": "You can see TechSpark below you to the west, and an outside wall of Porter Hall to your east. A door leads outside to a walkway to your north, and floor B is through a large pair of double doors to the south.",
            "a": "A large pair of double doors to the south goes to floor A.",
            "1": "A large pair of double doors to the south goes to floor 1.",
            "2": "A single door to your west goes to floor 2."
        })[floor],
        {
            down: goto("ansys.big_stairs." + FLOORS[i - 1]),
            up: goto("ansys.big_stairs." + FLOORS[i + 1])
        }
    ));
}

delete ANSYS_ROOMS.find(r => r.id == "ansys.stairs.d")!.dirs.down;
delete ANSYS_ROOMS.find(r => r.id == "ansys.stairs.d")!.dirs.north;
ANSYS_ROOMS.find(r => r.id == "ansys.stairs.d")!.dirs.east = goto("ansys.d");

ANSYS_ROOMS.find(r => r.id == "ansys.stairs.c")!.dirs.west = goto("scaife_quad");
ANSYS_ROOMS.find(r => r.id == "ansys.stairs.c")!.dirs.east = say("The door is locked.");

ANSYS_ROOMS.find(r => r.id == "ansys.stairs.b")!.dirs.west = goto("porter.b.patio");
ANSYS_ROOMS.find(r => r.id == "ansys.stairs.b")!.dirs.east = goto("porter.a.18");

ANSYS_ROOMS.find(r => r.id == "ansys.stairs.1")!.dirs.east = say("The door is locked.");

delete ANSYS_ROOMS.find(r => r.id == "ansys.stairs.2")!.dirs.up;
ANSYS_ROOMS.find(r => r.id == "ansys.stairs.2")!.dirs.north = goto("ansys.2.kitchenette");
ANSYS_ROOMS.find(r => r.id == "ansys.stairs.2")!.dirs.west = say("The doors are locked.");
ANSYS_ROOMS.find(r => r.id == "ansys.stairs.2")!.dirs.east = say("The door is locked.");

delete ANSYS_ROOMS.find(r => r.id == "ansys.big_stairs.d")!.dirs.down;
ANSYS_ROOMS.find(r => r.id == "ansys.big_stairs.d")!.dirs.west = say("The door is locked.");

ANSYS_ROOMS.find(r => r.id == "ansys.big_stairs.c")!.dirs.west = goto("techspark");

ANSYS_ROOMS.find(r => r.id == "ansys.big_stairs.b")!.dirs.north = goto("scaife_walkway");
ANSYS_ROOMS.find(r => r.id == "ansys.big_stairs.b")!.dirs.south = goto("ansys.b");

ANSYS_ROOMS.find(r => r.id == "ansys.big_stairs.a")!.dirs.south = goto("ansys.a");

ANSYS_ROOMS.find(r => r.id == "ansys.big_stairs.1")!.dirs.south = goto("ansys.1");

ANSYS_ROOMS.find(r => r.id == "ansys.big_stairs.2")!.dirs.west = goto("ansys.2.offices");