<template>
  <header class="site-header"
    :class="{
      'nav-collapsed': isMobile && navCollapsed,
      'is-mobile': isMobile
    }">

    <button class="nav-link button shadow-none absolute left-0 top-0" @click="$router.push('/')">
      <img class="w-10 m-auto ml-0 h-auto" src="/favicon.svg" />
    </button>

    <nav class="navigation">
      <button class="nav-link button" @click="$router.push('/about')">about me</button>
      <button class="nav-link button" @click="$router.push('/projects')">projects</button>
      <button class="nav-link button" @click="$router.push('/resume')">resume</button>
      <button class="nav-link button" @click="$router.push('/contact')">get in touch</button>
    </nav>

    <button
      v-if="isMobile"
      class="mobile-nav-toggle"
      :style="{marginLeft: 'calc('+ $store.state.window.size.scrollBar +' + .5rem)'}"
      @click="navCollapsed = !navCollapsed">
      <div class="bar" />
      <div class="bar" />
      <div v-if="navCollapsed" class="bar" />
    </button>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    data(): {scrollObserver: any, resizeObserver: any, navCollapsed: boolean} {
      return {
        scrollObserver: undefined,
        resizeObserver: undefined,
        navCollapsed: true
      }
    },
    computed: {
      isMobile() {
        return !!this.$store.state?.window?.size?.isMobile
      }
    },
    watch: {
      '$route.path'() {
        this.navCollapsed = true
      }
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll, {passive: true});
      window.addEventListener('resize', this.onResize, {passive: true});
      this.$store.commit('window/setSizing')
      this.$store.commit('window/setScrolling')
    },
    destroyed() {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
    },
    methods: {
      onResize() {
        this.$store.commit('window/setSizing')
      },
      onScroll() {
        this.$store.commit('window/setScrolling')
      },
    }
  })
</script>

<style lang="scss" scoped>
.site-header {
  @apply fixed top-0 left-0 right-0 h-14 w-screen bg-gray-900 flex items-center content-start;
  z-index: 9;
}
nav {
  @apply flex space-x-2 my-auto ml-auto mr-0;
  .nav-link {
     @apply capitalize text-sm;
  }
}
.mobile-nav-toggle {
  @apply absolute top-4 right-4 w-6 h-6 block p-1 rounded-full;
  .bar {
    @apply transition-all ease-in-out duration-200 bg-gray-300 absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 w-full rounded rotate-45;
    height: .13rem;
    &:nth-child(2) {
      @apply -rotate-45;
    }
  }
}
.site-header {

  &.is-mobile {
    @apply items-start bottom-0 h-screen;
    nav {
      @apply relative left-0 top-0 bottom-0 content-center mx-auto;
      width: calc(100% - 4rem);
    }
    .nav-link {
      @apply text-left text-3xl capitalize;
    }
    &.nav-collapsed {
      @apply h-12 bg-opacity-95;
      nav {
        left: 110vw;
        bottom: 110vh;
        @apply h-0 w-0;
      }
    }
    &:not(.nav-collapsed) {
      @apply pt-10;
    }
    nav {
      @apply flex-col space-y-4 space-x-0;
    }
  }
  &.nav-collapsed {
    .mobile-nav-toggle {
        .bar {
          @apply transform rotate-0 w-full -translate-x-1/2;
          &:nth-child(1) {
            @apply -translate-y-2;
          }
          &:nth-last-child(1) {
            @apply translate-y-2;
          }
        }
    }
  }
}
</style>