<template>
  <div class="project page mx-auto max-w-3xl w-full flex flex-wrap">
    
      <div 
        v-if="project"
        class="project-heading pb-6 sm:pb-8"
      >

          <Media 
            v-if="showHeroMedia"
            class="pb-10 relative z-10" 
            :src="project.media"
            :class="{ [mediaClass]: true }" />
          <h1 class="title max-w-prose -ml-1">{{project.title}}</h1>
          <LogosList 
            v-if="project && project.technologies && project.technologies.length"
            :slugs="project.technologies"
            toggle-actions="play none none none"
            class="mt-4 mb-10 max-w-prose -ml-1"
          />
          <h4 class="subtitle mt-6 max-w-prose">
              {{project.description}}
              
          </h4>
          <nuxt-content 
            :document="project"
            class="mt-6 mb-2 max-w-prose"
          />

      </div>

      

      <div 
        class="project-content mx-0 flex sm:items-start flex-col sm:flex-row transition-all duration-500">
          <ProjectAside
            v-if="show.includes('sidebar')"
            class="order-first sm:order-last"
            :project="project"
            @section="e => scrollToSection(e)"
          />
          <ProjectSections v-if="show.includes('content')" :project="project" />
      </div>
      <div 
        v-if="show.includes('more-projects')"
        style="box-shadow: 0 -10 20px rgb(19, 19, 25)"
        class="more-projects w-full py-6 relative z-10 my-6 bg-gray-900"
      >
        <SectionProjects title="More Projects:" :slugs="project.related" />
      </div>
    </div>
    
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { asyncDelay } from '~/utils/funcs';
  import { seoHead } from '~/utils/seo';
  export default Vue.extend({
    async asyncData({ $content, route }) {
        const responses = await Promise.all([
          $content(`projects`).where({slug: {$eq: route.params.slug}})
            .limit(1).fetch()
            .then(res => res[0]),
          $content(`projects/${route.params.slug}/sections`)
            .sortBy('slug', 'asc').fetch()
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
    head () {
      return seoHead({
        title: this.project.title,
        description: this.project.description,
        image: this.project.media
      })
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
        this.initGsap()
    },
    methods: {
      scrollToSection(id) {
        let offsetY = Math.floor(this.$store.state.window.size.height * .1);
        if(offsetY < 100) {
          offsetY = 100;
        }
        this.$gsap.to(window, {duration: .8, scrollTo: { y: `section#${id}`, offsetY }})
        this.$gsap.to(window, {delay: .8, duration: .5, scrollTo: { y: `section#${id}`, offsetY }})
      },
      initGsap() {
        const els = {
          media: this.$el.querySelector('.project-heading .media'),
          title: this.$el.querySelector('.project-heading .title'),
          subtitle: this.$el.querySelector('.project-heading .subtitle'),
          content: this.$gsap.utils.toArray(this.$el.querySelectorAll('.project-heading .nuxt-content > *')),
        }
        this.show = []
        this.$gsap.set(els.media, {opacity: 0, scaleX: 0, scaleY: 0, y: 30})
        this.$gsap.set(els.title, {opacity: 0, y: 30})
        this.$gsap.set(els.subtitle, {opacity: 0, y: -40})
        this.$gsap.set(els.content, {opacity: 0, y: -30})
        let onStart = () => {

          asyncDelay(200).then(() => {
            this.show.push(this.$store.state.window.size.isMobile ? 'sidebar' : 'content');
          })
          asyncDelay(500).then(() => {
              this.show.push(this.$store.state.window.size.isMobile ? 'content' : 'sidebar');
              this.show.push('more-projects')
              ScrollTrigger.create({
                trigger: this.$el.querySelector('.project-sections'),
                start: 'bottom 80%'
              })
              if(this.$route.hash.length) {
                this.scrollToSection(this.$route.hash.replace('#', ''))
              }
          })
        }
        onStart = onStart.bind(this)
        const tl = this.$gsap.timeline({
          delay: .1
        });
        // asyncDelay(200).then(() => this.show.push('technologies'))
        tl
          .to(els.title, { opacity: 1, duration: 1, y: 0, ease: 'power3.inOut', onStart })
          .to(els.media, { opacity: 1, scaleX: '1', scaleY: '1', y: 0, duration: .6, ease: 'power3.out' }, '-=.6')
          .to(els.subtitle, { opacity: 1, y: 0, duration: .6, ease: 'power3.inOut' }, '-=.1')
          .to(els.content, { opacity: 1, y: 0, duration: .7, stagger: .25, ease: 'power3.inOut' }, '-=.4')
      }
    }
})
</script>

<style lang="scss">
.project.page {
  max-width: 48rem;
  .project-heading {
    .media {
      max-width: 80px;
    }
  }
  .more-projects {
    @apply pl-1;
    .section-projects {
      @apply pt-6 content-start;
      > div:nth-child(2) {
        @apply pt-4 space-y-6 ml-0 mr-auto #{!important};
      }
      .page-title {
          .title {
            @apply text-xl sm:text-2xl #{!important};
          }
          + div {
            @apply pt-0;
          }
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
}
</style>