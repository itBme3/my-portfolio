<template>
  <div class="logos-list">
    
      <h4
v-if="collection.title && showTitle" key="title"
      ref="titleElem"
      class="list-title whitespace-nowrap"
      :class="{[classes.title]: true}">
        
        <TypeSingleLine 
          v-if="startTyping"
          tag="span" 
          @animationStarted="isTyping = true"
          @animationDone="doneTyping = true">
          <template #before>
            <span v-if="isTyping" class="square-bracket mr-2 inline-block">[</span>
          </template>
          <span
            v-for="(word, i) in collection.title.split(', ')"
            :key="word"><span v-if="i > 0" class="comma">, </span>
              <span
                :class="{
                  [titleClasses[i]]: true
                }">{{word}}</span>
          </span>
          <template #after>
            <span v-if="isTyping" class="square-bracket ml-2 inline-block"> ]</span>
          </template>
        </TypeSingleLine>
      </h4>
      <div
        ref="listElem"
        class="list flex flex-wrap"
        >
          <div
           v-for="item in items"
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
              px-3
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
            <span class="font-semibold text-sm">{{ item.title }}</span>
          </div>
      </div>
  </div>
</template>
<script>
import Vue from 'vue';

export default Vue.extend({
    props: {
        category: {
            type: String,
            default: "code-languages",
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
            isTyping: false,
            doneTyping: false,
            startTyping: false,
            revealItems: undefined,
            isEntered: false
        };
    },
    async fetch() {
        this.collection = this.slugs.length 
          ? await Promise.all(['code-languages', 'libraries-frameworks', 'apis']
            .map(async category => await this.$content(category).fetch().then(res => {
              return res
            })))
            .then(categories => {
              const allItems = categories.reduce((acc, category) => { return [...acc, ...category.items] }, [])
              return {
                items: this.slugs.reduce((acc, slug) => {
                  return [...acc, allItems.filter(item => item.slug === slug)[0]]
                }, [])
              }
            })
          : await this.$content(this.category).fetch();
          return this.collection
    },
    computed: {
        titleClasses() {
            const colors = this.collection?.colors?.length ? this.collection.colors : [this.collection.color];
            return colors?.map((c) => `text-${c}-400`) || [];
        },
        items() {
            return this.collection.items || [];
        }
    },
    watch: {
      doneTyping(val) {
        if(!val) { return }
        this.$emit('doneTyping', true);
        this.initItemsReveal();
      }
    },
    mounted() {
      
      setTimeout(() => {
        if( this.showTitle && this.category && this.animateTitle) { 
          this.typeTitle();
        } else {
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
            toggleActions: 'play reverse play reverse',
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
  @apply text-orange-300 inline-block relative -top-2;
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
