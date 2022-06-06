<template>
  <div class="about-career-blocks flex flex-col items-center content-start max-w-xl mx-auto">
    <h1 ref="title" class="title ml-0 relative z-10 text-left w-full">Work Experience:</h1>
    <p ref="subtitle" class="ml-0 mb-24 w-full text-gray-200 italic">2009—2022</p>
    <AboutCareerBlock 
      v-for="(block, i) in blocks"
      :key="block.title"
      :block="block"
      :block-index="i"
      class="pb-32"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { asyncDelay } from '~/utils/funcs'
  export default Vue.extend({
    props: {
      start: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        blocks: [],
        shouldStart: !!this.start,
        doneTyping: false,
      }
    },
    async fetch() {
      if (this.blocks?.length) {return}
      return await this.$content('career').sortBy('start', 'desc').fetch()
        .then((res) => {
          if(!Array.isArray(res)) {
            this.blocks = []
          } else {
            this.blocks = res
          }
          return this.blocks
        })
    },
    watch: {
      start(val) {
        this.shouldStart = val
      },
    },
    mounted() {
      // this.$gsap.registerPlugin(ScrollTrigger);
        this.initGsap();
    },
    methods: {
      initGsap() {
        const els = {
          title: this.$el.querySelector('.title'),
          subtitle: this.$el.querySelector('.subtitle'),
        }
        this.$gsap.set(this.$el, {y: -40, opacity: 0})
        this.$gsap.set(els.title, {y: 40, opacity: 0})
        this.$gsap.set(els.subtitle, {y: 40, opacity: 0})
        asyncDelay(300).then(() => {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: els.title,
              start: 'top 90%',
              end: 'bottom 0%',
              delay: .1,
              // toggleActions: 'play reverse play reverse'
            }
          });
          tl.to(this.$el, { y: 0, opacity: 1, ease: 'power3.in', duration: .4 })
            .to(els.title, { y: 0, opacity: 1, ease: 'power3.in', duration: .4 }, 0)
            .to(els.subtitle, { y: 0, opacity: 1, ease: 'power3.in', duration: .6 }, .2)
          asyncDelay(2000).then(() => {
            ScrollTrigger.refresh()
            this.initGsapDatePinning()
          })
        })
      },
      initGsapDatePinning() {
       const timelineEls = this.$gsap.utils.toArray(this.$el.querySelectorAll('.timeline'));
       console.log({timelineEls})
        timelineEls.forEach(el => {
          this.$gsap.to(el.querySelector('.timeline-date'), {
            scrollTrigger: {
              trigger: el,
              // toggleActions: "play pause play pause",
              start: 'top 80px',
              end: 'bottom 10%',
              // pinnedContainer: els.date,
              scrub: true,
              pin: true,
              pinType: 'transform',
              pinSpacing: true,
              onEnter() {
                console.log('timeline entered')
              }
            },
            color: '#ffb280',
            duration: .3
          })
        })
      }
    }
  })
</script>

<style lang="scss" scoped>
.about-career-blocks {
   @apply flex flex-col;
}
</style>