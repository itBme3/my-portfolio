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
      this.$gsap.set([this.$el.querySelector('.subtitle'), this.$el.parentNode.querySelector('.nuxt-content')], {opacity: 0, y: 40})
      let onComplete = () => {this.$emit('animationDone')};
      onComplete = onComplete.bind(this)
      this.$gsap.to(this.$el.querySelector('.title'), {
        duration: .6,
        y: 0,
        opacity: 1,
        delay: .3,
        ease: 'power3.inOut',
        onComplete
      })
      this.$gsap.to([this.$el.querySelector('.subtitle'), this.$el.parentNode.querySelector('.nuxt-content')], {
        duration: .8,
         y: 0,
        opacity: 1,
        delay: .3,
        ease: 'power3.inOut',
        onComplete
      })
    }
  })
</script>

<style scoped>
.page-title {
  margin-top: 3rem;
}
</style>