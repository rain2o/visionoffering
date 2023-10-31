#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * This script is used to update redis in a number of ways.
 * Call the script using `node scripts/update_fund.js` followed
 * by the necessary parameters. Try passing `-h` to see the help
 * info.
 *
 * To reset the values, use `node scripts/update_fund.js -r YYYY-MM-DD,
 * where the last should be a valid start date. This date is later used in
 * the Stripe API calls to only include purchases after given date.
 *
 * To update the value, you can add the given amount, the number of givers,
 * or both. See help docs for details on these params.
 */

const Redis = require('ioredis')
const commander = require('commander')

require('dotenv').config()

const FUND_KEY = 'vision_fund'

const redisPass = process.env.REDIS_PASSWORD
const redisHost = process.env.REDIS_HOST
const client = new Redis(`rediss://default:${redisPass}@${redisHost}`)

commander
  .version('1.0.0', '-v, --version')
  .description('Reset or update the stored vision fund data in redis.')
  .usage('[-a 123], [-g 2], [--reset]')
  .option(
    '-r, --reset <date>',
    'Reset all values for a new year. A date must be given for the start date of the new range.' +
      ' Date format shoud be YYYY-MM-DD.'
  )
  .option(
    '-a, --amount <value>',
    'Amount to add to existing amount given (e.g. 12.23)',
    0
  )
  .option(
    '-g, --givers <value>',
    'Number of givers to add to current value.',
    0
  )
  .parse(process.argv)

const options = commander.opts()

/**
 * Handles the process of setting the given value to the fund
 * in redis.
 * @param {Object} data JSON data to set in redis
 */
async function handleSet(data) {
  try {
    await client.set(FUND_KEY, JSON.stringify(data))
    console.log()
    console.log('Redis updated successfully!')
    console.log()
  } catch (err) {
    console.log()
    console.error('\n' + err)
    console.log()
  }
}

/**
 * This script updates redis by adding the given value to the
 * existing value in redis. This does NOT reset the value, but
 * adds to it.
 *
 * @param {Number} valueToAdd Amount given to add
 * @param {Number} giversToAdd Number of givers to add
 */
async function updateFund(valueToAdd, giversToAdd) {
  const result = await client.get(FUND_KEY)
  if (result) {
    const data = JSON.parse(result)
    console.log()
    console.log('Current value is ', data)
    data.totalGiven = Number(data.totalGiven) + valueToAdd * 100
    data.totalGivers = Number(data.totalGivers) + giversToAdd
    console.log()
    console.log('\nUpdating to ', data)
    console.log()

    await handleSet(data)
  } else {
    console.log()
    console.error("Couldn't retrieve the current value. Maybe it's missing?")
    console.log()
  }
}

/**
 * Reset the fund to start over.
 * The date given will be used in the Stripe API calls to retrieve
 * values after this date (same as START_DATE in giving-data.js)
 * @param {Number} date last donation date in milliseconds
 */
async function resetFund(date) {
  console.log('Resetting all values for ' + new Date(date).toString())
  const data = {
    totalGiven: 0,
    totalGivers: 0,
    // date in seconds
    lastDonation: date / 1000,
  }
  await handleSet(data)
}

if (options.reset) {
  const start = Date.parse(options.reset)
  if (isNaN(start)) {
    console.error('Date given is in invalid format.')
  } else {
    resetFund(start).then(() => process.exit())
  }
} else if (options.amount || options.givers) {
  updateFund(Number(options.amount), Number(options.givers)).then(() =>
    process.exit()
  )
} else {
  console.log('Please provide at least one argument')
  commander.outputHelp()
  process.exit()
}
