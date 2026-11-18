'use client';

import { BaseAlert } from '@/theme/components/base-alert/base-alert';
import { BaseButton } from '@/theme/components/base-button/base-button';
import { BaseCard } from '@/theme/components/base-card/base-card';
import { BaseEmptyState } from '@/theme/components/base-empty-state/base-empty-state';
import { BasePagination } from '@/theme/components/base-pagination/base-pagination';
import { BaseSegmentedSwitch } from '@/theme/components/base-segmented-switch/base-segmented-switch';
import { BaseTable } from '@/theme/components/base-table/base-table';
import { BaseTextInput } from '@/theme/components/base-text-input/base-text-input';
import { BaseTypography } from '@/theme/components/base-typography/base-typography';
import { takePage, toPageCount } from '../../../../helpers/paging-helper';
import { useVehicleExplorerState } from '../../../../state-management/vehicle-explorer-state';
import { loadingCardCount, sortOptions, viewOptions } from '../../../../store/models-view-options';
import { modelsTableColumns } from '../../../../store/models-table-columns';
import { pageSize } from '../../../../store/paging-options';
import { ModelCard } from './components/model-card/model-card';
import { filterAndSortModels } from './helpers/models-list-helper';
import { buildModelsTitle, buildNoMatchTitle, buildNoModelsTitle } from './helpers/models-summary-helper';
import styles from './models-area.module.scss';

export function ModelsArea() {
  const {
    filters,
    selectedMake,
    data,
    isLoading,
    viewMode,
    sortDirection,
    filterText,
    modelsPage,
    changeViewMode,
    changeSortDirection,
    changeFilterText,
    changeModelsPage,
    retry
  } = useVehicleExplorerState();

  if (!filters.makeId) {
    return null;
  }

  if (data.error && !isLoading) {
    const isError = data.error.type === 'error';

    return (
      <BaseAlert
        type={data.error.type}
        title={isError ? 'Could not load vehicles' : 'Please check your search'}
        message={data.error.message}
      >
        {isError && <BaseButton label="Try again" onClick={retry} />}
      </BaseAlert>
    );
  }

  if (!filters.year || !selectedMake) {
    return <BaseEmptyState title="Now pick a model year" description="Matching vehicle models will appear here." />;
  }

  const year = filters.year;

  if (!isLoading && data.models.length === 0) {
    return (
      <BaseEmptyState
        title={buildNoModelsTitle(selectedMake.name, year, filters.vehicleType)}
        description="Try another vehicle type or model year."
      />
    );
  }

  const shownModels = filterAndSortModels(data.models, filterText, sortDirection);
  const pageModels = takePage(shownModels, modelsPage, pageSize);
  const hasNoMatch = !isLoading && shownModels.length === 0;

  return (
    <div className={styles.area}>
      <BaseTypography
        text={buildModelsTitle(shownModels.length, data.models.length, selectedMake.name, year, filters.vehicleType)}
        type="subtitle"
        isLoading={isLoading}
      />
      <div className={styles.toolbar}>
        <div className={styles.filter}>
          <BaseTextInput
            label="Filter models"
            placeholder="e.g. CR"
            value={filterText}
            onChange={changeFilterText}
            disabled={isLoading}
          />
        </div>
        <BaseSegmentedSwitch
          options={sortOptions}
          value={sortDirection}
          onChange={value => changeSortDirection(value === 'desc' ? 'desc' : 'asc')}
        />
        <BaseSegmentedSwitch
          options={viewOptions}
          value={viewMode}
          onChange={value => changeViewMode(value === 'grid' ? 'grid' : 'table')}
        />
      </div>
      {hasNoMatch && (
        <div className={styles.noMatch}>
          <BaseEmptyState
            title={buildNoMatchTitle(filterText)}
            description={`Clear the filter to see all ${data.models.length} models.`}
          />
          <BaseButton label="Clear filter" variant="secondary" onClick={() => changeFilterText('')} />
        </div>
      )}
      {!hasNoMatch && viewMode === 'table' && (
        <BaseTable columns={modelsTableColumns} rows={pageModels} rowKey="id" isLoading={isLoading} />
      )}
      {!hasNoMatch && viewMode === 'grid' && (
        <div className={styles.grid}>
          {isLoading
            ? Array.from({ length: loadingCardCount }, (_, index) => <BaseCard key={index} variant="subtle" isLoading />)
            : pageModels.map(model => (
                <ModelCard
                  key={model.id}
                  model={model}
                  makeName={selectedMake.name}
                  year={year}
                  vehicleType={filters.vehicleType}
                />
              ))}
        </div>
      )}
      {!hasNoMatch && (
        <BasePagination
          page={modelsPage}
          totalPages={toPageCount(shownModels.length, pageSize)}
          onChange={changeModelsPage}
          disabled={isLoading}
        />
      )}
    </div>
  );
}
