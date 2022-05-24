<template>
<div>
  <pre v-if="category"><code>{{ category }}</code></pre>
  <pre v-if="categories"><code>{{ categories }}</code></pre>
  <pre v-if="logos"><code>{{ logos }}</code></pre>
</div>
<!-- <div class="w-[320px] mx-auto flex flex-col space-y-2 p-8">
  <div 
    class="site-header is-mobile"
    :class="{
      'nav-is-collapsed': navCollapsed
    }">
  <button
    class="button px-4 bg-gray-800 hover:bg-opacity-100 bg-opacity-50 absolute"
    @click="navCollapsed = !navCollapsed">🤘</button>
    <transition name="down-fade">
      <nav 
        v-if="!navCollapsed"
        class="navigation"
        >
        <nuxt-link
          v-for="link in links"
          :key="link.path"
          class="nav-link button"
          
          :class="{
            'redacted-reveal': !navCollapsed,
            'redacted-hide': navCollapsed,
            'blur-lg': navCollapsed
          }"
          :to="link.path">
          {{link.label}}
        </nuxt-link>
      </nav>
    </transition>
  </div>
</div> -->
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    data: () => ({
      links: [
        { label: 'About Me', path: '/about' },
        { label: 'Projects', path: '/projects' },
        { label: 'Resume', path: '/resume' },
        { label: 'Get In Touch', path: '/contact' },
      ],
      navCollapsed: true,
      categories: null,
      category: undefined,
      logos: null,
    }),
    mounted() {
      this.$content('technologies/logos').fetch()
          .then(res => {
            console.log({ res })
            this.logos = res.filter(item => ['vite', 'tailwind', 'nuxt'].includes(item.slug))
          })
        this.$content('technologies/categories').fetch()
          .then(res => {
            console.log({ res })
            this.categories = res
          })
        this.$content('technologies/categories/apis').fetch()
          .then(res => {
            console.log({ res })
            this.category = res
          })
    }
  })
</script>

<style lang="scss">
// :root {
// 	--redacted-reveal-color: cyan;
// 	--redacted-reveal-duration: .70s;
// }
// .redacted-reveal {
//   @apply relative overflow-hidden;
// 	&::after {
// 		content: '';
//     @apply absolute left-0 top-0 w-full h-full transition-all duration-300 ease-in-out bg-gray-200;
// 		background-color: var(--redacted-reveal-color);
// 		animation-iteration-count: 1;
// 		animation-duration: var(--redacted-reveal-duration);
// 		animation-fill-mode: forwards;
// 	}
// }
// nav .nav-link {
//   @apply text-gray-200;
//   &:after {
//     @apply bg-cyan-500 rounded-sm;
//   }
//   &:not(:hover) {
//     @apply rounded-none;
//   }
//   &:nth-child(2) {
// 		&::after {
// 			animation-delay: .1s;
// 			@apply bg-purple-500;
// 		}
// 	}
// 	&:nth-child(3) {
// 		&::after {
// 			animation-delay: .2s;
// 			@apply bg-pink-500;
// 		}
// 	}
// 	&:nth-child(4) {
// 		&::after {
// 			animation-delay: .3s;
// 			@apply bg-green-500;
// 		}
// 	}
// }


// .redacted-reveal {
//     // --tw-text-opacity: 0 ;
//     // animation-name: redacted-text;
//     &::after {
//       animation-name: redacted-overlay;
//     }
// }


@keyframes redacted-overlay {
	// 0% {
	// 	transform: translateX(100%);
	// }
	// 10% {
	// 	transform: translateX(95%);
	// }
	0% {
		transform: translateX(0);
	}
	60% {
		transform: translateX(-90%);
	}
	100% {
		transform: translateX(-100%);
	}
}

</style>