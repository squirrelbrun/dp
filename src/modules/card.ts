export interface Card {
    id?: number;
    value?: number;
    valueName?: string;
    altRules?: string;
    isFaceDown?: boolean;
    isDiscarded?: boolean;
}
// all optional pour active card qui peut etre empty