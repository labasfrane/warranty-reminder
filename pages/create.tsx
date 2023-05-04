import { useRouter } from "next/router";
import HttpRequest from "../http/requests.http";
import InputField from "../components/InputField";
import { SubmitHandler } from "react-hook-form";
import Form from "../components/Form";
import Select from "../components/Select";
import { Product } from "@prisma/client";
import Layout from "../components/Layout";

type Props = {};

const Create = ({}: Props) => {
  const httpRequest = new HttpRequest();
  const router = useRouter();

  const onSubmit: SubmitHandler<Product> = async (data: Product) => {
    try {
      console.log(data);
      const date = new Date(data.date);
      const { product, value, store, endDate, period } = data;
      const body = { product, value, store, date, period, endDate };
      await httpRequest.postProduct(body);
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center space-y-10 py-5 ">
        <h1 className="text-xl uppercase">Create</h1>
        <p className="">
          Please fill out the required(*) fields and click add to create new
        </p>
        <div className="w-full max-w-lg">
          <Form onSubmit={onSubmit}>
            <InputField
              label="Product name"
              id="product"
              type="text"
              placeholder="ex. Printer"
              isRequired
              maxLength={15}
            />
            <InputField
              label="Value"
              id="value"
              type="number"
              placeholder="ex. 100$"
              valueAsNumber={true}
            />
            <InputField
              label="Store"
              id="store"
              type="text"
              placeholder="ex. Amazon"
              maxLength={20}
            />
            <InputField
              label="Date of purchase"
              id="date"
              type="date"
              isRequired
              errorMsg="Please select a day of purchase"
            />
            <InputField
              label="Duration Period"
              id="period"
              type="number"
              placeholder="Enter Number between 1-10"
              isRequired
              valueAsNumber={true}
            />
            {/* <Select
              title="Warranty duration"
              id="period"
              inputName="period"
              isRequired
            /> */}
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
