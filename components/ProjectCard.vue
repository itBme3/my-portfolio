<template>
  <nuxt-link :to="'/projects/' + project.slug" class="project-card">
    <div class="card-inner">
      <Media
        class="card-media"
        :class="{[mediaClass]: true}"
        :src="project.media" />
      <div class="card-content overflow-hidden">
        <h1 class="card-title">{{ project.title }}</h1>
        <p class="card-description">{{ project.description }}</p>
      </div>
    </div>
    <LazyLogosList v-if="project.technologies && project.technologies.length && show.includes('technologies')" :slugs="project.technologies" />
  </nuxt-link>
</template>

<script>
  import Vue from 'vue'
import { asyncDelay } from '~/utils/funcs'

  export default Vue.extend({
    props: {
      project: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {show: []}
    },
    computed: {
      mediaClass() {
        if (typeof this.project?.classes?.card?.media === 'string') {
          return this.project.classes.card.media
        }
        if (typeof this.project?.classes?.media === 'string') {
          return this.project.classes.media
        }
        return ''
      }
    },
    mounted() {
      this.initGsap()
    },
    methods: {
      initGsap() {
        const els = {
          media: this.$el.querySelector('.card-media'),
          title: this.$el.querySelector('.card-title'),
          description: this.$el.querySelector('.card-description'),
        }
        this.$gsap.set(this.$el, { opacity: 0, scale: 0, y: 20, });
        this.$gsap.set(els.media, { opacity: .5, scale: 0, });
        this.$gsap.set(els.title, { opacity: 0, x: -50, });
        this.$gsap.set(els.description, { opacity: 0, y: -10, });
        let onEnter = () => {
          asyncDelay(300).then(() => this.show.push('technologies'))
        }
        onEnter = onEnter.bind(this)
        const tl = this.$gsap.timeline({
          smoothChildTiming: true,
          scrollTrigger: {
            trigger: this.$el,
            start: 'top bottom+=10%',
            scrub: false,
            toggleActions: 'play pause play pause',
            onEnter
          }
        });
        tl.to(this.$el, { opacity: 1, scale: 1, y: 0, ease: 'none', duration: .3 })
          .to(els.media, { opacity: 1, scale: 1, duration: .3 }, '-=.1')
          .to(els.title, { opacity: 1, x: 0, duration: .3 })
          .to(els.description, { opacity: 1, y: 1, duration: .3 }, '-=.1')
      }
    }
  })
</script>

<style lang="scss">
.project-card {
  @apply rounded-lg space-y-6 p-6 sm:py-12 sm:px-10 transform scale-100 hover:shadow-lg transition-all duration-300 ease-in-out border border-gray-800 hover:bg-gray-800 hover:bg-opacity-30 hover:border-transparent;
  &:hover {
    transform: scale(1.05) !important;
  }
  .card-inner {
    @apply flex w-full;
  }
  .card-media {
    @apply w-5/12 h-full mr-6 sm:mr-8 mt-0 rounded-md overflow-hidden shadow-lg;
    max-width: 80px;
  }
  .card-content {
     @apply w-full my-auto;
    .card-title {
      @apply font-display text-xl sm:text-2xl font-bold mb-2 sm:mb-0;
    }
    .card-description {
      @apply text-gray-300 text-sm;
    }
  }
}
</style>