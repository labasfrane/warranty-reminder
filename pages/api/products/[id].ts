import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import prisma from "../../../lib/prisma";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const { ...productData }: Product = req.body;

  const endDate = moment(productData?.date)
    .add(productData?.period, "years")
    .toDate();
  const productId = String(req.query.id);

  if (req.method === "GET") {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
      select: {
        id: true,
        product: true,
        value: true,
        store: true,
        date: true,
        period: true,
        endDate: true,
      },
    });
    res.json(product as Product);
  }

  if (req.method === "PUT") {
    const result = await prisma.product.update({
      where: { id: Number(productId) },
      data: { ...productData, endDate: endDate },
    });
    res.json(result);
  }

  if (req.method === "DELETE") {
    const product = await prisma.product.delete({
      where: { id: Number(productId) },
    });
    res.json(product);
  }
}
