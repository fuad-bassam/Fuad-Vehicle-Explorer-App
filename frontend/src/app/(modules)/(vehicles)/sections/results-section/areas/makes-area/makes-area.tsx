'use client';

import { BaseAlert } from '@/theme/components/base-alert/base-alert';
import { BaseButton } from '@/theme/components/base-button/base-button';
import { BaseCard } from '@/theme/components/base-card/base-card';
import { BasePagination } from '@/theme/components/base-pagination/base-pagination';
import { BaseSegmentedSwitch } from '@/theme/components/base-segmented-switch/base-segmented-switch';
import { BaseTable } from '@/theme/components/base-table/base-table';
import { BaseTypography } from '@/theme/components/base-typography/base-typography';
import { toPageCount } from '../../../../helpers/paging-helper';
import { useVehicleExplorerState } from '../../../../state-management/vehicle-explorer-state';
import { makesTableColumns } from '../../../../store/makes-table-columns';
import { loadingCardCount, viewOptions } from '../../../../store/models-view-options';
import { pageSize } from '../../../../store/paging-options';
import { MakeCard } from './components/make-card/make-card';
import { buildMakesTitle } from './helpers/makes-summary-helper';
import styles from './makes-area.module.scss';

export function MakesArea() {
  const { filters, data, isLoading, viewMode, updateFilters, changeViewMode, retry } = useVehicleExplorerState();

  if (filters.makeId) {
    return null;
  }

  if (data.error && !isLoading) {
    const isError = data.error.type === 'error';

    return (
      <BaseAlert
        type={data.error.type}
        title={isError ? 'Could not load makes' : 'Please check the page'}
        message={data.error.message}
      >
        {isError && <BaseButton label="Try again" onClick={retry} />}
      </BaseAlert>
    );
  }

  const makes = data.makesPage?.items ?? [];
  const totalCount = data.makesPage?.totalCount ?? 0;

  return (
    <div className={styles.area}>
      <div className={styles.header}>
        <div>
          <BaseTypography text={buildMakesTitle(totalCount)} type="subtitle" isLoading={!data.makesPage} />
          <BaseTypography text="Search for a make above to see its vehicle types and models." color="muted" />
        </div>
        <BaseSegmentedSwitch
          options={viewOptions}
          value={viewMode}
          onChange={value => changeViewMode(value === 'grid' ? 'grid' : 'table')}
        />
      </div>
      {viewMode === 'table' && <BaseTable columns={makesTableColumns} rows={makes} rowKey="id" isLoading={isLoading} />}
      {viewMode === 'grid' && (
        <div className={styles.grid}>
          {isLoading
            ? Array.from({ length: loadingCardCount }, (_, index) => <BaseCard key={index} variant="subtle" isLoading />)
            : makes.map(make => <MakeCard key={make.id} make={make} />)}
        </div>
      )}
      <BasePagination
        page={filters.page}
        totalPages={toPageCount(totalCount, pageSize)}
        onChange={page => updateFilters({ page })}
        disabled={isLoading}
      />
    </div>
  );
}
