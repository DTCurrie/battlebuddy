import {
  RosterData,
  List,
  flattenShape,
  Costs,
  Cost,
  Forces,
  Force,
  Categories,
  Category,
  Publications,
  Publication,
  Rules,
  Rule,
  Selection,
  Selections,
  ListSelection,
  Profiles,
  Profile,
  Characteristic,
  Characteristics,
  ListForceMap,
  ListForce,
  ListForceSelectionMap,
  ListRule,
  ListProfile,
} from './shapes';

const forceCategoryEntryIds: string[] = [];

export const mapRules = (rules: Rules[]): ListRule[] =>
  flattenShape<Rules, Rule>(rules).map((rule) => ({
    ...rule.$,
    description: rule.description,
  }));

export const mapProfiles = (profiles: Profiles[]): ListProfile[] =>
  flattenShape<Profiles, Profile>(profiles).map((profile) => ({
    ...profile.$,

    characteristics: flattenShape<Characteristics, Characteristic>(
      profile.characteristics
    ).map((characteristic) => ({ ...characteristic.$, value: characteristic._ })),
  }));

export const mapSelection = (selection: Selection): ListSelection => ({
  ...selection.$,

  costs: flattenShape<Costs, Cost>(selection.costs).map((cost) => cost.$),

  categories:
    selection.categories &&
    flattenShape<Categories, Category>(selection.categories).map((category) => category.$),

  profiles: selection.profiles && mapProfiles(selection.profiles),

  rules: selection.rules && mapRules(selection.rules),

  selections:
    selection.selections &&
    flattenShape<Selections, Selection>(selection.selections).map(mapSelection),
});

export const mapSelections = (selections: Selections[]): ListSelection[] => {
  return flattenShape<Selections, Selection>(selections).map(mapSelection);
};

export const mapForceSelections = (force: Force): ListForceSelectionMap => {
  const { categories, selections } = force;
  const mapData = {} as ListForceSelectionMap;

  flattenShape<Categories, Category>(categories, (category) => {
    const { entryId } = category.$;

    if (!forceCategoryEntryIds.includes(entryId)) {
      forceCategoryEntryIds.push(entryId);
    }

    mapData[entryId] = [];

    return category;
  });

  flattenShape<Selections, Selection>(selections, (selection) => {
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

export const mapForces = (forces: ListForce[]): ListForceMap =>
  forces.reduce<ListForceMap>((previous, current) => {
    const mapData = previous;
    const { id } = current;

    mapData[id] = current;

    return mapData;
  }, {} as ListForceMap);

export const mapRosterData = (data: RosterData): List => {
  const mapData: List = {} as List;

  const forces = flattenShape<Forces, Force>(data.roster.forces).map((force) => ({
    ...force.$,

    categories: flattenShape<Categories, Category>(force.categories).map((category) => category.$),

    publications: flattenShape<Publications, Publication>(force.publications).map(
      (publication) => publication.$
    ),

    rules: mapRules(force.rules),

    selections: mapSelections(force.selections),

    map: mapForceSelections(force),
  }));

  mapData.roster = {
    ...data.roster.$,
    costs: flattenShape<Costs, Cost>(data.roster.costs).map((cost) => cost.$),
    forces,
    forceMap: mapForces(forces),
  };

  return mapData;
};
