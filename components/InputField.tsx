import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  id: string;
  title: string;
  inputName: string;
  type: string;
  placeholder?: string;
  errorMsg?: string;
  isRequired?: boolean;
};

const InputField = ({
  title,
  inputName,
  id,
  type,
  placeholder,
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
      <input
        autoFocus
        {...register(`${inputName}`, {
          required: { value: isRequired, message: `${errorMsg}` },
        })}
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1"
        type={type}
        placeholder={placeholder}
      />{" "}
      <ErrorMessage
        errors={errors}
        name={inputName}
        render={({ message }) => (
          <p className="text-red-500 text-start p-1">{message}</p>
        )}
      />
    </div>
  );
};

export default InputField;
