import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/solid';

import { stepsCRA, stepsVite } from '../helpers/steps';
import { starterType } from '../helpers/types';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const StepBar = ({ starter }: { starter: starterType }) => {
  const location = useLocation();
  const [steps, setSteps] = useState(starter === 'cra' ? [...stepsCRA] : [...stepsVite]);

  useEffect(() => {
    const currentStepIndex = steps.find((ele) => ele.href === location.pathname).index;
    const previousSteps = steps
      .filter((ele) => ele.index < currentStepIndex)
      .map((ele) => ({ ...ele, status: 'complete' }));
    const nextSteps = steps
      .filter((ele) => ele.index > currentStepIndex)
      .map((ele) => ({ ...ele, status: 'incoming' }));
    const currentStepStatus = { ...steps[currentStepIndex], status: 'current' };
    setSteps([...previousSteps, currentStepStatus, ...nextSteps]);
  }, [location.pathname]);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}
          >
            {step.status === 'complete' ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-indigo-600 transtion duration-200" />
                </div>
                <Link to={step.href} className="relative flex flex-col justify-start group">
                  <span className="w-12 h-9 flex items-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800 transition duration-200">
                      <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="w-full absolute -bottom-6 -left-3 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase">
                      {step.name}
                    </span>
                  </span>
                </Link>
              </>
            ) : step.status === 'current' ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200 transtion duration-200" />
                </div>
                <Link
                  to={step.href}
                  className="relative flex flex-col justify-start group"
                  aria-current="step"
                >
                  <span className="w-12 h-9 flex items-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 hover:border-indigo-800 rounded-full group-hover:bg-gray-50 transition duration-200">
                      <span
                        className="h-2.5 w-2.5 bg-indigo-600 hover:border-indigo-800 rounded-full"
                        aria-hidden="true"
                      />
                    </span>
                  </span>

                  <span className="w-full absolute -bottom-6 -left-3 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase">
                      {step.name}
                    </span>
                  </span>
                </Link>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200 transtion duration-200" />
                </div>
                <Link to={step.href} className="relative flex flex-col justify-start group">
                  <span className="w-12 h-9 flex items-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:bg-gray-50 transition duration-200"></span>
                  </span>

                  <span className="w-full absolute -bottom-6 -left-3 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase">
                      {step.name}
                    </span>
                  </span>
                </Link>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
