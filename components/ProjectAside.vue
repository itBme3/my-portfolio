<template>
  <aside class="project-aside">
    <LogosList 
      v-if="project && project.technologies && project.technologies.length"
      :slugs="project.technologies" />
      <!-- {{project}} -->
  </aside>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    props: {
      project: {
        type: Object,
        default: () => {return {}}
      }
    },
    // mounted() {
    //   setTimeout(() => {
    //     this.initGsap()
    //   }, 500)
    // },
    methods: {
      // initGsap() {
      //   // gsap.set(this.$el, { right: 0, left: 'auto', top: '3rem' })
        
      // }
    }
  })
</script>

<style scoped>
.project-aside {
  @apply mb-auto ml-auto mr-0 w-32 p-4 rounded border-gray-700 border block;
}
</style>