'use client';

import { BaseAlert } from '@/theme/components/base-alert/base-alert';
import { BaseButton } from '@/theme/components/base-button/base-button';
import { BasePagination } from '@/theme/components/base-pagination/base-pagination';
import { BaseTable } from '@/theme/components/base-table/base-table';
import { BaseTypography } from '@/theme/components/base-typography/base-typography';
import { toPageCount } from '../../../../helpers/paging-helper';
import { useVehicleExplorerState } from '../../../../state-management/vehicle-explorer-state';
import { makesTableColumns } from '../../../../store/makes-table-columns';
import { pageSize } from '../../../../store/paging-options';
import { buildMakesTitle } from './helpers/makes-summary-helper';
import styles from './makes-area.module.scss';

export function MakesArea() {
  const { filters, data, isLoading, updateFilters, retry } = useVehicleExplorerState();

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

  const totalCount = data.makesPage?.totalCount ?? 0;

  return (
    <div className={styles.area}>
      <BaseTypography text={buildMakesTitle(totalCount)} type="subtitle" isLoading={!data.makesPage} />
      <BaseTypography text="Pick a make from the list, or search for one above." color="muted" />
      <BaseTable
        columns={makesTableColumns}
        rows={data.makesPage?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        onRowClick={make => updateFilters({ makeId: make.id, year: null, vehicleType: null }, make)}
      />
      <BasePagination
        page={filters.page}
        totalPages={toPageCount(totalCount, pageSize)}
        onChange={page => updateFilters({ page })}
        disabled={isLoading}
      />
    </div>
  );
}
