<template>
  <div class="about page narrow">
    <PageTitle 
      @animationDone="showCareer">
      About Me:
    </PageTitle>
    <nuxt-content class="mt-6 mb-12" :document="page" />
    <LazySectionSkills v-if="show.includes('skills')" :animate-title="false" />
    <LazyAboutCareerBlocks v-if="show.includes('career')" class="mt-28" />
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
        this.show.push('skills')
        asyncDelay(1500).then(() => {
          this.show.push('career')
        })
      }
    }
  })
</script>

<style lang="scss">
.about.page {
  .skills.narrow {
    .section-content  {
      @apply max-w-full #{!important};
    }
  }
}
</style>