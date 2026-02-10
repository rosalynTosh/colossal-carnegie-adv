export interface ItemSpec {
    readonly id: string;

    readonly name: string;
    readonly aOrAn: "a" | "an";
    readonly inspectStr: string;

    readonly nouns: ReadonlyArray<RegExp>;

    readonly readStr: string;
}

export interface Item extends ItemSpec {}