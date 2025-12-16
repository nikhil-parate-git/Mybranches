import { useState } from "react";

export const useStepper = (totalSteps) => {
  const [step, setStep] = useState(0);

  const next = () => step < totalSteps - 1 && setStep(step + 1);
  const back = () => step > 0 && setStep(step - 1);

  return { step, next, back, setStep };
};
