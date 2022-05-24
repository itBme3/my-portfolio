
<template>
  <div class="site-container overflow-x-hidden inline">

    <SiteHeader />

    <main
      class="w-screen transform mx-auto px-2 z-1 bg-gray-900 relative"
      style="display: block"
    >
      <Nuxt :key="$route.fullPath" />
    </main>

    <!-- <SiteFooter /> -->
      
  </div>
</template>

<script>
import Vue from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { gsap } from 'gsap'
import { asyncDelay } from '~/utils/funcs'
// if (process.client) {
//     gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// }
export default Vue.extend({
  watch: {
    '$route.path'() {
      if(window !== undefined) {
        window.scrollTo({top: 0, left: 0})
        asyncDelay(300).then(() => {
          if(window.scrollY > 0) {
            window.scrollTo({top: 0, left: 0})
          }
        })
      }
    }
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }
})
</script>

<style lang="scss">

html,
body {
  font-family: 'Red Hat Mono', monospace;
  background-color: rgb(19, 19, 25);
}
body {
  @apply text-gray-100 overflow-x-hidden w-screen;
}


main {
  @apply pt-10 sm:pt-20 md:pt-24 h-auto min-h-screen;
}

.page {
  @apply px-6 xs:px-8;
}

.title {
  @apply font-display font-black text-gray-600 text-3xl xs:text-4xl md:text-5xl;
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
    @apply max-w-4xl;
  }
}
.page {
  @apply max-w-page mx-auto;
  &.narrow {
      @apply max-w-3xl;
    }
    &.narrowest {
      @apply max-w-md;
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