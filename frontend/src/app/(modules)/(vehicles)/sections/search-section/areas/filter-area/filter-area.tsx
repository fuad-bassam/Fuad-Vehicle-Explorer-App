'use client';

import { useEffect, useRef, useState } from 'react';
import { searchMakesFromBrowser } from '@/services/vehicles/make-search';
import type { IMake } from '@/services/vehicles/models/make';
import { BaseSelect } from '@/theme/components/base-select/base-select';
import { BaseTypography } from '@/theme/components/base-typography/base-typography';
import { useVehicleExplorerState } from '../../../../state-management/vehicle-explorer-state';
import { minKeywordLength, typeMoreMessage } from '../../../../store/search-rules';
import { buildYearOptions } from './helpers/year-options-helper';
import type { IYearOption } from './models/year-option';
import styles from './filter-area.module.scss';

export function FilterArea() {
  const { filters, selectedMake, updateFilters } = useVehicleExplorerState();
  const [yearOptions] = useState(() => buildYearOptions(new Date().getFullYear()));
  const [makes, setMakes] = useState<IMake[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState(typeMoreMessage);
  const searchRequest = useRef<AbortController | null>(null);

  useEffect(() => () => searchRequest.current?.abort(), []);

  const searchMakes = async (text: string) => {
    searchRequest.current?.abort();
    const keyword = text.trim();

    if (keyword.length < minKeywordLength) {
      setMakes([]);
      setSearchMessage(typeMoreMessage);
      return;
    }

    const request = new AbortController();
    searchRequest.current = request;
    setIsSearching(true);

    try {
      setMakes(await searchMakesFromBrowser(keyword, request.signal));
      setSearchMessage('No makes match this search');
    } catch {
      if (!request.signal.aborted) {
        setMakes([]);
        setSearchMessage('Make search is not available right now');
      }
    } finally {
      if (searchRequest.current === request) {
        setIsSearching(false);
      }
    }
  };

  const selectedYear = yearOptions.find(option => option.value === filters.year) ?? null;

  return (
    <div className={styles.area}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <BaseSelect<IMake>
            label="Make"
            placeholder="Search makes, e.g. Honda"
            items={makes}
            optionLabel="name"
            optionValue="id"
            selectedItem={selectedMake}
            onChange={make => updateFilters({ makeId: make?.id ?? null, vehicleType: null }, make)}
            onSearchChange={searchMakes}
            isLoading={isSearching}
            emptyMessage={searchMessage}
          />
        </div>
        <div className={styles.field}>
          <BaseSelect<IYearOption>
            label="Model year"
            placeholder="Pick a year"
            items={yearOptions}
            optionLabel="label"
            optionValue="value"
            selectedItem={selectedYear}
            onChange={option => updateFilters({ year: option?.value ?? null })}
          />
        </div>
      </div>
      <BaseTypography text="Type 2 or more letters to find a make, then pick a model year." type="caption" color="muted" />
    </div>
  );
}
