// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if(req.method === "POST") {
    const body = req.body

    const data = await prisma.order.create({
        data: body
    })

    res.status(200).send({
        data,
        status: 200,
        timestamp: Math.floor(new Date().getTime() / 1000)
    })
  }
}
