<template>
  <div class="project page mx-auto narrow">
    <div class="project-heading py-12 flex flex-wrap">
      <PageTitle 
        :classes="{subtitle: 'mt-4 mb-6 sm:mt-2 sm:mb-auto', title: 'sm:mt-auto'}"
        class="flex flex-col content-center sm:pr-6 sm:w-2/3 !mt-0 sm:mt-0">
        {{project.title}}
        <template #subtitle>
          {{project.description}}
        </template>
      </PageTitle>
      <Media 
        class="sm:w-1/3 max-w-xs my-auto rounded-md overflow-hidden" 
        :src="project.media" />
      <LogosList 
        v-if="project && project.technologies && project.technologies.length && show.includes('technologies')"
        :slugs="project.technologies"
        toggle-actions="play none none none"
        class="mt-6"
      />
    </div>
      <div 
        class="project-content mx-0 flex sm:items-start flex-col sm:flex-row transition-all duration-500">
        
        <transition name="up-fade" :duration="1000">
          <ProjectAside
            v-if="show.includes('sidebar')"
            :project="project"
            class="sm:order-last"
            @section="e => scrollToSection(e)"
          />
        </transition>

        <transition name="down-fade">
          <nuxt-content 
            v-if="show.includes('content')" 
            :document="project" class="sm:mr-8" />
        </transition>

      </div>
  </div>
</template>

<script>
  import Vue from 'vue'
import { asyncDelay } from '~/utils/funcs';
  export default Vue.extend({
    pageTransition: 'page',
    async asyncData({ $content, route }) {
        const project = await $content("projects", route.params.slug).fetch();
        return { project };
    },
    data() {
        return {
            test: { body: "some test" },
            show: []
        };
    },
    watch: {
      '$route.hash'(val) {
        if(val.length > 0) {
          this.scrollToSection(val.replace('#', ''))
        }
      }
    },
    mounted() {
      

      asyncDelay(500).then(() => {
        this.show.push('technologies')
      })

      asyncDelay(1000).then(() => {
        this.show.push('content')
        if(this.$route.hash.length) {
          asyncDelay(1000).then(() => this.scrollToSection(this.$route.hash.replace('#', '')))
        }
      })
      asyncDelay(1500).then(() => {
          this.show.push('sidebar')
      })
    },
    methods: {
      scrollToSection(id) {
        this.$gsap.to(window, {duration: .8, scrollTo: { y: `section#${id}`, offsetY: 70 }})
        this.$gsap.to(window, {delay: .8, duration: .5, scrollTo: { y: `section#${id}`, offsetY: 70 }})
      }
    }
})
</script>

<style scoped>

</style>