const { gsap } = require("gsap");
const { ScrollTrigger } = require('gsap/dist/gsap/ScrollTrigger.js');
const { ScrollToPlugin } = require("gsap/dist/gsap/ScrollToPlugin.js");
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default ({ app }, inject) => {
      inject('gsap', {...gsap, ScrollTrigger})
}