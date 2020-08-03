declare interface RosterData {
    roster: Roster;
}

declare type RosterAttributes = {
    id: string;
    name: string;
    battleScribeVersion: string;
    gameSystemId: string;
    gameSystemName: string;
    gameSystemRevision: string;
    xmlns: string;
};

declare interface Roster {
    $: RosterAttributes;
    costs: Costs[];
    forces: Forces[];
}

declare interface Forces {
    force: Force[];
}

declare type ForceAttributes = {
    id: string;
    name: string;
    entryId: string;
    catalogueId: string;
    catalogueRevision: string;
    catalogueName: string;
};

declare interface Force {
    $: ForceAttributes;
    rules: Rules[];
    selections: Selections[];
    publications: Publications[];
    categories: Categories[];
}

declare interface Publications {
    publication: Publication[];
}

declare type PublicationAttributes = {
    id: string;
    name: string;
};

declare interface Publication {
    $: PublicationAttributes;
}

declare interface Selections {
    selection: Selection[];
}

declare type SelectionAttributes = {
    id: string;
    name: string;
    entryId: string;
    entryGroupId?: string;
    number: string;
    type: string;
};

declare interface Selection {
    $: SelectionAttributes;
    costs: Costs[];
    categories?: Categories[];
    profiles?: Profiles[];
    rules?: Rules[];
    selections?: Selections[];
}

declare interface Costs {
    cost: Cost[];
}

declare type CostAttributes = {
    name: string;
    typeId: string;
    value: string;
};

declare interface Cost {
    $: CostAttributes;
}

declare interface Categories {
    category: Category[];
}

declare type CategoryAttributes = {
    id: string;
    name: string;
    entryId: string;
    primary: string;
};

declare interface Category {
    $: CategoryAttributes;
}

declare interface Profiles {
    profile: Profile[];
}

declare type ProfileAttributes = {
    id: string;
    name: string;
    publicationId?: string;
    page?: string;
    hidden: string;
    typeId: string;
    typeName: string;
};

declare interface Profile {
    $: ProfileAttributes;
    characteristics: Characteristics[];
}

declare interface Characteristics {
    characteristic: Characteristic[];
}

declare type CharacteristicAttributes = {
    name: string;
    typeId: string;
};

declare interface Characteristic {
    $: CharacteristicAttributes;
    _: string;
}

declare interface Rules {
    rule: Rule[];
}

declare type RuleAttributes = {
    id: string;
    name: string;
    hidden: 'true' | 'false';
};

declare interface Rule {
    $: RuleAttributes;
    description: string[];
}

declare module '*.roster-data.json' {
    const value: RosterData;
    export default value;
}
