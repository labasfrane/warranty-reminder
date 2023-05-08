import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import moment from "moment";
// PUT /api/product/update/:id
export default async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const postId = String(req.query.id);
  const { period, date, ...productData } = req.body;

  const endDate = moment(date).add(period, "years").toDate();

  if (req.method === "PUT") {
    const result = await prisma.product.update({
      where: { id: +postId },
      data: { ...productData, period: period, date: date, endDate: endDate },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
