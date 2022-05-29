<template>
  <div class="about-career-block relative opacity-100 flex flex-col content-center w-full overflow-hidden mx-auto">
    <div class="block-content relative pl-11 xs:pl-14 sm:pl-16 md:pl-24 lg:pl-18 max-w-2xl m-auto">
      <h4
          ref="dateElem"
        class="career-date font-display text-orange-300 tracking-widest top-0 whitespace-nowrap left-4 font-black mb-4 text-xl">
        {{ block.date }}
      </h4>
      <div class="max-w-xs">
        <h2
          ref="titleElem"
          class="career-title font-display text-3xl sm:text-4xl font-bold text-yellow-300">
          {{ block.title }}
        </h2>
        <a :href="block.companyLink" target="_blank" class="career-company inline-flex items-center my-4 text-cyan-400 w-auto mr-auto hover:border-purple-500 border border-transparent border-t-0 border-l-0 border-r-0">
          <SvgIcon name="link" class="my-auto w-4 text-blue-400" />
          <span class="ml-2 font-bold">{{ block.company }}</span>
        </a>
        <p
          ref="descriptionElem"
          class="career-description text-sm sm:text-base lg:text-md text-gray-300">
          {{ block.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
  export default Vue.extend({
    props: {
        block: {
            type: Object,
            default: () => {
                return {
                    title: null,
                    description: null,
                    date: null,
                };
            }
        },
    },
    data() {
        return {
            tl: undefined,
            bgColors: [
              { from:  '#3481ff', to: '#f515d4'},
              { from:  '#f515d4', to: '#fdf58a'},
              { from:  '#fdf58a', to: '#4de2ff'},
            ]
        };
    }
})
</script>

<style lang="scss" scoped>

// .career-date {
//   transform: translateX(-50%) translateY(150%) rotate(90deg);
// }
</style>