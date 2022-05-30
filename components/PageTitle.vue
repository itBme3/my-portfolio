<template>
  <div class="page-title">

    <component
      :is="titleTag"
      class="title"
      :class="{
        [classes.title]: true
      }">
      <slot />
    </component>
    <component
      :is="subtitleTag"
      class="subtitle"
      :class="{
        [classes.subtitle]: true
      }">
      <slot name="subtitle" />
    </component>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      titleTag: {
        type: String,
        default: 'h1'
      },
      subtitleTag: {
        type: String,
        default: 'h4'
      },
      classes: {
        type: Object,
        default: () => {
          return {
            title: '',
            subtitle: ''
          }
        }
      },
      lookForContent: {
        default: true,
        type: Boolean
      }
    },
    computed: {
      onlyTitle() {
        return Object.keys(this.$slots).filter(s => s !== 'default').length === 0
          && this.$el && this.$el.parentNode && this.$el.parentNode.querySelectorAll('.nuxt-content').length === 0
      }
    },
    mounted() {
      this.$gsap.set(this.$el.querySelector('.title'), {opacity: 0, y: 40})
      const content = [
        this.$el.querySelector('.subtitle'), 
        ...(this.lookForContent ? this.$gsap.utils.toArray(this.$el.parentNode.querySelectorAll('.nuxt-content p')) : [])
      ];
      this.$gsap.set(content, {opacity: 0, y: 40})
      let onComplete = (isTitle = false) => {
        if (!isTitle || (isTitle && !this.$el.querySelector('.subtitle') && (!this.$el.parentNode.querySelector('.nuxt-content') || !this.lookForContent))) {
          this.$emit('animationDone')
        }
      };
      onComplete = onComplete.bind(this)
      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: this.$el,
          start: 'top 70%',
          end: 'bottom 0%',
          onLeave: onComplete,
        },
        onComplete,
        delay: .3
      })
      tl.to(this.$el.querySelector('.title'), {
        duration: .4,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        // onComplete: onComplete(true)
      })
      .to(content, {
        duration: .8,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        // onComplete,
        stagger: .1
      }, '-=.4')
    }
  })
</script>

<style scoped>
.page-title {
  margin-top: 3rem;
}
</style>