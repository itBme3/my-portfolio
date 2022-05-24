<template>
  <div class="projects page narrow">
    <PageTitle>
      Projects:
    </PageTitle>
    <div 
      class="flex flex-col space-y-10 py-8">
      <ProjectCard 
        v-for="project in projects"
        :key="project.slug" 
        :project="project"
        style="opacity: 0"
      />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
import { asyncDelay } from '~/utils/funcs';

  export default Vue.extend({
    transition: 'page',
    async asyncData({$content}) {
      const projects = await $content('projects').sortBy('order', 'asc').fetch();
      return { projects }
    },
    data() {
      return {timelines: [], show: []}
    },
    mounted() {
     this.initGsap()
    //  asyncDelay(300).then(() => )
    this.initProjectAnimations()
    },
    methods: {
      initGsap() {

          const cards = this.$gsap.utils.toArray(this.$el.querySelectorAll('.project-card'));
          cards.forEach(card => {
            const els = {
              media: card.querySelector('.card-media'),
              title: card.querySelector('.card-title'),
              description: card.querySelector('.card-description'),
              // logos: card.querySelector('.logos-list'),
            }
            this.$gsap.set(card, { opacity: 0, scale: 0, y: 20, });
            this.$gsap.set(els.media, { opacity: .5, scale: 0, });
            this.$gsap.set(els.title, { opacity: 0, x: -50, });
            this.$gsap.set(els.description, { opacity: 0, y: -10, });
            // this.$gsap.set(els.logos, { y: -20, opacity: 0, });
            
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
            // tl.to(els.logos, { y: 0, opacity: 1, duration: .2 }, '-=.2');
            this.timelines.push(tl)
          });
        })
      }
    }
  })
</script>

<style scoped>

</style>