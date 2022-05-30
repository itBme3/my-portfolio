<template>
  <div class="project page mx-auto">
    <div 
      v-if="project"
      class="project-heading py-12 flex flex-wrap md:flex-nowrap"
      >
      <PageTitle 
        :classes="{subtitle: 'mt-4 mb-6 sm:mt-2 sm:mb-auto', title: 'sm:mt-auto'}"
        class="flex flex-col content-center !mt-0 sm:mt-0"
        :class="{
          'sm:w-2/3': showHeroMedia
        }"
        @animationDone="() => {
          show.push('technologies')
          asyncDelay(500).then(() => {
            show.push('content')
            show.push('sidebar')
          })
        }">
        {{project.title}}
        <template #subtitle>
          {{project.description}}
        </template>
      </PageTitle>
      <Media 
        v-if="showHeroMedia"
        class="sm:w-1/3 max-w-xs m-auto ml-0 sm:pl-6 sm:ml-auto sm:mr-0 rounded-md overflow-hidden" 
        :src="project.media"
        :class="{ [mediaClass]: true }" />
    </div>
    <LogosList 
      v-if="project && project.technologies && project.technologies.length && show.includes('technologies')"
      :slugs="project.technologies"
      toggle-actions="play none none none"
      class="mb-12 "
      
    />
    <nuxt-content 
      v-if="show.includes('content')" 
      class="w-full block max-w-lg"
      :document="project"
    />





      <div 
        class="project-content mx-0 flex sm:items-start flex-col sm:flex-row transition-all duration-500">
        
          <ProjectAside
            v-if="show.includes('sidebar')"
            :project="project"
            class="sm:order-last"
            @section="e => scrollToSection(e)"
          />
          <ProjectSections v-if="show.includes('content')" :project="project" />
      </div>
      <div 
        v-if="show.includes('more-projects')"
        class="more-projects w-full p-4 relative z-10"
      >
        <LazySectionProjects
          key="projectsCollection"
        />
      </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { asyncDelay } from '~/utils/funcs';
  export default Vue.extend({
    async asyncData({ $content, route }) {
        const responses = await Promise.all([
          $content(`projects`).where({slug: {$eq: route.params.slug}})
            .limit(1).fetch()
            .then(res => res[0]),
          $content(`projects/${route.params.slug}/sections`)
            .sortBy('slug', 'desc').fetch()
              .then(sections => { return {sections} })
        ]);
        return {
          project: responses.reduce((acc, res) => {
            return {...acc, ...res}
          }, {})
        }
    },
    data() {
        return {
            show: [],
            asyncDelay,
            project: null
        };
    },
    computed: {
      showHeroMedia() {
        return this.project?.media 
          && !this.project.sections.reduce((acc, section) => {
            return [...acc, ...section.media]
          }, []).includes(this.project.media)
      },
      mediaClass() {
        return this.project?.classes?.media || ''
      }
    },
    watch: {
      '$route.hash'(val) {
        if(val.length > 0) {
          this.scrollToSection(val.replace('#', ''))
        }
      }
    },
    mounted() {


      asyncDelay(2000).then(() => {
          asyncDelay(1000).then(() => {
            this.show.push('more-projects')
            ScrollTrigger.create({
              trigger: this.$el.querySelector('.project-sections'),
              start: 'bottom 80%'
            })
            if(this.$route.hash.length) {
              this.scrollToSection(this.$route.hash.replace('#', ''))
            }
          })
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

<style lang="scss">
.project.page {
  max-width: 52rem;
  .media {
    &.icon {
      max-width: 160px;
    }
  }
  .section-projects {
    @apply content-start;
    > div {
      @apply space-y-6 ml-0 #{!important};
    }
    .project-card {
      @apply bg-gray-900 hover:bg-gray-800 shadow-lg p-8 ml-0;
      max-width: 33rem;
      .logos-list {
        @apply hidden;
      }
    }
  }
}
</style>