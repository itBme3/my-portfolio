<template>
  <div class="about-career-block relative opacity-100 items-stretch w-full max-w-2xl overflow-visible pl-8">
    <div class="timeline left-0">
      <div class="line z-0 bg-gray-700 border-opacity-10 rounded absolute h-full top-0 transform right-0" />
      <h4 
        ref="dateElem"
        class="timeline-date z-10 text-right font-black text-orange-300 w-full py-2 bg-gray-900 absolute block -right-1 top-1/2">{{ block.start }} to {{ block.end }}</h4>
    </div>
    <div class="block-content relative pl-11 xs:pl-14 sm:pl-16 md:pl-24 lg:pl-18 m-auto ml-0">
      <div class="max-w-md">
        <h2
          ref="titleElem"
          class="career-title font-display text-3xl sm:text-4xl font-bold text-yellow-300">
          {{ block.title }}
        </h2>
        <a :href="block.companyLink" target="_blank" class="career-company inline-flex items-center my-4 text-cyan-400 w-auto mr-auto hover:border-purple-500 border border-transparent border-t-0 border-l-0 border-r-0">
          <SvgIcon name="link" class="my-auto w-4 text-blue-400" />
          <span class="ml-2 font-bold">{{ block.company }}</span>
        </a>
        <div 
          ref="descriptionElem"
          class="career-description text-sm sm:text-base lg:text-md">
          <nuxt-content
            :document="block"
          />
        </div>
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
    }
})
</script>

<style lang="scss">
.timeline {
  @apply  h-full absolute top-0 bottom-0 my-0;
  width: 50px;

  .line {
    width: .13rem;
    content: "";
  }
  .timeline-date {
    transform: translateY(-50%);
  }
}
  @media screen and (min-width: 640px) {
    .timeline {
      width: 120px;
      margin-left: -100px;
    }
  }
  @media screen and (min-width: 1200px) {

    .timeline {
      width: 160px;
      margin-left: -140px;
    }
  }
</style>