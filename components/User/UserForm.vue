<template>
  <div>
    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <v-row>
        <v-col cols="3" md="2">
          <span class="font-weight-black">
            First Name
          </span>
        </v-col>
        <v-col cols="9" md="10">
          <v-text-field
            v-model="firstName"
            :rules="[v => !!v || 'First Name is required']"
            required
            dense
            style="width:75%"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" md="2">
          <span class="font-weight-black">
            Last Name
          </span>
        </v-col>
        <v-col cols="9" md="10">
          <v-text-field
            v-model="lastName"
            :rules="[v => !!v || 'Last Name is required']"
            required
            dense
            style="width:75%"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" md="2">
          <span class="font-weight-black">
            Email
          </span>
        </v-col>
        <v-col cols="9" md="10">
          <v-text-field
            v-model="email"
            type="email"
            :rules="[v => !!v || 'Email is required', rules.email]"
            required
            dense
            style="width:75%"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" md="2">
          <span class="font-weight-black">
            Status
          </span>
        </v-col>
        <v-col cols="9" md="10">
          <v-select
            label="Choose Status"
            v-model="status"
            :items="listDummyStatus"
            :rules="[v => !!v || 'Status is required']"
            required
            dense
            style="width:75%"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-form>
    <div class="d-flex justify-end mt-6">
      <v-btn large color="secondary" class="mx-2" @click="onHideForm">
        Cancel
      </v-btn>
      <v-btn large color="primary" class="mx-2" @click="updateData">
        Submit
      </v-btn>
    </div>
  </div>
</template>

<script>
import { rules } from "@/helpers/validation";
import { mapActions } from "vuex";

export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Boolean
    }
  },
  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
    listDummyStatus: [],
    status: null,

    isFormValid: true,
    rules: rules
  }),
  created() {
    this.getDetailData();
    this.getDummyStatus();
  },
  methods: {
    ...mapActions({
      getDetail: "users/getDetail"
    }),
    getDetailData() {
      if (!this.user) return null;
      this.firstName = this.user.first_name;
      this.lastName = this.user.last_name;
      this.email = this.user.email;
      this.status = this.user.status;
    },
    getDummyStatus() {
      const dummy = [
        { text: "active", value: "active" },
        { text: "inactive", value: "inactive" }
      ];
      dummy.forEach((item, i) => {
        this.listDummyStatus.push({
          value: item.value,
          text: item.text
        });
      });
    },
    async updateData() {
      const form = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        status: this.status
      };
      if (!form) return Promise.resolve();
      try {
        this.$axios({
          method: "put",
          url: `public-api/users/${this.user.id}`,
          headers: {
            Authorization: `Bearer ${this.$accessToken()}`,
            "Content-Type": "application/json"
          },
          data: form
        }).then(async res => {
          if (res.status == 200) {
            await this.$toast.success("Success updating data");
            await this.getDetail(this.user.id);
            this.onHideForm();
          }
        });
      } catch (e) {
        this.$toast.error("Error while updating data");
        return Promise.resolve(e);
      }
    },
    onHideForm() {
      this.$emit("show", this.form);
    }
  }
};
</script>
