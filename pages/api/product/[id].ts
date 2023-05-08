import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import prisma from "../../../lib/prisma";

// DELETE /api/product/:id
export default async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const postId = String(req.query.id);

  if (req.method === "DELETE") {
    const product = await prisma.product.delete({
      where: { id: +postId },
    });
    res.json(product);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
