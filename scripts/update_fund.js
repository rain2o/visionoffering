#!/usr/bin/env node
/* eslint-disable no-console */

const Redis = require("ioredis");
require('dotenv').config();

const redisPass = process.env.REDIS_PASSWORD;
const redisHost = process.env.REDIS_HOST;
const client = new Redis(`rediss://default:${redisPass}@${redisHost}`);

const args = process.argv.slice(2);

/**
 * This script updates redis by adding the given value to the
 * existing value in redis. This does NOT reset the value, but
 * adds to it.
 *
 * To use it, run `node scripts/update_fund.js 123.45`
 * where "123.45" is a numeric value that you wish to add
 * to the existing total. If you don't have change to add,
 * you can use a full number like "123".
 * @param {Number} valueToAdd
 */
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
