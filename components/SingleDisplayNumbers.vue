<template>
  <div class="text-left">
    <div class="py-3">
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
        Given of
        {{
          Number(givingSingleGoal).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
        }}
      </p>
    </div>


  </div>
</template>

<script>
export default {
  name: 'SingleDisplayNumbers',
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
}
</script>
