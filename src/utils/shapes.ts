interface Index {
    [key: string]: unknown;
}

interface TypedIndex<T> {
    [key: string]: T[];
}

export interface RosterData extends Index {
    roster: Roster;
}

export type RosterAttributes = {
    id: string;
    name: string;
    battleScribeVersion: string;
    gameSystemId: string;
    gameSystemName: string;
    gameSystemRevision: string;
    xmlns: string;
};

export interface Roster extends Index {
    $: RosterAttributes;
    costs: Costs[];
    forces: Forces[];
}

export interface Forces extends TypedIndex<Force> {
    force: Force[];
}

export type ForceAttributes = {
    id: string;
    name: string;
    entryId: string;
    catalogueId: string;
    catalogueRevision: string;
    catalogueName: string;
};

export interface Force extends Index {
    $: ForceAttributes;
    rules: Rules[];
    selections: Selections[];
    publications: Publications[];
    categories: Categories[];
}

export interface Publications extends TypedIndex<Publication> {
    publication: Publication[];
}

export type PublicationAttributes = {
    id: string;
    name: string;
};

export interface Publication extends Index {
    $: PublicationAttributes;
}

export interface Selections extends TypedIndex<Selection> {
    selection: Selection[];
}

export type SelectionAttributes = {
    id: string;
    name: string;
    entryId: string;
    entryGroupId?: string;
    number: string;
    type: string;
};

export interface Selection extends Index {
    $: SelectionAttributes;
    costs: Costs[];
    categories?: Categories[];
    profiles?: Profiles[];
    rules?: Rules[];
    selections?: Selections[];
}

export interface Costs extends TypedIndex<Cost> {
    cost: Cost[];
}

export type CostAttributes = {
    name: string;
    typeId: string;
    value: string;
};

export interface Cost extends Index {
    $: CostAttributes;
}

export interface Categories extends TypedIndex<Category> {
    category: Category[];
}

export type CategoryAttributes = {
    id: string;
    name: string;
    entryId: string;
    primary: string;
};

export interface Category extends Index {
    $: CategoryAttributes;
}

export interface Profiles extends TypedIndex<Profile> {
    profile: Profile[];
}

export type ProfileAttributes = {
    id: string;
    name: string;
    publicationId?: string;
    page?: string;
    hidden: string;
    typeId: string;
    typeName: string;
};

export interface Profile extends Index {
    $: ProfileAttributes;
    characteristics: Characteristics[];
}

export interface Characteristics extends TypedIndex<Characteristic> {
    characteristic: Characteristic[];
}

export type CharacteristicAttributes = {
    name: string;
    typeId: string;
};

export interface Characteristic extends Index {
    $: CharacteristicAttributes;
    _: string;
}

export interface Rules extends TypedIndex<Rule> {
    rule: Rule[];
}

export type RuleAttributes = {
    id: string;
    name: string;
    hidden: 'true' | 'false';
};

export interface Rule extends Index {
    $: RuleAttributes;
    description: string[];
}

export const flattenShape = <T extends TypedIndex<U>, U>(
    source: T[],
    callback?: (value: U) => U
): U[] => {
    return source.flatMap((t: T) => t[Object.keys(t)[0]].flatMap(callback || ((u: U) => u)));
};
