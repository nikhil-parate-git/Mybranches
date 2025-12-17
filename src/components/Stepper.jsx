const Stepper = ({ step }) => {
  const steps = ["Personal", "Address", "Document", "Review"];

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 rounded"></div>

        {/* Active progress line */}
        <div
          className="absolute top-5 left-0 h-1 bg-indigo-600 rounded transition-all duration-500"
          style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((label, index) => {
          const isActive = index === step;
          const isCompleted = index < step;

          return (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center w-full"
            >
              {/* Circle */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
                ${
                  isCompleted
                    ? "bg-indigo-600 text-white"
                    : isActive
                    ? "bg-white border-2 border-indigo-600 text-indigo-600 "
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {/* Label */}
              <p
                className={`mt-3 text-sm font-medium transition-colors
                ${
                  isActive || isCompleted ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
