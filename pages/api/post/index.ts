// pages/api/post/index.ts

import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const { title } = req.body;

  const session = await getSession({ req });
  const result = await prisma.product.create({
    data: {
      title: title,
    },
  });
  res.json(result);
}
