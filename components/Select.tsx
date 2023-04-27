import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

type Props = {
  id: string;
  title: string;
  inputName: string;
  errorMsg?: string;
  isRequired?: boolean;
};

type Options = {
  label: string;
  value: string | number;
};

const Select = ({
  title,
  inputName,
  id,
  isRequired = false,
  errorMsg = "This field is required",
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

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2">
        {isRequired ? `${title} *` : title}
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 placeholder:text-gray-400"
        autoFocus
        {...register(`${inputName}`, {
          required: { value: isRequired, message: `${errorMsg}` },
        })}
        id={id}
      >
        {optionsArr.map((option) => (
          <option value={option.value}>{option.value}</option>
        ))}
        {/* <option value={""}>Choose one option</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option> */}
      </select>

      <div className="min-h-7 h-7 flex items-center">
        <ErrorMessage
          errors={errors}
          name={inputName}
          render={({ message }) => (
            <p className="text-red-500 text-start p-1">{message}</p>
          )}
        />
      </div>
    </div>
  );
};

export default Select;
