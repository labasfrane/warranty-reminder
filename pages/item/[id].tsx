import React from "react";
import Layout from "../../components/Layout";
import { Product } from "@prisma/client";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HttpRequest from "../../http/requests.http";

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

const DetailProductView: React.FC<Product> = (props) => {
  const router = useRouter();
  let title = props.title;
  const { data: session } = useSession();
  const isUserLogedIn = Boolean(session);
  const httpRequest = new HttpRequest();

  async function deleteProduct(id: string): Promise<void> {
    await httpRequest.deleteProduct(+id);
    router.push("/");
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        {isUserLogedIn && (
          <button onClick={() => deleteProduct(props.id)}>Delete</button>
        )}
      </div>
    </Layout>
  );
};

export default DetailProductView;
