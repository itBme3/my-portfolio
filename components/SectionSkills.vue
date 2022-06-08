<template>
<section class="skills narrow">
  <div class="section-content flex flex-col space-y-16 mt-0 pt-10">
        
      <LogosList 
        v-for="(category, i) in categories"
        :key="category"
        class="w-full max-w-lg"
        :classes="{title: 'text-xs leading-relaxed tracking-wider mb-6'}"
        :show-title="true"
        :category="category"
        :animate-title="animateTitle"
        :start="i === 0 ? start : doneTyping.includes(i - 1)"
        @doneTyping="() => doneTyping.push(i)"
        @animationDone="() => $emit('animationDone', i)" />

  </div>
</section>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      categories: {
        type: Array,
        default: () => [
            "languages",
            "frameworks-libraries",
            "apis"
        ]
      },
      animateTitle: {
        type: Boolean,
        default: true
      },
      start: {
        type: Boolean,
        default: false
      }
    },
    data(){
        return {
            doneTyping: [],
            entered: {
              skills: []
            }
        };
    },
    watch: {
      start(val) {
        if(!val) {return}
        setTimeout(() => {
          this.trackEnteredSkills()
        }, 500)
      }
    },
    mounted() {
      if(!this.animateTitle) {
        this.$gsap.set(this.$el.querySelector('.list-title'), { opacity: 0, y: 40 })
        this.$gsap.to(this.$el.querySelector('.list-title'), { opacity: 1, y: 0, duration: .2, delay: .3 })
      }
      setTimeout(() => {
        this.trackEnteredSkills()
      }, 500)
    },
    methods: {
      trackEnteredSkills() {
        const elems = this.$gsap.utils.toArray(this.$el.querySelectorAll('.logos-list'));
        let onEnter = (i) => {
          this.entered.skills.push(i)
        }
        onEnter = onEnter.bind(this)
        elems.forEach((elem, i) => this.$gsap.to(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top bottom',
          },
          onEnter: onEnter(i),
        }))
      }
    }
  })
</script>

<style scoped>

</style>