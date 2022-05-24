<template>
  <div class="about-career-block relative opacity-100 flex flex-col content-center w-full overflow-hidden mx-auto h-screen">
    <div class="block-content relative pl-11 xs:pl-14 sm:pl-16 md:pl-24 lg:pl-18 max-w-2xl m-auto">
      <h4
          ref="dateElem"
        class="career-date font-display text-orange-300 tracking-widest top-0 whitespace-nowrap left-4 font-black mb-4 text-xl">
        {{ block.date }}
      </h4>
      <div class="max-w-xs">
        <h2
          ref="titleElem"
          class="career-title font-display text-3xl sm:text-4xl font-bold text-yellow-300">
          {{ block.title }}
        </h2>
        <a :href="block.companyLink" target="_blank" class="career-company inline-flex items-center my-4 text-cyan-400 w-auto mr-auto hover:border-purple-500 border border-transparent border-t-0 border-l-0 border-r-0">
          <SvgIcon name="link" class="my-auto w-4 text-blue-400" />
          <span class="ml-2 font-bold">{{ block.company }}</span>
        </a>
        <p
          ref="descriptionElem"
          class="career-description text-sm sm:text-base lg:text-md text-gray-300">
          {{ block.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    },
    data() {
        return {
            tl: undefined,
            bgColors: [
              { from:  '#3481ff', to: '#f515d4'},
              { from:  '#f515d4', to: '#fdf58a'},
              { from:  '#fdf58a', to: '#4de2ff'},
            ]
        };
    },
    // mounted() {
    //     this.initGsapTimeline();
    // },
    methods: {
        initGsapTimeline() {
          console.log(this.tl)
          if(this.tl?.kill) {
            this.tl.kill()
          }
          ScrollTrigger.refresh()
            const elms = {
                title: this.$el.querySelector(".career-title"),
                description: this.$el.querySelector(".career-description"),
                company: this.$el.querySelector(".career-company"),
                date: this.$el.querySelector(".career-date"),
            };
            const bgColor = this.bgColors[this.block.order];
            this.$gsap.set(this.$el, { backgroundColor: bgColor.from });
            this.$gsap.set(elms.date, { top: 400, opacity: 0 });
            this.$gsap.set(elms.title, { top: 100, opacity: 0 });
            this.$gsap.set(elms.description, { top: -20, opacity: 0 });
            this.$gsap.set(elms.company, { scaleY: .5, scaleX: .5, opacity: 0 });
            this.tl = this.$gsap.timeline({
                smoothChildTiming: true,
                scrollTrigger: {
                    trigger: this.$el,
                    start: "center center",
                    end: "bottom top",
                    scrub: false,
                    toggleActions: "play pause play reverse",
                    fastScrollEnd: true,
                    pin: true,
                    pinSpacing: false,
                    pinType: 'transform',
                    anticipatePin: 1
                }
            });
            this.tl.to(this.$el, {
              backgroundColor: bgColor.to,
              duration: .3
            })
            .to(elms.date, {
                top: 50,
                opacity: .6,
                duration: 1,
            }, '-=.3')
            .to(elms.title, {
                top: 0,
                opacity: 1,
                duration: .6,
            }, '-=.6')
            .to(elms.company, {
                scaleY: 1,
                scaleX: 1,
                opacity: 1,
                duration: 0.2,
            }, '-=.4')
            .to(elms.description, {
                top: 10,
                opacity: 1,
                duration: 0.4,
            }, '-=.3')
            .to(elms.date, { top: -20, opacity: 1, duration: 1 }, '1');
            
        }
    }
})
</script>

<style lang="scss" scoped>

// .career-date {
//   transform: translateX(-50%) translateY(150%) rotate(90deg);
// }
</style>