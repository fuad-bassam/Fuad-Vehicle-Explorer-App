import { parseVehicleFilters, parseViewMode } from './helpers/search-params-helper';
import type { SearchParams } from './models/search-params';
import { ResultsSection } from './sections/results-section/results-section';
import { SearchSection } from './sections/search-section/search-section';
import { loadVehicleExplorer } from './services/vehicle-explorer';
import { VehicleExplorerStateProvider } from './state-management/vehicle-explorer-state';

export default async function VehiclesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const filters = parseVehicleFilters(params);
  const data = await loadVehicleExplorer(filters);

  return (
    <VehicleExplorerStateProvider filters={filters} viewMode={parseViewMode(params)} data={data}>
      <SearchSection />
      <ResultsSection />
    </VehicleExplorerStateProvider>
  );
}
