
<template>
  <div class="site-container overflow-x-hidden inline">

    <!-- <SiteNav /> -->

    <main
      class="w-screen transform mx-auto px-2 z-1"
      style="display: block;"
    >
      <Nuxt :key="$route.fullPath" />
    </main>

    <!-- <SiteFooter /> -->
      
  </div>
</template>

<script>
import Vue from 'vue'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
export default Vue.extend({
  watch: {
    '$route.path'() {
      if(window !== undefined) {
        window.scrollTo({top: 0, left: 0})
      }
    }
  }
})
</script>