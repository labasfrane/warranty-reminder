import { ErrorMessage } from "@hookform/error-message";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FormContext } from "../context/form.context";

type Props = {
  label: string;
  id: string;
  errorMsg?: string;
  isRequired?: boolean;
};

const Select = ({
  label,
  id,
  errorMsg = "Please select one of the options",
}: Props) => {
  const optionsArr = [
    { label: "Choose one option", value: "" },
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
    { label: "Four", value: 4 },
    { label: "Five", value: 5 },
    { label: "Six", value: 6 },
    { label: "Seven", value: 7 },
    { label: "Eight", value: 8 },
    { label: "Nine", value: 9 },
    { label: "Ten", value: 10 },
  ];

  const { disabled, ...methods } = useContext(FormContext);

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2">
        {`${label} *`}
      </label>

      <select
        disabled={disabled}
        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-1 disabled:border-none disabled:shadow-none"
        autoFocus
        {...methods?.register(`${id}`, {
          required: { value: true, message: `${errorMsg}` },
          valueAsNumber: true,
        })}
        id={id}
      >
        {optionsArr.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="min-h-7 h-7 flex items-center">
        <ErrorMessage
          errors={methods?.errors}
          name={id}
          render={({ message }) => (
            <p className="text-red-500 text-start p-1">{message}</p>
          )}
        />
      </div>
    </div>
  );
};

export default Select;
