import prisma from "../../lib/prisma";
import { InferGetStaticPropsType } from "next";

type User = {
  id: number;
  name: string;
  email: string;
};

export const getStaticProps = async () => {
  const data: User[] = await prisma.user.findMany();
  return { props: { data } };
};

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>Users</h1>
      {data.map(({ id, name, email }: User) => (
        <section key={id}>
          <p>{name}</p>
          <p>{email}</p>
        </section>
      ))}
    </main>
  );
}
