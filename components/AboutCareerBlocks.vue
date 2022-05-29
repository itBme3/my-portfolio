<template>
  <div class="about-career-blocks flex flex-col items-center">
    <!-- <TypeSingleLine 
        :start="shouldStart"
        tag="h4"
        class="mb-16 base text-left relative -left-2 font-semibold"
        :class="{
          'italic text-gray-500': doneTyping,
          'text-gray-300': !doneTyping,
        }"
        :delay="0"
        @animationDone="() => doneTyping = true"
        >
        <template  v-if="doneTyping" #before><span class="relative text-gray-500 mr-px" style="top: -.5rem">// </span></template>
        <span>Work Experience</span>
    </TypeSingleLine> -->
    <h1 ref="title" class="title max-w-xl ml-0 relative z-10">Work Experience</h1>
    <p ref="subtitle" class="max-w-xl ml-0 mb-32 "><span>2009</span> <span>though</span> <span>2022</span></p>
    <AboutCareerBlock 
      v-for="block in blocks"
      :key="block.title"
      :block="block"
      class="mb-32"
    />
    <Teleport to="main"><div ref="background" class="career-blocks-bg fixed inset-0 z-0" /></Teleport>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import Teleport from 'vue2-teleport'
  import {asyncDelay} from '~/utils/funcs'
  export default Vue.extend({
    components: {
      Teleport
    },
    props: {
      start: {
        type: Boolean,
        default: false
      },
      about: {
        type: Object,
        default: () => { return { career: [] } }
      }
    },
    data() {
      return {
        blocks: this.about?.career?.length ? this.about.career : [],
        shouldStart: !!this.start,
        doneTyping: false,
        bgColors: [
              { from:  '#131319', to: '#fdf58a'},
              { from:  '#fdf58a', to: '#4de2ff'},
              { from:  '#4de2ff', to: '#ff6a8d'},
            ]
      }
    },
    async fetch() {
      if (this.blocks?.length) {return}
      return await this.$content('about').fetch()
        .then((res) => {
          if(!Array.isArray(res?.career)) {
            this.blocks = []
          } else {
            this.blocks = res.career
          }
          return this.blocks
        })
    },
    watch: {
      start(val) {
        this.shouldStart = val
      },
    },
    async mounted() {
      try {
        this.blocks = await this.getBlocks();
        this.initGsap();
        return
      } catch(err) {
        console.error(err)
        // alert(err)
      }
    },
    methods: {
     getBlocks(force = false) {
        if(!force) {
          if (this.about?.career?.length > 0) {
            this.blocks = this.about.career
            return this.blocks
          }
          if(this.blocks?.length) {
            return this.blocks
          }
        }
        return this.$content('about').fetch()
        .then((res) => {
          if(!Array.isArray(res?.career)) {
            this.blocks = []
          } else {
            this.blocks = res.career
          }
          return this.blocks
        })
      },
      initGsap() {
        
        asyncDelay(400).then(() => ScrollTrigger.refresh());
        const blockEls = this.$gsap.utils.toArray(this.$el.querySelectorAll('.about-career-block'))
        ScrollTrigger.refresh()
          blockEls.forEach((blockEl) => {
            const blockTl = this.$gsap.timeline({
              scrollTrigger: {
                trigger: blockEl,
                toggleActions: "play reverse play reverse",
                start: 'top 80%',
                end: 'bottom top',
                scrub: false,
                pin: false,
                pinSpacing: false,
              }
            });
            const elsInBlock = {
              title: blockEl.querySelectorAll('.career-title'),
              company: blockEl.querySelectorAll('.career-company'),
              description: blockEl.querySelectorAll('.career-description'),
              date: blockEl.querySelectorAll('.career-date'),
            }
            this.$gsap.set(elsInBlock.date, {opacity: 0, y: '12rem', scaleY: 1, scaleX: 1, x: 0})
            this.$gsap.set(elsInBlock.title, {opacity: 0, y: '6rem'})
            this.$gsap.set(elsInBlock.company, {opacity: 0, y: '4rem'})
            this.$gsap.set(elsInBlock.description, {opacity: 0, y: '2rem'})
            blockTl.to(elsInBlock.date, {
                x: 0,
                y: 0,
                scaleY: 1,
                scaleX: 1,
                opacity: 1,
                duration: .3,
              }, 0)
            .to(elsInBlock.title, {
                y: 0,
                opacity: 1,
                duration: .3,
              }, 0)
            .to(elsInBlock.company, {
                y: 0,
                opacity: 1,
                duration: .3,
              }, 0)
            .to(elsInBlock.description, {
                y: 0,
                opacity: 1,
                duration: .3,
              }, 0.3)
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