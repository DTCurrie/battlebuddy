interface Index<T> {
    [key: string]: T[];
}

export interface RosterData {
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

export interface Roster {
    $: RosterAttributes;
    costs: Costs[];
    forces: Forces[];
}

export interface Forces extends Index<Force> {
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

export interface Force {
    $: ForceAttributes;
    rules: Rules[];
    selections: Selections[];
    publications: Publications[];
    categories: Categories[];
}

export interface Publications extends Index<Publication> {
    publication: Publication[];
}

export type PublicationAttributes = {
    id: string;
    name: string;
};

export interface Publication {
    $: PublicationAttributes;
}

export interface Selections extends Index<Selection> {
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

export interface Selection {
    $: SelectionAttributes;
    costs: Costs[];
    categories?: Categories[];
    profiles?: Profiles[];
    rules?: Rules[];
    selections?: Selections[];
}

export interface Costs extends Index<Cost> {
    cost: Cost[];
}

export type CostAttributes = {
    name: string;
    typeId: string;
    value: string;
};

export interface Cost {
    $: CostAttributes;
}

export interface Categories extends Index<Category> {
    category: Category[];
}

export type CategoryAttributes = {
    id: string;
    name: string;
    entryId: string;
    primary: string;
};

export interface Category {
    $: CategoryAttributes;
}

export interface Profiles extends Index<Profile> {
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

export interface Profile {
    $: ProfileAttributes;
    characteristics: Characteristics[];
}

export interface Characteristics extends Index<Characteristic> {
    characteristic: Characteristic[];
}

export type CharacteristicAttributes = {
    name: string;
    typeId: string;
};

export interface Characteristic {
    $: CharacteristicAttributes;
    _: string;
}

export interface Rules extends Index<Rule> {
    rule: Rule[];
}

export type RuleAttributes = {
    id: string;
    name: string;
    hidden: 'true' | 'false';
};

export interface Rule {
    $: RuleAttributes;
    description: string[];
}

export const flattenShape = <T extends Index<U>, U>(
    source: T[],
    callback?: (value: U) => U
): U[] => {
    return source.flatMap((t: T) => t[Object.keys(t)[0]].flatMap(callback || ((u: U) => u)));
};
