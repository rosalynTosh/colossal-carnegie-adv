import { basicRoom, goto, Room, say } from "../rooms";

export const LIMINAL_ROOMS: Room[] = [
    basicRoom(
        "liminal.ramp",
        "Liminal Space",
        "You're in a strange space with concrete walls. The floor slants down toward Doherty Hall to your east, and double doors to your west lead to Wean Hall. There are locked pairs of double doors to your north and south, with the one to your south labeled \"DANGER: High Voltage\".",
        {
            west: goto("wean.4.400"),
            up: goto("wean.4.400"),
            east: goto("doherty.b.mall_side_corridor.steam_tunnels"),
            down: goto("doherty.b.mall_side_corridor.steam_tunnels"),
            north: say("The double doors are securely locked."),
            south: say("The double doors are securely locked.")
        }
    ),
    basicRoom(
        "liminal.ground",
        "Liminal Space",
        "You're in a strange space with concrete walls and windows on two sides. A door to your west is painted with the number 5, and a door to your east with the letter A. A door to your south seems to lead outside. A paper stand contains numerous copies of a particular satire magazine.",
        {
            west: goto("wean.5.400"),
            east: goto("doherty.a.west"),
            south: goto("wean_patio_east")
        }
    ),
    basicRoom(
        "liminal.6",
        "Liminal Space",
        "You're in a strange space with concrete walls and windows on two sides. A door to your west is painted with the number 6 and a door to your east with the number 1. Stairs run up.",
        {
            west: goto("wean.6.400"),
            east: goto("doherty.1.west"),
            up: goto("liminal.7")
        }
    ),
    basicRoom(
        "liminal.7",
        "Liminal Space",
        "You're in a strange space with concrete walls and windows on two sides. A door to your west is painted with the number 7 and a door to your east with the number 2. Stairs run up and down.",
        {
            west: goto("wean.7.400"),
            east: goto("doherty.2.west"),
            up: goto("liminal.8"),
            down: goto("liminal.6")
        }
    ),
    basicRoom(
        "liminal.8",
        "Liminal Space",
        "You're in a strange space with concrete walls and windows on two sides. A door to your west is painted with the number 8 and a door to your east with the number 3. Stairs run down.",
        {
            west: goto("wean.8.400"),
            east: goto("doherty.3.west"),
            down: goto("liminal.7")
        }
    )
];