<template>
  <component :is="tag">
    <span v-if="startedTyping" class="relative -mr-2" style="top: -.5rem">
      <slot name="before" />
    </span>

    <span
      class="type-single-line"
      :class="{
        'typing': typedTextWidth !== 'auto',
        'hide-text': !typedTextWidth.includes('ch') && typedTextWidth !== 'auto' && !animationDone
      }"
      :style="{width: animationDone ? 'auto' : typedTextWidth}">
      <slot />
      <span
        v-if="!animationDone && !beforeTyping" 
        :style="{left: typedTextWidth}"
        class="cursor"
        :class="{
          'blinking': cursorBlinking
        }" />
    </span>
    
    <span v-if="startedTyping" class="relative -ml-2" style="top: -.5rem">
      <slot name="after" />
    </span>
  </component>
  
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {asyncDelay} from '~/utils/funcs'
  export default Vue.extend({
    props: {
      tag: {
        type: String,
        default: 'p'
      },
      delay: {
        type: Number,
        default: 200
      },
      start: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        typedTextWidth: '2px',
        cursorBlinking: true,
        startedTyping: false,
        beforeTyping: true,
        animationDone: false
      }
    },
    watch: {
      start(val) {
        if(val) {
            this.typeOutText();
        }
      },
      animationDone(val) {
        if(val) {
          this.typedTextWidth = 'auto'
          this.$emit('animationDone', true)
        }
      }
    },
    mounted() {
      if(this.start) {
        this.initGsap();
        this.typeOutText();
      }
    },
    methods: {
      initGsap() {
        let onLeave = () => {
          this.animationDone = true
        };
        onLeave = onLeave.bind(this)
        ScrollTrigger.create({
          trigger: this.$el,
          end: 'bottom -10%',
          onLeave
        })
      },
      async typeOutText() {
        this.beforeTyping = false
        // await asyncDelay(400);
        await asyncDelay(this.delay);
        const text:string | undefined = this.$slots.default?.map(vnode => vnode.elm?.textContent).join('').trim()
        if(!text || !text?.length) {
          this.animationDone = true
          return;
        }
        this.typedTextWidth = `3px`;
        await asyncDelay(500);
        this.$emit('animationStarted', true);
        this.startedTyping = true
        await asyncDelay(300);
        for (let i = 0; i < text.length && !this.animationDone; i++) {
          await (async() => {
            this.cursorBlinking = false;
            this.typedTextWidth = `${i + (text[i] === ',' ? 2 : 1)}ch`;
            await asyncDelay(33);
            if (text[i] === ' ' || i === text.length - 1) {
              this.cursorBlinking = true;
              await asyncDelay(200);
            }
            if (i === text.length - 1) {
              // this.typedTextWidth = `${i + 2}ch`
              this.typedTextWidth = 'auto'
              await asyncDelay(500);
            }
            
          })();
        }
        this.animationDone = true

      }
    }
  })
</script>

<style lang="scss">
.type-single-line {
  @apply relative inline-block whitespace-nowrap overflow-hidden;
  line-height: inherit;
  &.hide-text {
    @apply text-transparent #{!important};
    * {
      @apply text-transparent #{!important};
    }
  }
}
.cursor {
  width: 2px;
  content: '';
  @apply inline-block transform -translate-x-full rounded bg-gray-300 h-full absolute right-auto top-0 bottom-0;
}
</style>