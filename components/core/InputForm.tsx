"use client";

interface InputFormProps {
  label: string[][];
}

const InputForm = ({ label }: InputFormProps) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {label.map((row, i) =>
        row.map((label, j) =>
          label ? (
            <div key={`${i}-${j}`}>
              <label className="block text-sm font-medium text-gray-600">
                {label}
              </label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md px-1 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          ) : (
            <div key={`${i}-${j}`}></div>
          )
        )
      )}
    </div>
  );
};

export default InputForm;
