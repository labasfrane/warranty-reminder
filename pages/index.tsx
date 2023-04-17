import { GetStaticProps } from "next";
import { User, Product } from "@prisma/client";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";

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
      title: true,
    },
  });

  return { props: { users, products } };
};

const Home = ({ users, products }: Props) => {
  return (
    <Layout>
      <h1 className="text-red-500"> Users</h1>
      {products.map(({ id, title }) => (
        <section key={id}>
          <p>{title}</p>
        </section>
      ))}
      {users.map(({ id, name, email }: User) => (
        <section key={id}>
          <p>{name}</p>
          <p>{email}</p>
        </section>
      ))}
    </Layout>
  );
};

export default Home;
