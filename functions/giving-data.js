import Stripe from "stripe";
import Redis from "ioredis"

const HOST = process.env.BASE_URL || "localhost:8888"

// setup Redis client
const REDIS_KEY = "vision_fund";
const redisPass = process.env.REDIS_PASSWORD;
const redisHost = process.env.REDIS_HOST;
const redisClient = new Redis(`rediss://:${redisPass}@${redisHost}`);

// Setup stripe client
const key = process.env.STRIPE_SECRET_KEY || ""
const stripe = Stripe(key, { apiVersion: "2020-08-27" });

// Date range (exclusive), change as needed (Stripe uses seconds for this value)
const START_DATE = new Date("2022-10-24").valueOf() / 1000
const END_DATE = new Date("2022-11-21").valueOf() / 1000

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
export async function handler() {
  try {
    const visionFund = await getVisionFund();
    // used for comparison later
    const originalVisionFund = JSON.stringify(visionFund);
    const visionPaymentIntents = await getVisionFundPaymentIntents(visionFund.lastDonation);

    const givers = [];
    visionPaymentIntents.forEach((paymentIntent, idx) => {
      const context = JSON.parse(paymentIntent.metadata.planning_center_context);
      const visionFundContext = context.find(({ name }) => name === "Vision Fund");
      if (visionFundContext?.cents) {
        visionFund.totalGiven += visionFundContext.cents;
        if (!givers.includes(paymentIntent.customer)) {
          givers.push(paymentIntent.customer)
        }
      }
      // save the created of last payment intent to be used as offset next time
      if (idx === visionPaymentIntents.length - 1) {
        visionFund.lastDonation = paymentIntent.created;
      }
    })
    visionFund.totalGivers += givers.length;

    // Only update the DB if values actually changed.
    if (JSON.stringify(visionFund) !== originalVisionFund) {
      await saveVisionFund(visionFund);
    }

    return {
      statusCode: 200,
      // To enable CORS
      headers: {
        'Access-Control-Allow-Origin': HOST,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify(visionFund),
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error) // So we can monitor any errors in Netlify logs
    return { statusCode: 500, body: error.toString() }
  }
}

/**
 * Retrieve the vision fund data we have stored already.
 * Returns default values of 0 if nothing found.
 * @returns {object} { totalGiven: number, totalGivers: number, lastDonation: number }
 */
const getVisionFund = async () => {
  const visionFundString = await redisClient.get(REDIS_KEY)
  if (visionFundString) {
    return JSON.parse(visionFundString)
  }
  return {
    totalGiven: 0,
    totalGivers: 0,
    lastDonation: START_DATE
  }
}

/**
 * Save the vision fund aggregated data into Redis
 * @param {object} visionFund { totalGiven: number, totalGivers: number, lastDonation: number }
 */
const saveVisionFund = async (visionFund) => {
  await redisClient.set(REDIS_KEY, JSON.stringify(visionFund));
}

/**
 * Retrieve all payment intents within the date range that are for
 * the Vision Fund
 * @param {number} startDate Donations after the given date in seconds
 * @returns {array} Stripe Payment Intents with Vision Fund in metadata
 */
const getVisionFundPaymentIntents = async (startDate) => {
  const response = await stripe.paymentIntents.search({
    query: `status:'succeeded' AND metadata['planning_center_app']:'Giving' AND created>${startDate} AND created<${END_DATE}`,
    // Any more than this and we run into timeout issues. Netlify limits functions to 10 second timeout.
    limit: 80,
  });
  return response.data.filter(({ metadata }) => metadata.planning_center_context.includes('"name":"Vision Fund"'));
}
