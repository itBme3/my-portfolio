<template>
  <section 
      :id="section.id"
      class="block rounded-lg h-auto py-6 px-4 bg-gray-800 bg-opacity-20 mb-4 ml-0 mr-auto">
      <h3 class="section-title text-2xl text-gray-100 font-display font-black relative z-0 mb-4 px-1">
        {{ section.title }}
      </h3>
      
      <template v-if="section.media">
        <Media 
          :src="typeof section.media === 'string' ? section.media : section.media[0]"
          class="rounded-md shadow-lg shadow-black/40 overflow-hidden relative z-10 mt-2 mb-2" />
      </template>
      
      <nuxt-content 
        class="section-text font-light text-gray-300 relative z-0 mt-6 px-1" 
        :document="section" />
      
      <div 
        v-if="Array.isArray(section.media) && section.media.length > 1"
        class="more-media pt-4"
        >
        <template v-for="(media, i) in section.media">
          <Media 
            v-if="i > 0"
            :key="media"
            :src="media"
            class="rounded-md shadow-lg shadow-black/40 overflow-hidden relative z-10 mt-4 mb-8" />
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
    mounted () {
      this.initGsap()
    },
    methods: {
      initGsap () {
      this.$gsap.set(this.$el, {opacity: 0})
      this.$gsap.to(this.$el, {opacity: 1, delay: .3})
      asyncDelay(300).then(() => {
        const els = {
          title: this.$el.querySelector('.section-title'),
          media: this.$el.querySelector('.media'),
          text: this.$el.querySelector('.section-text'),
        }
        this.$gsap.set(this.$el, { opacity: 0, scaleY: 0 });
        this.$gsap.set(els.media, { opacity: 0, scaleX: .2, scaleY: .8 });
        this.$gsap.set(els.title, { opacity: 0, y: -100, });


        const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: this.$el,
              start: `top ${`${this.section.slug}` === `0` ? '120%' : '100%'}`,
              end: 'bottom -20%',
              toggleActions: 'play pause play pause'
            },
          });
          this.$gsap.set(this.$el, { opacity: 0, scaleY: 0 });
          if(els.title) {
            this.$gsap.set(els.title, { opacity: 0, scaleX: 1, scaleY: 1, y: 20, });
          }
          if(els.media) {
            this.$gsap.set([els.media], { opacity: 0, scaleX: .2, scaleY: .2 });
          }
          if(els.text) {
            this.$gsap.set([els.text], { y: -80, opacity: 0 });
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
              toggleActions: 'play pause play reverse',
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