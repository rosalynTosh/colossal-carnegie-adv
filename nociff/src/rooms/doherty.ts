import { Room } from "../rooms";

export const DOHERTY_ROOMS_OBJ = {
    doherty_1_west: {
        id: "doherty.1.west",

        print: () => "doherty.1.west",

        dirs: {
            south: { type: "goto", roomId: "mall" },
            up: { type: "goto", roomId: "doherty.2.west" }
        }
    }
} as const satisfies { [id: string]: Room };