<template>
  <section v-if="projects.length > 0" class="section-projects">
    <PageTitle class="ml-0 w-full" :classes="{title: 'text-left'}">{{title}}</PageTitle>
    <div 
      class="flex flex-col space-y-10 py-8">
      <template v-for="project in projects">
        <ProjectCard 
          v-if="project.slug !== $route.params.slug"
          :key="project.slug" 
          :project="project"
          style="opacity: 0"
        />
      </template>
    </div>
  </section>
</template>

<script >
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
import { asyncDelay } from '~/utils/funcs'

  export default Vue.extend({
    props: {
      title: {
        type: String,
        default: 'Projects:'
      }
    },
    data() {
      return {timelines: [], show: []}
    },
    async fetch() {
      return await this.$store.dispatch('getProjects')
    },
    computed: {
      ...mapGetters({
        projects: 'projects'
      })
    },
    mounted() {
     this.initGsap()
     asyncDelay(300).then(() => this.initProjectAnimations())
    },
    methods: {
      initGsap(tries = 0) {
          const maxTries = 20
          if(!this.$el?.querySelectorAll) {
            if (tries >= maxTries) { return }
            return asyncDelay(150).then(this.initGsap(tries + 1))
          }
          console.log({try: tries})
          const cards = this.$gsap.utils.toArray(this.$el.querySelectorAll('.project-card'));
          cards.forEach(card => {
            const els = {
              media: card.querySelector('.card-media'),
              title: card.querySelector('.card-title'),
              description: card.querySelector('.card-description'),
            }
            this.$gsap.set(card, { opacity: 0, scale: 0, y: 20, });
            this.$gsap.set(els.media, { opacity: .5, scale: 0, });
            this.$gsap.set(els.title, { opacity: 0, x: -50, });
            this.$gsap.set(els.description, { opacity: 0, y: -10, });
            
          })

      },
      initProjectAnimations() {
        const cards = this.$gsap.utils.toArray(this.$el.querySelectorAll('.project-card'));
          cards.forEach((card, i) => {
            asyncDelay((i) * 300).then(() => {
            const els = {
              media: card.querySelector('.card-media'),
              title: card.querySelector('.card-title'),
              description: card.querySelector('.card-description'),
              // logos: card.querySelector('.logos-list'),
            }
            const tl = this.$gsap.timeline({
              smoothChildTiming: true,
              scrollTrigger: {
                trigger: card,
                start: 'top bottom+=10%',
                scrub: false,
                toggleActions: 'play pause play pause'
              }
            });
            tl.to(card, { opacity: 1, scale: 1, y: 0, ease: 'none', duration: .3 });
            tl.to(els.media, { opacity: 1, scale: 1, duration: .3 }, '-=.1');
            tl.to(els.title, { opacity: 1, x: 0, duration: .3 });
            tl.to(els.description, { opacity: 1, y: 1, duration: .3 }, '-=.1');
            this.timelines.push(tl)
          });
        })
      }
    }
  })
</script>

<style scoped>

</style>