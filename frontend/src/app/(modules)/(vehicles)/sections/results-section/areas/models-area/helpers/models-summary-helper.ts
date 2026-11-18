const describeSearch = (makeName: string, year: number, vehicleType: string | null) =>
  `${vehicleType ? `${vehicleType} ` : ''}models for ${makeName} ${year}`;

export const buildModelsTitle = (
  shownCount: number,
  totalCount: number,
  makeName: string,
  year: number,
  vehicleType: string | null
) => {
  const count = shownCount === totalCount ? `${totalCount}` : `${shownCount} of ${totalCount}`;
  return `${count} ${describeSearch(makeName, year, vehicleType)}`;
};

export const buildNoModelsTitle = (makeName: string, year: number, vehicleType: string | null) =>
  `No ${describeSearch(makeName, year, vehicleType)}`;

export const buildNoMatchTitle = (filterText: string) => `No models match "${filterText.trim()}"`;
