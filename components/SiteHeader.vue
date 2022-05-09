<template>
  <header
class="site-header"
    :class="{
      'nav-collapsed': isMobile && navCollapsed,
      'is-mobile': isMobile
    }">

    <nuxt-link
      to="/"
      class="nav-link shadow-none absolute left-0 top-0 !hover:bg-transparent !hover:shadow-none" 
      >
      <img class="w-10 m-auto ml-0 h-auto" src="/favicon.svg" />
    </nuxt-link>

     <template v-for="width in ['desktop','mobile']" >
      <nav
        v-if="isMobile && width === 'mobile' || !isMobile && width === 'desktop'"
        :key="width" class="navigation"
        :class="{ [width]: true }">
        <nuxt-link class="nav-link button transition-none" to="/about">about me</nuxt-link>
        <nuxt-link class="nav-link button transition-none" to="/projects">projects</nuxt-link>
        <nuxt-link class="nav-link button transition-none" to="/resume">resume</nuxt-link>
        <nuxt-link class="nav-link button transition-none" to="/contact">get in touch</nuxt-link>
      </nav>
    </template>

    <button
      v-if="isMobile"
      class="mobile-nav-toggle"
      :style="{marginLeft: 'calc('+ $store.state.window.size.scrollBar +' + .5rem)'}"
      @click="toggleMobilNav">
      <div class="bar" />
      <div class="bar" />
      <div v-if="navCollapsed" class="bar" />
    </button>
  </header>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    data() {
      return {
        scrollObserver: undefined,
        resizeObserver: undefined,
        navCollapsed: true,
        mobileNavAnimation: undefined
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
      },
      // navCollapsed() {
      //   this.toggleMobilNav()
      // }
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
        if(this.isMobile && this.navCollapsed) {
          this.$gsap.utils.toArray('nav.mobile .nav-link')
            .forEach((link) => this.$gsap.set(link, { x: 100, opacity: 0, scale: .6 }));
        }
      },
      onScroll() {
        this.$store.commit('window/setScrolling')
      },
      createMobileNavAnimation() {
        const navLinks = this.$gsap.utils.toArray('nav.mobile .nav-link');
        const direction = this.isMobile && this.navCollapsed ? 'from' : 'to'
        const params = {
          stagger: { // wrap advanced options in an object
            each: 0.1,
            from: "top",
            ease: 'none',
          },
          ease: 'expo',
          duration: .3,
          opacity: 0,
          scale: .6,
          x: 100
        }
        if(direction === 'to') {
          navLinks.forEach((link) => this.$gsap.set(link, { x: 100, opacity: 0, scale: .6 }));
          params.x = 0;
          params.opacity = 1;
          params.scale = 1;
        } else{
          navLinks.forEach((link) => this.$gsap.set(link, { x: 0, opacity: 1, scale: 1 }));
          params.stagger.from = 'end'
        }
        this.$gsap.to(navLinks, params);
        // this.mobileNavAnimation = tl
      },
      toggleMobilNav() {
        this.navCollapsed = !this.navCollapsed
        setTimeout(() => this.createMobileNavAnimation(), 100)
        // const navLinks = this.$gsap.utils.toArray('nav.mobile .nav-link');
        // // const nav = this.$gsap.utils.toArray('nav.mobile');
        // const direction = this.isMobile && this.navCollapsed ? 'from' : 'to'
        // this.$gsap[direction]('nav.mobile', { y: 0, x: 0, duration: .4, ease: "none", background: 'transparent' });
        // this.$gsap[direction](navLinks, {
        //   stagger: .05,
        //   ease: 'none',
        //   duration: .3,
        //   opacity: 1, 
        //   x: 0,
        //   scale: 1,
        // })
        // if (this.isMobile && this.navCollapsed) {
        //   navLinks.forEach((link:any) => this.$gsap.set(link, { x: 100, opacity: 0, scale: .6 }));
        //   this.$gsap.set('nav.mobile', { y: '-110vh', x: '110vw' });
        //   this.$gsap.to('nav.mobile', { y: 0, x: 0, duration: .4, ease: "none" })
        //   this.$gsap.to(navLinks, {
        //     stagger: .05,
        //     ease: 'none',
        //     duration: .3,
        //     opacity: 1, 
        //     x: 0,
        //     scale: 1,
        //   })
        // } else {
        //   navLinks.forEach((link:any) => this.$gsap.set(link, { x: 0, opacity: 1, scale: 1 }));
        //   this.$gsap.set('nav.mobile', { y: 0, x: 0})
        //   this.$gsap.to('nav.mobile', { y: '-110vh', x: '110vw', duration: .4, ease: "none" })
        //   this.$gsap.to(navLinks, {
        //     stagger: .05,
        //     ease: 'none',
        //     duration: .3,
        //     delay: .4,
        //     opacity: 0, 
        //     x: 100,
        //     scale: .6,
        //   })
        // }
        // console.log({ mobileNavAnimation: this.mobileNavAnimation, this.$gsap })
        // if(this.navCollapsed) {
        //   this.mobileNavAnimation.play()
        // } else {
        //   this.mobileNavAnimation.reverse()
        // }
        // this.mobileNavAnimation.play();
      }
    }
  })
</script>

<style lang="scss">
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
  @apply h-12 transition-all;
  transition-delay: 0s;
  .nav-link {
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
    }


    &:not(.nav-collapsed) {
      @apply pt-10;
    }
    nav {
      @apply flex-col space-y-4 space-x-0;
    }
    &.nav-collapsed {
      @apply h-12;
      transition-delay: .8s;
      nav {
        transition-delay: .8s;
        opacity: 0;
        z-index: 0;
        height: 0;
        overflow: hidden;
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