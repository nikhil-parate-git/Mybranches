import { RecoilRoot, useRecoilValue } from "recoil";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

const Wizard = ({ step, next, back, setStep }) => {
  const theme = useRecoilValue(themeState);

  const wizardSteps = [
    <Step1 next={next} />,
    <Step2 next={next} back={back} />,
    <Step3 next={next} back={back} />,
    <Step4 back={back} setStep={setStep} />,
  ];

  return (
    <div
      className={`w-full max-w-lg mx-auto border-1 border-black p-10 rounded-2xl 
    transition-colors duration-300 shadow-lg
    ${
      theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
    }`}
    >
      <h1 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
        FormikWizard Multi Form
      </h1>

      <Stepper step={step} />

      <div className="mt-10 space-y-8">{wizardSteps[step]}</div>
    </div>
  );
};

const AppContent = () => {
  const theme = useRecoilValue(themeState);
  const { step, next, back, setStep } = useStepper(4);

  return (
    <div
      className={`${
        theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen flex`}
    >
      <Sidebar />

      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/wizard" />} />

          <Route
            path="/wizard"
            element={
              <Wizard step={step} next={next} back={back} setStep={setStep} />
            }
          />

          <Route path="/products" element={<ProductApp />} />

          <Route path="/users" element={<UsersTable setStep={setStep} />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

const App = () => (
  <RecoilRoot>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
