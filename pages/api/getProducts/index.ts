import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import prisma from "../../../lib/prisma";

export default async function getProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  if (req.method === "GET") {
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

    res.json(products);
  }
}
