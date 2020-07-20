export const state = () => ({
  appName: "Vue Contact List",
  showNavigationDrawer: false
});

export const mutations = {
  toggleNavigationDrawer(state, toggled) {
    state.showNavigationDrawer =
      typeof toggled === "undefined" ? !state.showNavigationDrawer : !!toggled;
  }
};
