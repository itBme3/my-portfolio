<template>
  <div class="logos-list">
      <h4
v-if="collection.title && showTitle" key="title"
      class="list-title whitespace-nowrap">
        <span v-if="typedTextWidth !== '2px'" class="square-bracket mr-2 inline-block">[</span>
        <span 
          class="typed-text inline-block whitespace-nowrap overflow-hidden relative"
          :class="{
            'typing': typedTextWidth !== 'auto',
            'pr-2': typedTextWidth.includes('ch'),
          }"
          :style="{width: typedTextWidth}"
          >
          <span
            v-for="(word, i) in collection.title.split(', ')"
            :class="{
              'opacity-0': typedTextWidth.includes('px'),
            }"
            :key="word"><span v-if="i > 0" class="comma">, </span>
              <span
                :class="{
                  [titleClasses[i]]: true
                }">{{word}}</span>
          </span>
          <span v-if="typedTextWidth !== 'auto'" :style="{left: typedTextWidth}"
            class="cursor"
            :class="{
              'blinking': cursorBlinking
            }" />
        </span>
        <span v-if="typedTextWidth !== '2px'" class="square-bracket ml-2 inline-block"> ]</span>
      </h4>
      <TransitionGroup
        tag="div"
        class="list-items flex flex-wrap"
        name="up-fade"
        @after-enter="$emit('animationDone', true)"
        >
        <template
          v-for="item in items">
          <div
            v-if="show.includes(item.slug)"
            :key="item.slug"
            class="
              flex
              transition-all
              ease-in-out
              duration-300
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
        </template>
      </TransitionGroup>
  </div>
</template>
<script>
import Vue from 'vue';
import {asyncDelay} from '~/utils/funcs'
export default Vue.extend({
  props: {
    category: {
      type: String,
      default: 'code-languages',
    },
    slugs: {
      type: Array,
      default: () => [],
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      specificSlugs: this.slugs || [],
      collection: {
        colors: [],
        color: '',
        title: null,
        items: [],
      },
      show: [],
      typedTextWidth: '2px',
      cursorBlinking: true
    };
  },
  async fetch () {
    let call = await this.$content(this.category);
    if (this.slugs?.length) {
      call = call.where({ slug: { $in: this.slugs } });
    }
    this.collection = await call.fetch();
  },
  computed: {
    titleClasses() {
      const colors = this.collection?.colors?.length ? this.collection.colors : [this.collection.color]
      return colors?.map((c) => `text-${c}-400`) || []
    },
    items() {
      return this.collection.items || []
    }
  },
  mounted() {
    setTimeout(async () => {
      await this.typeOutText()
      for (let i = 0; i < this.items.length; i++) {
          setTimeout(() => {
            this.show.push(this.items[i].slug);
          }, i * 25);
        }
    }, 200)
  },
  methods: {
    async typeOutText() {
      if(!this.showTitle || !this.collection?.title?.length) {
        this.typedTextWidth = 'auto'
        return;
      }
      this.typedTextWidth = `3px`;
      await asyncDelay(1000);
      for (let i = 0; i < this.collection.title.length; i++) {
        await (async() => {
          this.cursorBlinking = false;
          await asyncDelay(100);
          this.typedTextWidth = `${i + 1}ch`;
          if (this.collection.title[i] === ' ' || i === this.collection.title.length - 1) {
            this.cursorBlinking = true;
            await asyncDelay(600);
          }
          if (i === this.collection.title.length - 1) {
            await asyncDelay(1000);
            this.typedTextWidth = 'auto'
          }
          
        })();
        if(i === this.collection.title.length - 1) {
          return
        }
      }

    }
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
