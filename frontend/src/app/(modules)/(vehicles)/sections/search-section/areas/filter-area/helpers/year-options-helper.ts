import { firstModelYear } from '../../../../../store/search-rules';
import type { IYearOption } from '../models/year-option';

export const buildYearOptions = (currentYear: number): IYearOption[] => {
  const options: IYearOption[] = [];

  for (let year = currentYear + 1; year >= firstModelYear; year--) {
    options.push({ value: year, label: String(year) });
  }

  return options;
};
