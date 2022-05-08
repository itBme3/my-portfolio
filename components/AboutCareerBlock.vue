<template>
  <div class="about-career-block opacity-100">
    <div class="block-content relative pl-11 xs:pl-14 sm:pl-16 md:pl-24 lg:pl-18">
      <h4
          ref="dateElem"
        class="career-date font-display text-pink-500 tracking-widest top-0 whitespace-nowrap left-0 absolute text-xl sm:text-2xl md:text-3xl font-black">
        {{ block.date }}
      </h4>
      <div class="max-w-xs">
        <h2
          ref="titleElem"
          class="career-title font-display text-gray-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          {{ block.title }}
        </h2>
        <a :href="block.companyLink" target="_blank" class="career-company flex items-center my-4 text-yellow-500 w-auto">
          <span class="border border-transparent border-t-0 border-l-0 border-r-0 mr-2 hover:border-yellow-600">{{ block.company }}</span>
          <SvgIcon name="link" class="my-auto w-4 text-gray-600" />
        </a>
        <p
          ref="descriptionElem"
          class="career-description text-sm sm:text-base lg:text-md">
          {{ block.description }}
        </p>
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
        }
    },
    data() {
        return {
            tl: undefined
        };
    },
    // watch: {
    //   '$store.state.window.size.width'() {
    //     debounce(this.initGsapTimeline, 500);
    //   }
    // },
    mounted() {
        // console.log(this.$el);
        this.initGsapTimeline();
    },
    methods: {
        initGsapTimeline() {
          console.log(this.tl)
          if(this.tl?.kill) {
            this.tl.kill()
          }
            const elms = {
                title: this.$el.querySelector(".career-title"),
                description: this.$el.querySelector(".career-description"),
                company: this.$el.querySelector(".career-company"),
                date: this.$el.querySelector(".career-date"),
            };
            this.$gsap.set(elms.date, { y: 400, opacity: 0 });
            this.$gsap.set(elms.title, { y: 100, opacity: 0 });
            this.$gsap.set(elms.description, { y: -20, opacity: 0 });
            this.$gsap.set(elms.company, { scaleY: .5, scaleX: .5, opacity: 0 });
            this.tl = this.$gsap.timeline({
                smoothChildTiming: true,
                scrollTrigger: {
                    trigger: this.$el,
                    start: "top 110%",
                    scrub: true,
                    toggleActions: "play reverse play reverse",
                    fastScrollEnd: true,
                }
            });
            this.tl.to(elms.date, {
                y: 50,
                opacity: .6,
                duration: 1,
            });
            this.tl.to(elms.title, {
                y: 0,
                opacity: 1,
                duration: .6,
            }, '-=.8');
            this.tl.to(elms.company, {
                scaleY: 1,
                scaleX: 1,
                opacity: 1,
                duration: 0.2,
            }, '-=.4');
            this.tl.to(elms.description, {
                y: 10,
                opacity: 1,
                duration: 0.4,
            }, '-=.3');
            // tl.to(elms.date, { y: 30, opacity: 1, duration: .3 }, '-=.5');
            this.tl.to(elms.date, { y: -50, opacity: 1, duration: 1 }, '1');
            
        }
    }
})
</script>

<style lang="scss" scoped>
.about-career-block {
  min-height: 60vh;
}
.career-date {
  transform: translateX(-50%) translateY(150%) rotate(90deg);
}
</style>