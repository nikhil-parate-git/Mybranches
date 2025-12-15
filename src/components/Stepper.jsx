const Stepper = ({ step }) => {
  const steps = ["Personal", "Address", "Document", "Review"];
//Ye component multi-step form ka progress dikhata hai
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold
              ${index <= step ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600"}`}
            >
              {index + 1}
            </div>
            <p className={`text-xs mt-2 ${index <= step ? "text-indigo-600" : "text-gray-400"}`}>
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 h-1 bg-gray-200 rounded">
        <div
          className="h-1 bg-indigo-600 rounded transition-all"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Stepper;
