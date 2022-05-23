const { gsap } = require("gsap");


export default ({ app }, inject) => {
      inject('gsap', {...gsap})
}