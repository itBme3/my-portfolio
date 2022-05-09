<template>
  <div class="project page max-w-2xl mx-auto">

        <h1 class="page-title mb-3">{{project.title}}</h1>
        <h4 class="page-description">{{project.description}}</h4>
    <div class="mx-0 flex sm:items-start flex-col sm:flex-row">
      
        <ProjectAside 
          :project="project"
          class="sm:order-last"
        />

        <nuxt-content :document="project" class="sm:mr-8" />

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    pageTransition: 'page',
    async asyncData({ $content, route }) {
        const project = await $content("projects", route.params.slug).fetch();
        return { project };
    },
    data() {
        return {
            test: { body: "some test" }
        };
    }
})
</script>

<style scoped>

</style>