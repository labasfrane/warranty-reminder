import { GetStaticProps } from "next";
import { User, Product } from "@prisma/client";
import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

type Props = {
  users: User[];
  products: Product[];
};

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  const products = await prisma.product.findMany({
    select: {
      id: true,
      product: true,
      value: true,
      store: true,
      date: true,
      period: true,
    },
  });

  return { props: { users, products } };
};

const Home = ({ users, products }: Props) => {
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
      {/* {products.map(({ id, title }) => (
        <section key={id}>
          <p>{title}</p>
        </section>
      ))}
      {users.map(({ id, name, email }: User) => (
        <section key={id}>
          <p>{name}</p>
          <p>{email}</p>
        </section>
      ))} */}
    </Layout>
  );
};

export default Home;
