<template>
  <div class="project page flex">
    <div class="max-w-md mx-auto">
      
        <h1 class="page-title mb-3">{{project.title}}</h1>
        <h4 class="page-description">{{project.description}}</h4>

        <nuxt-content :document="project" />

    </div>
    <ProjectAside 
      :project="project"
      :style="{ top: $store.state.window.scroll.y > 100 && !$store.state.window.size.isMobile ? '' : 'auto' }"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
import { gsap } from 'gsap'
  export default Vue.extend({
    async asyncData({ $content, route }) {
        const project = await $content("projects", route.params.slug).fetch();
        return { project };
    },
    data() {
        return {
            test: { body: "some test" }
        };
    },
    mounted() {
      setTimeout(() => this.initGsap(), 600)
    },
    methods: {
      initGsap() {
        console.log('aside', this.$el.querySelector('aside'));
        gsap.from(this.$el.querySelector('aside'), {
            scrollTrigger: {
              trigger: this.$el.querySelector('aside'),
              start: 'top top',
              pin: true,
              pinSpacing: false,
              // pinType: 'transform',
              anticipatePin: 1,
            }
          })
      }
    }
})
</script>

<style scoped>

</style>