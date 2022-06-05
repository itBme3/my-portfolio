

interface StateProject {
      title: string; media: string | string[]; description: string;
      [key: string]: any;
}
interface StateTechCategory { title: string; color: string; slug: string;[key: string]: any; }
interface StateTechLogo {
      title: string; slug: string; category: string;
      image: string; color: string;[key: string]: any;
}
interface State {
      content: {
            tech: {
                  logos: StateTechLogo[];
                  categories: StateTechCategory[]
            },
            projects: StateProject[],
            navLinks: { title: string; path: string; color: string}[]
      }
}

export const state: State = {
      content: {
            tech: {
                  categories: [],
                  logos: []
            },
            projects: [],
            navLinks: [
                  {
                        title: 'Projects',
                        path: '/projects',
                        color: 'cyan'
                  },
                  {
                        title: 'About',
                        path: '/about',
                        color: 'purple'
                  },
                  {
                        title: 'Resume',
                        path: '/resume',
                        color: 'pink'
                  },
                  {
                        title: 'Get in Touch',
                        path: '/contact',
                        color: 'green'
                  },
            ]
      }
}

export const mutations = {
      setProjects(state: State, projects: StateProject[]) {
            state.content.projects = [...projects]
      },
      setTechCategories(state: State, categories: StateTechCategory[]) {
            state.content.tech.categories = [...categories]
      },
      setTechLogos(state: State, logos: StateTechLogo[]) {
            state.content.tech.logos = [...logos]
      }
}

export const actions: any = {
      async getProjects({state, commit}:any) {
            if (state?.content?.projects?.length) {
                  return state?.content?.projects
            }
            return await this.$content('projects').sortBy('order', 'asc').fetch()
                        .then((res:any) => {
                              commit('setProjects', res)
                              return res;
                        })
      },
      async getTechCategories({state, commit}:any) {
            if (state?.content?.technologies?.categories?.length) {
                  return state?.content?.technologies?.categories
            }
            return await this.$content('technologies/categories').fetch()
                        .then((res:any) => {
                              commit('setTechCategories', res)
                              return res;
                        })
      },
      async getTechLogos({state, commit}:any) {
            if (state?.content?.technologies?.logos?.length) {
                  return state?.content?.technologies?.logos
            }
            return await this.$content('technologies/logos').fetch()
                        .then((res:any) => {
                              commit('setTechLogos', res)
                              return res;
                        })
      }
}


export const getters = {
      techLogos(state:State):StateTechLogo[] {
            return state?.content?.tech?.logos?.length ? state.content.tech.logos : []
      },
      techCategories(state: State):StateTechCategory[] {
            return state?.content?.tech?.categories?.length ? state.content.tech.categories : []
      },
      projects(state: State):StateProject[] {
            return state?.content?.projects?.length ? state.content.projects : []
      }
}