import { useContext } from "react";
import { MouseEventHandler } from "react";
import { FormContext } from "../context/form.context";

type Props = {
  children: any;
  type: "submit" | "reset" | "button" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
  toggleContext?: boolean;
};

const Button = ({
  children,
  isActive,
  type,
  onClick,
  toggleContext,
}: Props) => {
  const { disabled, setDisabled } = useContext(FormContext);

  const handleButtonClick = () => {
    setDisabled(!disabled);
  };
  return (
    <button
      className="w-1/3 px-3 py-1 shadow rounded disabled:opacity-40 text-gray-700 leading-tight"
      type={type}
      onClick={toggleContext ? handleButtonClick : onClick}
      disabled={isActive}
      hidden={disabled && !toggleContext}
    >
      {children}
    </button>
  );
};

export default Button;
