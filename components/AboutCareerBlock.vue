<template>
  <div class="about-career-block opacity-100">
    <div class="block-content relative pl-11 xs:pl-14 sm:pl-16 md:pl-24 lg:pl-18">
      <h2
          ref="dateElem"
        class="career-date text-pink-500 tracking-widest top-0 whitespace-nowrap left-0 absolute text-3xl sm:text-4xl md:text-5xl font-black">
        {{ block.date }}
      </h2>
      <div class="max-w-xs">
        <h2
          ref="titleElem"
          class="career-title text-gray-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {{ block.title }}
        </h2>
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
          }
        }
      }
    },
    data() {
      return {
        tl: undefined
      }
    },
    mounted() {
      // console.log(this.$el);
      this.initGsapTimeline()
    },
    methods: {
      initGsapTimeline() {
        
        this.$gsap.timeline({
          defaults: { // children inherit these defaults
            duration: 1,
            ease: "power3" 
          },
          smoothChildTiming: true,
          scrollTrigger: {
            trigger: this.$el, // selector or element
            start: "center top+=50%",  // [trigger] [scroller] positions
            end: "top center", // [trigger] [scroller] positions
            scrub: 1, // or time (in seconds) to catch up
            pin: true, // or selector or element to pin
            // markers: true, // only during development!
            toggleActions: "play reverse play reverse",
            fastScrollEnd: true, // or velocity number
            pinSpacing: true,
            pinType: "transform", // or "fixed"
            // pinnedContainer: this.$el.querySelector('.block-content'),
            preventOverlaps: true, // or arbitrary string
            endTrigger: this.$el, // selector or element
            // invalidateOnRefresh: true, // clears start values on refresh
            // refreshPriority: 1, // influence refresh order
            snap: {
              snapTo: [0, .4, .8, 1], // progress increment
              duration: .3,
              directional: true,
              ease: "power3",
            }
          },
        })
        .addLabel('start')
        .fromTo(this.$el.querySelector('.career-date'), {
          top: '20vh',
          opacity: 0,
          duration: .5,
        }, {
          duration: .5,
          top: 0,
          opacity: 1,
        })
        .fromTo(this.$el.querySelector('.career-title'), {
          y: -80,
          opacity: 0,
          duration: 1,
        }, {
          y: 0,
          duration: 1,
          opacity: 1,
        }, '-=.5')
        .fromTo(this.$el.querySelector('.career-description'), {
           y: 20,
          opacity: 0,
          duration: 1,
        }, {
          duration: 1,
          y: 0,
          opacity: 1,
        }, '-=1')
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