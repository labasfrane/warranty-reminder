import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HttpRequest from "../../http/requests.http";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Select from "../../components/Select";

import { Product } from "@prisma/client";

export const getServerSideProps: any = async ({ params }: any) => {
  const httpRequest = new HttpRequest();
  const product = await httpRequest.getProduct(params?.id);

  return {
    props: {
      id: product?.id,
      product: product?.product,
      date: JSON.parse(JSON.stringify(product?.date)),
      period: product?.period,
      value: product?.value,
      store: product?.store,
    },
  };
};

const DetailProductView = (props: Product) => {
  const { product, date, id } = props;
  const router = useRouter();
  const { data: session } = useSession();
  const isUserLogedIn = Boolean(session);
  const httpRequest = new HttpRequest();

  // Submit edited product
  const onSubmit: any = async (data: Product) => {
    console.log("Edited Product:", data);
    if (id) {
      await httpRequest.editProduct({ ...data });
      await router.push("/");
    }
  };

  // Delete product
  async function deleteProduct(id: string) {
    await httpRequest.deleteProduct(id);
    router.push("/");
  }

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <Form onSubmit={onSubmit} preFill={props} isDisabled>
            <InputField
              label="Product name"
              id="product"
              type="text"
              placeholder="ex. Printer"
              isRequired
              maxLength={15}
            />
            <InputField
              label="Store"
              id="store"
              type="text"
              placeholder="ex. Amazon"
              maxLength={20}
            />

            <InputField
              label="Value"
              id="value"
              type="number"
              placeholder="ex. 100$"
              valueAsNumber={true}
            />

            <InputField
              label="Date of purchase"
              id="date"
              type="date"
              isRequired
              errorMsg="Please select a day of purchase"
              valueAsDate
            />
            <Select label="Warranty duration" id="period" />
            <div className="flex justify-evenly bg-white p-1">
              <Button
                onClick={() => deleteProduct(String(props.id))}
                type="button"
              >
                Delete
              </Button>
              <Button type="button" toggleContext>
                Edit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default DetailProductView;
