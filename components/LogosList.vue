<template>
  <div class="logos-list">
    
      <h4
      v-if="categoryRes && categoryRes.title && showTitle" key="title"
      ref="titleElem"
      class="list-title whitespace-nowrap"
      :class="{[classes.title]: true}">

        <component 
          :is="!animateTitle ? 'span' : 'TypeSingleLine'"
          v-if="startTyping || !animateTitle"
          tag="span" 
          @animationStarted="isTyping = true"
          @animationDone="doneTyping = true">
          <template v-if="animateTitle" #before>
              <span v-if="isTyping" class="square-bracket mr-2 inline-block" style="top: -.37rem">[</span>
          </template>
          <span v-if="!animateTitle" class="square-bracket mr-2 inline-block" style="top: -.08rem">[</span>
          <span
            v-for="(word, i) in categoryRes.title.split(', ')"
            :key="word"><span v-if="i > 0" class="comma">, </span>
              <span
                :class="{
                  [titleClasses[i]]: true
                }">{{word}}</span>
          </span>
          <template v-if="animateTitle" #after>
            <span v-if="isTyping" class="square-bracket ml-2 inline-block" style="top: -.37rem"> ]</span>
          </template>
          <span v-if="!animateTitle" class="square-bracket ml-2 inline-block" style="top: -.08rem"> ]</span>
        </component>
      </h4>
      <div
        v-if="logos && logos.length"
        ref="listElem"
        class="list flex flex-wrap"
        >
          <div
           v-for="(item) in logos"
            :key="item.slug"
            ref="listItemElems"
            style="opacity: 0"
            class="
              item
              flex
              items-center
              content-start
              rounded-xl
              mr-1
              mb-1
              py-2
              pr-3
              bg-opacity-50
              group
            "
          >
            <div
              class="
                h-6
                w-6
                flex
                items-center
                content-center
                mr-2
                ml-0
                p-1
                rounded-full
                relative
              "
            >
              <span
                class="
                  transition-all
                  ease-in-out
                  absolute
                  rounded-full
                  inset-0
                  filter
                  blur-xl
                  opacity-40
                  saturate-[2.5]
                "
                :style="{ background: item.color }"
              />
              <img :src="item.image" class="max-w-full max-h-auto m-auto" />
            </div>
            <span class="font-normal text-gray-300 text-sm">{{ item.title }}</span>
          </div>
      </div>
  </div>
</template>
import { isArray } from 'util';
<script>
import Vue from 'vue';

export default Vue.extend({
    props: {
        category: {
            type: String,
            default: null,
        },
        slugs: {
            type: Array,
            default: () => [],
        },
        showTitle: {
            type: Boolean,
            default: false,
        },
        animateTitle: {
            type: Boolean,
            default: true,
        },
        start: {
            type: Boolean,
            default: false,
        },
        toggleActions: {
          type: String,
          default: 'play reverse play reverse'
        },
        classes: {
          type: Object,
          default: () => {
            return {
              title: ''
            }
          }
        }
    },
    data() {
        return {
            specificSlugs: this.slugs || [],
            collection: {
                colors: [],
                color: "",
                title: null,
                items: [],
            },
            categoryRes: null,
            logos: null,
            isTyping: false,
            doneTyping: false,
            startTyping: false,
            revealItems: undefined,
            isEntered: false
        };
    },
    async fetch() {
      if (this.category) {
        return await this.$content(`technologies/categories/${this.category}`).fetch()
          .then(async categoryRes => {
            console.log({categoryRes})
            if(!categoryRes || categoryRes.slug !== this.category) { return }
            this.categoryRes = categoryRes;
            return await this.$content('technologies/logos').fetch()
              .then(logos => {
                this.logos = logos.filter(item => item.category === categoryRes.slug);
                return this.logos
              })
              .catch(console.error)
          }).catch(console.error)
      }
      if(!this.slugs?.length) {
        return;
      }
      return await this.$content('technologies/logos').fetch()
        .then(res => {
          if(!Array.isArray(res)) {return};
          this.logos = res.filter(item => this.slugs.includes(item.slug));
          return this.logos
        })
        // this.collection = this.slugs.length 
        //   ? await Promise.all(['code-languages', 'libraries-frameworks', 'apis']
        //     .map(async category => await this.$content(category).fetch()))
        //     .then(categories => {
        //       const allItems = categories.reduce((acc, category) => { return [...acc, ...category.items] }, [])
        //       return {
        //         items: this.slugs.reduce((acc, slug) => {
        //           if(allItems.filter(item => item.slug === slug)[0] === undefined) {
        //             return acc
        //           }
        //           return [...acc, allItems.filter(item => item.slug === slug)[0]]
        //         }, [])
        //       }
        //     })
        //   : await this.$content(this.category).fetch();
        //   return this.collection
    },
    computed: {
        titleClasses() {
            const colors = !this.categoryRes ? [] : Array.isArray(this.categoryRes.color) ? this.categoryRes.color : [this.categoryRes.color];
            return colors?.map((c) => `text-${c}-300`) || [];
        }
    },
    watch: {
      start(val) {
        if(!val) {return};
        this.typeTitle();
      },
      doneTyping(val) {
        if(!val) { return }
        this.$emit('doneTyping', true);
        this.initItemsReveal();
      },
      logos() {
        this.$gsap.utils.toArray(this.$refs.listItemElems)
          .forEach(item => this.hide(item));
      }
    },
    mounted() {
      
      setTimeout(() => {
        if( !this.showTitle || !this.category || !this.animateTitle) { 
          this.doneTyping = true
        }
        this.$gsap.utils.toArray(this.$refs.listItemElems)
          .forEach(item => this.hide(item));
      }, 500 );
    },
    methods: {
      hide(el) {
        this.$gsap.set(el, { opacity: 0, y: -50, immediateRender: true, })
      },
      typeTitle() {
        const onEnter = () => {
          this.startTyping = true
        }
        if(!this.$refs.titleElem) {return}
        this.$gsap.to(this.$refs.titleElem, {
          scrollTrigger: {
            trigger: this.$refs.titleElem,
            start: "top bottom",
          },
          once: true,
          onEnter: onEnter.bind(this)
        })
      },
      initItemsReveal() {
        // this.$gsap.to(window, { scrollTo: window.scrollY + (this.$store.state.window.size.height * .01) })
        const onLeave = () => {
          this.isEntered = false
        };
        if(!this.$refs.listItemElems?.length) {return};
        this.$gsap.to(this.$gsap.utils.toArray(this.$refs.listItemElems), {
          scrollTrigger: {
            trigger: this.$refs.listElem,
            start: "top bottom",
            end: "bottom top",
            toggleActions: this.toggleActions,
          },
          y: 0,
          opacity: 1,
          duration: .3,
          immediateRender: true,
          stagger: 0.05,
          onLeave: onLeave.bind(this)
        });
      },
    }
});
</script>

<style lang="scss">
.square-bracket {
  @apply text-orange-300 inline-block relative;
  transform: scale(1, 1.25);
}
.comma {
  @apply text-purple-400;
}
.typed-text {
  @apply relative;
}
.cursor {
  width: 2px;
  content: '';
  @apply inline-block transform -translate-x-full rounded bg-gray-300 h-full absolute right-auto top-0 bottom-0;
}
</style>
