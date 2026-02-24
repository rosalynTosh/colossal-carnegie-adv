import { NodeSpec } from "./node";

export const ROOM_NODE_SPECS: NodeSpec[] = [
    {
        "id": "mall",
        "dirs": {
            "west": "lower_mall",
            "north": "doherty.1.west_corridor",
            "east": "cfa_lawn",
            "down": "steam_tunnel.mall_trapdoor"
        }
    },
    {
        "id": "lower_mall",
        "dirs": {
            "south": "porter.a",
            "north": "outside_la_prima",
            "east": "mall",
            "southwest": "scaife_walkway"
        }
    },
    {
        "id": "outside_la_prima",
        "dirs": {
            "south": "lower_mall",
            "north": "la_prima"
        }
    },
    {
        "id": "la_prima",
        "dirs": {
            "north": "wean.5.south",
            "south": "outside_la_prima"
        }
    },
    {
        "id": "cfa_lawn",
        "dirs": {
            "west": "mall",
            "north": "the_fence",
            "south": "outside_hunt"
        }
    },
    {
        "id": "outside_hunt",
        "dirs": {
            "north": "cfa_lawn"
        }
    },
    {
        "id": "the_fence",
        "dirs": {
            "west": "doherty.1.lobby",
            "north": "the_cut_south",
            "south": "cfa_lawn",
            "east": "cfa_parking_lot"
        }
    },
    {
        "id": "the_cut_south",
        "dirs": {
            "north": "the_cut_north",
            "south": "the_fence",
            "west": "doherty_wilderness"
        }
    },
    {
        "id": "the_cut_north",
        "dirs": {
            "north": "walking_to_the_sky",
            "south": "the_cut_south"
        }
    },
    {
        "id": "walking_to_the_sky",
        "dirs": {
            "south": "the_cut_north"
        }
    },
    {
        "id": "cfa_parking_lot",
        "dirs": {
            "west": "the_fence",
            "east": "outside_posner"
        }
    },
    {
        "id": "outside_posner",
        "dirs": {
            "west": "cfa_parking_lot",
            "down": "steam_tunnel.three_way_intersection"
        }
    },
    {
        "id": "doherty_wilderness",
        "dirs": {
            "east": "the_cut_south"
        }
    },
    {
        "id": "cursed_courtyard",
        "dirs": {
            "south": "ansys.c.courtyard_hallway",
            "up": "scaife_walkway"
        }
    },
    {
        "id": "scaife_walkway",
        "dirs": {
            "southwest": "scaife_quad",
            "northeast": "lower_mall",
            "south": "ansys.big_stairs.b"
        }
    },
    {
        "id": "scaife_quad",
        "dirs": {
            "east": "ansys.c",
            "northeast": "scaife_walkway"
        }
    },
    {
        "id": "ansys.d",
        "dirs": {
            "west": "ansys.stairs.d"
        }
    },
    {
        "id": "ansys.c",
        "dirs": {
            "west": "scaife_quad",
            "south": "ansys.stairs.c",
            "east": "ansys.c.courtyard_hallway"
        }
    },
    {
        "id": "ansys.c.courtyard_hallway",
        "dirs": {
            "north": "cursed_courtyard",
            "west": "ansys.c"
        }
    },
    {
        "id": "ansys.b",
        "dirs": {
            "south": "ansys.stairs.b",
            "north": "ansys.big_stairs.b"
        }
    },
    {
        "id": "ansys.a",
        "dirs": {
            "east": "porter.a",
            "south": "ansys.stairs.a",
            "north": "ansys.big_stairs.a"
        }
    },
    {
        "id": "ansys.1",
        "dirs": {
            "south": "ansys.stairs.1",
            "north": "ansys.big_stairs.1"
        }
    },
    {
        "id": "ansys.2",
        "dirs": {
            "north": "ansys.2.offices",
            "west": "ansys.2.kitchenette"
        }
    },
    {
        "id": "ansys.2.offices",
        "dirs": {
            "east": "ansys.big_stairs.2",
            "south": "ansys.2"
        }
    },
    {
        "id": "ansys.2.kitchenette",
        "dirs": {
            "west": "ansys.2.conference_room",
            "east": "ansys.2",
            "south": "ansys.stairs.2"
        }
    },
    {
        "id": "ansys.2.conference_room",
        "dirs": {
            "east": "ansys.2.kitchenette"
        }
    },
    {
        "id": "ansys.stairs.d",
        "dirs": {
            "up": "ansys.stairs.c",
            "east": "ansys.d"
        }
    },
    {
        "id": "ansys.stairs.c",
        "dirs": {
            "down": "ansys.stairs.d",
            "up": "ansys.stairs.b",
            "north": "ansys.c",
            "west": "scaife_quad"
        }
    },
    {
        "id": "ansys.stairs.b",
        "dirs": {
            "down": "ansys.stairs.c",
            "up": "ansys.stairs.a",
            "north": "ansys.b"
        }
    },
    {
        "id": "ansys.stairs.a",
        "dirs": {
            "down": "ansys.stairs.b",
            "up": "ansys.stairs.1",
            "north": "ansys.a"
        }
    },
    {
        "id": "ansys.stairs.1",
        "dirs": {
            "down": "ansys.stairs.a",
            "up": "ansys.stairs.2",
            "north": "ansys.1"
        }
    },
    {
        "id": "ansys.stairs.2",
        "dirs": {
            "down": "ansys.stairs.1",
            "north": "ansys.2.kitchenette"
        }
    },
    {
        "id": "ansys.big_stairs.d",
        "dirs": {
            "up": "ansys.big_stairs.c"
        }
    },
    {
        "id": "ansys.big_stairs.c",
        "dirs": {
            "down": "ansys.big_stairs.d",
            "up": "ansys.big_stairs.b"
        }
    },
    {
        "id": "ansys.big_stairs.b",
        "dirs": {
            "down": "ansys.big_stairs.c",
            "up": "ansys.big_stairs.a",
            "north": "scaife_walkway",
            "south": "ansys.b"
        }
    },
    {
        "id": "ansys.big_stairs.a",
        "dirs": {
            "down": "ansys.big_stairs.b",
            "up": "ansys.big_stairs.1",
            "south": "ansys.a"
        }
    },
    {
        "id": "ansys.big_stairs.1",
        "dirs": {
            "down": "ansys.big_stairs.a",
            "up": "ansys.big_stairs.2",
            "south": "ansys.1"
        }
    },
    {
        "id": "ansys.big_stairs.2",
        "dirs": {
            "down": "ansys.big_stairs.1",
            "west": "ansys.2.offices"
        }
    },
    {
        "id": "porter.a",
        "dirs": {
            "west": "ansys.a",
            "north": "lower_mall"
        }
    },
    {
        "id": "doherty.b.art_hall",
        "dirs": {
            "north": "doherty.b.monitor_desk",
            "east": "doherty.b.first_year_studio",
            "south": "doherty.b.mall_side_corridor.mural",
            "west": "doherty.b.upper_class_studios",
            "up": "doherty.a.west"
        }
    },
    {
        "id": "doherty.b.chem_e_hall",
        "dirs": {
            "north": "doherty.b.chem_e",
            "east": "doherty.b.woodshop",
            "south": "doherty.b.mall_side_corridor.chem_e",
            "up": "doherty.a.stairs"
        }
    },
    {
        "id": "doherty.b.mall_side_corridor.steam_tunnels",
        "dirs": {
            "northeast": "doherty.b.under_stairs.art",
            "east": "doherty.b.mall_side_corridor.mural",
            "west": "liminal.ramp",
            "up": "liminal.ramp"
        }
    },
    {
        "id": "doherty.b.mall_side_corridor.mural",
        "dirs": {
            "north": "doherty.b.art_hall",
            "east": "doherty.b.mall_side_corridor.pipes",
            "west": "doherty.b.mall_side_corridor.steam_tunnels",
            "up": "doherty.b.pipes.mural"
        }
    },
    {
        "id": "doherty.b.mall_side_corridor.pipes",
        "dirs": {
            "northeast": "doherty.b.under_stairs.chem_e",
            "south": "doherty.b.mall_side_corridor.plinth",
            "up": "doherty.b.mall_side_corridor.plinth",
            "west": "doherty.b.mall_side_corridor.mural"
        }
    },
    {
        "id": "doherty.b.mall_side_corridor.plinth",
        "dirs": {
            "up": "doherty.b.pipes.closets",
            "north": "doherty.b.mall_side_corridor.pipes",
            "down": "doherty.b.mall_side_corridor.pipes"
        }
    },
    {
        "id": "doherty.b.mall_side_corridor.chem_e",
        "dirs": {
            "north": "doherty.b.chem_e_hall",
            "east": "doherty.b.mall_side_corridor.warm_stairs",
            "west": "doherty.b.mall_side_corridor.pipes"
        }
    },
    {
        "id": "doherty.b.mall_side_corridor.warm_stairs",
        "dirs": {
            "east": "doherty.b.cold_corridor",
            "southeast": "doherty.b.locker_room",
            "west": "doherty.b.mall_side_corridor.chem_e"
        }
    },
    {
        "id": "doherty.b.under_stairs.art",
        "dirs": {
            "southwest": "doherty.b.mall_side_corridor.steam_tunnels",
            "down": "doherty.b.under_stairs.art_lower"
        }
    },
    {
        "id": "doherty.b.under_stairs.art_lower",
        "dirs": {
            "up": "doherty.b.under_stairs.art"
        }
    },
    {
        "id": "doherty.b.under_stairs.chem_e",
        "dirs": {
            "southwest": "doherty.b.mall_side_corridor.pipes",
            "down": "doherty.b.under_stairs.chem_e_lower"
        }
    },
    {
        "id": "doherty.b.under_stairs.chem_e_lower",
        "dirs": {
            "up": "doherty.b.under_stairs.chem_e"
        }
    },
    {
        "id": "doherty.b.pipes.closets",
        "dirs": {
            "west": "doherty.b.pipes.mural",
            "down": "doherty.b.mall_side_corridor.plinth"
        }
    },
    {
        "id": "doherty.b.pipes.mural",
        "dirs": {
            "east": "doherty.b.pipes.closets",
            "west": "doherty.b.pipes.inside_tunnel",
            "northwest": "doherty.b.pipes.outside_tunnel",
            "down": "doherty.b.mall_side_corridor.mural"
        }
    },
    {
        "id": "doherty.b.pipes.outside_tunnel",
        "dirs": {
            "southeast": "doherty.b.pipes.mural",
            "south": "doherty.b.pipes.inside_tunnel"
        }
    },
    {
        "id": "doherty.b.pipes.inside_tunnel",
        "dirs": {
            "north": "doherty.b.pipes.outside_tunnel",
            "east": "doherty.b.pipes.mural",
            "down": "steam_tunnel.doherty"
        }
    },
    {
        "id": "doherty.b.cold_corridor",
        "dirs": {
            "west": "doherty.b.mall_side_corridor.warm_stairs"
        }
    },
    {
        "id": "doherty.b.upper_class_studios",
        "dirs": {
            "east": "doherty.b.art_hall",
            "south": "doherty.b.mall_side_corridor.steam_tunnels",
            "up": "doherty.b.upper_class_studios.upper"
        }
    },
    {
        "id": "doherty.b.upper_class_studios.upper",
        "dirs": {
            "down": "doherty.b.upper_class_studios"
        }
    },
    {
        "id": "doherty.b.first_year_studio",
        "dirs": {
            "north": "doherty.b.roof",
            "west": "doherty.b.art_hall"
        }
    },
    {
        "id": "doherty.b.roof",
        "dirs": {
            "south": "doherty.b.first_year_studio"
        }
    },
    {
        "id": "doherty.b.monitor_desk",
        "dirs": {
            "south": "doherty.b.art_hall",
            "west": "doherty.b.cigarette_man"
        }
    },
    {
        "id": "doherty.b.cigarette_man",
        "dirs": {
            "east": "doherty.b.monitor_desk"
        }
    },
    {
        "id": "doherty.b.woodshop",
        "dirs": {
            "west": "doherty.b.chem_e_hall"
        }
    },
    {
        "id": "doherty.b.locker_room",
        "dirs": {
            "northwest": "doherty.b.mall_side_corridor.warm_stairs"
        }
    },
    {
        "id": "doherty.b.chem_e",
        "dirs": {
            "south": "doherty.b.chem_e_hall"
        }
    },
    {
        "id": "doherty.a.west",
        "dirs": {
            "east": "doherty.a.mid_corridor",
            "west": "liminal.ground",
            "down": "doherty.b.art_hall",
            "up": "doherty.1.west"
        }
    },
    {
        "id": "doherty.a.mid_corridor",
        "dirs": {
            "east": "doherty.a.stairs",
            "west": "doherty.a.west"
        }
    },
    {
        "id": "doherty.a.stairs",
        "dirs": {
            "west": "doherty.a.mid_corridor"
        }
    },
    {
        "id": "doherty.1.lobby",
        "dirs": {
            "east": "the_fence",
            "west": "doherty.1.lobby_west",
            "southwest": "doherty.1.paint_room"
        }
    },
    {
        "id": "doherty.1.lobby_west",
        "dirs": {
            "east": "doherty.1.lobby",
            "south": "doherty.1.stairs"
        }
    },
    {
        "id": "doherty.1.stairs",
        "dirs": {
            "north": "doherty.1.lobby_west",
            "south": "doherty.1.212",
            "down": "doherty.a.stairs"
        }
    },
    {
        "id": "doherty.1.212",
        "dirs": {
            "north": "doherty.1.stairs"
        }
    },
    {
        "id": "doherty.1.paint_room",
        "dirs": {
            "northeast": "doherty.1.stairs"
        }
    },
    {
        "id": "doherty.1.west_corridor",
        "dirs": {
            "south": "mall",
            "north": "doherty.1.west",
            "east": "doherty.1.premed_office"
        }
    },
    {
        "id": "doherty.1.west",
        "dirs": {
            "south": "doherty.1.west_corridor",
            "west": "liminal.6",
            "north": "doherty.1.chem_lab",
            "down": "doherty.a.west"
        }
    },
    {
        "id": "doherty.1.premed_office",
        "dirs": {
            "west": "doherty.1.west_corridor"
        }
    },
    {
        "id": "doherty.1.chem_lab",
        "dirs": {
            "south": "doherty.1.west"
        }
    },
    {
        "id": "liminal.ramp",
        "dirs": {
            "west": "wean.4.400",
            "up": "wean.4.400",
            "east": "doherty.b.mall_side_corridor.steam_tunnels",
            "down": "doherty.b.mall_side_corridor.steam_tunnels"
        }
    },
    {
        "id": "liminal.ground",
        "dirs": {
            "west": "wean.5.400",
            "east": "doherty.a.west"
        }
    },
    {
        "id": "liminal.6",
        "dirs": {
            "west": "wean.6.400",
            "east": "doherty.1.west",
            "up": "liminal.7"
        }
    },
    {
        "id": "liminal.7",
        "dirs": {
            "west": "wean.7.400",
            "up": "liminal.8",
            "down": "liminal.6"
        }
    },
    {
        "id": "liminal.8",
        "dirs": {
            "west": "wean.8.400",
            "down": "liminal.7"
        }
    },
    {
        "id": "steam_tunnel.wean",
        "dirs": {
            "west": "wean.4.703",
            "east": "steam_tunnel.hot_nut",
            "up": "steam_tunnel.hot_nut"
        }
    },
    {
        "id": "steam_tunnel.hot_nut",
        "dirs": {
            "west": "steam_tunnel.wean",
            "down": "steam_tunnel.wean",
            "east": "steam_tunnel.doherty_intersection"
        }
    },
    {
        "id": "steam_tunnel.doherty",
        "dirs": {
            "north": "doherty.b.mall_side_corridor.steam_tunnels",
            "south": "steam_tunnel.doherty_intersection",
            "up": "doherty.b.pipes.inside_tunnel"
        }
    },
    {
        "id": "steam_tunnel.doherty_intersection",
        "dirs": {
            "north": "steam_tunnel.doherty",
            "west": "steam_tunnel.hot_nut",
            "east": "steam_tunnel.mall_trapdoor"
        }
    },
    {
        "id": "steam_tunnel.mall_trapdoor",
        "dirs": {
            "up": "mall",
            "west": "steam_tunnel.doherty_intersection",
            "east": "steam_tunnel.cfa_intersection"
        }
    },
    {
        "id": "steam_tunnel.cfa_intersection",
        "dirs": {
            "up": "steam_tunnel.party_room",
            "west": "steam_tunnel.mall_trapdoor",
            "east": "steam_tunnel.three_way_intersection",
            "south": "steam_tunnel.under_cfa"
        }
    },
    {
        "id": "steam_tunnel.party_room",
        "dirs": {
            "down": "steam_tunnel.cfa_intersection"
        }
    },
    {
        "id": "steam_tunnel.under_cfa",
        "dirs": {
            "north": "steam_tunnel.cfa_intersection",
            "south": "steam_tunnel.gsia_branch"
        }
    },
    {
        "id": "steam_tunnel.gsia_branch",
        "dirs": {
            "north": "steam_tunnel.under_cfa"
        }
    },
    {
        "id": "steam_tunnel.three_way_intersection",
        "dirs": {
            "west": "steam_tunnel.cfa_intersection",
            "north": "steam_tunnel.mm_branch",
            "southeast": "steam_tunnel.skibo_branch",
            "up": "outside_posner"
        }
    },
    {
        "id": "steam_tunnel.mm_branch",
        "dirs": {
            "south": "steam_tunnel.three_way_intersection"
        }
    },
    {
        "id": "steam_tunnel.skibo_branch",
        "dirs": {
            "northwest": "steam_tunnel.three_way_intersection"
        }
    },
    {
        "id": "wean.1.lobby",
        "dirs": {
            "east": "wean.1.300",
            "up": "wean.2.lobby"
        }
    },
    {
        "id": "wean.1.300",
        "dirs": {
            "west": "wean.1.lobby",
            "north": "wean.stairs.a2.1"
        }
    },
    {
        "id": "wean.1.340",
        "dirs": {
            "west": "wean.1.300",
            "down": "wean.1.300",
            "up": "wean.2.340"
        }
    },
    {
        "id": "wean.2.lobby",
        "dirs": {
            "east": "wean.2.300",
            "down": "wean.1.lobby",
            "up": "wean.3.north"
        }
    },
    {
        "id": "wean.2.300",
        "dirs": {
            "west": "wean.2.lobby",
            "north": "wean.stairs.a2.2",
            "east": "wean.2.340"
        }
    },
    {
        "id": "wean.2.340",
        "dirs": {
            "west": "wean.2.300",
            "down": "wean.1.340",
            "east": "wean.1.340"
        }
    },
    {
        "id": "wean.2.chiller_plant",
        "dirs": {
            "up": "wean.3.chiller_plant",
            "east": "wean.2.lobby"
        }
    },
    {
        "id": "wean.3.north",
        "dirs": {
            "west": "wean.3.200",
            "east": "wean.3.300",
            "south": "wean.3.south",
            "down": "wean.2.lobby",
            "up": "wean.4.north"
        }
    },
    {
        "id": "wean.3.south",
        "dirs": {
            "west": "wean.3.100",
            "east": "wean.3.400_by_700",
            "north": "wean.3.north",
            "south": "wean.3.500"
        }
    },
    {
        "id": "wean.3.100",
        "dirs": {
            "east": "wean.3.south",
            "north": "wean.3.200",
            "south": "wean.stairs.d.3",
            "southwest": "wean.3.scs_print_room"
        }
    },
    {
        "id": "wean.3.200",
        "dirs": {
            "east": "wean.3.north",
            "south": "wean.3.100",
            "west": "wean.3.fms_office"
        }
    },
    {
        "id": "wean.3.300",
        "dirs": {
            "west": "wean.3.north",
            "north": "wean.stairs.a2.3",
            "east": "wean.3.balcony"
        }
    },
    {
        "id": "wean.3.400",
        "dirs": {
            "west": "wean.3.400_by_700",
            "south": "wean.stairs.b.3"
        }
    },
    {
        "id": "wean.3.400_by_700",
        "dirs": {
            "west": "wean.3.south",
            "south": "wean.3.700",
            "east": "wean.3.400"
        }
    },
    {
        "id": "wean.3.500",
        "dirs": {
            "south": "wean.3.600",
            "east": "wean.3.700",
            "north": "wean.3.south",
            "west": "wean.stairs.c1.3"
        }
    },
    {
        "id": "wean.3.600",
        "dirs": {
            "north": "wean.3.500",
            "west": "wean.3.odr"
        }
    },
    {
        "id": "wean.3.700",
        "dirs": {
            "north": "wean.3.400_by_700",
            "west": "wean.3.500"
        }
    },
    {
        "id": "wean.3.scs_print_room",
        "dirs": {
            "northeast": "wean.3.100"
        }
    },
    {
        "id": "wean.3.fms_office",
        "dirs": {
            "north": "wean.3.chiller_plant",
            "down": "wean.3.chiller_plant",
            "east": "wean.3.200"
        }
    },
    {
        "id": "wean.3.balcony",
        "dirs": {
            "west": "wean.3.300"
        }
    },
    {
        "id": "wean.3.odr",
        "dirs": {
            "east": "wean.3.600"
        }
    },
    {
        "id": "wean.3.spooky_closet",
        "dirs": {
            "west": "wean.stairs.c2.3"
        }
    },
    {
        "id": "wean.3.chiller_plant",
        "dirs": {
            "south": "wean.3.fms_office",
            "up": "wean.3.fms_office",
            "down": "wean.2.chiller_plant"
        }
    },
    {
        "id": "wean.4.north",
        "dirs": {
            "west": "wean.4.200",
            "east": "wean.4.300",
            "south": "wean.4.south",
            "down": "wean.3.north",
            "up": "wean.5.north"
        }
    },
    {
        "id": "wean.4.south",
        "dirs": {
            "west": "wean.4.100",
            "east": "wean.4.sorrels",
            "north": "wean.4.north",
            "south": "wean.4.600"
        }
    },
    {
        "id": "wean.4.100",
        "dirs": {
            "east": "wean.4.south",
            "north": "wean.4.200",
            "south": "wean.stairs.d.4"
        }
    },
    {
        "id": "wean.4.200",
        "dirs": {
            "east": "wean.4.north",
            "south": "wean.4.100"
        }
    },
    {
        "id": "wean.4.300",
        "dirs": {
            "west": "wean.4.north",
            "south": "wean.4.400",
            "north": "wean.stairs.a2.4"
        }
    },
    {
        "id": "wean.4.400",
        "dirs": {
            "north": "wean.4.300",
            "south": "wean.stairs.b.4",
            "east": "liminal.ramp",
            "down": "liminal.ramp"
        }
    },
    {
        "id": "wean.4.600",
        "dirs": {
            "north": "wean.4.south",
            "south": "wean.4.600_south",
            "east": "wean.4.700",
            "west": "wean.stairs.c1.4"
        }
    },
    {
        "id": "wean.4.600_south",
        "dirs": {
            "north": "wean.4.600",
            "east": "wean.4.700_south",
            "west": "wean.stairs.c2.4"
        }
    },
    {
        "id": "wean.4.700",
        "dirs": {
            "west": "wean.4.600",
            "southwest": "wean.4.700_south",
            "east": "wean.4.703"
        }
    },
    {
        "id": "wean.4.700_south",
        "dirs": {
            "northeast": "wean.4.700",
            "west": "wean.4.600_south",
            "north": "wean.4.706"
        }
    },
    {
        "id": "wean.4.sorrels",
        "dirs": {
            "west": "wean.4.south",
            "east": "wean.4.400"
        }
    },
    {
        "id": "wean.4.703",
        "dirs": {
            "east": "steam_tunnel.wean",
            "west": "wean.4.700"
        }
    },
    {
        "id": "wean.4.706",
        "dirs": {
            "south": "wean.4.700_south"
        }
    },
    {
        "id": "wean.5.north",
        "dirs": {
            "west": "wean.5.200_clusters",
            "east": "wean.5.300",
            "south": "wean.5.south",
            "down": "wean.4.north",
            "up": "wean.6.north"
        }
    },
    {
        "id": "wean.5.south",
        "dirs": {
            "west": "wean.5.100",
            "east": "wean.5.400",
            "north": "wean.5.north",
            "south": "la_prima"
        }
    },
    {
        "id": "wean.5.100",
        "dirs": {
            "east": "wean.5.south",
            "north": "wean.5.200",
            "south": "wean.stairs.d.5"
        }
    },
    {
        "id": "wean.5.200",
        "dirs": {
            "east": "wean.5.200_clusters",
            "south": "wean.5.100"
        }
    },
    {
        "id": "wean.5.300",
        "dirs": {
            "west": "wean.5.north",
            "south": "wean.5.400",
            "north": "wean.stairs.a2.5"
        }
    },
    {
        "id": "wean.5.400",
        "dirs": {
            "west": "wean.5.south",
            "north": "wean.5.300",
            "south": "wean.stairs.b.5",
            "northwest": "wean.5.403",
            "east": "liminal.ground"
        }
    },
    {
        "id": "wean.5.200_clusters",
        "dirs": {
            "north": "wean.5.202",
            "south": "wean.5.201",
            "southwest": "wean.5.207",
            "east": "wean.5.north"
        }
    },
    {
        "id": "wean.5.201",
        "dirs": {
            "north": "wean.5.200_clusters"
        }
    },
    {
        "id": "wean.5.202",
        "dirs": {
            "south": "wean.5.200_clusters"
        }
    },
    {
        "id": "wean.5.207",
        "dirs": {
            "northeast": "wean.5.200_clusters"
        }
    },
    {
        "id": "wean.5.403",
        "dirs": {
            "southeast": "wean.5.400"
        }
    },
    {
        "id": "wean.6.north",
        "dirs": {
            "west": "wean.6.200",
            "east": "wean.6.300",
            "south": "wean.6.south",
            "down": "wean.5.north",
            "up": "wean.7.north"
        }
    },
    {
        "id": "wean.6.south",
        "dirs": {
            "west": "wean.6.100",
            "east": "wean.6.400",
            "north": "wean.6.north",
            "south": "wean.6.parapet",
            "up": "wean.6.parapet"
        }
    },
    {
        "id": "wean.6.100",
        "dirs": {
            "east": "wean.6.south",
            "north": "wean.6.200",
            "south": "wean.stairs.d.6"
        }
    },
    {
        "id": "wean.6.200",
        "dirs": {
            "east": "wean.6.north",
            "south": "wean.6.100"
        }
    },
    {
        "id": "wean.6.300",
        "dirs": {
            "west": "wean.6.north",
            "south": "wean.6.400",
            "north": "wean.stairs.a2.6"
        }
    },
    {
        "id": "wean.6.400",
        "dirs": {
            "west": "wean.6.south",
            "north": "wean.6.300",
            "south": "wean.stairs.b.6",
            "east": "liminal.6"
        }
    },
    {
        "id": "wean.6.parapet",
        "dirs": {
            "north": "wean.6.south"
        }
    },
    {
        "id": "wean.7.north",
        "dirs": {
            "west": "wean.7.200",
            "east": "wean.7.300",
            "south": "wean.7.south",
            "down": "wean.6.north",
            "up": "wean.8.north"
        }
    },
    {
        "id": "wean.7.south",
        "dirs": {
            "west": "wean.7.100",
            "east": "wean.7.400",
            "north": "wean.7.north",
            "south": "wean.7.500"
        }
    },
    {
        "id": "wean.7.100",
        "dirs": {
            "east": "wean.7.south",
            "north": "wean.7.200",
            "south": "wean.stairs.d.7"
        }
    },
    {
        "id": "wean.7.200",
        "dirs": {
            "east": "wean.7.north",
            "south": "wean.7.100"
        }
    },
    {
        "id": "wean.7.300",
        "dirs": {
            "west": "wean.7.north",
            "south": "wean.7.400",
            "north": "wean.stairs.a2.7"
        }
    },
    {
        "id": "wean.7.400",
        "dirs": {
            "west": "wean.7.south",
            "north": "wean.7.300",
            "south": "wean.stairs.b.7",
            "east": "liminal.7"
        }
    },
    {
        "id": "wean.7.500",
        "dirs": {
            "west": "outside_la_prima",
            "north": "wean.7.south"
        }
    },
    {
        "id": "wean.8.north",
        "dirs": {
            "west": "wean.8.200",
            "east": "wean.8.300",
            "south": "wean.8.south",
            "down": "wean.7.north"
        }
    },
    {
        "id": "wean.8.south",
        "dirs": {
            "west": "wean.8.100",
            "east": "wean.8.400_outside_427",
            "north": "wean.8.north"
        }
    },
    {
        "id": "wean.8.100",
        "dirs": {
            "east": "wean.8.south",
            "north": "wean.8.200",
            "south": "wean.stairs.d.8"
        }
    },
    {
        "id": "wean.8.200",
        "dirs": {
            "east": "wean.8.north",
            "south": "wean.8.100"
        }
    },
    {
        "id": "wean.8.300",
        "dirs": {
            "west": "wean.8.north",
            "south": "wean.8.400",
            "north": "wean.stairs.a2.8"
        }
    },
    {
        "id": "wean.8.400",
        "dirs": {
            "west": "wean.8.400_outside_427",
            "north": "wean.8.300",
            "south": "wean.stairs.b.8",
            "east": "liminal.8"
        }
    },
    {
        "id": "wean.8.400_outside_427",
        "dirs": {
            "west": "wean.8.south",
            "east": "wean.8.400",
            "north": "wean.8.427"
        }
    },
    {
        "id": "wean.8.427",
        "dirs": {
            "south": "wean.8.400_outside_427"
        }
    },
    {
        "id": "wean.stairs.a2.1",
        "dirs": {
            "up": "wean.stairs.a2.1_1_2",
            "south": "wean.1.300"
        }
    },
    {
        "id": "wean.stairs.a2.1_1_2",
        "dirs": {
            "down": "wean.stairs.a2.1",
            "up": "wean.stairs.a2.2"
        }
    },
    {
        "id": "wean.stairs.a2.2",
        "dirs": {
            "down": "wean.stairs.a2.1_1_2",
            "up": "wean.stairs.a2.3",
            "south": "wean.2.300"
        }
    },
    {
        "id": "wean.stairs.a2.3",
        "dirs": {
            "down": "wean.stairs.a2.2",
            "up": "wean.stairs.a2.4",
            "south": "wean.3.300"
        }
    },
    {
        "id": "wean.stairs.a2.4",
        "dirs": {
            "down": "wean.stairs.a2.3",
            "up": "wean.stairs.a2.5",
            "south": "wean.4.300"
        }
    },
    {
        "id": "wean.stairs.a2.5",
        "dirs": {
            "down": "wean.stairs.a2.4",
            "up": "wean.stairs.a2.6",
            "south": "wean.5.300"
        }
    },
    {
        "id": "wean.stairs.a2.6",
        "dirs": {
            "down": "wean.stairs.a2.5",
            "up": "wean.stairs.a2.7",
            "south": "wean.6.300"
        }
    },
    {
        "id": "wean.stairs.a2.7",
        "dirs": {
            "down": "wean.stairs.a2.6",
            "up": "wean.stairs.a2.8",
            "south": "wean.7.300"
        }
    },
    {
        "id": "wean.stairs.a2.8",
        "dirs": {
            "down": "wean.stairs.a2.7",
            "up": "wean.stairs.a2.9",
            "south": "wean.8.300"
        }
    },
    {
        "id": "wean.stairs.a2.9",
        "dirs": {
            "down": "wean.stairs.a2.8"
        }
    },
    {
        "id": "wean.stairs.b.3",
        "dirs": {
            "up": "wean.stairs.b.4",
            "north": "wean.3.400"
        }
    },
    {
        "id": "wean.stairs.b.4",
        "dirs": {
            "down": "wean.stairs.b.3",
            "up": "wean.stairs.b.5",
            "north": "wean.4.400"
        }
    },
    {
        "id": "wean.stairs.b.5",
        "dirs": {
            "down": "wean.stairs.b.4",
            "up": "wean.stairs.b.6",
            "north": "wean.5.400"
        }
    },
    {
        "id": "wean.stairs.b.6",
        "dirs": {
            "down": "wean.stairs.b.5",
            "up": "wean.stairs.b.7",
            "north": "wean.6.400"
        }
    },
    {
        "id": "wean.stairs.b.7",
        "dirs": {
            "down": "wean.stairs.b.6",
            "up": "wean.stairs.b.8",
            "north": "wean.7.400"
        }
    },
    {
        "id": "wean.stairs.b.8",
        "dirs": {
            "down": "wean.stairs.b.7",
            "north": "wean.8.400"
        }
    },
    {
        "id": "wean.stairs.c1.3",
        "dirs": {
            "up": "wean.stairs.c1.4",
            "east": "wean.3.500"
        }
    },
    {
        "id": "wean.stairs.c1.4",
        "dirs": {
            "down": "wean.stairs.c1.3",
            "east": "wean.4.600"
        }
    },
    {
        "id": "wean.stairs.c2.3",
        "dirs": {
            "up": "wean.stairs.c2.4",
            "east": "wean.3.spooky_closet"
        }
    },
    {
        "id": "wean.stairs.c2.4",
        "dirs": {
            "down": "wean.stairs.c2.3",
            "east": "wean.4.600_south"
        }
    },
    {
        "id": "wean.stairs.d.3",
        "dirs": {
            "up": "wean.stairs.d.4",
            "north": "wean.3.100"
        }
    },
    {
        "id": "wean.stairs.d.4",
        "dirs": {
            "down": "wean.stairs.d.3",
            "up": "wean.stairs.d.5",
            "north": "wean.4.100"
        }
    },
    {
        "id": "wean.stairs.d.5",
        "dirs": {
            "down": "wean.stairs.d.4",
            "up": "wean.stairs.d.6",
            "north": "wean.5.100"
        }
    },
    {
        "id": "wean.stairs.d.6",
        "dirs": {
            "down": "wean.stairs.d.5",
            "up": "wean.stairs.d.7",
            "north": "wean.6.100"
        }
    },
    {
        "id": "wean.stairs.d.7",
        "dirs": {
            "down": "wean.stairs.d.6",
            "up": "wean.stairs.d.8",
            "north": "wean.7.100"
        }
    },
    {
        "id": "wean.stairs.d.8",
        "dirs": {
            "down": "wean.stairs.d.7",
            "up": "wean.stairs.d.9",
            "north": "wean.8.100"
        }
    },
    {
        "id": "wean.stairs.d.9",
        "dirs": {
            "down": "wean.stairs.d.8"
        }
    }
];