<template>
  <div class="project-sections pr-0 sm:pr-8 sm:p-8 pl-0 sm:pl-0">

    <section 
      v-for="section in projectSections"
      :id="section.id"
      :key="section.id"
      class="block rounded-lg h-auto p-8 bg-gray-800 bg-opacity-20 mb-4 ml-0 mr-auto">
      <h3 class="section-title text-2xl text-gray-100 font-display font-black relative z-0 mb-8 px-1">
        {{ section.title }}
      </h3>
      
      <template v-if="section.media">
        <Media 
          :src="typeof section.media === 'string' ? section.media : section.media[0]"
          class="rounded-md shadow-lg shadow-black/40 overflow-hidden relative z-10 mt-4 mb-8" />
      </template>
      
      <nuxt-content 
        class="section-text font-light text-gray-300 relative z-0 mt-12 px-1" 
        :document="section" />
      
      <div class="more-media pt-4" v-if="Array.isArray(section.media) && section.media.length > 1">
        <template v-for="(media, i) in section.media">
          <Media 
            v-if="i > 0"
            :key="media"
            :src="media"
            class="rounded-md shadow-lg shadow-black/40 overflow-hidden relative z-10 mt-4 mb-8" />
        </template>
      </div>
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
    sectionMedia() {
      return Array.isArray(this.section?.media) ? this.section.media : typeof this.section?.media === 'string' ? [this.section.media] : []
    }
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
        this.$gsap.set(el, { opacity: 0, scaleY: 0 });
        this.$gsap.set(els.media, { opacity: 0, scaleX: .2, scaleY: .8 });
        this.$gsap.set(els.title, { opacity: 0, y: -100, });
      })

      asyncDelay(300).then(() => {

        const sections = this.$gsap.utils.toArray(this.$el.querySelectorAll('section'));
        sections.forEach((el, i) => {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: `top ${i === 0 ? '120%' : '100%'}`,
              end: 'bottom -20%',
              toggleActions: 'play pause play pause'
            },
          });
          const els = {
            title: el.querySelector('.section-title'),
            media: el.querySelector('.media'),
            text: el.querySelector('.section-text'),
          }
          this.$gsap.set(el, { opacity: 0, scaleY: 0 });
          if(els.title) {
            this.$gsap.set(els.title, { opacity: 0, scaleX: 1, scaleY: 1, y: 20, });
          }
          if(els.media) {
            this.$gsap.set([els.media], { opacity: 0, scaleX: .2, scaleY: .2 });
          }
          if(els.text) {
            this.$gsap.set([els.text], { y: -80, opacity: 0 });
          }
          const defaults = { y: 0, x: 0, scaleY: 1, scaleX: 1, opacity: 1, ease: 'power1.inOut', duration: .3 };

            tl.to(el, {opacity: 1, scaleY: 1, duration: .6, ease: 'power1.inOut'})

            if(els.media) {
              tl
              .to(els.media, {
                ...defaults,
                duration: .4,
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
              toggleActions: 'play pause play reverse',
            },
            ...defaults,
            ease: 'power1.inOut',
            duration: .4,
            delay: .6
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