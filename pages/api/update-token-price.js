// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const dates = [
    6,
    1,
    3,
    5
  ]

  for(let i = 0; i < dates.length; i++) {
    const datePeriod = dates[i]

    const date = new Date()

    if(datePeriod === 6) {
      date.setMonth(date.getMonth() - datePeriod);
    } else {
      date.setFullYear(date.getFullYear() - datePeriod);
    }

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = date
      .toLocaleDateString("en-GB", options)
      .replace(/\//g, "-");

    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/history?date=${formattedDate}`
    );
    let priceResponse = await data.json();
    const price = priceResponse.market_data?.current_price.usd;

    await prisma.price.upsert({
      where: {
        id: `ETH-${datePeriod}`
      },
      create: {
        id: `ETH-${datePeriod}`,
        price: Math.floor(price).toString()
      },
      update: {
        price: Math.floor(price).toString()
      }
    })
  }
  
  const data = await fetch(
    `https://api.coingecko.com/api/v3/coins/ethereum`
  );
  let priceResponse = await data.json();
  const price = priceResponse.market_data?.current_price.usd;

  await prisma.price.upsert({
    where: {
      id: `ETH`
    },
    create: {
      id: `ETH`,
      price: Math.floor(price).toString()
    },
    update: {
      price: Math.floor(price).toString()
    }
  })

  res.status(200).send("executed")
}