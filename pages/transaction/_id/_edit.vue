<template>
	<v-card
		class="mx-auto"
		max-width="800"
	>
		<v-list-item two-line>
			<v-list-item-content>
				<v-list-item-title class="headline">Edit Transaction</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-form @submit.prevent="onSave">
			<v-card-text>
				
				<v-dialog
					ref="dialog1"
					v-model="category_model"
					persistent
					max-width="600px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="categoryname"
							label="Category"
							readonly
							v-bind="attrs"
							v-on="on"
						>
						</v-text-field>
					</template>
					<v-card>
						<v-toolbar flat>

							<template v-slot:extension>
								<v-tabs
								v-model="tabs"
								fixed-tabs
								>
								<v-tabs-slider></v-tabs-slider>
								<v-tab
									href="#mobile-tabs-5-1"
									class="primary--text"
								>
									Income
								</v-tab>

								<v-tab
									href="#mobile-tabs-5-2"
									class="primary--text"
								>
									Expense
								</v-tab>
								</v-tabs>
							</template>
						</v-toolbar>

						<v-tabs-items v-model="tabs">
							<v-tab-item
								:value="'mobile-tabs-5-1'"
							>
								<v-list>
									<v-list-item-group
										v-model="income_item"
										color="indigo"
									>
										<v-list-item
										v-for="(category, i) in categories"
										:key="i" v-if="(category.type == 'income' )"
										>
										<v-list-item-icon>
											{{ i }}
											<v-icon v-text="categories.name"></v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title v-text="category.name" @click="setCategory(category.id , category.name)" ></v-list-item-title>
										</v-list-item-content>
										</v-list-item>
									</v-list-item-group>
								</v-list>
							</v-tab-item>
							<v-tab-item
							:value="'mobile-tabs-5-2'"
							>
							<v-list>
								<v-list-item-group
									color="indigo"
									v-model="expense_item"
								>
								
									<v-list-item
									v-for="(category, i) in categories"
									:key="i" v-if="(category.type == 'expense' )"
									>
									<v-list-item-icon>
										<v-icon v-text="categories.name"></v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title v-text="category.name"  @click="setCategory(category.id , category.name)"></v-list-item-title>
									</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
							</v-tab-item>
						</v-tabs-items>
					</v-card>
				</v-dialog>
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
     middleware: 'auth',
    data: () => ({
		name: '',
		amount: '',   
		category: null,
		item:null,
		account:null,
		income_expense:null,

		date: new Date().toISOString().substr(0, 10),
		modal: false,

		categories: [],
		accounts: [],
		transactions:[],
		category_model: false,
		categoryname:null,
		tabs: '',
		income_item:null,
		expense_item:null,
    }),

   methods: {
	   setCategory(id , name){
		  this.categoryname = name
		  this.category = id
		  this.category_model = false

	},
        onChange(event) {
             this.$axios.$get('/categories/transaction/expense')
                .then(response => (this.categories = response))
        }, 
        onSave() {
          
            this.$axios.$put('/transactions/'+this.$route.params.edit, {
              name: this.transactions.name,
              date: this.transactions.date,
              amount: this.transactions.amount,
              category: this.category,
              account: this.transactions.account_id,
              transaction_type: 'expense',
              description:"fff",
            })
            .then(response => (  this.$router.push('/transaction') ))
           
        },
        getData() {
            this.$axios.$get('/transactions/'+this.$route.params.edit)
                .then(response => {
                    this.transactions = response;
                })  
        },
        getSelectedCategory()
        {

        },
        fetchCategory() {
          this.$axios.$get('/categories/transaction/expense')
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