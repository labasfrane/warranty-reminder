import { GetStaticProps } from "next";
import { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import HttpRequest from "../http/requests.http";

type Props = {
  products: Product[];
};

const Home = ({ products }: Props) => {
  const { data: session } = useSession();
  const isUserLogedIn = Boolean(session);

  const content = products.map((product: Product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <Layout>
      <div className="flex gap-5 items-center justify-center p-10">
        {isUserLogedIn
          ? content
          : "Welcome to Warranty Reminder, please Login to continue! "}
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const httpRequest = new HttpRequest();
  const products = await httpRequest.getProducts();

  return { props: { products } };
};
