import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type Props = {
  children: any;
  onSubmit: SubmitHandler<any>;
};

const Form = ({ children, onSubmit }: Props) => {
  const methods = useForm({
    mode: "onChange",
  });
  const watchedFields = methods.watch(["product", "date", "duration"]);

  const hasInputValue = (arr: String[]): Boolean => {
    return arr.every((value) => value !== "" && value !== undefined);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {children}
        <input
          className="disabled:opacity-30 cursor-pointer mr-2"
          disabled={!hasInputValue(watchedFields)}
          type="submit"
        />
        <button
          type="button"
          onClick={() => {
            methods.reset();
          }}
        >
          Clear
        </button>
      </form>
    </FormProvider>
  );
};

export default Form;
