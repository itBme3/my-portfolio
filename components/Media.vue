<template>
  <div 
    v-if="src.length"
    class="media"
    >
    <video 
      v-if="isVideo"
      :src="src" 
      autoplay muted playsinline loop>
    </video>
    <img v-else :src="src" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import makeVideoPlayableInline from 'iphone-inline-video';
import { asyncDelay } from '~/utils/funcs';
  
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
      if(this.isVideo) {
        this.playPauseWhenInView()
        asyncDelay(4000).then(() => this.$el.querySelector('video').play());
      }
    },
    methods: {
      playPauseWhenInView() {
        if(typeof this.$el?.querySelector !== 'function') {return}
        const video = this.$el.querySelector('video');
        console.log({makeVideoPlayableInline, video})
        if(video) {
          makeVideoPlayableInline(video, false)
        }
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
        ScrollTrigger.create({
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