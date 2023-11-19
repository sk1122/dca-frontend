// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const orders = await prisma.order.findMany()

  let pendingOrders = []

  for(let i = 0; i < orders.length; i++) {
    const order = orders[i]

    if(order.remainingAmount > 0) {
      pendingOrders.push(order)
    }
  }

  for(let i = 0; i < pendingOrders.length; i++) {
    const tx = await execute(pendingOrders[i].orderId)

    await prisma.order.update({
      where: {
        id: pendingOrders[i].id
      },
      data: {
        remainingAmount: pendingOrders[i].remainingAmount - pendingOrders[i].amountPerPeriod,
        txHash: tx.hash
      }
    })
  }

  res.status(200).send("executed")
}