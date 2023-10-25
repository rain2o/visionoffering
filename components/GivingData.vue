<template>
  <div>
    <CompletedGoal/>

<!--    This is basically the worst thing ever but I am out of time. -->
    <div class="progress-bar">
      <v-app id="doesitmatterstill">
        <v-progress-linear
          v-if="givingSingleAmount !== undefined"
          v-model="percentConvert"
          color="saltydog"
          height="10"
        />
        <v-progress-linear v-else indeterminate color="saltydog" height="10" />
      </v-app>
    </div>

    <div class="text-left">
      <div class="py-2">
        <h2
          v-if="givingSingleAmount !== undefined"
          class="text-blue font-bold text-4xl"
        >
          {{
            Number(givingSingleAmount).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </h2>
        <v-progress-circular v-else indeterminate :size="40" class="text-blue" />

        <p>
          Goal 3:
          {{
            Number(givingSingleGoal).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </p>
      </div>
    </div>
<!--   End worst thing ever resume neat code. -->

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
      givingSingleAmount: undefined,
      givingGoal: 1694500,
      givingSingleGoal: 94500,
      numberOfGivers: undefined,
    }
  },
  async fetch() {
    const { totalGiven, totalGivers } = await this.$axios.$get(
      '/.netlify/functions/giving-data'
    )
    // This is where you update the number of supplement from checks and physical cash.
    this.givingAmount = Number(totalGiven / 100 || 0)
    this.numberOfGivers = Number(totalGivers || 0)
    this.givingSingleAmount = Number(totalGiven / 100 || 0)
  },
  fetchOnServer: false,
  computed: {
    percentConvert() {
      return (this.givingSingleAmount / this.givingSingleGoal) * 100
    },
  },
}
</script>
