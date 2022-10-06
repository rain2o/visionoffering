<template>
  <div>
    <div class="text-center mx-auto">
      <div class="mx-auto text-center lg:max-w-7xl pb-10">
        <div class="grid grid-cols-12 gap-4 px-5">
          <div class="col-span-12 md:col-span-6">
            <VideoPlayer />
          </div>
          <div class="col-span-12 md:col-span-6">
            <div class="px-2 lg:px-10">
            <ProgressBar />
            <GivingData />
            <XLButton />
            </div>
          </div>
        </div>
      </div>

        <FullBanner />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
