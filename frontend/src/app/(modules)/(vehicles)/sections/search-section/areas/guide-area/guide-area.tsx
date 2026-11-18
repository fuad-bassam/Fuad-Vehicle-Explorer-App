import { BaseGuidedTour } from '@/theme/components/base-guided-tour/base-guided-tour';
import { guidedTourSteps, guidedTourStorageKey } from '../../../../store/guided-tour-steps';

export function GuideArea() {
  return <BaseGuidedTour steps={guidedTourSteps} storageKey={guidedTourStorageKey} buttonTarget="guide" />;
}
