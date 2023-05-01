import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Product } from "@prisma/client";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HttpRequest from "../../http/requests.http";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

export const getServerSideProps: any = async ({ params }: any) => {
  const post = await prisma.product.findUnique({
    where: {
      id: String(params?.id),
    },
  });
  return {
    props: post,
  };
};

const DetailProductView = (props: Product) => {
  const { product, date } = props;
  const router = useRouter();

  const { data: session } = useSession();
  const isUserLogedIn = Boolean(session);
  const httpRequest = new HttpRequest();

  async function deleteProduct(id: string) {
    await httpRequest.deleteProduct(id);
    router.push("/");
  }

  // Submit
  const onSubmit: any = async (data: Product) => {
    // console.log(data);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <Form onSubmit={onSubmit} isDisabled preFill={props}>
            <div className="flex justify-around">
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
                title="Store"
                id="store"
                inputName="store"
                type="text"
                placeholder="ex. Amazon"
                maxLength={20}
              />
            </div>
            <InputField
              title="Value"
              id="value"
              inputName="value"
              type="number"
              placeholder="ex. 100$"
            />

            <InputField
              title="Date of purchase"
              id="date"
              inputName="date"
              type="date"
              isRequired
              errorMsg="Please select a day of purchase"
            />

            <Button />

            {isUserLogedIn && (
              <button onClick={() => deleteProduct(String(props.id))}>
                Delete
              </button>
            )}
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default DetailProductView;
