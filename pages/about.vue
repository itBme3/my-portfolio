<template>
  <div class="about page narrow">
    <PageTitle 
      class="mt-12"
      @animationDone="showCareer">
      About Me:
      <template v-if="page.description" #subtitle>{{ page.description }}</template>
    </PageTitle>
    <nuxt-content class="mt-6 mb-12" :document="page" />
    <AboutCareerBlocks v-if="show.includes('career')" class="mt-28" :about="page" />
    <SectionSkills v-if="show.includes('skills')" :animate-title="false" />
  </div>
</template>

<script>
  import Vue from 'vue'
import { asyncDelay } from '~/utils/funcs';
  export default Vue.extend({
    async asyncData({$content}) {
      const page = await $content('about').fetch()
        .then((res) => res || null);
        return { page }
    },
    data: () => ({
      show: []
    }),
    methods: {
      showCareer() {
        asyncDelay(1500).then(() => {
          this.show.push('career')
          asyncDelay(200).then(() => {
            this.show.push('skills')
          })
        })
      }
    }
  })
</script>

<style scoped>

</style>