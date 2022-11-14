import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useLocation, useHistory } from 'react-router-dom';

import { starterType } from '../helpers/types';
import { stepsCRA, stepsVite } from '../helpers/steps';

export const StepControlButtons = ({ starter }: { starter: starterType }) => {
  const location = useLocation();
  const history = useHistory();
  const [steps, setSteps] = useState(starter === 'cra' ? [...stepsCRA] : [...stepsVite]);
  const [stepsUrl, setStepsUrl] = useState({
    previousStep: '',
    nextStep: '',
  });

  useEffect(() => {
    const currentStepIndex = steps.find((ele) => ele.href === location.pathname).index;
    const nextStep = steps.find((ele) => ele.index === currentStepIndex + 1)?.href;
    const previousStep = steps.find((ele) => ele.index === currentStepIndex - 1)?.href;
    setStepsUrl({ previousStep: previousStep, nextStep: nextStep });
  }, [location.pathname]);

  const goNext = () => {
    history.push(stepsUrl.nextStep);
  };

  const goBack = () => {
    history.push(stepsUrl.previousStep);
  };

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      {location.pathname !== '/creator' && location.pathname !== '/creatorVite' && (
        <button
          type="button"
          onClick={goBack}
          className={`${
            location.pathname === '/creator/installation' ? 'rounded-sm' : 'rounded-l-md'
          } relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          Back
        </button>
      )}
      {location.pathname !== '/creator/installation' &&
        location.pathname !== '/creatorVite/installation' && (
          <button
            type="button"
            onClick={goNext}
            className={`${
              location.pathname === '/creator' ? 'rounded-sm' : 'rounded-r-md'
            } relative inline-flex items-center px-2 py-2 border border-transparent bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
          >
            <span className="sr-only">Next</span>
            Next
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
    </span>
  );
};
