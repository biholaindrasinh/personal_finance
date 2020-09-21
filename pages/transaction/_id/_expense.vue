<template>
  <v-card
    class="mx-auto"
    max-width="800"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">Edit Expense</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-form @submit.prevent="onSave">
    <v-card-text>
    <v-select
      v-model="transactions.category_id" :items="categories" item-text="name" item-value="id"  label="Category" required></v-select>
    <v-text-field  v-model="transactions.name" label="Description" required></v-text-field>
     <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="transactions.date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="transactions.date"
            label="Date"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>

    <v-text-field v-model="transactions.amount" label="Amount" required></v-text-field>
    
    <v-select v-model="transactions.account_id" :items="accounts" item-text="name" item-value="id"  label="Account" required></v-select>
    
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
    data: () => ({
      name: '',
      amount: '',   
      category: null,
      account:null,
      income_expense:null,

      date: new Date().toISOString().substr(0, 10),
      modal: false,

      categories: [],
      accounts: [],
      transactions:[],
    }),

   methods: {
        onChange(event) {
             this.$axios.$get('http://api.panimtechnology.com/api/categories/transaction/expense')
                .then(response => (this.categories = response))
        }, 
        onSave() {
          
            this.$axios.$put('http://api.panimtechnology.com/api/transactions/'+this.$route.params.expense, {
              name: this.transactions.name,
              date: this.transactions.date,
              amount: this.transactions.amount,
              category: this.transactions.category_id,
              account: this.transactions.account_id,
              transaction_type: 'expense',
              description:"fff",
            })
            .then(response => (  this.$router.push('/transaction') ))
           
        },
        getData() {
            this.$axios.$get('http://api.panimtechnology.com/api/transactions/'+this.$route.params.expense)
                .then(response => {
                    this.transactions = response;
                    
                })  
        },
        getSelectedCategory()
        {

        },
        fetchCategory() {
          this.$axios.$get('http://api.panimtechnology.com/api/categories/transaction/expense')
                .then(response => (this.categories = response))
        },
        fetchAccount() {
          this.$axios.$get('http://api.panimtechnology.com/api/accounts')
                .then(response => (this.accounts = response))
        }
    },
    created(){
        this.fetchCategory();
        this.getData();
        this.fetchAccount();
    }
  }
</script>