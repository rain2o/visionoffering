<template>
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
</template>

<script>
export default {
  name: 'ProgressBarSingular',
  props: {
    givingSingleAmount: {
      type: Number,
      required: false,
      default: undefined,
    },
    givingSingleGoal: {
      type: Number,
      required: true,
    },
  },
  computed: {
    percentConvert() {
      return (this.givingSingleAmount / this.givingSingleGoal) * 100
    },
  },
}
</script>
