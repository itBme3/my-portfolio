<template>
  <div class="logos-list">
      <h4
v-if="collection.title && showTitle" key="title"
      class="list-title whitespace-nowrap"
      :class="{[classes.title]: true}">
        
        <TypeSingleLine tag="span" 
          @animationStarted="typing = true"
          @animationDone="showItems">
          <template #before>
            <span v-if="typing" class="square-bracket mr-2 inline-block">[</span>
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
            <span v-if="typing" class="square-bracket ml-2 inline-block"> ]</span>
          </template>
        </TypeSingleLine>
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
            show: [],
            typing: false,
            cursorBlinking: true
        };
    },
    async fetch() {
        let call = await this.$content(this.category);
        if (this.slugs?.length) {
            call = call.where({ slug: { $in: this.slugs } });
        }
        this.collection = await call.fetch();
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
    methods: {
        showItems() {
          setTimeout(() => {
            for (let i = 0; i < this.items.length; i++) {
                setTimeout(() => {
                    this.show.push(this.items[i].slug);
                }, i * 25);
            }
          }, 200);
        }
    },
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
