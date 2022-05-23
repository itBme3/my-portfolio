<template>
  <div class="page index">
    <section class="hero narrow pb-0">
      <div class="section-content content-center !max-w-xs text-left !pb-4">
        <h1 class="hero-title font-display font-black tracking-normal text-5xl xs:text-6xl lg:text-7xl mb-6 mt-auto relative">
          <span class="wave xs:absolute -left-6 top-0 transform -translate-x-full w-14 h-auto inline-block"><SvgIcon class="w-full h-auto" name="wave" /></span>
          <span class="text text-gray-600">Hi,<br>I'm Bobby</span>
        </h1>
        <TypeSingleLine 
          :start="show.includes('subtitle')"
          tag="h4"
          class="hero-subtitle text-green-400 base text-left"
          :delay="150"
          @animationDone="revealHeroLinks"
          >
          <template #before><span class="relative mr-px" style="top: -.4rem">"</span></template>
          Frontend Developer
          <template #after><span class="relative ml-px" style="top: -.4rem">"</span></template>
        </TypeSingleLine>
        <div class="hero-links flex space-x-2 mt-10">
          <a class="button transition-none" href="https://github.com/itBme3" target="_blank" style="opacity: 0">
            <SvgIcon name="github" class="mr-2 w-6 h-auto" />
            GitHub
          </a>
          <a class="button transition-none" href="https://www.linkedin.com/in/bobby-moynihan-97263826" target="_blank" style="opacity: 0">
            <SvgIcon name="linkedin" class="mr-2 w-6 h-auto" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>

    <SectionSkills 
      :start="show.includes('skills')"
      :categories="['code-languages', 'libraries-frameworks']" />

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
  watch: {
    '$store.state.window.scroll.y'(val) {
      if(val > (this.$store.state.window.size.height * .5) && !this.show.includes('skills')) {
        this.revealHeroLinks()
      }
    }
  },
    mounted() {
      this.initGsap()
    },
    methods: {
      initGsap() {
        // this.$gsap.set('.hero-title', { opacity: 0, scaleY: 0, scaleX: .5, x: 200 });
        // this.$gsap.set('.hero-links', { opacity: 0, y: -60 });
        this.$gsap.set('.hero-links .button', { opacity: 0, marginTop: '-20px' });
        this.$gsap.set('.hero-title img', { opacity: 0, scaleY: 0, scaleX: 0 });
        const onComplete = () => {
          if(this.show.includes('subtitle')){ return }
          this.show.push('subtitle');
        }
        const tl = this.$gsap.timeline({
          onComplete: onComplete.bind(this)
        });
        tl.to('.hero-title img', { opacity: 1, duration: .1, scaleY: 1, scaleX: 1, ease: 'power3.inOut', delay: .2 });
        tl.to('.hero-title img', { keyframes: [
          {rotation: -7},
          {rotation: 0},
          {rotation: 10},
          {rotation: 0},
          {rotation: -7},
          {rotation: 0},
        ], duration: .75, ease: 'power3.inOut', delay: .2 });
      },
      revealHeroLinks() {
        this.$gsap.to('.hero-links .button', { opacity: 1, marginTop: '0', duration: .2, ease: 'none', stagger: .1, delay: .05 })
        this.$gsap.to('section.skills', {
          scrollTrigger: {
            trigger: 'section.skills',
            onEnter: () => {
              setTimeout(() => {
                this.show.push('skills')
              }, 800);
            }
          }
        });
        this.continuePastHero()
      },
      continuePastHero() {
        setTimeout(() => {
            // this.show.push('skills');
            if(window.scrollY < 50) {
              this.$gsap.to(window, {duration: .3, scrollTo: { y: '.hero-subtitle', offsetY: 150 }})
            }
        }, 1500)
      }
    }
})
</script>
<style lang="scss" scoped>
.hero {
  .section-content {
    @apply pb-4 #{!important};
  }
}
</style>

