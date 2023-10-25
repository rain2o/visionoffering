<template>
  <div>
    <CompletedGoal />

    <!--    This is basically the worst thing ever but I am out of time. -->
    <div class="progress-bar">
      <v-app id="doesitmatterstill">
        <v-progress-linear
          v-if="currentGoalAmountGiven !== undefined"
          v-model="currentGoalPercent"
          color="saltydog"
          height="10"
        />
        <v-progress-linear v-else indeterminate color="saltydog" height="10" />
      </v-app>
    </div>

    <div class="text-left">
      <div class="py-2">
        <h2
          v-if="currentGoalAmountGiven !== undefined"
          class="text-blue font-bold text-4xl"
        >
          {{
            currentGoalAmountGiven.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </h2>
        <v-progress-circular
          v-else
          indeterminate
          :size="40"
          class="text-blue"
        />

        <p v-if="currentGoalIndex !== undefined">
          <template v-if="currentGoalIndex < 0">
            All goals surpassed!
          </template>
          <template v-else>
            Goal {{ currentGoalIndex + 1 }}:
            {{
              Number(givingGoals[currentGoalIndex]).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })
            }}
          </template>
        </p>
      </div>
    </div>
    <!--   End worst thing ever resume neat code. -->

    <ProgressBar :giving-amount="givingAmount" :giving-goal="givingGoalTotal" />
    <DisplayNumbers
      :giving-amount="givingAmount"
      :giving-goal="givingGoalTotal"
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
      givingGoalTotal: 1694500,
      givingGoals: [94500, 600000, 1000000],
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
  },
  fetchOnServer: false,
  computed: {
    /** Which index of goals are we currently at */
    currentGoalIndex() {
      // still loading the data
      if (this.givingAmount === undefined) {
        return undefined
      }
      return this.givingGoals.findIndex((_, index) => {
        // we have to sum each goal to find the index
        // because milestones are weird with this site
        const milestone = this.calculateMilestone(index + 1)
        return milestone > this.givingAmount;
      })
    },
    /** How much is given within the current goal only */
    currentGoalAmountGiven() {
      // still loading the data
      if (this.givingAmount === undefined) {
        return undefined
      }
      // calculate which index we're at for the goals
      const milestoneIndex =
        // if no goal is found currentGoalIndex will be -1, which should mean all goals are passed
        this.currentGoalIndex < 0
          ? // undefine will tell slice to go to the end of the array
            undefined
          : // slice up to the current goal, exclusive
            this.currentGoalIndex
      // calculate sum of all previous goals
      const milestoneBase = this.calculateMilestone(milestoneIndex)
      // current goal given is total minus previous milestones
      return this.givingAmount - milestoneBase
    },
    /** Percentage of current goal's given amount */
    currentGoalPercent() {
      // All goals met, yay!!!
      if (this.currentGoalIndex < 0) {
        return 100
      }
      return (
        (this.currentGoalAmountGiven /
          this.givingGoals[this.currentGoalIndex]) *
        100
      )
    },
  },
  methods: {
    /** Calculates the milestone total, which is the sum of goals */
    calculateMilestone(index) {
      return (
        this.givingGoals
          // makes a copy of the goals only including the goals up to the passed index
          .slice(0, index)
          // now add each of the previous goals for the total
          .reduce((sum, goal) => (sum += goal), 0)
      )
    },
  },
}
</script>
