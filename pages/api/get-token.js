// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const tokens = await prisma.price.findMany({
    where: {
        id: {
            startsWith: "ETH"
        }
    }
  })
  
    res.status(200).send(tokens)
}