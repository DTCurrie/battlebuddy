import {
  BattlescribeCategories,
  BattlescribeCategory,
  BattlescribeCharacteristic,
  BattlescribeCharacteristics,
  BattlescribeCost,
  BattlescribeCosts,
  BattlescribeForce,
  BattlescribeForces,
  BattlescribeProfile,
  BattlescribeProfiles,
  BattlescribePublication,
  BattlescribePublications,
  BattlescribeRosterData,
  BattlescribeRule,
  BattlescribeRules,
  BattlescribeSelection,
  BattlescribeSelections,
  flattenShape,
  Force,
  ForceSelectionMap,
  Profile,
  RosterData,
  Rule,
  Selection,
} from './shapes';

const forceCategoryEntryIds: string[] = [];

export const mapRules = (rules: BattlescribeRules[]): Rule[] =>
  flattenShape<BattlescribeRules, BattlescribeRule>(rules).map((rule) => ({
    ...rule.$,
    description: rule.description,
  }));

export const mapProfiles = (profiles: BattlescribeProfiles[]): Profile[] =>
  flattenShape<BattlescribeProfiles, BattlescribeProfile>(profiles).map((profile) => ({
    ...profile.$,

    characteristics: flattenShape<BattlescribeCharacteristics, BattlescribeCharacteristic>(
      profile.characteristics
    ).map((characteristic) => ({ ...characteristic.$, value: characteristic._ })),
  }));

export const mapSelection = (selection: BattlescribeSelection): Selection => ({
  ...selection.$,

  costs: flattenShape<BattlescribeCosts, BattlescribeCost>(selection.costs).map((cost) => cost.$),

  categories:
    selection.categories &&
    flattenShape<BattlescribeCategories, BattlescribeCategory>(selection.categories).map(
      (category) => category.$
    ),

  profiles: selection.profiles && mapProfiles(selection.profiles),

  rules: selection.rules && mapRules(selection.rules),

  selections:
    selection.selections &&
    flattenShape<BattlescribeSelections, BattlescribeSelection>(selection.selections).map(
      mapSelection
    ),
});

export const mapSelections = (selections: BattlescribeSelections[]): Selection[] =>
  flattenShape<BattlescribeSelections, BattlescribeSelection>(selections).map(mapSelection);

export const mapForceSelections = (force: BattlescribeForce): ForceSelectionMap => {
  const { categories, selections } = force;
  const mapData = {} as ForceSelectionMap;

  flattenShape<BattlescribeCategories, BattlescribeCategory>(categories, (category) => {
    const { entryId } = category.$;

    if (!forceCategoryEntryIds.includes(entryId)) {
      forceCategoryEntryIds.push(entryId);
    }

    mapData[entryId] = [];

    return category;
  });

  flattenShape<BattlescribeSelections, BattlescribeSelection>(selections, (selection) => {
    selection.categories?.forEach(({ category }) =>
      category.forEach(({ $ }) => {
        if (forceCategoryEntryIds.includes($.entryId)) {
          mapData[$.entryId].push(mapSelection(selection));
        }
      })
    );

    return selection;
  });

  return mapData;
};

export const mapRosterData = ({ roster, fileName }: BattlescribeRosterData): RosterData => {
  const { $, forces, costs } = roster;

  const mappedForces = flattenShape<BattlescribeForces, BattlescribeForce>(forces).map((force) => {
    const { $: $force, categories, publications, rules, selections } = force;
    const forceData: Force = {
      ...$force,

      categories: flattenShape<BattlescribeCategories, BattlescribeCategory>(categories).map(
        ({ $: $category }) => $category
      ),

      selections: mapSelections(selections),

      map: mapForceSelections(force),
    };

    if (publications) {
      forceData.publications = flattenShape<BattlescribePublications, BattlescribePublication>(
        publications
      ).map(({ $: $publication }) => $publication);
    }

    if (rules) {
      forceData.rules = mapRules(rules);
    }

    return forceData;
  });

  const mapData: RosterData = {
    fileName,
    roster: {
      ...$,
      costs: flattenShape<BattlescribeCosts, BattlescribeCost>(costs).map(({ $: $cost }) => $cost),
      forces: mappedForces,
    },
  };

  return mapData;
};
