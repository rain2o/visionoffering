<template>
  <div>
    <div class="text-center mx-auto">
      <div class="mx-auto text-center lg:max-w-7xl pb-10">
        <div class="grid grid-cols-12 gap-4 md:px-5">

          <div class="col-span-12 md:col-span-6 md:order-2">
            <VideoPlayer/>
          </div>

          <div class="col-span-12 md:order-1">
            <div class="mt-2 md:pt-14 pb-14 p-2 text-left md:text-center mx-auto">
              <h1 class="uppercase font-bold text-4xl">Foothills Church Vision Offering</h1>
              <p class="bold text-2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A natus officia
                quibusdam
                sed similique. Architecto aspernatur, assumenda delectus eius et.</p>
            </div>
          </div>


          <div class="col-span-12 md:col-span-6 md:order-3">
            <div class="px-2 lg:px-10">
              <GivingData/>
              <XLButton/>
            </div>
          </div>
        </div>
      </div>

      <FullBanner/>

    </div>

    <v-card>
      <div class="text-center mx-auto">
        <div class="mx-auto text-left lg:max-w-7xl">

          <v-tabs
            v-model="tab"
            align-with-title
          >
            <v-tabs-slider></v-tabs-slider>
            <v-tab key="Campaign">Campaign</v-tab>
            <v-tab key="FAQ">FAQ</v-tab>
            <v-tab key="Updates">Updates</v-tab>
          </v-tabs>


          <v-tabs-items v-model="tab">
            <v-tab-item key="Campaign">
              <CampaignTab/>
            </v-tab-item>
            <v-tab-item key="FAQ">
              <FaqTab/>
            </v-tab-item>
            <v-tab-item key="Updates">
              <UpdateTab/>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </v-card>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      tab: null,
    }
  },
}
</script>
