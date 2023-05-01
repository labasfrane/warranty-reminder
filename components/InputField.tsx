import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useContext } from "react";
import { FormContext } from "../context/form.context";

type Props = {
  id: string;
  title: string;
  inputName: string;
  type: string;
  placeholder?: string;
  errorMsg?: string;
  isRequired?: boolean;
  maxLength?: number;
  maxValue?: number;
  minValue?: number;
};

const InputField = ({
  title,
  inputName,
  id,
  type,
  placeholder,
  isRequired,
  errorMsg = "This field is required",
  maxLength = 25,
  maxValue = 100000000,
  minValue = 0,
}: Props) => {
  const { disabled, ...methods } = useContext(FormContext);

  const createInput = () => {
    const defaultInput = (
      <input
        {...methods?.register(`${inputName}`, {
          // min: { value: minValue, message: "Value must be positive number" },
          // max: {
          //   value: maxValue,
          //   message: `Maximum value is ${maxValue.toLocaleString("en-US")}$`,
          // },
          required: { value: !!isRequired, message: `${errorMsg}` },
          maxLength: {
            value: maxLength,
            message: `${title} field maximum length is ${maxLength} characters`,
          },
        })}
        placeholder={placeholder}
        type={type}
        autoFocus
        id={id}
        min={0}
        className="w-full border-none outline-none disabled:bg-red-400"
      />
    );

    if (disabled) {
      const value = methods?.getValues(inputName);

      return value || "N/A";
    }

    return defaultInput;
  };

  return (
    <div className="mb-1 w-full ">
      <label htmlFor={id} className="block mb-2">
        {isRequired ? `${title} *` : title}
      </label>{" "}
      <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 placeholder:text-gray-400 h-10 ">
        {createInput()}
      </div>
      <div className="min-h-7 h-7 flex items-center">
        <ErrorMessage
          errors={methods?.errors}
          name={inputName}
          render={({ message }) => (
            <p className="text-red-500 text-start p-1">{message}</p>
          )}
        />
      </div>
    </div>
  );
};

export default InputField;
