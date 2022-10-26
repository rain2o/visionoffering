<template>
  <div>
    <ProgressBar :giving-amount="givingAmount" :giving-goal="givingGoal" />
    <DisplayNumbers
      :giving-amount="givingAmount"
      :giving-goal="givingGoal"
      :givers="numberOfGivers"
    />
  </div>
</template>

<script>
import DisplayNumbers from '~/components/DisplayNumbers'
import ProgressBar from '~/components/ProgressBar'

export default {
  name: 'GivingData',
  components: {
    DisplayNumbers,
    ProgressBar,
  },
  data() {
    return {
      givingAmount: undefined,
      givingGoal: 200000,
      numberOfGivers: undefined,
    }
  },
  async fetch() {
    const { totalGiven, totalGivers } = await this.$axios.$get(
      '/.netlify/functions/giving-data'
    )
    this.givingAmount = Number(totalGiven / 100 || 0)
    this.numberOfGivers = Number(totalGivers || 0)
  },
  fetchOnServer: false,
}
</script>
