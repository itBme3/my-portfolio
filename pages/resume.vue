<template>
  <div class="page">
    <PageTitle style="margin-top: 0 !important">
      Resume:
    </PageTitle>
    <MediaPdf src="https://drive.google.com/file/d/1U5Lr5Ig1iuRUaLNsxmwORbukDkZA6im8/preview" />
    
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
import PageTitle from '~/components/PageTitle.vue'

  export default Vue.extend({
    transition: "page",
    components: { PageTitle }
})
</script>

<style lang="scss" scoped>
.page {
  @apply px-0 sm:px-8;
}
</style>