<template>
  <div class="page index">
    <h1>Homepage</h1>
      <template v-for="(category, i) in skillCategories">
          <LogosList 
            v-if="show.includes(category)" 
            :key="category"
            class="w-full"
            :show-title="true"
            :category="category"
            @animationDone="() => i === skillCategories.length - 1 ? '' : show.push(skillCategories[i + 1])" />
      </template>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data(): {
    show:string[]; 
    skillCategories: string[]
  } {
    return {
      show: [],
      skillCategories: [
        'code-languages',
        'libraries-frameworks',
        'apis'
      ]
    }
  },
  mounted() {
    setTimeout(() => {
       this.show.push(this.skillCategories[0])

    }, 50)
  }
})
</script>
