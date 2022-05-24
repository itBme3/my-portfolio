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
    <p ref="subtitle" class="max-w-xl ml-0 "><span>2009</span> <span>though</span> <span>2022</span></p>
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
        const els = {
          title: this.$refs.title,
          blocks: this.$gsap.utils.toArray(this.$el.querySelectorAll('.about-career-block')),
          subtitle: this.$refs.subtitle,
          bg: document.querySelector('.career-blocks-bg')
        }
        // this.$gsap.set(els.bg, {backgroundColor: this.bgColors.pop().from});
        // els.blocks.forEach(el => el.querySelectorAll('.') this.$gsap.set(els.title, {opacity: 0, y: '-4rem'});
        const initBlockTimelines = () => {
          els.blocks.forEach((blockEl, i) => {
            // let onEnter = () => {
            //   // this.$gsap.set(blockEl, {backgroundColor: this.bgColors[i].from, opacity: 0})
            //   this.$gsap.to(blockEl, {backgroundColor: this.bgColors[i].to, opacity: 1})
            // }
            // let onLeave = () => {
            //   // this.$gsap.set(blockEl, {backgroundColor: this.bgColors[i].to})
            //   this.$gsap.to(blockEl, {backgroundColor: this.bgColors[i].from, opacity: 0})
            // }
            // onEnter = onEnter.bind(this)
            // onLeave = onLeave.bind(this)
            // this.$gsap.to(blockEl, {backgroundColor: this.bgColors[i].from})
            const blockTl = this.$gsap.timeline({
              scrollTrigger: {
                trigger: blockEl,
                toggleActions: "play reverse play reverse",
                start: 'center center',
                end: 'bottom top',
                // markers: true,
                scrub: false,
                pin: true,
                pinSpacing: false,
                pinType: 'transform',
                anticipatePin: 1
                // onEnter,
                // onEnterBack: onEnter,
                // onLeave,
                // onLeaveBack: onLeave,
                // preventOverlapping: true
              }
            });
            const blockEls = {
              title: blockEl.querySelectorAll('.career-title'),
              company: blockEl.querySelectorAll('.career-company'),
              description: blockEl.querySelectorAll('.career-description'),
              date: blockEl.querySelectorAll('.career-date'),
            }
            this.$gsap.set(blockEls.date, {opacity: 0, y: '12rem', scaleY: 1, scaleX: 1, x: 0})
            this.$gsap.set(blockEls.title, {opacity: 0, y: '6rem'})
            this.$gsap.set(blockEls.company, {opacity: 0, y: '4rem'})
            this.$gsap.set(blockEls.description, {opacity: 0, y: '2rem'})
            blockTl.to(blockEls.date, {
                x: 0,
                y: 0,
                scaleY: 1,
                scaleX: 1,
                opacity: 1,
                duration: .3,
              }, 0)
            .to(blockEls.title, {
                y: 0,
                opacity: 1,
                duration: .3,
              }, 0)
            .to(blockEls.company, {
                y: 0,
                opacity: 1,
                duration: .3,
              }, 0)
            .to(blockEls.description, {
                y: 0,
                opacity: 1,
                duration: .3,
              }, 0.3)
            })

        }
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: els.title,
            start: 'top 20%',
            endTrigger: this.$el,
            end: 'bottom top',
            toggleActions: "play pause resume reverse",
            pin: true,
            pinType: 'transform',
            anticipatePin: true,
            pinSpacing: false
          },
          onEnter(e) {
            console.log('onEnter', e)
          }
        });
        tl
        .to(els.subtitle.querySelectorAll('span'), {
          opacity: 0,
          y: '-3rem',
          stagger: .1,
          // rotate: '90deg',
          duration: .3,
        }).to(els.title, {
          duration: .3,
          keyframes: [
            {
              y: '-100px',
              x: '-60%',
              scaleY: .3,
              scaleX: .3,
              rotate: '0deg',
            },
            {
              rotate: '90deg',
              opacity: 1,
              y: '100px',
            }
          ]
        }, '=-.3');
        initBlockTimelines()
        
      }
    }
  })
</script>

<style lang="scss" scoped>
.about-career-blocks {
   @apply flex flex-col;
}
</style>