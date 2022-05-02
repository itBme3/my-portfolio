<template>
  <component :is="tag">
    <slot v-if="startedTyping" name="before" />
    <span class="type-single-line"
      :class="{
        'typing': typedTextWidth !== 'auto',
        'pr-2': typedTextWidth.includes('ch'),
        'hide-text': !typedTextWidth.includes('ch') && typedTextWidth !== 'auto'
      }"
      :style="{width: typedTextWidth}">
      <slot />
      <span
        v-if="typedTextWidth !== 'auto'" 
        :style="{left: typedTextWidth}"
        class="cursor"
        :class="{
          'blinking': cursorBlinking
        }" />
    </span>
    <slot v-if="startedTyping" name="after" />
  </component>
  
</template>

<script lang="ts">
  import Vue from 'vue'
import {asyncDelay} from '~/utils/funcs'
  export default Vue.extend({
    props: {
      tag: {
        type: String,
        default: 'p'
      }
    },
    data() {
      return {
        typedTextWidth: '2px',
        cursorBlinking: true,
        startedTyping: false
      }
    },
    mounted() {
      setTimeout(() => {
        this.typeOutText()
      }, 100)
    },
    methods: {
      async typeOutText() {
        const text:string | undefined = this.$slots.default?.map(vnode => vnode.elm?.textContent).join('').trim()
        if(!text || !text?.length) {
          this.typedTextWidth = 'auto'
          this.$emit('animationDone', true)
          return;
        }
        this.typedTextWidth = `3px`;
        await asyncDelay(500);
        this.$emit('animationStarted', true);
        this.startedTyping = true
        await asyncDelay(300);
        for (let i = 0; i < text.length; i++) {
          await (async() => {
            this.cursorBlinking = false;
            await asyncDelay(100);
            // if (i < text.length - 1) {
              this.typedTextWidth = `${i + 1}ch`;
            // }
            if (text[i] === ' ' || i === text.length - 1) {
              this.cursorBlinking = true;
              await asyncDelay(300);
            }
            if (i === text.length - 1) {
              await asyncDelay(300);
              this.typedTextWidth = 'auto'
            }
            
          })();
          if(i === text.length - 1) {
            this.$emit('animationDone', true)
            return
          }
        }

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