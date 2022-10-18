<template>
  <div class = "progress-bar">
    <v-app id="doesitmatter">
      <v-progress-linear
        color="saltydog"
        height="10"
        v-model="valueDeterminate"
      ></v-progress-linear>
    </v-app>
    <h2>{{ givenAmount }}</h2>
 </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data () {
    return {
      valueDeterminate: 50,
    }
  },
}
</script>
