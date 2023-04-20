import { useRouter } from "next/router";
import React, { useId, useState } from "react";
import HttpRequest from "../http/requests.http";

type Props = {};

const Create = ({}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const id = useId();

  const router = useRouter();

  const httpRequest = new HttpRequest();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, description, id };
      await httpRequest.postProduct(body);
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-10 py-5 ">
      <h1 className="text-xl uppercase">Create</h1>
      <p className="">
        Please fill out the required(*) fields and click add to create new
      </p>
      <div className="w-full max-w-md">
        <form
          onSubmit={submitData}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-5">
            <label htmlFor="productField" className="block mb-2">
              Product
            </label>
            <input
              id="productField"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1"
              autoFocus
              type="text"
              placeholder="Product"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <input
            className="disabled:opacity-30 cursor-pointer"
            disabled={!title}
            type="submit"
            value="Add item"
          />
        </form>
      </div>
    </div>
  );
};

export default Create;
