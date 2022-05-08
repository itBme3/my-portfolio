
<template>
  <div class="site-container overflow-x-hidden inline">

    <SiteHeader />

    <main
      class="w-screen transform mx-auto px-2 z-1 bg-gray-900 relative"
      style="display: block; margin-bottom: 50vh"
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

<style lang="scss">

main {
  @apply pt-24;
}

.page-title {
  @apply font-display text-gray-600 text-2xl sm:text-4xl md:text-5xl;
}


.section-content {
  @apply mx-auto w-full;
  // width: calc(100% - 4rem);
  &:not([class*="mt-"]) {
    @apply mt-auto;
  }
  &:not([class*="mb-"]) {
    @apply mb-auto;
  }
  &:not([class*="pt-"]) {
    @apply pt-20;
  }
  &:not([class*="mb-"]) {
    @apply pb-20;
  }
  // @media screen and (min-width: 768px) {
  //   width: calc(100% - 6rem);
  // }
  &:not(.w-full) {
    @apply max-w-5xl;
  }
}
.page {
  @apply mx-auto;
  &.narrow {
      @apply max-w-md;
    }
    &.narrowest {
      @apply max-w-sm;
    }
}
section, .page-section {
    @apply flex flex-col items-center content-center w-full;
    height: 60vh;
    min-height: 40px;
    &.narrow {
      .section-content {
        @apply max-w-md;
      }
    }
    &.narrowest {
      .section-content {
        @apply max-w-sm;
      }
    }
    &.hero {
      @apply mb-6;
      .hero-links {
        .button {
          @apply  bg-gray-800 bg-opacity-50 hover:bg-opacity-100 text-xs flex items-center content-start;
        }
      }
    }
}

</style>