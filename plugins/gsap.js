const { gsap } = require("gsap");
const { ScrollTrigger } = require('gsap/ScrollTrigger');
const { ScrollToPlugin } = require("gsap/ScrollToPlugin");
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default ({ app }, inject) => {
      inject('gsap', {...gsap, ScrollTrigger})
}