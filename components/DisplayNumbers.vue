<template>
  <div class="text-left">
    <div class="py-3">
      <h2 class="text-blue font-bold text-4xl">${{ Number(givingAmount).toLocaleString() }}</h2>
      <p>Given of ${{ Number(givingGoal).toLocaleString() }}</p>
    </div>

    <div class="py-3">
      <h2 class="font-bold text-4xl">387</h2>
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
      required: true
    },
    givingGoal: {
      type: Number,
      required: true
    },
  }
}
</script>
