<template>

  <aside 
    class="project-aside"
    style="opacity: 0"
    :class="{
      'desktop': !$store.state.window.size.isMobile
    }">

    <small class="text-sm font-display font-semibold tracking-wider block mb-2 text-gray-400">In Project:</small>

      <div class="section-links flex flex-col py-2 px-4 rounded-lg border-gray-700 border">
        <button
          v-for="(link, i) in sectionLinks"
          :key="link.id"
          class="border text-left rounded-none border-l-0 border-r-0 hover:border-transparent hover:rounded border-t-0 flex flex-start p-2 -mx-2 hover:rounded border-gray-700 hover:bg-gray-800 bg-opacity-50"
          :class="{
            'text-white': sectionsInView.includes(link.id),
            'text-gray-200 hover:text-white': !sectionsInView.includes(link.id),
            'border-b-0': i + 1 === sectionLinks.length
          }"
          @click="setHash(link.id)">
          <SvgIcon name="link" class="my-auto w-4 text-gray-600 mr-2 scale-80 transform mt-1" /> {{ link.label }}
        </button>
      </div>

      <div 
        v-if="project.links"
        class="project-links flex flex-col space-y-1 mt-3">
        <small class="text-sm font-display font-semibold tracking-wider block mb-1 text-gray-400">Links:</small>
        <template
            v-for="linkType in ['live', 'github']" 
        >
          <component 
            :is="project.links[linkType] !== 'private' ? 'a' : 'nuxt-link'"
            v-if="project.links[linkType]"
            :key="linkType"
            :href="project.links[linkType] !== 'private' ? project.links[linkType] : undefined"
            :to="project.links[linkType] === 'private' ? '/contact' : undefined"
            :target="project.links[linkType] !== 'private' ? '_blank' : undefined"
            class="inline-flex cursor-pointer button items-center text-xs py-1 px-2 bg-gray-800 hover:bg-gray-800 bg-opacity-50 hover:bg-opacity-100">
            <SvgIcon :name="linkType" class="mr-2 w-4 h-auto" />
            <span v-if="project.links[linkType] !== 'private'">{{ linkType }}</span>
            <span v-else>Contact me for demo</span>
          </component>
        </template>
      </div>
  </aside>

</template>

<script>
import Vue from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { asyncDelay, handleize } from '~/utils/funcs'
  export default Vue.extend({
    props: {
      project: {
        type: Object,
        default: () => {return {}}
      }
    },
    data: () => ({
      pinScrolling: null,
      sectionsInView: [],
      triggerRefreshed: 0
    }),
    computed: {
      sectionLinks() {
        if(!this.project || !this.project.sections) {
          return []
        }
        return this.project.sections.map(section => {
          return { label: section.title, id: handleize(section.title) }
        })
      }
    },
    watch: {
      '$store.state.window.size.isMobile'(val) {
        if (this.pinScrolling && this.pinScrolling.kill) {
          this.pinScrolling.kill();
        }
        console.log({val})
        if (!val) {
          this.initGsap();
        } else {
          this.$gsap.to('.project-aside', { x: 0, y: 0, opacity: 1 })
          this.initGsap();
        }
      }
    },
    mounted() {
      this.initGsap()
      this.initSectionScrollTracking()
      this.$gsap.set('.project-aside', { minWidth: '180px', x: -40, opacity: 0 });
      this.$gsap.to('.project-aside', { delay: 1, opacity: 1, x: 0, duration: .3 });

    },
    methods: {
      initGsap() {
        asyncDelay(500).then(() => {
          
          this.$gsap.set('.project-aside.desktop', { minWidth: '180px' });
          this.pinScrolling = this.$gsap.to('.project-aside.desktop', {
            scrollTrigger: {
              trigger: '.project-sections',
              pin: '.project-aside.desktop',
              end: 'bottom 25%',
              pinSpacing: false,
              pinType: 'transform',
              anticipatePin: 2,
            },
            marginTop: '70px'
          });
          ScrollTrigger.refresh()
        })
      },
      initSectionScrollTracking() {
        const sections = this.$gsap.utils.toArray(this.$el.parentNode.parentNode.querySelectorAll('section'));
        const triggers = [];
        
        sections.forEach((el) => {
          const sectionId = el.getAttribute('id');
          let onEnterBack = () => {
            if(this.sectionsInView.includes(sectionId)) {
              return;
            }
            this.sectionsInView.push(sectionId)
          }
          let onEnter = () => {
            onEnterBack();
            if(this.triggerRefreshed < sections.length) {
              // asyncDelay(1000).then(() => ScrollTrigger.refresh())
              this.triggerRefreshed = this.triggerRefreshed + 1
            }
          }
          onEnterBack = onEnterBack.bind(this)
          onEnter = onEnter.bind(this)
          let onLeave = () => {
            this.sectionsInView = this.sectionsInView.filter(id => id !== sectionId)
          }
          onLeave = onLeave.bind(this)
          triggers.push(this.$gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              end: 'bottom 20%',
              endTrigger: el,
              onEnter, onEnterBack,
              onLeave, onLeaveBack: onLeave,
            },
          }));
          
        });
      },
      setHash(id) {
        history.pushState({}, "", `#${id}`)
        this.$emit('section', id)
      }
    }
  })
</script>

<style scoped>
.project-aside {
  @apply mb-auto ml-auto mr-0 mt-0 w-32 block;
  &:not(.desktop) {
    @apply ml-0 w-full my-6 border-transparent p-0;
    max-width: 320px;
  }
  .section-links {
    a:nth-last-child(1) {
      @apply border-b-0;
    }
  }
}
</style>