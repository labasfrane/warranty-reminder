import { useContext } from "react";
import { FormContext } from "../context/form.context";

type Props = {};

const Button = (props: Props) => {
  const { disabled, setDisabled } = useContext(FormContext);

  const handleButtonClick = () => {
    setDisabled(!disabled);
  };
  return <button onClick={handleButtonClick}>Toggle Disabled</button>;
};

export default Button;
