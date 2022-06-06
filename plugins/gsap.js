import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ app }, inject) => {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
      inject('gsap', gsap)
}