<template>
  <v-card class="mx-auto" max-width="400">
    <form>
      <v-card-title>
        <span class="headline">Edit Account</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="Account name*"
                :value="getAccount.name"
                @input="updateAccountName"
              ></v-text-field>
              <span v-if="error" type="error">{{ message }}</span>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onUpdate()">Save</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  middleware: "auth",
  data: () => ({
    error: false,
    message: "",
  }),
  computed: {
    ...mapGetters([
      "getAccount"
    ])
  },
  methods: {
    ...mapActions([
      "loadAccount",
      "updateAccount"
    ]),
    onUpdate() {
      this.updateAccount().then(() => {
        this.$router.push("/account")
      }).catch((error) => {
          this.error = true;
          this.message = error.response.data.errors.name[0];
      });
    },
    updateAccountName(e) {
      this.$store.commit('SET_ACCOUNT_NAME', e)
    }
  },
  mounted() {
    this.loadAccount(this.$route.params.id);
  },
};
</script>
