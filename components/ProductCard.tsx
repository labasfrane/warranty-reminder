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
    router.push("/product/[id]", `/product/${product.id}`);
  };

  return (
    <article
      onClick={handleNavigate}
      className="flex flex-col bg-slate-50 rounded shadow items-center p-3 space-y-3 w-72 border cursor-pointer hover:scale-105 hover:bg-white hover:drop-shadow tranistion ease-in duration-200 text-center"
    >
      <section>
        <h3 className="text-lg font-semibold">{product.product}</h3>
        <p className="text-xs text-gray-500 uppercase">Product</p>
      </section>
      <section className="flex flex-row justify-around gap-x-12">
        <div>
          <h3 className="text-lg font-semibold">{product.period}</h3>
          <p className="text-xs text-gray-500 uppercase">duration</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{product.value || "N/A"}</h3>
          <p className="text-xs text-gray-500 uppercase">Price</p>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-x-5">
        <div>
          <h3 className="text-lg font-semibold">{product.date}</h3>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{date.toLocaleDateString()}</h3>
        </div>
        <p className="text-xs text-gray-500 uppercase col-span-2">
          Start - End
        </p>
      </section>
    </article>
  );
}

export default ProductCard;
