<template>
  <section 
      :id="section.id"
      class="block border border-gray-800 border-opacity-50 border-l-0 border-r-0 border-t-0 pr-6 sm:pr-8 py-10 sm:py-16 h-auto my-0 sm:mr-8 sm:my-8 ml-0 mr-auto"
      style="opacity: 0">
      <h3 
        class="section-title text-2xl text-gray-400 font-display font-black relative z-0 mb-4"
        :class="{ [classes.title]: true }">
        {{ section.title }}
      </h3>
      
      <template v-if="section.media">
        <Media 
          :src="typeof section.media === 'string' ? section.media : section.media[0]"
          class="rounded-md shadow-lg shadow-gray-100/40 overflow-hidden relative z-10 mb-8"
          :class="{ [classes.media]: true }" />
      </template>
      
      <nuxt-content 
        class="section-text font-light text-gray-200 relative z-0 px-1"
        :class="{ [classes.content]: true }"
        :document="section" />
      
      <div 
        v-if="Array.isArray(section.media) && section.media.length > 1"
        class="more-media mt-8"
        >
        <template v-for="(media, i) in section.media">
          <Media 
            v-if="i > 0"
            :key="media"
            :src="media"
            class="rounded-md shadow-lg mt-6 p-2 border border-gray-800 shadow-gray-400 overflow-hidden relative z-10"
            :class="{ [classes.media]: true }" />
        </template>
      </div>

    </section>
</template>

<script>
  import Vue from 'vue'
import { asyncDelay } from '~/utils/funcs'
  export default Vue.extend({
    props: {
      section: {
        type: Object,
        default: () => {return {}}
      }
    },
    computed: {
      classes() {
        const { media = '', title = '', content = '' } = this.section?.classes || {}
        return { media, title, content }
      }
    },
    mounted () {
      this.initGsap()
    },
    methods: {
      initGsap () {
      asyncDelay(300).then(() => {
        const els = {
          title: this.$el.querySelector('.section-title'),
          media: this.$el.querySelectorAll('.media'),
          text: this.$el.querySelector('.section-text'),
        }
        this.$gsap.set(this.$el, { opacity: 0, scaleY: 0 });
        this.$gsap.set(els.media, { opacity: 0, scaleX: .2, scaleY: .8 });
        this.$gsap.set(els.title, { opacity: 0, y: -100, });


        const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: this.$el,
              start: `top 120%`,
              end: 'bottom 0%',
              toggleActions: 'play pause play pause',
              fastScrollPast: true
            },
          });
          if(els.title) {
            this.$gsap.set(els.title, { opacity: 0, scaleX: 1, scaleY: 1, y: 20, });
          }
          if(els.media) {
            this.$gsap.set([els.media], { opacity: 0, scaleX: .2, scaleY: .2 });
          }
          if(els.text) {
            this.$gsap.set([els.text], { y: -40, opacity: 0 });
          }
          const defaults = { y: 0, x: 0, scaleY: 1, scaleX: 1, opacity: 1, ease: 'power1.inOut', duration: .3 };

            tl.to(this.$el, {opacity: 1, scaleY: 1, duration: .6, ease: 'power1.inOut'})

            if(els.media) {
              tl
              .to(els.media, {
                ...defaults,
                duration: .4,
              })
            }
            if(els.title) {
              tl.to(els.title, {
                ...defaults,
                duration: .4,
              }, '-=.2')
            }

          if (!els.text) {
            return
          };
          this.$gsap.to(els.text, {
            scrollTrigger: {
              trigger: els.text,
              start: 'top 90%',
              end: 'bottom 0%',
              toggleActions: 'play reverse play reverse',
              fastScrollPast: true
            },
            ...defaults,
            ease: 'power1.inOut',
            duration: .4,
            delay: .6
          })
      })
    }
    }
  })
</script>

<style scoped>

</style>