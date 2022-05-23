<template>
  <div 
    v-if="src.length"
    class="media"
    >
    <video v-if="isVideo" :src="src" :controls="controls" :loop="loop" :muted="muted" :autoplay="autoplay" playsinline />
    <img v-else :src="src" />
  </div>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    props: {
      src: {
        type: String,
        default: ''
      },
      loop: {
        type: Boolean,
        default: true
      },
      muted: {
        type: Boolean,
        default: true
      },
      controls: {
        type: Boolean,
        default: false
      },
      autoplay: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      isVideo() {
        const videoExtensions = ['mov', 'mp4'];
        try {
          let ext = `${this.src}`.split('.')[`${this.src}`.split('.').length - 1];
          ext = ext.split('?')[0];
          if (videoExtensions.includes(ext)) {
            return true
          }
          return false
        } catch {
          return false
        }
      }
    },
    mounted() {
      this.playPauseWhenInView()
    },
    methods: {
      playPauseWhenInView() {
        const video = this.$el.querySelector('video');
        const onLeave = () => {
          if(!video) {
            return;
          }
          video.pause()
        }
        const onEnter = () => {
          if(!video) {
            return;
          }
          video.play()
        }
        this.$gsap.ScrollTrigger.create({
          trigger: this.$el,
          start: 'top bottom',
          end: 'bottom top-=10%',
          onLeave,
          onEnter,
          onEnterBack: onEnter,
          onLeaveBack: onLeave,
        })
      }
    }
  })
</script>

<style scoped>

</style>