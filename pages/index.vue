<template>
  <div class="page index">
    <TypeSingleLine 
      tag="h4"
      class="text-green-400 base"
      @animationDone="() => show.push(skillCategories[0])"
      >
      <template #before><span class="inline-block">"</span></template>
      Frontend Developer
      <template #after><span class="inline-block">"</span></template>
    </TypeSingleLine>

    <section class="skills narrow">
      <div class="section-content flex flex-col space-y-16">
        <template v-for="(category, i) in skillCategories">
            <LogosList 
              v-if="show.includes(category)" 
              :key="category"
              class="w-full max-w-lg"
              :classes="{title: 'text-xs leading-relaxed tracking-wider mb-6'}"
              :show-title="true"
              :category="category"
              @animationDone="() => i === skillCategories.length - 1 ? '' : show.push(skillCategories[i + 1])" />
        </template>
      </div>
    </section>
    <section class="about narrow">
      <AboutCareerBlocks class="section-content" />
    </section>


  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: "IndexPage",
    data(): {
        show: string[];
        skillCategories: string[];
    } {
        return {
            show: [],
            skillCategories: [
                "code-languages",
                "libraries-frameworks",
                "apis"
            ]
        };
    }
})
</script>

<style lang="scss">
section, .page-section {
    @apply flex flex-col items-center content-center w-full py-20;
    min-height: 80vh;
    .section-content {
      @apply mx-auto;
      width: calc(100% - 4rem);
      @media screen and (min-width: 768px) {
        width: calc(100% - 6rem);
      }
      &:not(.w-full) {
        @apply max-w-5xl;
      }
    }
    &.narrow {
      .section-content {
        @apply max-w-md;
      }
    }
}
</style>
