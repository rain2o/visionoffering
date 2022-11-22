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

    <div class="pt-3 pb-3 lg:pb-28">
      <h2 v-if="givers !== undefined" class="font-bold text-4xl">
        {{ givers }}
      </h2>
      <v-progress-circular v-else indeterminate :size="40" />
      <p>Givers</p>
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
  computed: {
    daysRemaining() {
      const today = new Date();
      const end = new Date("2022-11-21");
      const millisecondsInDay = 1000*60*60*24;
      const diff = end.getTime() - today.getTime();
      return Math.ceil(diff / millisecondsInDay);
    }
  },
}
</script>
