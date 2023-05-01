import { createContext, useState } from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: any;
  methods: any;
  isDisabled?: boolean;
};

const FormContext = createContext({
  disabled: false,
  setDisabled: (isDisabled: boolean) => {},
} as any);

const FormCtxProvider = ({ children, methods, isDisabled }: Props) => {
  const [disabled, setDisabled] = useState(isDisabled);

  return (
    <FormContext.Provider value={{ disabled, setDisabled, ...methods }}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormContext.Provider>
  );
};

export { FormContext, FormCtxProvider };
