export interface Item {
    id: string;

    name: string;
    aOrAn: "a" | "an";
    inspectStr: string;

    nouns: string[];

    readStr: string;
}