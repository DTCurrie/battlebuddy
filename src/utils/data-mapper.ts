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
  ForceMap,
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

export const mapSelections = (selections: BattlescribeSelections[]): Selection[] => {
  return flattenShape<BattlescribeSelections, BattlescribeSelection>(selections).map(mapSelection);
};

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

export const mapForces = (forces: Force[]): ForceMap =>
  forces.reduce<ForceMap>((previous, current) => {
    const mapData = previous;
    const { id } = current;

    mapData[id] = current;

    return mapData;
  }, {} as ForceMap);

export const mapRosterData = (data: BattlescribeRosterData): RosterData => {
  const mapData: RosterData = {} as RosterData;

  const forces = flattenShape<BattlescribeForces, BattlescribeForce>(data.roster.forces).map(
    (force) => ({
      ...force.$,

      categories: flattenShape<BattlescribeCategories, BattlescribeCategory>(force.categories).map(
        (category) => category.$
      ),

      publications: flattenShape<BattlescribePublications, BattlescribePublication>(
        force.publications
      ).map((publication) => publication.$),

      rules: mapRules(force.rules),

      selections: mapSelections(force.selections),

      map: mapForceSelections(force),
    })
  );

  mapData.roster = {
    ...data.roster.$,
    costs: flattenShape<BattlescribeCosts, BattlescribeCost>(data.roster.costs).map(
      (cost) => cost.$
    ),
    forces,
    forceMap: mapForces(forces),
  };

  return mapData;
};
