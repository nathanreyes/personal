import _posts from '~/content/posts/posts.json';

export const state = () => ({
  list: [],
  selected: {},
});

export const actions = {
  getAll({ commit }) {
    commit('updateAll', _posts);
  },
  get({ commit, state }, slug) {
    commit('updateSelected', state.list.find(p => p.slug === slug));
  }
};

export const mutations = {
  updateAll(state, posts) {
    state.list = posts;
  },
  updateSelected(state, post) {
    state.selected = post;
  },
};