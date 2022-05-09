<template>
  <div class="about page narrow">
    <h1 class="page-title mt-12">About Me:</h1>
    <nuxt-content class="mt-10" :document="page" />
    <AboutCareerBlocks class="mt-28" :about="page" />
    
    <SectionSkills :animate-title="false" />
  </div>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    async asyncData({$content}) {
      const page = await $content('about').fetch()
        .then((res) => res || null);
        return { page }
    },
  })
</script>

<style scoped>

</style>