import chroma from 'chroma-js';

interface BaseColors {
      [key: string]: {
            base: string;
            dark?: string; light?: string,
            darken?: number; brighten?: number,
            saturate?: number | { dark?: number, light?: number };
      }
}

export const baseColors:BaseColors = {
      cyan: {
      base: '#25D4DC',
      saturate: {
            light: 1,
            dark: 0
      },
      brighten: .95,
      darken: 7
      },
      blue: {base: '#3481ff', saturate: { dark:0, light: 1 }},
      green: {base: '#24ffbd', brighten: .93, darken: 10},
      purple: {base: '#b371fa', saturate: { light: .5 }},
      pink: {base: '#ff7ae7'},
      red: {base: '#ff4772'},
      orange: {base: '#ffa970'},
      yellow: {base: '#fff58a', brighten: .95},
      gray: {base: '#646585', darken: 2, saturate: -.55},
}
export const createColors = (_colors:BaseColors = baseColors) => {
      const defaultColors = { black: '#000000', white: '#ffffff', transparent: 'transparent' }
      return Object.keys(_colors).reduce((acc, color) => {
            const obj = _colors[color];
            const base = obj.base
            const { darken = 6, brighten = .75, saturate = 0 } = obj;
            const {
                  light: saturateLight = typeof saturate === 'number' ? saturate : saturate.light ? saturate.light : 1,
                  dark: saturateDark = typeof saturate === 'number' ? saturate : saturate.dark ? saturate.dark : 0,
                  } = typeof obj.saturate === 'object' ? obj.saturate : {}
            const dark = chroma(base).saturate(saturateDark).darken(darken)
            const light = chroma(base).saturate(saturateLight).luminance(brighten);
            const colors = (() => {
                  const lights = chroma.scale([light, base])
                        .correctLightness()
                        .colors(12)
                        .filter((c, i) => i %3 === 0)
                        .slice(0, 4);
                  const darks = chroma.scale([base, dark])
                        .correctLightness()
                        .colors(48)
                        .filter((c, i) => i %3 === 0)
                        .filter((c, i) => i %3 === 0)
                        .slice(0, 6);
                  return [...lights, ...darks]
            })();
            return {
                  ...acc, [color]: colors.reduce((_acc, val, i) => {
                        return {..._acc, [`${i === 0 ? '50' : `${i}00`}`]: val}
                  }, {})}
      }, defaultColors)
}