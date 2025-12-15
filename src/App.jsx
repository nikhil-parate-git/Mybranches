import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { FormProvider } from "./context/FormContext";
import { TodoProvider } from "./context/TodoContext";

import Sidebar from "./components/Sidebar";
import Stepper from "./components/Stepper";
import Step1 from "./steps/Step1Personal";
import Step2 from "./steps/Step2Address";
import Step3 from "./steps/Step3Document";
import Step4 from "./steps/Step4Review";
import TodoApp from "./todos/TodoApp";
import { useStepper } from "./hooks/useStepper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [currentView, setCurrentView] = useState("wizard"); // "wizard" or "todo"
  const { step, next, back } = useStepper(4);

  const steps = [
    <Step1 next={next} />,
    <Step2 next={next} back={back} />,
    <Step3 next={next} back={back} />,
    <Step4 back={back} />,
  ];

  // Decide which component to render
  const mainContent = currentView === "wizard" ? (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mx-auto">
      <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-2">
        Registration Wizard
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 text-center mb-6">
        Complete all steps to submit
      </p>

      <Stepper step={step} />
      {steps[step]}
    </div>
  ) : (
    <TodoApp />
  );

  return (
    <ThemeProvider>
      <TodoProvider>
        <FormProvider>
          <Sidebar currentView={currentView} setCurrentView={setCurrentView}>
            {mainContent} {/* Pass the actual component */}
          </Sidebar>
          <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </FormProvider>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;
