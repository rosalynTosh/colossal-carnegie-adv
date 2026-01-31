import { basicRoom, goto, Room, say } from "../rooms";

export const CAMPUS_ROOMS_OBJ = {
    mall: basicRoom(
        "mall",
        "The Mall",
        "You are standing in front of a grassy field. You admire the magnificent Hamerschlag Hall to your west. Doherty Hall stands to your north, and Baker Hall to your south.",
        {
            west: goto("lowerMall"),
            north: goto("doherty.1.west"),
            south: goto("baker.1"),
            east: goto("cfaLawn")
        }
    ),
    lowerMall: basicRoom(
        "lowerMall",
        "The Mall",
        "You are standing at the base of a grassy hill. Hamerschlag Hall towers above you. Its grand staircase sits just to your west. Porter Hall is to your south, and Wean Hall is to your north.",
        {
            south: goto("porter.a"),
            north: goto("outsideLaPrima"),
            east: goto("mall"),
            west: goto("hamerschlag.1.lobby")
        }
    ),
    outsideLaPrima: basicRoom(
        "outsideLaPrima",
        "La Prima Patio",
        "You're under the covering of an imposing brutalist structure in an outdoor spot overlooking the Mall to your south. You see the counter of La Prima through glass doors to your north.",
        {
            south: goto("lowerMall"),
            north: goto("laPrima"),
            west: goto("scottOverlook"),
            east: goto("weanPatio")
        }
    ),
    laPrima: basicRoom(
        "laPrima",
        "La Prima",
        "You're in a coffee shop which would ordinarily be bustling with people. The counter is to the west. You spot hallways to your north, and through a pair of glass doors, the Mall to your south.",
        {
            north: goto("wean.5.south"),
            south: goto("outsideLaPrima"),
            west: goto("laPrimaCounter")
        }
    ),
    laPrimaCounter: basicRoom(
        "laPrimaCounter",
        "La Prima Counter",
        "You stand up against the counter to La Prima. A large parcel on a wooden pallet blocks your path to the north.",
        {
            north: say("You try to push your way through, but the box is too large."),
            east: goto("laPrima"),
            west: say("You try to climb over the counter but are blocked by strategically-placed coffee brewing devices. What could they be hiding?")
        }
    )
} as const satisfies { [id: string]: Room }; // TODO: panel with buttons labeled A, B, and C. maybe in the other La Prima?