export default class HSet {
    private hObj;
    constructor(...input: (string | number)[]);
    add(...input: (string | number)[]): string[];
    has(...input: (string | number)[]): (string | number)[];
    hasNot(...input: (string | number)[]): (string | number)[];
    delete(...input: (string | number)[]): boolean;
    clear(): void;
    values(): (string | number)[];
    get size(): number;
    protected hasString(val: (string | number)): boolean;
}
