<template>
  <header
    class="site-header bg-gray-900"
    :class="{
      'nav-collapsed': isMobile && navCollapsed,
      'is-mobile': isMobile
    }">

    <nuxt-link
      to="/"
      class="nav-link shadow-none absolute left-0 top-0 !hover:bg-transparent !hover:shadow-none" 
      @click="navCollapsed = true"
      >
      <img 
      class="w-10 m-auto ml-0 h-auto"
      src="/favicon.svg" 
      @click="navCollapsed = true"
      />
    </nuxt-link>

    <template v-for="width in ['desktop','mobile']" >
      <TransitionGroup
        v-if="isMobile && width === 'mobile' || !isMobile && width === 'desktop'"
        :key="width" class="navigation"
        name="left-fade"
        duration="1000"
        tag="nav"
        :class="{ [width]: true }">
        <template v-for="(link, i) in links">
          <nuxt-link
            v-if="!isMobile || (!navCollapsed && showIndex >= i)"
            :key="link.path"
            class="nav-link button"
            :class="{
              'redacted-reveal': width === 'mobile' && !navCollapsed,
            }"
            :to="link.path">
            {{link.title}}
          </nuxt-link>
        </template>
      </TransitionGroup>
    </template>

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

<script>
  import Vue from 'vue'
  import { asyncDelay } from '~/utils/funcs'
  export default Vue.extend({
    data() {
      return {
        scrollObserver: undefined,
        resizeObserver: undefined,
        navCollapsed: true,
        mobileNavAnimation: undefined,
        showIndex: -1
      }
    },
    computed: {
      isMobile() {
        return !!this.$store.state?.window?.size?.isMobile
      },
      links() {
        return this.$store.state.content.navLinks
      }
    },
    watch: {
      '$route.path'() {
        this.navCollapsed = true
      },
      navCollapsed(val) {
        if(val) {
          this.showIndex = -1
          return
        }
        for (let i = 0; i < this.links.length; i++) {
          asyncDelay(i * 100).then(() => {this.showIndex = i})
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll, {passive: true});
      window.addEventListener('resize', this.onResize, {passive: true});
      this.onResize();
      this.onScroll()
    },
    destroyed() {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
    },
    methods: {
      onResize() {
        this.$store.commit('window/setSizing');
      },
      onScroll() {
        this.$store.commit('window/setScrolling')
      }
    }
  })
</script>

<style lang="scss">
.site-header {
  @apply fixed top-0 left-0 right-0 h-14 w-screen flex items-center content-start;
  z-index: 9;
}
nav {
  @apply flex space-x-2 my-auto ml-auto mr-0;
  .nav-link {
     @apply capitalize text-sm;
  }
}
.mobile-nav-toggle {
  @apply absolute top-4 right-4 w-6 h-6 block p-1 rounded-full hover:bg-transparent;
  .bar {
    @apply transition-all ease-in-out duration-200 bg-gray-300 absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 w-full rounded rotate-45;
    height: .13rem;
    &:nth-child(2) {
      @apply -rotate-45;
    }
  }
}
.site-header {
  @apply h-12;
  .nav-link {
    @apply text-gray-100;
    &.nuxt-link-exact-active {
        @apply text-white hover:bg-transparent cursor-pointer hover:scale-100 hover:shadow-none font-semibold;
      }
      &.nuxt-link-active {
        @apply text-white font-semibold;
      }
  }
  &.is-mobile {
    @apply items-start bottom-0 h-screen;
    nav {
      @apply relative left-0 top-0 bottom-0 content-center mx-auto max-w-xs;
      width: calc(100% - 4rem);
      margin-top: 10vh;
    }
    .nav-link {
      @apply text-left text-3xl capitalize font-normal;
      &:not(:hover) {
        @apply rounded-none;
      }
      &:after {
        @apply bg-cyan-500 rounded-sm bottom-0 top-auto h-1 rounded;
        animation-delay: .3s;
      }
      &:nth-child(2) {
        &::after {
          @apply bg-purple-500 translate-x-full;
        }
      }
      &:nth-child(3) {
        &::after {
          @apply bg-pink-500;
        }
      }
      &:nth-child(4) {
        &::after {
          @apply bg-green-500;
        }
      }
    }
    &:not(.nav-collapsed) {
      @apply pt-10;
    }
    nav {
      @apply flex-col space-y-4 space-x-0;
    }
    &.nav-collapsed {
      @apply h-12;
      nav {
        opacity: 0;
      }
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
  
}
</style>