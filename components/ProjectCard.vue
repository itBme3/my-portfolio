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
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
      asyncDelay(400).then(() => {
        this.show.push('technologies');
      })
    }
  })
</script>

<style lang="scss">
.project-card {
  @apply rounded-lg space-y-6 p-6 sm:p-14 transform scale-100 hover:shadow-lg transition-all duration-300 ease-in-out border border-gray-800 hover:bg-gray-800 hover:bg-opacity-30 hover:border-transparent;
  &:hover {
    transform: scale(1.05) !important;
  }
  .card-inner {
    @apply flex space-x-4 w-full;
  }
  .card-media {
    @apply w-5/12 h-full sm:mr-4 mt-0 rounded-md overflow-hidden shadow-lg;
    max-width: 80px;
  }
  .card-content {
     @apply w-full my-auto sm:pl-2;
    .card-title {
      @apply font-display text-xl sm:text-2xl font-bold;
    }
    .card-description {
      @apply text-gray-300 text-sm;
    }
  }
}
</style>