export interface Door {
    id: string;

    initOpen: boolean;
}

export const DOORS: Door[] = [
    {
        id: "mall_trapdoor",

        initOpen: false
    }
];