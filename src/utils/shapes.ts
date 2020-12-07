import { remote } from 'electron';
import { Schema } from 'electron-store';

interface Index {
  [key: string]: unknown;
}

interface TypedIndex<T> {
  [key: string]: T[];
}

//
// Battlescribe data shapes
//

export interface BattlescribeRosterData extends Index {
  fileName: string;
  roster: BattlescribeRoster;
}

export type BattlescribeRosterAttributes = {
  id: string;
  name: string;
  battleScribeVersion: string;
  gameSystemId: string;
  gameSystemName: string;
  gameSystemRevision: string;
  xmlns: string;
};

export interface BattlescribeRoster extends Index {
  $: BattlescribeRosterAttributes;
  costs: BattlescribeCosts[];
  forces: BattlescribeForces[];
}

export interface BattlescribeForces extends TypedIndex<BattlescribeForce> {
  force: BattlescribeForce[];
}

export type BattlescribeForceAttributes = {
  id: string;
  name: string;
  entryId: string;
  catalogueId: string;
  catalogueRevision: string;
  catalogueName: string;
};

export interface BattlescribeForce extends Index {
  $: BattlescribeForceAttributes;
  selections: BattlescribeSelections[];
  publications: BattlescribePublications[];
  categories: BattlescribeCategories[];
  rules?: BattlescribeRules[];
}

export interface BattlescribePublications extends TypedIndex<BattlescribePublication> {
  publication: BattlescribePublication[];
}

export type BattlescribePublicationAttributes = {
  id: string;
  name: string;
};

export interface BattlescribePublication extends Index {
  $: BattlescribePublicationAttributes;
}

export interface BattlescribeSelections extends TypedIndex<BattlescribeSelection> {
  selection: BattlescribeSelection[];
}

export type BattlescribeSelectionAttributes = {
  id: string;
  name: string;
  entryId: string;
  entryGroupId?: string;
  number: string;
  type: string;
};

export interface BattlescribeSelection extends Index {
  $: BattlescribeSelectionAttributes;
  costs: BattlescribeCosts[];
  categories?: BattlescribeCategories[];
  profiles?: BattlescribeProfiles[];
  rules?: BattlescribeRules[];
  selections?: BattlescribeSelections[];
}

export interface BattlescribeCosts extends TypedIndex<BattlescribeCost> {
  cost: BattlescribeCost[];
}

export type BattlescribeCostAttributes = {
  name: string;
  typeId: string;
  value: string;
};

export interface BattlescribeCost extends Index {
  $: BattlescribeCostAttributes;
}

export interface BattlescribeCategories extends TypedIndex<BattlescribeCategory> {
  category: BattlescribeCategory[];
}

export type BattlescribeCategoryAttributes = {
  id: string;
  name: string;
  entryId: string;
  primary: string;
};

export interface BattlescribeCategory extends Index {
  $: BattlescribeCategoryAttributes;
}

export interface BattlescribeProfiles extends TypedIndex<BattlescribeProfile> {
  profile: BattlescribeProfile[];
}

export type BattlescribeProfileAttributes = {
  id: string;
  name: string;
  publicationId?: string;
  page?: string;
  hidden: string;
  typeId: string;
  typeName: string;
};

export interface BattlescribeProfile extends Index {
  $: BattlescribeProfileAttributes;
  characteristics: BattlescribeCharacteristics[];
}

export interface BattlescribeCharacteristics extends TypedIndex<BattlescribeCharacteristic> {
  characteristic: BattlescribeCharacteristic[];
}

export type BattlescribeCharacteristicAttributes = {
  name: string;
  typeId: string;
};

export interface BattlescribeCharacteristic extends Index {
  $: BattlescribeCharacteristicAttributes;
  _: string;
}

export interface BattlescribeRules extends TypedIndex<BattlescribeRule> {
  rule: BattlescribeRule[];
}

export type BattlescribeRuleAttributes = {
  id: string;
  name: string;
  hidden: 'true' | 'false';
};

export interface BattlescribeRule extends Index {
  $: BattlescribeRuleAttributes;
  description: string[];
}

//
// Battlebuddy data shapes
//

export interface BattlebuddyConfig {
  rosterPath: string;
}

export interface RosterData {
  fileName: string;
  roster: Roster;
}

export interface Roster extends BattlescribeRosterAttributes {
  costs: BattlescribeCostAttributes[];
  forces: Force[];
}

export interface Force extends BattlescribeForceAttributes {
  categories: BattlescribeCategoryAttributes[];
  publications: BattlescribePublicationAttributes[];
  rules?: Rule[];
  selections: Selection[];
  map: ForceSelectionMap;
}

export interface ForceSelectionMap {
  [category: string]: Selection[];
}

export interface Rule extends BattlescribeRuleAttributes {
  description: string[];
}

export interface Selection extends BattlescribeSelectionAttributes {
  costs: BattlescribeCostAttributes[];
  categories?: BattlescribeCategoryAttributes[];
  profiles?: Profile[];
  rules?: Rule[];
  selections?: Selection[];
}

export interface Profile extends BattlescribeProfileAttributes {
  characteristics: Characteristic[];
}

export interface Characteristic extends BattlescribeCharacteristicAttributes {
  value: string;
}

export const flattenShape = <T extends TypedIndex<U>, U>(
  source: T[],
  callback?: (value: U) => U
): U[] => source.flatMap((t: T) => t[Object.keys(t)[0]].flatMap(callback || ((u: U) => u)));
