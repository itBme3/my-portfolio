<template>
  <aside class="project-aside overflow-hidden">
    <LogosList 
      v-if="project && project.technologies && project.technologies.length"
      :slugs="project.technologies"
      toggle-actions="play none none none" />
      <!-- {{project}} -->
  </aside>
</template>

<script>
  import Vue from 'vue'
  // import {ScrollTrigger} from 'gsap/ScrollTrigger'
  export default Vue.extend({
    props: {
      project: {
        type: Object,
        default: () => {return {}}
      }
    },
    mounted() {
      this.$gsap.set('.project-aside', {
            marginTop: '150px', minWidth: '180px'})
      setTimeout(() => {
        this.initGsap()
      }, 500)
    },
    methods: {
      initGsap() {
        
        this.$gsap.to('.project-aside', {
            // marginTop: '150px',
            scrollTrigger: {
              trigger: '.project-sections',
              pin: '.project-aside',
              pinSpacing: false,
              pinType: 'transform',
              anticipatePin: 2,
            }
          })
      }
    }
  })
</script>

<style scoped>
.project-aside {
  @apply mb-auto ml-auto mr-0 mt-0 w-32 p-4 rounded-md border-gray-700 border block;
  /* height: auto !important; */
  /* max-height: auto !important; */
}
</style>