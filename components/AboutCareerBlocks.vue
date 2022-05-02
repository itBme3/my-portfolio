<template>
  <div class="about-career-blocks">
    <AboutCareerBlock 
      v-for="block in about.career"
      :key="block.title"
      :block="block"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    data() {
      return {
        about: { career: [] }
      }
    },
    async fetch() {
      return await this.$content('about').fetch()
        .then((res:any) => {
          if([undefined, null].includes(res)) {
            return
          }
          this.about = res
          return res
        })
    }
  })
</script>

<style lang="scss" scoped>
.about-career-blocks {
   @apply flex flex-col space-y-12;
}
</style>