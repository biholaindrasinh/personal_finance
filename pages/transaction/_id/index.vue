<template>
	<v-card
		class="mx-auto"
		max-width="800"
	>
		<v-list-item two-line>
		<v-list-item-content>
			<v-list-item-title class="headline">Show Transaction</v-list-item-title>
		</v-list-item-content>
		<div class="text-center">
			<v-btn class="mx-2" fab small :to="'edit/' + id">
				<v-icon dark>
					mdi-grease-pencil
				</v-icon>
			</v-btn>
			<v-btn class="mx-2" fab small @click="deletedata(id)" >
				<v-icon dark>
					mdi-delete
				</v-icon>
			</v-btn>
		</div>
		
		</v-list-item>
		<v-divider></v-divider>
		<v-list-item>
			<v-list-item-title>Amount</v-list-item-title>
			<v-list-item-subtitle class="text-right">
			{{transactions.amount}}
			</v-list-item-subtitle>
		</v-list-item>
		<v-list-item
			>
			<v-list-item-title>Category</v-list-item-title>
			<v-list-item-subtitle class="text-right">
			{{ category }}
			</v-list-item-subtitle>
		</v-list-item>
		<v-list-item
			>
			<v-list-item-title>Description</v-list-item-title>
			<v-list-item-subtitle class="text-right">
			{{transactions.description}}
			</v-list-item-subtitle>
		</v-list-item>
		<v-list-item
			>
			<v-list-item-title>Date</v-list-item-title>
			<v-list-item-subtitle class="text-right">
			{{transactions.date}}
			</v-list-item-subtitle>
		</v-list-item>
		<v-list-item
			>
			<v-list-item-title>Account</v-list-item-title>
			<v-list-item-subtitle class="text-right">
			{{account}}
			</v-list-item-subtitle>
		</v-list-item>
		

		<v-divider></v-divider>

	

	</v-card>
</template>
<script>
  export default {
		middleware: 'auth',
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
		id : null,
	}),
	mounted() {
        this.id = this.$route.params.id;
    },

   	methods: {
        onChange(event) {
             this.$axios.$get('/categories/transaction/income')
                .then(response => (this.categories = response))
		}, 
		deletedata(e) {
			this.$axios
				.$delete("/transactions/" + e)
				.then(response => this.$router.push('/transaction'));
    	},
        onSave() {
          
            this.$axios.$put('/transactions/'+this.$route.params.id, {
              name: this.transactions.name,
              date: this.transactions.date,
              amount: this.transactions.amount,
              category: this.transactions.category_id,
              account: this.transactions.account_id,
              transaction_type: 'income',
              description:"fff",
            })
            .then(response => (  this.$router.push('/transaction') ))
           
        },
        getData() {
            this.$axios.$get('/transactions/'+this.$route.params.id)
                .then(response => {
					this.transactions = response;
					this.category = this.transactions.category.name
					this.account = this.transactions.account.name
                    
                })  
        },
        fetchCategory() {
          this.$axios.$get('/categories/transaction/income')
                .then(response => (this.categories = response))
        },
        fetchAccount() {
          this.$axios.$get('/accounts')
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