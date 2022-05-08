<template>
  <div class="page index">
    <section class="hero narrow pb-0">
      <div class="section-content content-center !max-w-xs text-left">
        <h1 class="hero-title font-display tracking-normal text-5xl xs:text-6xl lg:text-7xl text-gray-600 mb-6 mt-auto relative">
          <span class="wave xs:absolute -left-6 top-0 transform -translate-x-full w-14 h-auto inline-block"><img class="w-full h-auto" src="/static/svgs/wave.svg" /></span>
          <span class="text">Hi,<br>I'm Bobby</span>
        </h1>
        <TypeSingleLine 
          v-if="show.includes('subtitle')"
          tag="h4"
          class="text-green-400 base text-left"
          :delay="300"
          @animationDone="() => {
            continuePastHero()
          }"
          >
          <template #before><span class="relative mr-px" style="top: -.4rem">"</span></template>
          Frontend Developer
          <template #after><span class="relative ml-px" style="top: -.4rem">"</span></template>
        </TypeSingleLine>
        <div class="hero-links flex space-x-2 mt-10">
          <a class="button" href="https://github.com/itBme3" target="_blank">
            <img src="/static/svgs/github.svg" class="mr-2 w-6 h-auto" />
            GitHub
          </a>
          <a class="button" href="https://www.linkedin.com/in/bobby-moynihan-97263826" target="_blank">
            <img src="/static/svgs/linkedin.svg" class="mr-2 w-6 h-auto" />
            LinkedIn
          </a>
        </div>
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
      this.initGsap()
    },
    methods: {
      initGsap() {
        // this.$gsap.set('.hero-title', { opacity: 0, scaleY: 0, scaleX: .5, x: 200 });
        this.$gsap.set('.hero-links .button', { opacity: 0, y: -30 });
        this.$gsap.set('.hero-title img', { opacity: 0, scaleY: 0, scaleX: 0 });
        const onComplete = () => {
          if(this.show.includes('subtitle')){ return }
          this.show.push('subtitle');
          setTimeout(() => {
            this.$gsap.to('.hero-links .button', { opacity: 1, y: 0, duration: .3, ease: 'sine.out', stagger: .1 })
            this.$gsap.to('section.skills', {
              scrollTrigger: {
                trigger: 'section.skills',
                onEnter: () => this.show.push('skills')
              }
            })
          }, 2000);
        }
        const tl = this.$gsap.timeline({
          onComplete: onComplete.bind(this)
        });
        // tl.to('.hero-title', { opacity: 1, duration: .1, scaleY: 1, scaleX: 1, delay: .2, x: 0 });
        tl.to('.hero-title img', { opacity: 1, duration: .1, scaleY: 1, scaleX: 1, ease: 'power3.inOut', delay: .2 });
        tl.to('.hero-title img', { keyframes: [
          {rotation: -7},
          {rotation: 0},
          {rotation: 10},
          {rotation: 0},
        ], duration: .5, ease: 'power3.inOut', delay: .2 });
      },
      continuePastHero() {
        setTimeout(() => {
          this.show.push('skills');
          setTimeout(() => {
            if(window.scrollY < 50) {
              this.$gsap.to(window, {duration: .3, scrollTo: { y: '.hero + section', offsetY: this.$store.state.window.size.height / 2 }})
            }
          }, 300)
        }, 500)
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
      .hero-links {
        .button {
          @apply  bg-gray-800 bg-opacity-50 hover:bg-opacity-100 text-xs flex items-center content-start;
        }
      }
    }
}
</style>
