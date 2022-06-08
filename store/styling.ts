interface State {
      page: {
            maxWidth: string;
      }
}
export const state: State = {
      page: {
            maxWidth: '3xl'
      }
};

export const mutations = {
      setPageMaxWidth(state:State, maxWidth: string) {
            state.page.maxWidth = maxWidth
      }
}