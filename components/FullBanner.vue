<template>
  <div class="bg-gray">
    <div class="mx-auto text-center lg:max-w-7xl py-5 px-5">
      <div class="grid grid-cols-12 gap-4 -ml-3 md:ml-0">

        <div class="col-span-12 lg:col-span-4">
          <div class="box">
            <img
              src="/images/icon.png"
              alt="icon"
              class="icon-width m-3"
            >
            <span class="text-left"><strong>COMPLETED: Goal #1: $250,000</strong> <br />Knoxville Location Upgrade</span>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-4">
          <div class="box">
            <img
              src="/images/icon.png"
              alt="icon"
              class="icon-width m-3"
            >
            <span class="text-left"><strong>Current: Goal #2: $1,000,000</strong> <br />Counseling Center</span>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-4">
          <div class="box">
            <img
              src="/images/icon.png"
              alt="icon"
              class="icon-width m-3"
            >
            <span class="text-left"><strong>Next: Goal #3: $2,000,000</strong> <br />Some Other Amazing Thing</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullBanner'
}
</script>
