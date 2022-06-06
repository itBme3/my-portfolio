<template>
  <footer class="site-footer w-screen h-auto block" style="clear: both">
    <div ref="footerLinks" class="links flex flex-col sm:flex-nowrap sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4 content-center items-center max-w-sm sm:max-w-xl mx-auto my-32">
      <nuxt-link 
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="button border rounded-lg p-6 whitespace-nowrap"
        :class="{
          [link.classes]: true
        }">
        {{ link.title }}
      </nuxt-link>
    </div>
    <p class="text-center text-gray-400 mb-4">Bobby Moynihan ©{{ year }}</p>
  </footer>
</template>

<script>
  import Vue from 'vue'
import { asyncDelay } from '~/utils/funcs';

  export default Vue.extend({
    computed: {
      year() {
        return new Date().getFullYear()
      },
      links() {
        return this.$store.state.content.navLinks
          .filter(link => link.path !== this.$route.path)
          .map(link => {
            const classNames = {
              cyan: 'border-cyan-300 hover:bg-cyan-300 hover:text-cyan-900',
              purple: 'border-purple-300 hover:bg-purple-300 hover:text-purple-900',
              pink: 'border-pink-300 hover:bg-pink-300 hover:text-pink-900',
              green: 'border-green-300 hover:bg-green-300 hover:text-green-900',
            }
            return {
              ...link,
              classes: classNames[link.color]
            }
          })
      }
    },
    mounted() {
      this.initGsap();
    },
    methods: {
      initGsap() {
        const links = this.$gsap.utils.toArray(this.$el.querySelectorAll('.links > *'))
        this.$gsap.set(links, { y: 40, opacity: 0, scaleX: .7, scaleY: .7 })
        this.$gsap.to(links, {
            scrollTrigger: {
              trigger: this.$refs.footerLinks,
              start: 'top 80%',
              toggle: 'play reverse play reverse',
              onEnter() {
                console.log('footer entered')
              }
            },
            keyframes: {
              '30%': {
                y: 70,
                scaleX: 1,
                scaleY: 1,
              },
              '100%': {
                opacity: 1,
                y: 0,
              }
            },
            duration: .4,
            stagger: .05,
            ease: 'power2.inOut'
          })
      }
    }
  })
</script>

<style lang="scss">
.links {
  .button {
    @apply p-6 sm:p-4 w-full text-center #{!important};
    &:nth-child(1) {
      @apply ml-auto;
    }
    &:nth-last-child(1) {
      @apply mr-auto;
    }
    &:hover {
      transform: scale(1.05) !important;
    }
  }
}
</style>