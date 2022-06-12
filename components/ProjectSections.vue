<template>
  <div class="project-sections pr-0 sm:mr-8 sm:p-8 pl-0 sm:pl-0 sm:mt-0">

    <ProjectSection 
      v-for="(section, i) in projectSections"
      :key="section.id"
      :section="section"
      :class="{
        'mt-10 sm:mt-14': i !== 0
      }"
       />

  </div>

</template>

<script>
import Vue from 'vue'

import { handleize } from '~/utils/funcs'

export default Vue.extend({
  props: {
    project: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    projectSections () {
      return Array.isArray(this.project?.sections)
        ? this.project.sections.map((section) => {
          return {
            ...section,
            id: handleize(section.title)
          }
        })
        : null
    }
  }
})
</script>

<style lang="scss">
// .page.project {
//   padding: 0;
//   @media screen and (min-width: 768px) {
//     padding-right: 220px;
//   }
// }
</style>