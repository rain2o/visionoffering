<template>
  <div>
    <div class="text-left">
    <div class="progress-bar pb-10">
      <v-progress-linear
        background-color="#cccccc"
        color="#234058"
        value="100"
        height="10"
      ></v-progress-linear>

      <h2
        class="text-blue font-bold text-4xl"
      >
        $370,000
      </h2>
      <p>
        Goal 1: $370,000
      </p>
    </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CompletedGoal'
}
</script>
