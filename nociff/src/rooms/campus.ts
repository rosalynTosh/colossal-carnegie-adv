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

                roomId: "steam_tunnel.mall_trapdoor",

                doorId: "mall_trapdoor",

                doorNouns: [/(?:(?:metal|steel|shiny|square|steam|tunnel|trap) )*(?:trap(?:door)?|hatch|door)/i],
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
            west: goto("hamerschlag.1.lobby"),
            southwest: goto("scaife_walkway")
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
    basicRoom(
        "cfa_lawn",
        "CFA Lawn",
        "You're in the middle of a field with sparse trees around its edges. You see the Mall to your west, punctuated by the tower of Hamerschlag Hall, opposite the College of Fine Arts building to your east. The Fence and the Cut are to your north, and Hunt Library is to your south.",
        {
            west: goto("mall"),
            east: goto("cfa.1.lobby"),
            north: goto("the_fence"),
            south: goto("outside_hunt")
        }
    ),
    basicRoom(
        "outside_hunt",
        "Outside Hunt Library",
        "In front of you, just to your south, stands Hunt Library with its facade of glass and steel. Baker Hall is to your west and the CFA Lawn is to your north.",
        {
            south: goto("hunt.1"),
            east: goto("peace_garden"),
            north: goto("cfa_lawn"),
            west: goto("baker.1")
        }
    ),
    basicRoom(
        "the_fence",
        "The Fence",
        "You behold the Fence, which is painted with three mysterious letters: \"KGB\". Lawns sprawl out in all directions, except west, where Doherty Hall stands.",
        {
            west: goto("doherty.1.lobby"),
            north: goto("the_cut_south"),
            south: goto("cfa_lawn"),
            east: goto("cfa_parking_lot")
        }
    ),
    basicRoom(
        "the_cut_south",
        "The Cut",
        "You're on the south side of an emerald-green lawn. Sidewalks criss-cross the lawn you're standing on. The Fence is to your south, and the Cut continues to your north.",
        {
            north: goto("the_cut_north"),
            south: goto("the_fence"),
            east: goto("tennis_courts"),
            west: goto("doherty_wilderness", "You make your way down a staircase, which descends into a dense forest.")
        }
    ),
    basicRoom(
        "the_cut_north",
        "The Cut",
        "You find yourself on the north side of an emerald-green lawn just south of Walking to the Sky. Purnell is to your west, a sidewalk runs east, and the Cut continues to your south.",
        {
            north: goto("walking_to_the_sky"),
            south: goto("the_cut_south"),
            west: goto("purnell"),
            east: goto("uc_sidewalk")
        }
    ),
    basicRoom(
        "walking_to_the_sky",
        "Walking to the Sky",
        "You're on the far north side of the Cut. You admire a tall steel pole rising into the sky, with statues walking up it, and after a second you realize the other admirers are statues as well. You wonder what Medusean beast was responsible for this. The University Center is to your east and Forbes Avenue is just to your north.",
        {
            north: goto("forbes.cut"),
            south: goto("the_cut_north"),
            west: goto("warner.1"),
            east: goto("uc.west_stairs.1"),
            up: say("You too try to walk up the pole, but find it far too slippery.")
        }
    ),
    basicRoom(
        "cfa_parking_lot",
        "CFA Parking Lot",
        "You're in a large flat space just south of the CFA building. You see greenery to the west and a road continues off to the east.",
        {
            south: goto("cfa.ground.north"),
            west: goto("the_fence"),
            east: goto("outside_posner")
        }
    ),
    basicRoom(
        "outside_posner",
        "Outside Posner",
        "You find yourself on a small grassy hill in front of the Posner Center and Posner Hall, which is to your south. The CFA parking lot is to your west. Margaret Morrison St. runs east. A path to your north approaches a set of stairs. A steel trapdoor is set into damaged concrete.",
        {
            south: goto("posner.a"),
            west: goto("cfa_parking_lot"),
            east: goto("mmst_techst"),
            north: goto("east_of_tennis_courts"),
            down: {
                type: "door",

                roomId: "steam_tunnel.three_way_intersection",

                doorId: "posner_trapdoor",

                doorNouns: [/(?:(?:metal|steel|shiny|dull|square|steam|tunnel|trap|concrete|cement|damaged|cracked) )*(?:trap(?:door)?|hatch|door)(?:(?:set )? in(?:to)? (?:(?:damaged|cracked) )*(?:concrete|cement))?/i],
                canOpen: false,
                canClose: true,
                closeOnUse: false,
                keyItem: null
            }
        }
    ),
    basicRoom(
        "doherty_wilderness",
        "Wilderness",
        "You stand in a small grove of unmaintained forest. A path meanders through the trees. A door to Doherty Hall is to the south, and a hill blocks your path to the north.",
        {
            east: goto("the_cut_south", "You climb a wooden staircase and find yourself in an open space.")
        }
    ),
    basicRoom(
        "cursed_courtyard",
        "Cursed Courtyard",
        "This is a small enclosed outdoor space under the Scaife walkway. The ground is solid concrete. There is an alarmed door to ANSYS C to the south, an alarmed double door to TechSpark to the west, a locked double door into Hamerschlag Hall to the north, and a double door into Scott Hall to the east.",
        {
            south: goto("ansys.c.courtyard_hallway", "You manage to get through the door, only after making a considerable racket."), // TODO: ALERT FARNAM
            west: goto("techspark", "You manage to get through the door, only after making a considerable racket."),
            north: say("The doors are locked."),
            east: goto("scott.4s.chamber_of_lies"),
            up: goto("scaife_walkway", "You climb a pillar.")
        }
    ),
    basicRoom(
        "scaife_walkway",
        "Scaife Walkway",
        "You're on a bridge which spans from the Scaife Quad to the Mall, which are southwest and northeast respectively. There is a door into ANSYS Hall to your south.",
        {
            southwest: goto("scaife_quad"),
            northeast: goto("lower_mall"),
            south: goto("ansys.big_stairs.b")
        }
    ),
    basicRoom(
        "scaife_quad",
        "Scaife Quad",
        "You find yourself in a large quad north of Scaife Hall. You can walk under Scaife Hall to your south, onto a patio outside Porter to your southeast, into ANSYS Hall to your east, onto the Scaife walkway to your northeast, into Hamerschlag Hall to your north, or onto Hamerschlag Drive to your northwest.",
        {
            south: goto("under_scaife"),
            southeast: goto("porter.b.patio"),
            east: goto("ansys.c"),
            northeast: goto("scaife_walkway"),
            north: goto("hamerschlag.c.lobby"),
            northwest: goto("hamerschlag_drive.hamerschlag")
        }
    )
]; // TODO: panel with buttons labeled A, B, and C inside the La Prima counter