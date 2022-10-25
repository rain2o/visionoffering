<template>
  <div class="progress-bar">
    <v-app id="doesitmatter">
      <v-progress-linear
        v-if="givingAmount !== undefined"
        v-model="percentConvert"
        color="saltydog"
        height="10"
      />
      <v-progress-linear v-else indeterminate color="saltydog" height="10" />
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    givingAmount: {
      type: Number,
      required: false,
      default: undefined,
    },
    givingGoal: {
      type: Number,
      required: true,
    },
  },
  computed: {
    percentConvert() {
      return (this.givingAmount / this.givingGoal) * 100
    },
  },
}
</script>
