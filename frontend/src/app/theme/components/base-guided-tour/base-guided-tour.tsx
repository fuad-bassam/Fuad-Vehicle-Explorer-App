'use client';

import 'driver.js/dist/driver.css';
import { useEffect } from 'react';
import { driver } from 'driver.js';
import { BaseIconButton } from '../base-icon-button/base-icon-button';
import styles from './base-guided-tour.module.scss';

export interface BaseGuidedTourStep {
  target: string;
  title: string;
  description: string;
}

export interface BaseGuidedTourProps {
  steps: BaseGuidedTourStep[];
  storageKey: string;
  buttonTarget?: string;
  label?: string;
}

function startTour(steps: BaseGuidedTourStep[]) {
  driver({
    steps: steps.map(step => ({
      element: `[data-tour="${step.target}"]`,
      popover: { title: step.title, description: step.description }
    })),
    popoverClass: styles.popover,
    showProgress: true,
    smoothScroll: true,
    nextBtnText: 'Next',
    prevBtnText: 'Back',
    doneBtnText: 'Done'
  }).drive();
}

function isFirstVisit(storageKey: string) {
  try {
    if (localStorage.getItem(storageKey)) {
      return false;
    }

    localStorage.setItem(storageKey, 'seen');
    return true;
  } catch {
    return false;
  }
}

export function BaseGuidedTour({ steps, storageKey, buttonTarget, label = 'Show guide' }: BaseGuidedTourProps) {
  useEffect(() => {
    if (isFirstVisit(storageKey)) {
      startTour(steps);
    }
  }, [steps, storageKey]);

  return (
    <div className={styles.floating} data-tour={buttonTarget}>
      <BaseIconButton
        icon="message-question"
        label={label}
        variant="floating"
        tooltipPosition="left"
        onClick={() => startTour(steps)}
      />
    </div>
  );
}
