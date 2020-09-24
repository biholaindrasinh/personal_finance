<template>
  <v-card class="mx-auto" max-width="800">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">Add Expense</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-form @submit.prevent="onSave">
      <v-card-text>
          <v-alert type="error" v-if="error">
            {{ message }}
          </v-alert>
        <v-select
          v-model="category"
          :items="categories"
          item-text="name"
          item-value="id"
          label="Category"
          required
        ></v-select>
        <v-text-field
          v-model="name"
          label="Description"
          required
        ></v-text-field>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Date"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>

        <v-text-field v-model="amount" label="Amount" required></v-text-field>

        <v-select
          v-model="account"
          :items="accounts"
          item-text="name"
          item-value="id"
          label="Account"
          required
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text type="submit">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
export default {
  middleware: "auth",
  data: () => ({
    name: "",
    amount: "",
    category: null,
    account: null,

    date: new Date().toISOString().substr(0, 10),
    modal: false,

    categories: [],
    accounts: [],
    error: false,
    message: "",
  }),

  methods: {
    getcategory() {
      this.$axios
        .$get("/categories/transaction/expense")
        .then(response => (this.categories = response));
    },
    onSave() {
      this.$axios
        .$post("/transactions", {
          name: this.name,
          date: this.date,
          amount: this.amount,
          category: this.category,
          account: this.account,
          transaction_type: "expense",
          description: "fgg"
        })
        .then(response => this.$router.push("/transaction"))
        .catch(error => {
          this.error = true;
          this.message = error.response.data.message;
        });
    },

    fetchAccount() {
      this.$axios
        .$get("/accounts")
        .then(response => (this.accounts = response));
    }
  },
  created() {
    this.fetchAccount();
    this.getcategory();
  }
};
</script>
