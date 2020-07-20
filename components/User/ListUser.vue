<template>
  <v-data-table
    :headers="headers"
    :items="users.list"
    :sort-desc="users.list"
    :items-per-page="5"
    class="elevation-2"
    :loading="users.isPending"
    item-key="id"
  >
    <template v-slot:item.name="{ item }">
      <v-tooltip color="primary" right>
        <template v-slot:activator="{ on }">
          <span
            class="font-weight-black cursor-pointer"
            v-on="on"
            @click="showDetail(item.id)"
          >
            {{ item.first_name + " " + item.last_name }}
          </span>
        </template>
        <h4 class="white--text font-weight-bold">
          View Detail User <br />
          {{ item.first_name + " " + item.last_name }}
        </h4>
      </v-tooltip>
      <UserDetail v-if="detailModal" :modal="detailModal" @show="showDetail" />
    </template>
    <template v-slot:item.gender="{ item }">
      <v-icon :color="iconColor(item.gender)">
        {{ iconType(item.gender) }}
      </v-icon>
    </template>
    <template v-slot:item.dob="{ item }">
      {{ $formatDate(item.dob, "DD MMMM YYYY") }}
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {
    UserDetail: () => import("@/components/User/UserDetail")
  },
  data: () => ({
    headers: [
      {
        text: "Full Name",
        value: "name"
      },
      {
        text: "Email",
        value: "email"
      },
      {
        text: "Phone",
        value: "phone"
      },
      {
        text: "Address",
        value: "address"
      },
      {
        text: "Gender",
        value: "gender"
      },
      {
        text: "Date of Birth",
        value: "dob"
      }
    ],
    detailModal: false
  }),
  created() {
    this.$store.dispatch("users/getList");
  },
  computed: {
    ...mapState({
      users: state => state.users
    })
  },
  methods: {
    ...mapActions({
      getDetail: "users/getDetail"
    }),
    iconType(item) {
      if (item == "male") return "mdi-gender-male";
      if (item == "female") return "mdi-gender-female";
      else return "mdi-gender-non-binary";
    },
    iconColor(item) {
      if (item == "male") return "blue";
      if (item == "female") return "pink";
      else return "grey";
    },
    async showDetail(id) {
      if (this.detailModal == false) {
        await this.getDetail(id);
      } else {
        this.$store.dispatch("users/getList");
      }
      this.detailModal = this.detailModal == false ? true : false;
    }
  }
};
</script>
