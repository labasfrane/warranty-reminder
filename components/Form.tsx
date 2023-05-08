import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormCtxProvider } from "../context/form.context";
import Button from "./Button";

type Props = {
  children: any;
  onSubmit: SubmitHandler<any>;
  isDisabled?: boolean;
  preFill?: any;
};

const Form = ({ children, onSubmit, isDisabled, preFill }: Props) => {
  const methods = useForm({
    mode: "onChange",
  });

  const watchedFields = methods.watch(["product", "date", "period"]);
  const hasInputValue = (arr: String[]): Boolean => {
    return arr.every((value) => value !== "" && value !== undefined);
  };

  useEffect(() => methods.reset(preFill), [preFill, methods]);

  return (
    <FormCtxProvider methods={methods} isDisabled={isDisabled}>
      <form
        onSubmit={methods?.handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
      >
        {children}
        <div className="flex justify-evenly p-1">
          <Button
            type="submit"
            isActive={!isDisabled && !hasInputValue(watchedFields)}
          >
            Submit
          </Button>

          <Button
            type="button"
            onClick={() => {
              methods?.reset();
            }}
          >
            Reset
          </Button>
          {isDisabled && (
            <Button type="button" toggleContext>
              Edit mode
            </Button>
          )}
        </div>
      </form>
    </FormCtxProvider>
  );
};

export default Form;
