<template>
  <div>
    <ProgressBar :giving-amount="potato.givingAmount" :giving-goal="potato.givingGoal"  />
    <DisplayNumbers :giving-amount="potato.givingAmount" :giving-goal="potato.givingGoal" />
  </div>
</template>

<script>
import DisplayNumbers from "~/components/DisplayNumbers";
import ProgressBar from "~/components/ProgressBar";

export default {
  name: 'GivingData',
  components: {
    DisplayNumbers,
    ProgressBar
  },
  data() {
    return {
      potato: {
        givingAmount: 100000,
        givingGoal: 200000
      }
    }
  }
}
</script>
