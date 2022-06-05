<template>
  <div class="about-career-block relative opacity-100 flex flex-nowrap content-start items-stretch w-full max-w-2xl overflow-visible pl-0">
    <div class="timeline right-0 w-16 relative z-10 mr-0">
      <h4 class="timeline-date z-10 text-right font-black text-orange-300 w-full py-2 bg-gray-900 absolute block -right-1">{{ block.start }} to {{ block.end }}</h4>
    </div>
    <div class="block-content relative pl-16 m-auto ml-0 border border-t-0 border-b-0 border-r-0 border-gray-700">
      <!-- <div class="timeline-line z-0 bg-gray-700 border-opacity-10 rounded absolute h-full top-0 transform right-0" /> -->
      <div class="max-w-md">
        <h2
          class="career-title font-display text-3xl sm:text-4xl font-bold text-yellow-300">
          {{ block.title }}
        </h2>
        <a :href="block.companyLink" target="_blank" class="career-company inline-flex items-center my-4 text-cyan-400 w-auto mr-auto hover:border-purple-500 border border-transparent border-t-0 border-l-0 border-r-0">
          <SvgIcon name="link" class="my-auto w-4 text-blue-400" />
          <span class="ml-2 font-bold">{{ block.company }}</span>
        </a>
        <div 
          class="career-description text-sm sm:text-base lg:text-md">
          <nuxt-content
            :document="block"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

  export default Vue.extend({
    props: {
        block: {
            type: Object,
            default: () => {
                return {
                    title: null,
                    description: null,
                    date: null,
                };
            }
        },
        blockIndex: {
          type: Number,
          default: 0
        }
    },
    mounted() {
      this.initGsap()
    },
    methods: {
      initGsap() {
        this.gsapDatePinning();
        const blockTl = this.$gsap.timeline({
              scrollTrigger: {
                trigger: this.$el,
                toggleActions: "play reverse play reverse",
                start: 'top 85%',
                end: 'bottom 10%',
                scrub: false,
                pin: false,
                pinSpacing: false,
              }
            });
            const elsInBlock = {
              title: this.$el.querySelectorAll('.career-title'),
              company: this.$el.querySelectorAll('.career-company'),
              description: this.$el.querySelectorAll('.career-description'),
              date: this.$el.querySelectorAll('.career-date'),
              timeline: this.$el.querySelector('.timeline'),
            }
            this.$gsap.set(elsInBlock.date, {opacity: 0, y: '12rem', scaleY: 1, scaleX: 1, x: 0})
            this.$gsap.set(elsInBlock.title, {opacity: 0, y: '6rem'})
            this.$gsap.set(elsInBlock.company, {opacity: 0, y: '4rem'})
            this.$gsap.set(elsInBlock.description, {opacity: 0, y: '2rem'})
            this.$gsap.set(elsInBlock.timeline, {opacity: 0, y: '-50%', scaleY: .0})
            blockTl
              .to(elsInBlock.timeline, {
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
      },
      gsapDatePinning() {
        const els = {
          timeline: this.$el.querySelector('.timeline'),
          date: this.$el.querySelector('.timeline-date'),
        }
        this.$gsap.set(els.date, { color: '#3e3e4d' })
        this.$gsap.to(els.date, {
          scrollTrigger: {
            trigger: els.timeline,
            toggleActions: "play reverse play reverse",
            start: 'top 80px',
            end: 'bottom 10%',
            pinnedContainer: els.date,
            scrub: false,
            pin: true,
            pinType: 'transform',
            pinSpacing: false,
          },
          color: '#ffb280',
          duration: .3
        })
      }
    }
})
</script>

<style lang="scss">
// .timeline {
//   width: 70px;
//   @media screen and (min-width: 640px) {
//     width: 120px;
//   }
//   @media screen and (min-width: 1200px) {
//     width: 160px;
//   }
// }
</style>