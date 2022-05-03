<template>
<section class="skills narrow">
  <div class="section-content flex flex-col space-y-16 mt-0 pt-10">
        
    <template v-for="(category, i) in skillCategories">
      <LogosList 
        v-if="i === 0 || doneTyping.includes(i - 1)"
        :key="category"
        class="w-full max-w-lg"
        :classes="{title: 'text-xs leading-relaxed tracking-wider mb-6'}"
        :show-title="true"
        :category="category"
        @doneTyping="() => doneTyping.push(i)" />
    </template>

  </div>
</section>
</template>

<script lang="ts">
  import Vue from 'vue'

import {gsap} from 'gsap'
  export default Vue.extend({
    data(): {
        skillCategories: string[];
        doneTyping: number[];
        entered: {[key:string]: number[]};
    } {
        return {
            skillCategories: [
                "code-languages",
                "libraries-frameworks",
                "apis"
            ],
            doneTyping: [],
            entered: {
              skills: []
            }
        };
    },
    mounted() {
      setTimeout(() => {
        this.trackEnteredSkills()
      }, 500)
    },
    methods: {
      trackEnteredSkills() {
        const elems:any = gsap.utils.toArray(this.$el.querySelectorAll('.logos-list'));
        let onEnter = (i:number) => {
          console.log('skills entered')
          this.entered.skills.push(i)
        }
        onEnter = onEnter.bind(this)
        elems.forEach((elem:any, i: number) => gsap.to(elem, {
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