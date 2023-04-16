import { GetStaticProps } from "next";
import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import Header from "../components/Header";

type Props = {
  users: User[];
};

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return { props: { users } };
};

const Home = ({ users }: Props) => {
  return (
    <main className="">
      <Header />
      <h1 className="text-red-500"> Users</h1>
      {users.map(({ id, name, email }: User) => (
        <section key={id}>
          <p>{name}</p>
          <p>{email}</p>
        </section>
      ))}
    </main>
  );
};

export default Home;
