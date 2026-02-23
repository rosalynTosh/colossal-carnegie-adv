export interface Door {
    id: string;

    initOpen: boolean;
    hasDoorCloser: boolean;
}

export const DOORS: Door[] = [
    {
        id: "mall_trapdoor",

        initOpen: false,
        hasDoorCloser: false
    },
    {
        id: "posner_trapdoor",

        initOpen: false,
        hasDoorCloser: false
    },
    {
        id: "steam_tunnel_to_4703",

        initOpen: false,
        hasDoorCloser: false
    }
];