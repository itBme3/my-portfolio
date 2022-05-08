<template>
  <div class="page index">
    <section class="hero narrow pb-0">
      <div class="section-content content-center !max-w-xs text-left">
        <h1 class="text-5xl xs:text-6xl lg:text-7xl font-black text-gray-600 mb-6 mt-auto relative">
          <span class="xs:absolute -left-6 top-0 transform -translate-x-full">👋</span>
          Hi,<br><span class="tracking-tighter"> I'm</span> Bobby
        </h1>
        <TypeSingleLine 
          tag="h4"
          class="text-green-400 base text-left"
          @animationDone="() => {
            continuePastHero()
          }"
          >
          <template #before>"</template>
          Frontend Developer
          <template #after>"</template>
        </TypeSingleLine>
      </div>
    </section>

  <SectionSkills v-if="show.includes('skills')" :categories="['code-languages', 'libraries-frameworks']" />

    <section class="about narrow">
      <AboutCareerBlocks class="section-content" />
    </section>


  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    name: "IndexPage",
    data() {
        return {
            show: [],
            skillCategories: [
                "code-languages",
                "libraries-frameworks",
                "apis"
            ]
        };
    },
    mounted() {
      this.$gsap.to('section.skills', {
        scrollTrigger: {
          trigger: 'section.skills',
          onEnter: () => this.show.push('skills')
        }
      })
    },
    methods: {
      initGsap() {
        // this.$el.querySelectorAll('section').forEach(el => {
        //   this.$gsap.timeline({
        //     defaults: { // children inherit these defaults
        //       duration: 1,
        //       ease: "power3" 
        //     },
        //     // smoothChildTiming: true,
        //     scrollTrigger: {
        //       trigger: el, // selector or element
        //       start: "center center",  // [trigger] [scroller] positions
        //       end: 'center+=80% center', // [trigger] [scroller] positions
        //       scrub: true, // or time (in seconds) to catch up
        //       pin: true, // or selector or element to pin
        //       markers: true, // only during development!
        //       toggleActions: "play pause play reset",
        //       fastScrollEnd: true, // or velocity number
        //       anticipatePin: 1, // may help avoid jump
        //       pinSpacing: true,
        //       pinType: "transform", // or "fixed"
        //       pinnedContainer: el,
        //       preventOverlaps: true, // or arbitrary string
        //       endTrigger: el, // selector or element
        //       invalidateOnRefresh: true, // clears start values on refresh
        //       refreshPriority: 1, // influence refresh order
        //       snap: {
        //         snapTo: 1 / 10, // progress increment
        //         duration: 2,
        //         directional: true,
        //         ease: "power3",
        //       },
        //       onEnter: () => console.log('entered'),
        //       onLeave: () => console.log('left')
        //     },
        //   })
        //   .addLabel('start')
        //   .fromTo(el, {
        //     opacity: 0,
        //     y: -20,
        //     duration: .3
        //   }, {
        //     opacity: 1,
        //     x: 0,
        //     duration: .3
        //   })
        //   .addLabel('end')
        // })
      },
      continuePastHero() {
        setTimeout(() => {
          this.show.push('skills');
          setTimeout(() => {
            if(window.scrollY < 50) {
              this.$gsap.to(window, {duration: .3, scrollTo: { y: '.hero + section', offsetY: this.$store.state.window.size.height / 2 }})
            }
          }, 500)
        }, 800)
      }
    }
})
</script>

<style lang="scss">
.section-content {
  @apply mx-auto;
  width: calc(100% - 4rem);
  &:not([class*="mt-"]) {
    @apply mt-auto;
  }
  &:not([class*="mb-"]) {
    @apply mb-auto;
  }
  &:not([class*="pt-"]) {
    @apply pt-20;
  }
  &:not([class*="mb-"]) {
    @apply pb-20;
  }
  @media screen and (min-width: 768px) {
    width: calc(100% - 6rem);
  }
  &:not(.w-full) {
    @apply max-w-5xl;
  }
}
section, .page-section {
    @apply flex flex-col items-center content-center w-full;
    height: 60vh;
    min-height: 40px;
    &.narrow {
      .section-content {
        @apply max-w-md;
      }
    }
    &.narrowest {
      .section-content {
        @apply max-w-sm;
      }
    }
    &.hero {
      @apply mb-6;
    }
}
</style>
