import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type Props = {
  children: any;
  onSubmit: SubmitHandler<any>;
};

const Form = ({ children, onSubmit }: Props) => {
  const methods = useForm();
  // const watch = methods.watch();
  // console.log("watch:", watch);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {children}
        <input
          className="disabled:opacity-30 cursor-pointer"
          // disabled={!watch.title}
          type="submit"
        />
      </form>
    </FormProvider>
  );
};

export default Form;
