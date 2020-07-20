<template>
  <v-dialog v-model="modal" fullscreen hide-overlay transition="fab-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn class="no-hover" icon dark @click="onHideModal">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-toolbar-title>
          <span class="font-weight-bold ml-4">
            Detail User
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!isEditing">
          <v-tooltip v-if="user" color="primary" bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" class="no-hover" icon dark @click="editData">
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
            </template>
            <span class="white--text font-weight-bold">
              Update User Data
            </span>
          </v-tooltip>
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid>
        <div>
          <div v-if="!isEditing" class="d-flex justify-end mb-n12">
            <v-avatar :size="$vuetify.breakpoint.mdAndUp ? '128' : '72'">
              <img :src="user._links.avatar.href" />
            </v-avatar>
          </div>
          <UserForm
            v-if="user && isEditing"
            :user="user"
            :form="isEditing"
            @show="editData"
          />
          <v-row v-else v-for="(item, index) in listUserDetail" :key="index">
            <v-col cols="3" md="2">
              <span class="font-weight-black">
                {{ item.text }}
              </span>
            </v-col>
            <v-col cols="9" md="10">
              {{ item.value }}
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    UserForm: () => import("@/components/User/UserForm")
  },
  props: {
    modal: {
      type: Boolean
    }
  },
  data: () => ({
    isEditing: false
  }),
  computed: {
    ...mapState({
      user: state => state.users.detail
    }),
    listUserDetail() {
      if (!this.user) return [];
      return [
        {
          text: "ID",
          value: this.user.id
        },
        {
          text: "First Name",
          value: this.user.first_name
        },
        {
          text: "Last Name",
          value: this.user.last_name
        },
        {
          text: "Gender",
          value: this.user.gender
        },
        {
          text: "Date of Birth",
          value: this.$formatDate(this.user.dob, "DD MMMM YYYY")
        },
        {
          text: "Email",
          value: this.user.email
        },
        {
          text: "Phone",
          value: this.user.phone
        },
        {
          text: "Website",
          value: this.user.website
        },
        {
          text: "Address",
          value: this.user.address
        },
        {
          text: "Status",
          value: this.user.status
        }
      ];
    }
  },
  methods: {
    editData() {
      this.isEditing = this.isEditing == false ? true : false;
    },
    onHideModal() {
      this.$emit("show", this.modal);
    }
  }
};
</script>
