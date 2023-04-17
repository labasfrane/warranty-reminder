import { Router, useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

const Create = ({}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Create </h1>
      <form
        onSubmit={submitData}
        className="flex flex-col p-5 justify-center align-center"
        action=""
      >
        <label>
          Product
          <input
            className="p-10 bg-slate-200"
            autoFocus
            type="text"
            placeholder="Product"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {/* <label className="flex p-2">
          Description
          <textarea name="" id="" placeholder="Write a short summary..." />
        </label> */}
        <input
          className="disabled:opacity-10 cursor-pointer"
          disabled={!title}
          type="submit"
          value="Create"
        />
      </form>
    </div>
  );
};

export default Create;
