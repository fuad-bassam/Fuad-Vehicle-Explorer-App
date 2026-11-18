import type { BaseGuidedTourStep } from '@/theme/components/base-guided-tour/base-guided-tour';

export const guidedTourStorageKey = 'vehicle-explorer-guide';

export const guidedTourSteps: BaseGuidedTourStep[] = [
  {
    target: 'make',
    title: 'Find a make',
    description: 'Type 2 or more letters, like "hon", then pick a make from the list.'
  },
  {
    target: 'year',
    title: 'Pick a model year',
    description: 'Optional: pick a year to narrow the models. vPIC has models from 1981.'
  },
  {
    target: 'types',
    title: 'Narrow the models',
    description: 'After you pick a make, its vehicle types show here. Pick one to narrow the models, then filter, sort or switch between table and grid below.'
  },
  {
    target: 'guide',
    title: 'Need it again?',
    description: 'Click this button any time to see this tour again.'
  }
];
