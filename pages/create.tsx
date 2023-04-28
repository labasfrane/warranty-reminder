import { useRouter } from "next/router";
import HttpRequest from "../http/requests.http";
import InputField from "../components/InputField";
import { SubmitHandler } from "react-hook-form";
import Form from "../components/Form";
import Select from "../components/Select";
import { Product } from "@prisma/client";
import Layout from "../components/Layout";

type FormValues = {
  product: string;
  value: number;
  store: string;
  date: string;
  id?: string;
  period: number;
};

type Props = {};

const Create = ({}: Props) => {
  const router = useRouter();
  const httpRequest = new HttpRequest();

  const onSubmit: SubmitHandler<FormValues> = async (data: Product) => {
    try {
      console.log(data);
      const { product, store, date } = data;
      const period = Number(data.period);
      const value = Number(data.value);
      const body = { product, value, store, date, period };
      await httpRequest.postProduct(body);
      await router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  // have to fix Number() with {valueAsNumber: true} in InputField component
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center space-y-10 py-5 ">
        <h1 className="text-xl uppercase">Create</h1>
        <p className="">
          Please fill out the required(*) fields and click add to create new
        </p>
        <div className="w-full max-w-md">
          <Form onSubmit={onSubmit}>
            <InputField
              title="Product name"
              id="product"
              inputName="product"
              type="text"
              placeholder="ex. Printer"
              isRequired
              maxLength={15}
            />
            <InputField
              title="Value"
              id="value"
              inputName="value"
              type="number"
              placeholder="ex. 100$"
            />
            <InputField
              title="Store"
              id="store"
              inputName="store"
              type="text"
              placeholder="ex. Amazon"
              maxLength={20}
            />
            <InputField
              title="Date of purchase"
              id="date"
              inputName="date"
              type="date"
              isRequired
              errorMsg="Please select a day of purchase"
            />
            <Select
              title="Warranty duration"
              id="period"
              inputName="period"
              isRequired
            />
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
