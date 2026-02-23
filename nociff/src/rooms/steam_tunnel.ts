import { basicRoom, goto, Room } from "../rooms";

export const STEAM_TUNNEL_ROOMS: Room[] = [
    basicRoom(
        "steam_tunnel.wean",
        "Steam Tunnel",
        "You stand in a steam tunnel at the bottom of a narrow set of steps. A single door to your west has a painted warning indicating that it's alarmed.",
        {
            west: {
                type: "door",

                roomId: "wean.4.703",

                doorId: "steam_tunnel_to_4703",

                doorNouns: [/(?:(?:steam|tunnel|alarm|alarmed|warning|warned|wean|west) )*door/i],
                canOpen: true,
                canClose: true,
                closeOnUse: false,
                keyItem: null
            },
            east: goto("steam_tunnel.hot_nut"),
            up: goto("steam_tunnel.hot_nut")
        }
    ),
    basicRoom(
        "steam_tunnel.hot_nut",
        "Steam Tunnel",
        "You stand in a steam tunnel above a narrow set of stairs running down to your west. A pipe runs vertically just to the side, with an extremely hot nut sticking out. The rest of the tunnel is to your east.",
        {
            west: goto("steam_tunnel.wean"),
            down: goto("steam_tunnel.wean"),
            east: goto("steam_tunnel.doherty_intersection")
        }
    ),
    basicRoom(
        "steam_tunnel.doherty",
        "Steam Tunnel: Doherty Branch",
        "You're in the north branch of a steam tunnel, with doors to your north and west. The tunnel runs south. A painted warning on the wall states that you continue into the tunnel at your own risk.",
        {
            north: goto("doherty.b.mall_side_corridor.steam_tunnels"),
            west: goto("doherty.4.mole_office"),
            south: goto("steam_tunnel.doherty_intersection"),
            up: goto("doherty.b.pipes.inside_tunnel")
        }
    ),
    basicRoom(
        "steam_tunnel.doherty_intersection",
        "Steam Tunnel: Doherty Intersection",
        "You find yourself at an intersection in the tunnel. The main tunnel runs east-west, but a branch splits off to your north. Some helpful graffiti indicates it goes to Doherty Hall.",
        {
            north: goto("steam_tunnel.doherty"),
            west: goto("steam_tunnel.hot_nut"),
            east: goto("steam_tunnel.mall_trapdoor")
        }
    ),
    basicRoom(
        "steam_tunnel.mall_trapdoor",
        "Steam Tunnel: Under Mall Trapdoor",
        "You stand at the base of a ladder in the middle of a long steam tunnel running east-west. At the top of it is a closed trapdoor. The walls are covered in graffiti and the pipes are rusty. Some fans blow air through the tunnel.",
        {
            up: {
                type: "door",

                roomId: "mall",

                doorId: "mall_trapdoor",

                doorNouns: [/(?:(?:metal|steel|shiny|square|steam|tunnel|mall|trap) )*(?:trap(?:door)?|hatch|door)/i],
                canOpen: true,
                canClose: true,
                closeOnUse: false,
                keyItem: null
            },
            west: goto("steam_tunnel.doherty_intersection"),
            east: goto("steam_tunnel.cfa_intersection")
        }
    ),
    basicRoom(
        "steam_tunnel.cfa_intersection",
        "Steam Tunnel: CFA Intersection",
        "You stand in the middle of a long steam tunnel running east-west. A ladder nearby goes up at a slight angle, near a branch which runs to your south. There is copious graffiti, and the pipes look suspicious.",
        {
            up: goto("steam_tunnel.party_room"),
            west: goto("steam_tunnel.mall_trapdoor"),
            east: goto("steam_tunnel.three_way_intersection"),
            south: goto("steam_tunnel.under_cfa")
        }
    ),
    basicRoom(
        "steam_tunnel.party_room",
        "Steam Tunnel: Party Room",
        "You find yourself in a large unlit room. A ladder goes down. It's littered with bottles and stalactites hang from the ceiling. You imagine this would be a cozy place to live, and it seems someone may have once had the same idea. A tiny door sits to your south.",
        {
            down: goto("steam_tunnel.cfa_intersection"),
            south: goto("cfa.north_front_stairs.ground")
        }
    ),
    basicRoom(
        "steam_tunnel.under_cfa",
        "Steam Tunnel: Under CFA",
        "You're in a modernized section of steam tunnel running north-south. A ladder sits to the side of some steam pipes with clean white insulation, under a poorly fitted trapdoor.",
        {
            north: goto("steam_tunnel.cfa_intersection"),
            south: goto("steam_tunnel.gsia_branch")
        }
    ),
    basicRoom(
        "steam_tunnel.gsia_branch",
        "Steam Tunnel: Posner Branch",
        "You're in a narrow but modernized steam tunnel. One section runs north and another runs east.",
        {
            north: goto("steam_tunnel.under_cfa"),
            east: goto("posner.mechanical_room.south")
        }
    ),
    basicRoom(
        "steam_tunnel.three_way_intersection",
        "Steam Tunnel: Three Way Intersection",
        "You find yourself in a steam tunnel at a three way intersection. One branch runs west, one runs north, and one runs southeast. Nearby, a ladder goes up some distance to a trapdoor.",
        {
            west: goto("steam_tunnel.cfa_intersection"),
            north: goto("steam_tunnel.mm_branch"),
            southeast: goto("steam_tunnel.skibo_branch"),
            up: {
                type: "door",

                roomId: "outside_posner",

                doorId: "posner_trapdoor",

                doorNouns: [/(?:(?:metal|steel|shiny|dull|square|steam|tunnel|posner|hill|trap) )*(?:trap(?:door)?|hatch|door)/i],
                canOpen: true,
                canClose: true,
                closeOnUse: false,
                keyItem: null
            }
        }
    ),
    basicRoom(
        "steam_tunnel.mm_branch",
        "Steam Tunnel: Margaret Morrison Branch",
        "You find yourself in the north branch of a steam tunnel system. You're surrounded by various large tanks. A door sits to your east.",
        {
            south: goto("steam_tunnel.three_way_intersection"),
            east: goto("mmch.b.outside_steam_tunnels")
        }
    ),
    basicRoom(
        "steam_tunnel.skibo_branch",
        "Steam Tunnel: Skibo Branch",
        "You find yourself in the southeast branch of a steam tunnel system. It looks incredibly shiny and modern. To your south, a set of metal stairs runs upward to a plain door.",
        {
            northwest: goto("steam_tunnel.three_way_intersection"),
            south: goto("highmark.1.mech_room", "You climb the metal stairs, minding a domed camera just above them. You open the door and emerge into a noisy mechanical room.")
        }
    )
];