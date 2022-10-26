<template>
  <div class="text-left">
    <div class="py-3">
      <h2
        v-if="givingAmount !== undefined"
        class="text-blue font-bold text-4xl"
      >
        {{
          Number(givingAmount).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
        }}
      </h2>
      <v-progress-circular v-else indeterminate :size="40" class="text-blue" />

      <p>
        Given of
        {{
          Number(givingGoal).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
        }}
      </p>
    </div>

    <div class="py-3">
      <h2 v-if="givers !== undefined" class="font-bold text-4xl">
        {{ givers }}
      </h2>
      <v-progress-circular v-else indeterminate :size="40" />
      <p>Givers</p>
    </div>

    <div class="py-3">
      <h2 class="font-bold text-4xl">16</h2>
      <p>Days to Go</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayNumbers',
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
    givers: {
      type: Number,
      required: false,
      default: undefined,
    },
  },
}
</script>
