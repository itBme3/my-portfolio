<template>
  <div class="about-career-blocks">
    <TypeSingleLine 
        :start="shouldStart"
        tag="h4"
        class="mb-16 base text-left relative -left-2 font-semibold"
        :class="{
          'italic text-gray-500': doneTyping,
          'text-gray-300': !doneTyping,
        }"
        :delay="0"
        @animationDone="() => doneTyping = true"
        >
        <template  v-if="doneTyping" #before><span class="relative text-gray-500 mr-px" style="top: -.5rem">// </span></template>
        Work Experience
    </TypeSingleLine>
    <AboutCareerBlock 
      v-for="block in blocks"
      :key="block.title"
      :block="block"
      class="mb-32 transition-all duration-500 transform ease-in-out"
      :class="{
        'scale-0 translate-y-[50vh]': !doneTyping,
        'opacity-100 scale-100': doneTyping
      }"
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
      },
      about: {
        type: Object,
        default: () => { return { career: [] } }
      }
    },
    data() {
      return {
        blocks: this.about?.career?.length ? this.about.career : [],
        shouldStart: !!this.start,
        doneTyping: false,
      }
    },
    watch: {
      start(val) {
        this.shouldStart = val
      },
    },
    async mounted() {
      try {
        this.blocks = await this.getBlocks();
        this.initGsap();
        return
      } catch(err) {
        alert(err)
      }
    },
    methods: {
     getBlocks(force = false) {
        if(!force) {
          if (this.about?.career?.length > 0) {
            this.blocks = this.about.career
            return this.blocks
          }
          if(this.blocks?.length) {
            return this.blocks
          }
        }
        return this.$content('about').fetch()
        .then((res) => {
          if(!Array.isArray(res?.career)) {
            this.blocks = []
          } else {
            this.blocks = res.career
          }
          return this.blocks
        })
      },
      initGsap() {
        let onEnter = () => {
          this.shouldStart = true
        }
        onEnter = onEnter.bind(this)
        this.$ScrollTrigger.create({
          trigger: this.$el,
          start: 'top 100%',
          onEnter
        })
      }
    }
  })
</script>

<style lang="scss" scoped>
.about-career-blocks {
   @apply flex flex-col;
}
</style>