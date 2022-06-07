<template>
  <div 
    v-if="project"
    class="project-highlights">
    <nuxt-link 
      class="project-highlights-heading flex group items-center content-start space-x-4 mb-6 p-4 hover:bg-gray-800 hover:bg-opacity-20 overflow-hidden transition-all hover:shadow-lg rounded-lg"
      :to="`/projects/${project.slug}`">
      <Media
        ref="media"
        class="project-media w-12 h-auto mt-0 mb-auto"
        style="opacity: 0"
        :src="project.media" />
      <div class="overflow-hidden">
        <h4
          ref="title"
          style="opacity: 0"
          class="project-title text-2xl text-gray-400 mb-2">{{ project.title }}</h4>
        <h6
          ref="description" 
          style="opacity: 0"
          class="project-description description font-display text-sm text-gray-200">{{ project.description }}</h6>
      </div>
    </nuxt-link>
    <div 
      v-if="sections"
      class="project-sections grid gap-8 pt-4 py-8"
      :class="{
        [`grid-cols-${sections.length <= 1 ? '1' : '2'}`]: true
      }"
      @click="initGsap">
      <nuxt-link 
        v-for="section in sections"
        :key="section.slug"
        ref="section"
        :to="`/projects/${project.slug}#${section.handle}`"
        class="project-section border-gray-800 bg-transparent rounded-lg block hover:scale-105 transform scale-100 hover:shadow-lg transition-all duration-200 p-4 hover:bg-opacity-30 hover:bg-gray-800">
        <h4 class="section-title text-gray-500 font-display font-bold text-xl mb-2">{{section.title}}</h4>
        <Media 
          v-for="media in section.media" 
          :key="media"
          :src="media"
          class="section-media rounded-md overflow-hidden shadow-lg mb-6"
          />
        <nuxt-content :document="section" class="text-sm block" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
import { asyncDelay, handleize } from '~/utils/funcs'

  export default Vue.extend({
    props: {
      slug: {
        type: String,
        default: null
      }
    },
    data() {
      return {sections: null, project: null}
    },
    async fetch() {
      return await Promise.all([
        this.$content(`projects`)
            .where({ slug: { $eq: this.slug } })
            .fetch()
              .then(projects => { 
                console.log({projects})
                this.project = projects[0]; 
                return this.project; 
              })
              .catch(console.error),
        this.$content(`projects/${this.slug}/sections`)
            .where({ highlight: { $eq: true } })
            .sortBy('slug', 'asc').fetch()
              .then(sections => { 
                this.sections = sections.map(section => { return { ...section, handle: handleize(section.title) }})
                return this.sections
                })
              .catch(console.error)
        ])
    },
    mounted() {
      setTimeout(() => this.initGsap());
    },
    methods: {
      initGsap(tries = 0) {
        if(!this.$el?.querySelector && tries < 100) {
          return asyncDelay(25).then(() => {
            return this.initGsap(tries + 1);
          })
        }
        const els = {
          media: this.$el.querySelector('.project-media'),
          title: this.$el.querySelector('.project-title'),
          description: this.$el.querySelector('.project-description'),
          sections: this.$gsap.utils.toArray(this.$el.querySelectorAll('.project-section')),
        }
        this.$gsap.set(els.media, { scaleX: '0', scaleY: '0', opacity: 0 })
        this.$gsap.set(els.title, { x: '-2rem', opacity: 0 })
        this.$gsap.set(els.description, { y: '-1rem', opacity: 0 })
        this.$gsap.set(els.sections, {scaleY: '0', scaleX: '0.5', y: '-1rem', opacity: 0 })
        const tl = this.$gsap.timeline({
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.$el,
            start: 'top 85%',
            end: 'bottom 0%',
          }
        })
        tl.to(els.media, { scaleX: '1', scaleY: '1', opacity: 1, duration: .4 })
          .to(els.title, { x: '0rem', opacity: 1, duration: .4 }, .3)
          .to(els.description, { y: '0rem', opacity: 1, duration: .3 }, '-=.1')
          .to(els.sections, {
            stagger: .15,
            scaleY: '1',
            scaleX: '1',
            y: '0rem',
            opacity: 1,
            duration: .3,
          })
      }
    }
  })
</script>

<style scoped>

</style>