export const state = () => ({
  api: "public-api/users",
  list: [],
  detail: null,
  isPending: true
});

export const mutations = {
  storeAll(state, data) {
    state.list = data;
  },
  setLoading(state, value) {
    state.isPending = value;
  },
  storeDetail(state, data) {
    state.detail = data;
  }
};

export const actions = {
  async getList(store = {}) {
    store.commit("setLoading", true);
    await this.$axios({
      method: "get",
      url: store.state.api,
      params: {
        _format: "json",
        "access-token": this.$accessToken()
      }
    })
      .then(r => {
        return Array.isArray(r.data.result) && r.data.result.length
          ? r.data.result
          : [];
      })
      .then(arr => {
        store.commit("storeAll", arr);
      })
      .finally(() => {
        store.commit("setLoading", false);
      });
  },
  async getDetail(store, id = {}) {
    if (!id) return Promise.resolve();
    store.commit("setLoading", true);
    await this.$axios({
      method: "get",
      url: `${store.state.api}/${id}`,
      params: {
        _format: "json",
        "access-token": this.$accessToken()
      }
    })
      .then(r => {
        store.commit("storeDetail", r.data.result);
      })
      .finally(() => {
        store.commit("setLoading", false);
      });
  }
};
