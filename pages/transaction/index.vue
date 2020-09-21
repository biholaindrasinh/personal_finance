<template>
  <v-row>
    <v-col cols="6">
      <v-card class="mx-auto" max-width="1000">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">Income</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left">Title</th>
                <th class="text-left">Date</th>
                <th class="text-left">Category</th>
                <th class="text-left">Amount</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in transactions"
                v-show="transaction.transaction_type == 'income'"
                :key="transaction.id"
              >
                <td>{{ transaction.name }}</td>
                <td>{{ transaction.date }}</td>
                <td>{{ transaction.category.name }}</td>
                <td>{{ transaction.amount }}</td>
                <td style="white-space: nowrap">
                  <v-btn
                    class="ma-2"
                    color="primary"
                    :to="'transaction/' + transaction.id"
                    fab
                    small
                    dark
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    class="ma-2"
                    color="primary"
                    fab
                    small
                    dark
                    @click="deletedata(transaction.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
        <hr />
        <v-card-actions class="justify-center">
          <v-btn to="transaction/createincome" color="warning" dark>
            Add Income
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>
          <p class="text-lg-right text-xs-right">Total Income: {{ income }}</p>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card class="mx-auto" max-width="1000">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">Expense</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left">Title</th>
                <th class="text-left">Date</th>
                <th class="text-left">Category</th>
                <th class="text-left">Amount</th>
                <th class="text-left">Action</th>
              </tr>
              <p>Name: {{ this.$auth.user }}</p>
            </thead>
            <tbody>
              <tr
                v-for="transaction in transactions"
                v-show="transaction.transaction_type == 'expense'"
                :key="transaction.id"
              >
                <td>{{ transaction.name }}</td>
                <td>{{ transaction.date }}</td>
                <td>{{ transaction.category.name }}</td>
                <td>{{ transaction.amount }}</td>
                <td style="white-space: nowrap">
                  <v-btn
                    class="ma-2"
                    color="primary"
                    :to="'transaction/expense/' + transaction.id"
                    fab
                    small
                    dark
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    class="ma-2"
                    color="primary"
                    fab
                    small
                    dark
                    @click="deletedata(transaction.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
        <hr />
        <v-card-actions class="justify-center">
          <v-btn to="transaction/createexpense" color="warning" dark>
            Add Expense
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>
          <p class="text-lg-right text-xs-right">
            Total Expense: {{ expense }}
          </p>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: 'auth',
  data: () => ({
    expense: 0,
    income: 0,
    total_transaction: []
  }),
  computed: {
    transactions() {
      return this.$store.state.transactions;
    },
    user() {
      console.log(this.$auth.user);
      return this.$auth.user;
    }
  },
  methods: {
    deletedata(e) {
      this.$axios
        .$delete("http://api.panimtechnology.com/api/transactions/" + e)
        .then(response => this.$store.dispatch("loadTransactions"));
    },
    total_income() {
      let income = 0;
      let expense = 0;
      this.total_transaction = this.$store.getters.getTransactions;
      this.total_transaction.forEach(function(key, value) {
        if (key.transaction_type == "expense") {
          expense = expense + parseInt(key.amount);
        } else {
          income = income + parseInt(key.amount);
        }
      });
      this.expense = expense;
      this.income = income;
    }
  },
  created() {
    this.$store.dispatch("loadTransactions");
    this.total_income();
  }
};
</script>
