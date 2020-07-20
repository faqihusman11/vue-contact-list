<template>
  <div>
    <AppToolbar />
    <v-container fluid class="my-4">
      <p class="title grey--text">
        <v-icon class="mr-2">mdi-account-multiple</v-icon>
        <span class="font-weight-bold">Contact List</span>
      </p>
      <listUser />
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
    AppToolbar: () => import("@/components/App/AppToolbar"),
    listUser: () => import("@/components/User/listUser")
  }
};
</script>
