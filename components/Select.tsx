import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

type Props = {
  id: string;
  title: string;
  inputName: string;
  errorMsg?: string;
  isRequired?: boolean;
};

const Select = ({
  title,
  inputName,
  id,
  isRequired = false,
  errorMsg = "This field is required",
}: Props) => {
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
        <option className="text-red-300" value={""}>
          Choose one option
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
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
