<template>
  <div class="colors flex flex-wrap space-4 w-full"
    :style="{
      backgroundColor: colors.gray && colors.gray['900'] ? colors.gray['900'] : 'transparent'
    }">
    <div
      v-for="color in Object.keys(baseColors)"
      :key="'input-' + color"
      class="flex flex-col"
      >
      <label>{{color}}: </label>
      <input 
      :value="baseColors[color].base" 
      type="color"
      class="rounded bg-transparent w-20"
      @input="(e) => {
        baseColors[color].base = e.target.value;
        createColors();
      }" 
      />
    </div>
    <div class="w-full flex flex-col mt-8">
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
  </div>
</template>

<script>
  import Vue from 'vue'
  import {createColors, baseColors as bColors} from '~/utils/coloring.ts';
  export default Vue.extend({
    data() {
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