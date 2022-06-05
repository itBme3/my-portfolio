<template>
  <div class="about page narrow">
    <PageTitle 
      @animationDone="showCareer">
      About:
    </PageTitle>
    <nuxt-content class="mt-6 mb-12" :document="page" />
    <LazyAboutCareerBlocks v-if="show.includes('career')" class="mt-28" />
    <LazySectionSkills 
      v-if="show.includes('skills')" 
      :animate-title="false"
      class="pt-32" />
  </div>
</template>

<script>
  import Vue from 'vue'
import { asyncDelay } from '~/utils/funcs';
import { seoHead } from '~/utils/seo';
  export default Vue.extend({
    async asyncData({$content}) {
      const page = await $content('about').fetch()
        .then((res) => res || null);
        return { page }
    },
    data: () => ({
      show: []
    }),
    head () {
      return seoHead({})
    },
    methods: {
      showCareer() {
        this.show.push('career')
        asyncDelay(1500).then(() => {
          this.show.push('skills')
        })
      }
    }
  })
</script>

<style lang="scss">
.about.page {
  .skills {
    .section-content  {
      @apply max-w-full #{!important};
    }
  }
}
</style>