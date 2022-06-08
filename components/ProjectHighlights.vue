<template>
  <div 
    v-if="project"
    class="project-highlights w-full rounded-lg shadow-lg border border-gray-800 px-6 pt-4">
    
    <nuxt-link 
      class="project-highlights-heading scale-100 hover:scale-105 border border-gray-800 hover:-translate-y-1 transform block group items-center content-between py-6 px-2 hover:px-6 hover:bg-gray-800 hover:bg-opacity-50 bg-opacity-20 overflow-hidden transition-all hover:shadow-lg border-t-0 border-r-0 border-l-0 hover:border-transparent hover:rounded-lg"
      :to="`/projects/${project.slug}`">
      <div class="flex items-center content-start w-full">
        <Media
          ref="media"
          class="project-media w-12 h-auto mt-0 mb-auto mr-4"
          style="opacity: 0"
          :src="project.media" />
        <div class="overflow-hidden mr-auto">
          <h4
            ref="title"
            style="opacity: 0"
            class="project-title text-xl text-gray-200 my-auto pr-4">{{ project.title }}</h4>
            <small class="subtitle inline-block italic text-xs text-gray-500 font-medium">highlights</small>
          <!-- <h6
            ref="description" 
            style="opacity: 0"
            class="project-description description font-display text-sm text-gray-200">{{ project.description }}</h6> -->
        </div>
        <SvgIcon class="arrow opacity-20 group-hover:opacity-100 ml-auto mr-2 group-hover:translate-x-2 transition-all delay-200 duration-300" name="arrow-right" />
      </div>
    </nuxt-link>
      <LogosList :slugs="project.technologies" class="mt-6 ml-6" />
    <div 
      v-if="sections"
      class="project-sections grid gap-4 pt-4 py-8"
      :class="{
        [`grid-cols-${sections.length <= 1 ? '1' : '2'}`]: true
      }"
      @click="initGsap">
      <nuxt-link 
        v-for="section in sections"
        :key="section.slug"
        ref="section"
        :to="`/projects/${project.slug}#${section.handle}`"
        class="project-section max-w-md bg-gray-800 hover:scale-105 bg-opacity-30 rounded-lg p-6 block transform scale-100 hover:shadow-lg transition-all duration-200 hover:bg-opacity-50 hover:bg-gray-800">
        <h4 class="section-title text-gray-300 font-display font-bold text-xl mb-2 px-1">{{section.title}}</h4>
        <Media 
          :src="section.media[0]"
          class="section-media rounded-md overflow-hidden shadow-lg mb-6"
          />
        <nuxt-content :document="section" class="text-sm block px-1" />
        <template v-if="section.media.length > 0">
           <Media 
            v-for="media in section.media.slice(1)" 
            :key="media"
            :src="media"
            class="section-media rounded-md overflow-hidden shadow-lg mt-6"
            />
        </template>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { asyncDelay, handleize } from '~/utils/funcs'
  export default Vue.extend({
    props: {
        slug: {
            type: String,
            default: null
        }
    },
    data() {
        return { sections: null, project: null };
    },
    async fetch() {
        return await Promise.all([
            this.$content(`projects`)
                .where({ slug: { $eq: this.slug } })
                .fetch()
                .then(projects => {
                console.log({ projects });
                this.project = projects[0];
                return this.project;
            })
                .catch(console.error),
            this.$content(`projects/${this.slug}/sections`)
                .where({ highlight: { $eq: true } })
                .sortBy("slug", "asc").fetch()
                .then(sections => {
                this.sections = sections.map(section => { return { ...section, handle: handleize(section.title) }; });
                return this.sections;
            })
                .catch(console.error)
        ]);
    },
    mounted() {
        setTimeout(() => this.initGsap());
    },
    methods: {
        initGsap(tries = 0) {
            if (!this.$el?.querySelector && tries < 100) {
                return asyncDelay(25).then(() => {
                    return this.initGsap(tries + 1);
                });
            }
            const els = {
                media: this.$el.querySelector(".project-media"),
                subtitle: this.$el.querySelector(".subtitle"),
                title: this.$el.querySelector(".project-title"),
                description: this.$el.querySelector(".project-description"),
                arrow: this.$el.querySelector(".arrow"),
                sections: this.$gsap.utils.toArray(this.$el.querySelectorAll(".project-section")),
            };
            this.$gsap.set(this.$el, { scaleX: ".8", scaleY: ".8", opacity: 0 });
            this.$gsap.set(els.media, { scaleX: "0", scaleY: "0", opacity: 0 });
            this.$gsap.set(els.title, { x: "-2rem", opacity: 0 });
            this.$gsap.set(els.description, { y: "-1rem", opacity: 0 });
            this.$gsap.set(els.arrow, { scaleY: "0", scaleX: "0.5", x: "-1rem" });
            this.$gsap.set(els.sections, { scaleY: "0", scaleX: "0.5", y: "-1rem", opacity: 0 });
            this.$gsap.set(els.subtitle, { y: '-1rem', opacity: 0 })
            const tl = this.$gsap.timeline({
                ease: "power3.out",
                scrollTrigger: {
                    trigger: this.$el,
                    start: "top 75%",
                    end: "bottom 0%",
                    toggleActions: 'play pause play reverse'
                }
            });
            tl
              .to(this.$el, { scaleX: "1", scaleY: "1", opacity: 1 })
              .to(els.media, { scaleX: "1", scaleY: "1", opacity: 1, duration: 0.4 })
                .to(els.title, { x: "0rem", opacity: 1, duration: 0.4 }, 0.3)
                .to(els.arrow, { scaleY: "1", scaleX: "1", x: "0", duration: .4 }, .4)
                .to(els.subtitle, { y: '0rem', opacity: 1, duration: .6 }, .4)
                .to(els.sections, {
                    stagger: 0.15,
                    scaleY: "1",
                    scaleX: "1",
                    y: "0rem",
                    opacity: 1,
                    duration: 0.3,
                }, .4);
            ScrollTrigger.refresh()
        }
    }
})
</script>

<style lang="scss" scoped>
.project-highlights-heading {
  &:hover{
    @apply rounded-lg p-6
  }
}
</style>