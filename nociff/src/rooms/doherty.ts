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

        print: () => [{
            type: "output",
            str: short + "\nYou're somewhere inside Doherty Hall. " + longStr
        }],

        dirs,

        items: [],
        itemStrs: {}
    };
}

export const DOHERTY_ROOMS: Room[] = [
    // Doherty F

    // Doherty E

    // Doherty D

    // Doherty C

    // Doherty B

    dohertyRoom("b.art_hall", {
        north: goto("doherty.b.monitor_desk"),
        east: goto("doherty.b.first_year_studio"),
        south: goto("doherty.b.mall_side_corridor.mural"),
        west: goto("doherty.b.upper_class_studios"),
        down: goto("doherty.c.stairs"),
        up: goto("doherty.a.west")
    }),
    dohertyRoom("b.chem_e_hall", {
        north: goto("doherty.b.chem_e"),
        east: goto("doherty.b.woodshop"),
        south: goto("doherty.b.mall_side_corridor.chem_e"),
        up: goto("doherty.a.stairs")
    }),
    dohertyRoom("b.mall_side_corridor.steam_tunnels", {
        northeast: goto("doherty.b.under_stairs.art"),
        east: goto("doherty.b.mall_side_corridor.mural"),
        west: goto("liminal.ramp"),
        up: goto("liminal.ramp"),
        down: goto("doherty.c.steam_tunnel.west")
    }),
    dohertyRoom("b.mall_side_corridor.mural", {
        north: goto("doherty.b.art_hall"),
        east: goto("doherty.b.mall_side_corridor.pipes"),
        west: goto("doherty.b.mall_side_corridor.steam_tunnels"),
        up: goto("doherty.b.pipes.mural")
    }),
    dohertyRoom("b.mall_side_corridor.pipes", {
        northeast: goto("doherty.b.under_stairs.chem_e"),
        east: goto("doherty.mall_side_corridor.chem_e"),
        south: goto("doherty.b.mall_side_corridor.plinth", "You climb up onto the plinth."),
        up: goto("doherty.b.mall_side_corridor.plinth", "You climb up onto the plinth."),
        west: goto("doherty.b.mall_side_corridor.mural")
    }),
    dohertyRoom("b.mall_side_corridor.plinth", {
        up: goto("doherty.b.pipes.closets"),
        north: goto("doherty.b.mall_side_corridor.pipes"),
        down: goto("doherty.b.mall_side_corridor.pipes")
    }),
    dohertyRoom("b.mall_side_corridor.chem_e", {
        north: goto("doherty.b.chem_e_hall"),
        east: goto("doherty.b.mall_side_corridor.warm_stairs"),
        west: goto("doherty.b.mall_side_corridor.pipes")
    }),
    dohertyRoom("b.mall_side_corridor.warm_stairs", {
        east: goto("doherty.b.cold_corridor"),
        southeast: goto("doherty.b.locker_room"),
        south: goto("doherty.warm_stairs.b"),
        west: goto("doherty.b.mall_side_corridor.chem_e")
    }),
    dohertyRoom("b.under_stairs.art", {
        southwest: goto("doherty.b.mall_side_corridor.steam_tunnels"),
        down: goto("doherty.b.under_stairs.art_lower")
    }),
    dohertyRoom("b.under_stairs.art_lower", {
        up: goto("doherty.b.under_stairs.art")
    }),
    dohertyRoom("b.under_stairs.chem_e", {
        southwest: goto("doherty.b.mall_side_corridor.pipes"),
        down: goto("doherty.b.under_stairs.chem_e_lower")
    }),
    dohertyRoom("b.under_stairs.chem_e_lower", {
        up: goto("doherty.b.under_stairs.chem_e")
    }),
    dohertyRoom("b.pipes.closets", {
        west: goto("doherty.b.pipes.mural"),
        down: goto("doherty.b.mall_side_corridor.plinth")
    }),
    dohertyRoom("b.pipes.mural", {
        east: goto("doherty.b.pipes.closets"),
        west: goto("doherty.b.pipes.inside_tunnel"),
        northwest: goto("doherty.b.pipes.outside_tunnel"),
        down: goto("doherty.b.mall_side_corridor.mural")
    }),
    dohertyRoom("b.pipes.outside_tunnel", {
        southeast: goto("doherty.b.pipes.mural"),
        south: goto("doherty.b.pipes.inside_tunnel")
    }),
    basicRoom(
        "doherty.b.pipes.inside_tunnel",
        "Doherty Pipes: Inside Steam Tunnel",
        "You find yourself on top of pipes and steel conduits above the north branch of a steam tunnel. Below you is a small room with a camera in the northeast corner. To your north, the pipes you're on run through the wall into Doherty Hall. You can safely climb down some pipes to the ground.",
        {
            north: goto("doherty.b.pipes.outside_tunnel"),
            east: goto("doherty.b.pipes.mural"),
            down: goto("steam_tunnel.doherty")
        }
    ),
    dohertyRoom("b.cold_corridor", {
        north: goto("doherty_wilderness_patio"),
        west: goto("doherty.b.mall_side_corridor.warm_stairs")
    }),
    dohertyRoom("b.upper_class_studios", {
        east: goto("doherty.b.art_hall"),
        south: goto("doherty.b.mall_side_corridor.steam_tunnels"),
        up: goto("doherty.b.upper_class_studios.upper")
    }),
    dohertyRoom("b.upper_class_studios.upper", {
        down: goto("doherty.b.upper_class_studios")
    }),
    dohertyRoom("b.first_year_studio", {
        north: goto("doherty.b.roof"),
        west: goto("doherty.b.art_hall")
    }),
    dohertyRoom("b.roof", {
        south: goto("doherty.b.first_year_studio")
    }),
    dohertyRoom("b.monitor_desk", {
        south: goto("doherty.b.art_hall"),
        west: goto("doherty.b.cigarette_man")
    }),
    dohertyRoom("b.cigarette_man", {
        north: goto("doherty.glass_stairs.b"),
        east: goto("doherty.b.monitor_desk")
    }),
    dohertyRoom("b.woodshop", {
        west: goto("doherty.b.chem_e_hall")
    }),
    dohertyRoom("b.locker_room", {
        northwest: goto("doherty.b.mall_side_corridor.warm_stairs")
    }),
    dohertyRoom("b.chem_e", {
        east: goto("doherty_wilderness_patio"),
        south: goto("doherty.b.chem_e_hall"),
        down: goto("doherty.c.chem_e"),
        up: goto("doherty.a.chem_e")
    }),

    // Doherty A

    dohertyRoom("a.west", {
        north: goto("doherty.a.physics_museum"),
        east: goto("doherty.a.mid_corridor"),
        south: goto("doherty.a.physics_lab"),
        west: goto("liminal.ground"),
        down: goto("doherty.b.art_hall"),
        up: goto("doherty.1.west")
    }),
    dohertyRoom("a.mid_corridor", {
        north: goto("doherty.a.mse_lab"),
        east: goto("doherty.a.stairs"),
        south: goto("doherty.a.physics_half_floor"),
        west: goto("doherty.a.west")
    }),
    dohertyRoom("a.stairs", {
        north: goto("doherty.a.chem_e"),
        east: goto("doherty.a.jail"),
        south: goto("doherty_mall_garden"),
        west: goto("doherty.a.mid_corridor")
    }),

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