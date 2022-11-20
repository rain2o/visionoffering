#!/usr/bin/env node
/* eslint-disable no-console */

const Redis = require("ioredis");
require('dotenv').config();

const redisPass = process.env.REDIS_PASSWORD;
const redisHost = process.env.REDIS_HOST;
const client = new Redis(`rediss://default:${redisPass}@${redisHost}`);

const args = process.argv.slice(2);

async function updateFund(valueToAdd) {
  const result = await client.get('vision_fund')
  if (result) {
    const data = JSON.parse(result);
    console.log();
    console.log("Current value is ", data);
    data.totalGiven = Number(data.totalGiven) + (valueToAdd * 100);
    console.log();
    console.log("\nUpdating to ", data);
    console.log();

    try {
      await client.set("vision_fund", JSON.stringify(data));
      console.log();
      console.log("Updating successfully!");
      console.log();
    } catch (err) {
      console.log();
      console.error("\n" + err);
      console.log();
    }
  }

  process.exit()
}

if (args?.length > 0 && !isNaN(args[0])) {
  updateFund(Number(args[0]));
} else {
  console.log();
  console.error("Please provide a number as the first argument.");
  console.log();
  process.exit()
}
