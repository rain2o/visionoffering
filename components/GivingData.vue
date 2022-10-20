<template>
  <div>
    <ProgressBar :giving-amount="givingAmount" :giving-goal="givingGoal"/>
    <DisplayNumbers :giving-amount="givingAmount" :giving-goal="givingGoal"/>
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
      givingAmount: 100000,
      givingGoal: 200000
    }
  }
}
</script>
