import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useContext } from "react";
import { FormContext } from "../context/form.context";
import moment from "moment";

type Props = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  errorMsg?: string;
  isRequired?: boolean;
  maxLength?: number;
  maxValue?: number;
  minValue?: number;
  valueAsNumber?: boolean;
  valueAsDate?: boolean;
};

const InputField = ({
  label,
  id,
  type,
  placeholder,
  isRequired,
  errorMsg = "This field is required",
  maxLength = 25,
  maxValue = 100000000,
  minValue = 0,
  valueAsNumber = false,
  valueAsDate = false,
}: Props) => {
  const { disabled, ...methods } = useContext(FormContext);

  const createInput = () => {
    const value = methods.getValues(id);

    if (valueAsDate && value) {
      return (
        <input
          disabled={disabled}
          type="date"
          value={moment(value).format("YYYY-MM-DD")}
          onChange={(event) => methods.setValue(id, event.target.value)}
          onBlur={(event) =>
            methods.setValue(
              id,
              moment(event.target.value).toDate().toISOString()
            )
          }
          className="w-full border-none outline-none disabled:bg-inherit"
        />
      );
    }

    const defaultInput = (
      <input
        {...methods?.register(`${id}`, {
          // min: { value: minValue, message: "Value must be positive number" },
          // max: {
          //   value: maxValue,
          //   message: `Maximum value is ${maxValue.toLocaleString("en-US")}$`,
          // },
          required: { value: !!isRequired, message: `${errorMsg}` },
          maxLength: {
            value: maxLength,
            message: `${label} field maximum length is ${maxLength} characters`,
          },
          valueAsNumber: valueAsNumber,
          valueAsDate: valueAsDate,
        })}
        placeholder={placeholder}
        type={type}
        autoFocus
        id={id}
        min={0}
        className="w-full border-none outline-none"
      />
    );

    if (disabled) {
      return value || "N/A";
    }

    return defaultInput;
  };

  return (
    <div className="mb-1 w-full">
      <label htmlFor={id} className="block mb-2">
        {isRequired && !disabled ? `${label} *` : label}
      </label>{" "}
      <div
        className={
          disabled
            ? "h-10 py-2 px-3"
            : "appearance-none shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 placeholder:text-gray-400 h-10"
        }
      >
        {createInput()}
      </div>
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

export default InputField;
