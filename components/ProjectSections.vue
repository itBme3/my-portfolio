<template>
  <div class="project-sections">

    <section 
      v-for="section in projectSections"
      :id="section.id"
      :key="section.id"
      class="block rounded h-auto py-12 border border-black border-opacity-40 border-l-0 border-r-0 border-t-0">
      <h3 class="section-title text-2xl text-gray-100 font-display font-black relative z-0 mb-8">{{ section.title }}</h3>
      <template v-if="section.media">
        <Media 
          v-for="media in section.media"
               :key="media"
               :src="media"
               class="rounded-md shadow-lg shadow-black/40 overflow-hidden relative z-10 mt-4 mb-8" />
      </template>
      <nuxt-content 
        class="section-text font-light text-gray-300 relative z-0 mt-12" 
        :document="section" />
    </section>
  </div>

</template>

<script>
import Vue from 'vue'


import { handleize, asyncDelay } from '~/utils/funcs'

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
    },
  },
  mounted () {
    this.initGsap()
  },
  methods: {
    initGsap () {
      this.$gsap.set(this.$el, {opacity: 0})
      this.$gsap.to(this.$el, {opacity: 1, delay: .3})
      const sections = this.$gsap.utils.toArray(this.$el.querySelectorAll('section'));
      /* set initial style before setting scrollTrigger — without, elements will flash because of async delay */
      sections.forEach((el) => {
        const els = {
          title: el.querySelector('.section-title'),
          media: el.querySelector('.media'),
          text: el.querySelector('.section-text'),
        }
        this.$gsap.set(els.media, { opacity: 0, scaleX: .7, scaleY: .7 });
        this.$gsap.set(els.title, { opacity: 0, y: -100, });
      })

      asyncDelay(300).then(() => {


        const sections = this.$gsap.utils.toArray(this.$el.querySelectorAll('section'));
        sections.forEach((el) => {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom =-30%',
              toggleActions: 'play pause play reverse',
              // scrub: true
            },
          });
          const els = {
            title: el.querySelector('.section-title'),
            media: el.querySelector('.media'),
            text: el.querySelector('.section-text'),
          }
          if(els.title) {
            this.$gsap.set(els.title, { opacity: 0, scaleX: 1, scaleY: 1, y: 20, });
          }
          if(els.media) {
            this.$gsap.set([els.media], { opacity: 0, y: -100, scaleX: 1, scaleY: 1, filter: 'blur(6px) saturate(1.5) brightness(1.5)' });
          }
          if(els.text) {
            this.$gsap.set([els.text], { y: -80, opacity: 0 });
          }
          const defaults = { y: 0, x: 0, scaleY: 1, scaleX: 1, opacity: 1, ease: 'power1.inOut', duration: .3 };

          
            if(els.media) {
              tl
              .to(els.media, {
                ...defaults,
                duration: .4,
                filter: 'blur(0) saturate(1) brightness(1)'
              })
            }
            if(els.title) {
              tl.to(els.title, {
                ...defaults,
                duration: .4,
              }, '-=.2')
            }

          if (!els.text) {
            return
          };
          this.$gsap.to(els.text, {
            scrollTrigger: {
              trigger: els.text,
              start: 'top 90%',
              duration: 1,
              toggleActions: 'play pause play reverse',
            },
            ...defaults,
            ease: 'power1.inOut',
            duration: .4,
            delay: .3
          })
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