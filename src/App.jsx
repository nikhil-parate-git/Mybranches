import { useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";

import Sidebar from "./components/Sidebar";
import Stepper from "./components/Stepper";
import Step1 from "./steps/Step1Personal";
import Step2 from "./steps/Step2Address";
import Step3 from "./steps/Step3Document";
import Step4 from "./steps/Step4Review";
import ProductApp from "./products/ProductApp";
import UsersTable from "./components/UsersTable";

import { useStepper } from "./hooks/useStepper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { themeState } from "./recoil/atoms/ThemeAtom";

const AppContent = () => {
  const [currentView, setCurrentView] = useState("wizard");
  const { step, next, back, setStep } = useStepper(4);
  const theme = useRecoilValue(themeState);

  const wizardSteps = [
    <Step1 next={next} />,
    <Step2 next={next} back={back} />,
    <Step3 next={next} back={back} />,
    <Step4 back={back} setStep={setStep} />,
  ];

  return (
    <div
      className={`${
        theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen flex`}
    >
      <Sidebar setCurrentView={setCurrentView} setStep={setStep} />

      <div className="flex-1 p-6">
        {currentView === "wizard" && (
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mx-auto">
            <Stepper step={step} />
            {wizardSteps[step]}
          </div>
        )}

        {currentView === "products" && <ProductApp />}

        {currentView === "users" && (
          <UsersTable setCurrentView={setCurrentView} setStep={setStep} />
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

const App = () => (
  <RecoilRoot>
    <AppContent />
  </RecoilRoot>
);

export default App;
