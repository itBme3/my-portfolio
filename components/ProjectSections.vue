<template>
  <div class="project-sections pr-0 sm:pr-8 sm:p-8 pl-0 sm:pl-0 -mt-8">

    <ProjectSection 
      v-for="section in projectSections"
      :key="section.id"
      :section="section"
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
    },
    // sectionMedia() {
    //   return Array.isArray(this.section?.media) ? this.section.media : typeof this.section?.media === 'string' ? [this.section.media] : []
    // }
  },
  // methods: {
  //   initGsap () {
  //     this.$gsap.set(this.$el, {opacity: 0})
  //     this.$gsap.to(this.$el, {opacity: 1, delay: .3})
  //     const sections = this.$gsap.utils.toArray(this.$el.querySelectorAll('section'));
  //     /* set initial style before setting scrollTrigger — without, elements will flash because of async delay */
  //     sections.forEach((el) => {
  //       const els = {
  //         title: el.querySelector('.section-title'),
  //         media: el.querySelector('.media'),
  //         text: el.querySelector('.section-text'),
  //       }
  //       this.$gsap.set(el, { opacity: 0, scaleY: 0 });
  //       this.$gsap.set(els.media, { opacity: 0, scaleX: .2, scaleY: .8 });
  //       this.$gsap.set(els.title, { opacity: 0, y: -100, });
  //     })

  //     asyncDelay(300).then(() => {

  //       const sections = this.$gsap.utils.toArray(this.$el.querySelectorAll('section'));
  //       sections.forEach((el, i) => {
  //         const tl = this.$gsap.timeline({
  //           scrollTrigger: {
  //             trigger: el,
  //             start: `top ${i === 0 ? '120%' : '100%'}`,
  //             end: 'bottom -20%',
  //             toggleActions: 'play pause play pause'
  //           },
  //         });
  //         const els = {
  //           title: el.querySelector('.section-title'),
  //           media: el.querySelector('.media'),
  //           text: el.querySelector('.section-text'),
  //         }
  //         this.$gsap.set(el, { opacity: 0, scaleY: 0 });
  //         if(els.title) {
  //           this.$gsap.set(els.title, { opacity: 0, scaleX: 1, scaleY: 1, y: 20, });
  //         }
  //         if(els.media) {
  //           this.$gsap.set([els.media], { opacity: 0, scaleX: .2, scaleY: .2 });
  //         }
  //         if(els.text) {
  //           this.$gsap.set([els.text], { y: -80, opacity: 0 });
  //         }
  //         const defaults = { y: 0, x: 0, scaleY: 1, scaleX: 1, opacity: 1, ease: 'power1.inOut', duration: .3 };

  //           tl.to(el, {opacity: 1, scaleY: 1, duration: .6, ease: 'power1.inOut'})

  //           if(els.media) {
  //             tl
  //             .to(els.media, {
  //               ...defaults,
  //               duration: .4,
  //             })
  //           }
  //           if(els.title) {
  //             tl.to(els.title, {
  //               ...defaults,
  //               duration: .4,
  //             }, '-=.2')
  //           }

  //         if (!els.text) {
  //           return
  //         };
  //         this.$gsap.to(els.text, {
  //           scrollTrigger: {
  //             trigger: els.text,
  //             start: 'top 90%',
  //             toggleActions: 'play pause play reverse',
  //           },
  //           ...defaults,
  //           ease: 'power1.inOut',
  //           duration: .4,
  //           delay: .6
  //         })
  //       })
  //     })
  //   }
  // }
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