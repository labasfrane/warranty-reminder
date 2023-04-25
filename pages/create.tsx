import { useRouter } from "next/router";
import HttpRequest from "../http/requests.http";
import InputField from "../components/InputField";
import { SubmitHandler } from "react-hook-form";
import Form from "../components/Form";
import Select from "../components/Select";

type FormValues = {
  product: string;
  value: string;
  store: string;
  date: string;
  id?: string;
};

type Props = {};

const Create = ({}: Props) => {
  const router = useRouter();
  const httpRequest = new HttpRequest();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log(data);
      const { product, value, store, date } = data;
      const body = { product, value, store, date };
      await httpRequest.postProduct(body);
      await router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-10 py-5 ">
      <h1 className="text-xl uppercase">Create</h1>
      <p className="">
        Please fill out the required(*) fields and click add to create new
      </p>
      <div className="w-full max-w-md">
        <Form onSubmit={onSubmit}>
          <InputField
            title="Product"
            id="product"
            inputName="product"
            type="text"
            placeholder="ex. Printer"
            isRequired={true}
          />
          <InputField
            title="Value"
            id="value"
            inputName="value"
            type="text"
            placeholder="ex. 100$"
          />
          <InputField
            title="Store"
            id="store"
            inputName="Store"
            type="text"
            placeholder="ex. Amazon"
          />
          <InputField
            title="Date of purchase"
            id="date"
            inputName="date"
            type="date"
            isRequired={true}
            errorMsg="Please select a day of purchase"
          />
          <Select
            title="Duration"
            id="duration"
            inputName="duration"
            isRequired={true}
            errorMsg="Please select duration period of product"
          />
        </Form>
      </div>
    </div>
  );
};

export default Create;
