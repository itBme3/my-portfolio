<template>
  <div class="page index flex flex-col space-y-16">
    <section class="hero narrow pb-0">
      <div class="section-content content-center !max-w-xs text-left !pb-4">
        <h1
          class="hero-title font-display font-black tracking-normal text-5xl xs:text-6xl lg:text-7xl mb-6 mt-auto relative"
        >
          <span 
            class="wave relative z-10 sm:absolute -left-3 sm:-left-20 top-0 transform w-10 xs:w-12 sm:w-14 h-auto inline-block"
            style="opacity: 0">
            <SvgIcon class="w-full h-auto" name="wave" />
          </span>
          <span class="text text-gray-600">
            <span 
              class="hi inline-block"
              style="opacity: 0">Hi,</span><br>
            <span 
              class="name inline-block"
              style="opacity: 0">I'm Bobby</span>
          </span>
        </h1>
        <TypeSingleLine 
          v-if="show.includes('subtitle')"
          tag="h4"
          class="hero-subtitle text-green-400 base text-left"
          :delay="0"
          @animationDone="revealHeroLinks"
          >
          <template #before>"</span></template>
          <span>Frontend Developer</span>
          <template #after>"</template>
        </TypeSingleLine>
        <div class="hero-links flex space-x-2 mt-10">
          <a class="button transition-none" href="https://github.com/itBme3" target="_blank" style="opacity: 0">
            <SvgIcon name="github" class="mr-2 w-5 h-auto" />
            GitHub
          </a>
          <a class="button transition-none" href="https://www.linkedin.com/in/bobby-moynihan" target="_blank" style="opacity: 0">
            <SvgIcon name="linkedin" class="wave mr-5 w-6 h-auto" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>

    <SectionSkills 
      :start="show.includes('skills')"
      :categories="['languages', 'frameworks-libraries']"
      @animationDone="() => show.push('projects')" />
    
    <SectionProjects
      v-if="show.includes('projects')" 
      class="mt-0 mx-auto" style="max-width: 600px" />
      <!-- <div class="projects-highlights flex flex-col space-y-20">
        <section 
          v-for="slug in ['arcade', 'coloring-palettes', 'apparel-ecommerce', 'sms-campaign-builder']"
          :key="slug"
          class="project-highlights-section p-6 rounded-md hover:border-gray-800 border-transparent border">
          <ProjectHighlights :slug="slug" />
        </section>
      </div> -->

  </div>
</template>

<script>
import Vue from 'vue'
import { asyncDelay } from '~/utils/funcs';
import { seoHead } from '~/utils/seo';
export default Vue.extend({
    name: "IndexPage",
    data() {
        return {
            show: []
        };
    },
    head () {
      return seoHead({})
    },
    watch: {
        "$store.state.window.scroll.y"(val) {
            if (val > (this.$store.state.window.size.height * 0.5) && !this.show.includes("skills")) {
                this.revealHeroLinks();
            }
        }
    },
    mounted() {
        this.initGsap();
    },
    methods: {
        initGsap() {
            const els = {
                title: this.$el.querySelector(".hero-title"),
                wave: this.$el.querySelector(".hero-title .wave"),
                hi: this.$el.querySelector(".hero-title .hi"),
                name: this.$el.querySelector(".hero-title .name"),
                heroButtons: this.$el.querySelectorAll(".hero-links .button")
            };
            this.$gsap.set(els.heroButtons, { opacity: 0, marginTop: "-20px" });
            this.$gsap.set(els.hi, { opacity: 0, x: -20, scaleX: 0, scaleY: 0 });
            this.$gsap.set(els.name, { opacity: 0, y: -60 });
            this.$gsap.set(els.wave, { opacity: 0, scaleY: 1, scaleX: 1 });
            asyncDelay(100).then(() => {
              const onComplete = () => {
                  if (this.show.includes("subtitle")) {
                      return;
                  }
                  asyncDelay(300).then(() => this.show.push("subtitle"));
              };
              const tl = this.$gsap.timeline({
                  onComplete: onComplete.bind(this)
              });
              tl
                  .to(els.wave, { keyframes: [
                      { rotation: 0 },
                      { rotation: -7, opacity: 1, x: "125%", scaleY: 4, scaleX: 4 },
                      { rotation: 0 },
                      { rotation: 10 },
                      { rotation: 0 },
                      { rotation: -11, x: "125%", scaleY: 4, scaleX: 4  },
                      { rotation: 0 },
                      { rotation: 10, scaleY: 1, scaleX: 1, x: 0 },
                  ], duration: 1.5, ease: "power3.out" })
                  .to(els.hi, { opacity: 1, scaleY: 1, scaleX: 1, x: 0, duration: 0.4, ease: "power3.inOut" }, .75)
                  .to(els.name, { opacity: 1, y: 0, duration: 0.4, ease: "power3.in" });
            })
        },
        revealHeroLinks() {
            this.$gsap.to(".hero-links .button", { opacity: 1, marginTop: "0", duration: 0.2, ease: "none", stagger: 0.1, delay: 0.05 });
            this.$gsap.to("section.skills", {
                scrollTrigger: {
                    trigger: "section.skills",
                    onEnter: () => this.show.push("skills")
                }
            });
            this.continuePastHero();
        },
        continuePastHero() {
            setTimeout(() => {
                // this.show.push('skills');
                if (window.scrollY < 50) {
                    this.$gsap.to(window, { duration: 0.3, scrollTo: { y: ".hero-subtitle", offsetY: 150 } });
                }
            }, 1000);
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

