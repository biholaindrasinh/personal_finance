<template>
  <v-card class="mx-auto" max-width="800">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">Account</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn to="account/create" color="warning" dark> Add Account </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-card-text>
      <v-simple-table dense>
        <thead>
          <tr>
            <th class="text-left">Title</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in getAccounts" :key="account.id">
            <td>{{ account.name }}</td>
            <td>
              <v-btn
                small
                class="ma-2"
                outlined
                color="indigo"
                :to="'account/' + account.id"
                >Edit</v-btn
              >
              <v-btn
                small
                class="ma-2"
                outlined
                color="indigo"
                @click="deleteAccount(account.id)"
                >Delete</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  middleware: "auth",
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters(["getAccounts"]),
  },
  methods: {
    ...mapActions(["loadAccounts", "deleteAccount"]),
  },
  created() {
    this.loadAccounts();
  },
};
</script>
