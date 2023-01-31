export const state = () => ({
  title: null,
  subTitle: null,
  previousText: null,
  previousLink: null
});

export const mutations = {
  setTitle(state, newTitle) {
    state.title = newTitle;
  },
  setSubTitle(state, newSubTitle) {
    state.subTitle = newSubTitle;
  },
  setPreviousText(state, newText) {
    state.previousText = newText;
  },
  setPreviousLink(state, newLink) {
    state.previousLink = newLink;
  },
  resetPrevious(state) {
    state.previousText = null;
    state.previousLink = null;
  }
}
