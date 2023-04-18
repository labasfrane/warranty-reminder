import React from "react";
import { useRouter } from "next/router";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const date = new Date();

  const router = useRouter();
  const handleNavigate = () => {
    router.push("/item/[id]", `/item/${product.id}`);
  };

  return (
    <article
      onClick={handleNavigate}
      className="space-y-2 flex flex-col items-center w-52 border border-blue-400 rounded-md m-5 cursor-pointer"
    >
      <h3>{product.title}</h3>
      <p>Store name</p>
      <span>Price: 250$</span>
      <span>Date of purchase: {date.getFullYear()}</span>
      <span>Warranty duration:2 years</span>
    </article>
  );
}

export default ProductCard;
