import { basicRoom, goto, Room, say } from "../rooms";

export const BAKER_PORTER_ROOMS: Room[] = [
    // A
    basicRoom(
        "porter.a",
        "Porter Hall",
        "You're on floor A of Porter Hall. A stairway leads up, the mall is to your north, ANSYS is to your west, and Frew Street is to your south.",
        {
            up: goto("porter.1"),
            down: goto("porter.b"),
            east: say("Your path is blocked by a strange door."),
            west: goto("ansys.a"),
            south: goto("frew"),
            north: goto("lower_mall")
        }
    )
];