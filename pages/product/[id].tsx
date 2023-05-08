import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HttpRequest from "../../http/requests.http";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { FormContext } from "../../context/form.context";
import Select from "../../components/Select";

import { Product } from "@prisma/client";

export const getServerSideProps: any = async ({ params }: any) => {
  const post = await prisma.product.findUnique({
    where: {
      id: +params?.id,
    },
    select: {
      id: true,
      product: true,
      value: true,
      store: true,
      date: true,
      period: true,
      endDate: true,
    },
  });
  return {
    props: {
      id: post?.id,
      product: post?.product,
      date: JSON.parse(JSON.stringify(post?.date)),
      period: post?.period,
      value: post?.value,
      store: post?.store,
    },
  };
};

const DetailProductView = (props: Product) => {
  const { product, date, id } = props;
  const router = useRouter();
  console.log(props);
  const { data: session } = useSession();
  const isUserLogedIn = Boolean(session);
  const httpRequest = new HttpRequest();

  async function deleteProduct(id: string) {
    await httpRequest.deleteProduct(id);
    router.push("/");
  }

  // Submit
  const onSubmit: any = async (data: Product) => {
    console.log(data);
    if (id) {
      await httpRequest.replaceProduct({ ...data });
      await router.push("/");
    }
  };

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
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default DetailProductView;
