<template>
  <div class="about-career-blocks flex flex-col items-center content-start max-w-xl mx-auto">
    <h1 ref="title" class="title ml-0 relative z-10 text-left w-full">Work Experience:</h1>
    <p ref="subtitle" class="ml-0 mb-24 w-full text-gray-200 italic">2009—2022</p>
    <AboutCareerBlock 
      v-for="(block, i) in blocks"
      :key="block.title"
      :block="block"
      :block-index="i"
      class="pb-32"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    props: {
      start: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        blocks: [],
        shouldStart: !!this.start,
        doneTyping: false,
      }
    },
    async fetch() {
      if (this.blocks?.length) {return}
      return await this.$content('career').sortBy('start', 'desc').fetch()
        .then((res) => {
          if(!Array.isArray(res)) {
            this.blocks = []
          } else {
            this.blocks = res
          }
          return this.blocks
        })
    },
    watch: {
      start(val) {
        this.shouldStart = val
      },
    },
    mounted() {
        this.initGsap();
    },
    methods: {
      initGsap() {
        const els = {
          title: this.$refs.title,
          subtitle: this.$refs.subtitle,
        }
        this.$gsap.set(this.$el, {y: -40, opacity: 0})
        this.$gsap.set(els.subtitle, {y: 40, opacity: 0})
        this.$gsap.set(els.subtitle, {y: 40, opacity: 0})
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: els.title,
            start: 'top 90%',
            end: 'bottom 0%',
            delay: .1,
            toggle: 'play reverse play reverse'
          }
        });
        tl.to(this.$el, { y: 0, opacity: 1, ease: 'power3.in', duration: .4 })
          .to(els.title, { y: 0, opacity: 1, ease: 'power3.in', duration: .4 }, 0)
          .to(els.subtitle, { y: 0, opacity: 1, ease: 'power3.in', duration: .6 }, .2)
        
      }
    }
  })
</script>

<style lang="scss" scoped>
.about-career-blocks {
   @apply flex flex-col;
}
</style>