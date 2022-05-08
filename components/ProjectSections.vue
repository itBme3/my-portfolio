<template>
  <div class="project-sections">
    
    <section
      v-for="section in projectSections"
      :key="section.id"
      class="pt-32 block p-8 rounded space-y-4">
      <h3 class="section-title text-2xl text-gray-500 font-bold">{{ section.title }}</h3>
      <template v-if="section.media">
        <Media 
          v-for="media in section.media"
          :key="media"
          :src="media" />
      </template>
      <p class="section-text font-light text-gray-300">{{ section.text }}</p>
    </section>
  </div>

</template>

<script>
  import Vue from 'vue'

    // import Teleport from 'vue2-teleport';
  import {handleize} from '~/utils/funcs'

  export default Vue.extend({
    // components: {
    //   Teleport
    // },
    props: {
      project: {
        type: Object,
        default: () => {return {}}
      }
    },
    computed: {
      projectSections() {
        return Array.isArray(this.project?.sections)
          ? this.project.sections.map((section) => {
            return {
              ...section, 
              id: `section-${handleize(section.title)}`
            }
          })
          : null
      },
    },
    mounted() {
      this.initGsap()
    },
    methods: {
      initGsap() {
        const sections = this.$gsap.utils.toArray(this.$el.querySelectorAll('section'));
        
        sections.forEach((section) => {
          this.$gsap.from(section, {
            scale: .4,
            opacity: 0,
            scrollTrigger: {
              trigger:section,
              toggleActions: "play reverse play reverse",
              // start: 'center center',
              end: 'bottom top',
              // pin: true,
              // pinSpacing: false,
              pinType: 'transform',
              anticipatePin: 1,
            }
          })
        })
        
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