<template>
  <div class="colors flex flex-col space-y-4"
    :style="{
      backgroundColor: colors.gray && colors.gray['900'] ? colors.gray['900'] : 'transparent'
    }">
    <div
      v-for="color in Object.keys(baseColors)"
      :key="'input-' + color"
      >
      <label>{{color}}: </label>
      <input 
      :value="baseColors[color].base" 
      type="color"
      class="rounded bg-transparent"
      @input="(e) => {
        baseColors[color].base = e.target.value;
        createColors();
      }" 
      />
    </div>
    <div 
      v-for="color in Object.keys(colors)"
      :key="color"
      class="flex space-x-1">
      <template v-if="!['black', 'white', 'transparent'].includes(color)">
        <div
            v-for="shade in Object.keys(colors[color])"
            :key="color + shade"
            class="w-8 text-xs text-gray-400"
        >
          <div 
            class="w-full h-8 mb-2"
            :style="{background: colors[color][shade] }">
          </div>
          {{ shade }}
          <code class="hidden">"{{color}}-{{shade}}": "{{ colors[color][shade] }}"</code>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { createColors, baseColors as bColors } from '../utils/tailwind-colors'
  export default Vue.extend({
    data():any {
      return {
        colors: {},
        baseColors: bColors
      }
    },
    watch: {
      baseColors() {
        this.createColors()
      }
    },
    mounted() {
      this.createColors()
    },
    methods: {
      createColors() {
        this.colors = createColors(this.baseColors)
      }
    }
  })
</script>

<style scoped>

</style>