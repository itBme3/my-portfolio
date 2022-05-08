<template>
  <div class="media-pdf w-full h-full">
    <Loading v-if="loading" />
    <iframe
      v-if="![undefined, null].includes(mediaSrc)"
      ref="iFrame"
      :src="embedSrc"
      class="h-full w-full"
      frameborder="0"
    />
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    src: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      mediaSrc: null,
      embedSrc: null,
      loading: true
    }
  },
  mounted () {
    this.setSrc();
  },
  errorCaptured () {
    return false
  },
  methods: {
    setSrc (tried = 0) {
      this.mediaSrc = this.src
      this.embedSrc = this.mediaSrc.includes('google.com') ? this.mediaSrc : `https://docs.google.com/viewer?url=${this.mediaSrc}&embedded=true`
      this.checkIframeLoaded(tried);
    },
    checkIframeLoaded (tried) {
      if (tried > 20) {
        this.loading = 'Error loading pdf.'
        return
      };
      const delay = 500;
      setTimeout(() => {
        // console.log({ Iframe: this.$refs.iFrame });
        try {
          if (this.$refs.iFrame.contentWindow.document.querySelector('body').innerHTML.length === 0) {
            this.mediaSrc = null;
            this.embedSrc = null;
            setTimeout(() => {
              this.setSrc(tried + 1)
              this.loading = this.$refs.iFrame.contentWindow.document.querySelector('body').innerHTML.length === 0
            }, delay + 500);
            return
          }
          this.loading = false
        } catch (err) {
          this.loading = false
        }
      }, delay)

    }
  }
})
</script>
<style lang="scss" scoped>
.media-pdf {
  @apply relative max-w-3xl mx-auto;
  width: calc(100% - 2rem);
  padding: 80% 0;
  @media screen and (min-width: 768px) {
    padding: 630px 0;
}
  iframe {
    @apply absolute inset-0;
  }
}
</style>