import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { pathname } = useRouter();

  const hideOnView = pathname !== "/item/[id]";

  let left = <Link href="/">Warranty Reminder</Link>;
  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/">Warranty Reminder</Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">Login</Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="flex space-x-5">
        <Link href="/">Warranty Reminder</Link>
        <Link href="/create">
          {hideOnView && <button>Add new item</button>}
        </Link>
      </div>
    );
    right = (
      <div className="flex space-x-5">
        <p className="">
          {session && session.user ? session.user.name : "sign in"} (
          {session && session.user ? session.user.email : ""})
        </p>

        <button onClick={() => signOut()}>Log out</button>
      </div>
    );
  }

  return (
    <nav className="flex justify-between items-center px-10 py-7 bg-slate-400 shadow">
      {left}
      {right}
    </nav>
  );
};

export default Header;
