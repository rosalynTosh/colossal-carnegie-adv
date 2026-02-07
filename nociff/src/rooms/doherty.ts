import { basicRoom, goto, Room } from "../rooms";

export function dohertyRoom(id: string, dirs: Room["dirs"], long?: string, short: string = "Doherty Hall"): Room {
    const longStr = long ?? (
        dirs.down === undefined && dirs.up === undefined ? (
            Object.keys(dirs).map(d => "A corridor runs " + d + ".").join(" ") || "You see no exits."
        ) : (
            Object.keys(dirs).filter(d => d != "up" && d != "down").map(d => "A corridor runs " + d + ".").join(" ") + " Stairs run " + (
                dirs.down === undefined ? "up" : dirs.up === undefined ? "down" : "up and down"
            ) + "."
        )
    );

    return {
        id: "doherty." + id,

        print: () => short + "\nYou're somewhere inside Doherty Hall. " + longStr,

        dirs
    };
}

export const DOHERTY_ROOMS: Room[] = [
    // Doherty F

    // Doherty E

    // Doherty D

    // Doherty C

    // Doherty B

    // Doherty A

    // Doherty 1

    dohertyRoom("1.lobby", {
        east: goto("the_fence"),
        west: goto("doherty.1.lobby_west"),
        north: goto("doherty.1.chem_e"),
        south: goto("doherty.warm_stairs.1"),
        southwest: goto("doherty.1.paint_room")
    }, "You see grass and cloudy skies through a pair of glass doors to your east. Corridors run north and west. On the walls to your north sit densely-packed posterboards. Doors sit to your south and southwest, the latter of which is speckled with brightly colored paints."),
    dohertyRoom("1.lobby_west", {
        east: goto("doherty.1.lobby"),
        south: goto("doherty.1.stairs")
    }, "A corridor runs east. A tall pair of double doors invites you into a space to your south."),
    dohertyRoom("1.stairs", {
        north: goto("doherty.1.lobby_west"),
        south: goto("doherty.1.212"),
        up: goto("doherty.2.stairs"),
        down: goto("doherty.a.stairs")
    }, "A corridor is situated to your north. A lecture hall sits to your south. Stairs run up and down."),
    basicRoom(
        "doherty.1.212",
        "Doherty Hall: DH 1212",
        "You find yourself in a lecture hall. From the chalk dust on the board you can conclude a meeting of some sort has recently concluded. A closer glance reveals the phrase \"unlicensed.\" On the desk at the front of the room is a copy of Vol 2 Issue 5 of README.",
        {
            north: goto("doherty.1.stairs")
        }
    ),
    basicRoom(
        "doherty.1.paint_room",
        "Doherty Hall: Paint Cleanup Closet",
        "You find yourself in the paint cleanup closet of Doherty Hall. It's stiflingly hot. The walls are coated in splatters and handprints in assorted bright colors. Two faucets sit at the ready. The door is to your northeast.",
        {
            northeast: goto("doherty.1.stairs")
        }
    ),

    // Doherty 1W

    dohertyRoom("1.west_corridor", {
        south: goto("mall"),
        north: goto("doherty.1.west"),
        east: goto("doherty.1.premed_office")
    }, "You see grass and cloudy skies through a door to your south. A corridor runs north. An open office door sits to your east."),
    dohertyRoom("1.west", {
        south: goto("doherty.1.west_corridor"),
        west: goto("liminal.6"),
        north: goto("doherty.1.chem_lab"),
        up: goto("doherty.2.west"),
        down: goto("doherty.a.west")
    }, "A pair of double doors sits to your west. A corridor runs south. The door to a laboratory sits ajar to your north. Stairs run up and down."),
    dohertyRoom("1.premed_office", {
        west: goto("doherty.1.west_corridor")
    }, "You find yourself in a cozy office. You find yourself considering premed. A door to the corridor outside is situated to your west."),
    basicRoom(
        "doherty.1.chem_lab",
        "Doherty Hall: Chemistry Lab",
        "You find yourself in a chemistry lab. Among rows and rows of stations stocked with cloudy glassware and outdated instruments, you spot [some item]. A pair of double doors sits to your south and a single door into a stairwell is situated to your north.",
        {
            north: goto("doherty.glass_stairs.1"),
            south: goto("doherty.1.west")
        }
    ),

    // Doherty 2

    // Doherty 3
    
    // Doherty 3W

    // Doherty 4

    // Doherty 4W

    // Doherty roof
];