import { basicRoom, goto, Room, say } from "../rooms";

export const CAMPUS_ROOMS: Room[] = [
    basicRoom(
        "mall",
        "The Mall",
        "You are standing in front of a grassy field. You admire the magnificent Hamerschlag Hall to your west. Doherty Hall stands to your north, and Baker Hall to your south.",
        {
            west: goto("lower_mall"),
            north: goto("doherty.1.west_corridor"),
            south: goto("baker.1"),
            east: goto("cfa_lawn"),
            down: {
                type: "door",

                roomId: "steam_tunnel.under_mall",

                doorId: "mall_trapdoor",

                doorNouns: [/(?:(?:metal|steel|shiny|square|steam|tunnel) )*(?:trap(?:door)?|hatch|door)/i],
                canOpen: false,
                canClose: true,
                closeOnUse: false,
                keyItem: "square_tool"
            }
        },
        [
            {
                id: "pamphlet",

                name: "pamphlet",
                aOrAn: "a",
                inspectStr: "A bundle of papers printed in black-and-white.",

                nouns: [/(?:papers? )?(?:pamphlet|bundle)(?: papers?)?/i, /(?:bundled )?papers?/i, /leaflet/i, /news(?:paper)?/i, /note/i, /magazine/i],

                readStr: "WELCOME TO COLOSSAL CARNEGIE ADVENTURE!\n\nThis is a game of incredible skill and breathtaking adventure. Many have walked this campus, but few have discovered the secrets buried within. No CMU should be without one!"
            }
        ]
    ),
    basicRoom(
        "lower_mall",
        "The Mall",
        "You are standing at the base of a grassy hill. Hamerschlag Hall towers above you. Its grand staircase sits just to your west. Porter Hall is to your south, and Wean Hall is to your north.",
        {
            south: goto("porter.a"),
            north: goto("outside_la_prima"),
            east: goto("mall"),
            west: goto("hamerschlag.1.lobby")
        }
    ),
    basicRoom(
        "outside_la_prima",
        "La Prima Patio",
        "You're under the covering of an imposing brutalist structure in an outdoor spot overlooking the Mall to your south. You see the counter of La Prima through glass doors to your north.",
        {
            south: goto("lower_mall"),
            north: goto("la_prima"),
            west: goto("scott_overlook"),
            east: goto("wean_patio")
        }
    ),
    basicRoom(
        "la_prima",
        "La Prima",
        "You're in a coffee shop which would ordinarily be bustling with people. The counter is to the west. You spot hallways to your north, and through a pair of glass doors, the Mall to your south.",
        {
            north: goto("wean.5.south"),
            south: goto("outside_la_prima"),
            west: say("You try to climb over the counter but are blocked by strategically-placed coffee brewing devices. What could they be hiding?")
        }
    ),
]; // TODO: panel with buttons labeled A, B, and C inside the La Prima counter