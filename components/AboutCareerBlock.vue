<template>
  <div class="about-career-block relative opacity-100 flex flex-nowrap content-start items-start w-full max-w-2xl overflow-visible pl-0">
    <div ref="timeline" class="timeline right-0 w-24 relative z-10 mr-0">
      <h4 ref="timelineDate" class="timeline-date z-10 text-right font-black text-orange-300 w-full py-2 bg-gray-900 absolute block -right-1">{{ block.start }} to {{ block.end }}</h4>
    </div>
    <div class="block-content relative pl-12 sm:pl-16 m-auto ml-0 border border-t-0 border-b-0 border-r-0 border-gray-700">
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
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asyncDelay } from '~/utils/funcs';
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
      this.initGsap();
    },
    methods: {
      initGsap() {
        // this.$gsap.registerPlugin(ScrollTrigger)
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
              title: this.$el.querySelector('.career-title'),
              company: this.$el.querySelector('.career-company'),
              description: this.$el.querySelector('.career-description'),
            }
            this.$gsap.set(elsInBlock.title, {opacity: 0, y: '6rem'})
            this.$gsap.set(elsInBlock.company, {opacity: 0, y: '4rem'})
            this.$gsap.set(elsInBlock.description, {opacity: 0, y: '2rem'})
            blockTl
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
                onComplete() {
                  ScrollTrigger.refresh();
                }
              }, 0.3);
          
      },
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