import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Product } from "@prisma/client";
import prisma from "../../../lib/prisma";

export default async function createHandler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const { product, value, store, date, period }: Product = req.body;
  //Check session!!!
  const session = await getSession({ req });

  const endDate = moment(date).add(period, "years").toDate();

  const result = await prisma.product.create({
    data: {
      product: product,
      value: value,
      store: store,
      date: date,
      period: period,
      endDate: endDate,
    },
  });
  res.json(result);
}
