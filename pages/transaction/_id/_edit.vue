<template>
	<v-card class="mx-auto" max-width="800">
		<v-list-item two-line>
			<v-list-item-content>
				<v-list-item-title class="headline"
					>Edit Transaction</v-list-item-title
				>
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
							v-model="category_name"
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
								<v-tabs v-model="tabs" fixed-tabs>
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
							<v-tab-item :value="'mobile-tabs-5-1'">
								<v-list>
									<v-list-item-group
										v-model="income_item"
										color="indigo"
									>
										<v-list-item
											v-for="(category, i) in categories"
											:key="i"
											v-if="category.type == 'income'"
										>
											<v-list-item-icon>
												<v-icon
													v-text="categories.name"
												></v-icon>
											</v-list-item-icon>

											<v-list-item-content>
												<v-list-item-title
													v-text="category.name"
													@click="
														setCategory(
															category.id,
															category.name,
															category.type
														)
													"
												></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list-item-group>
								</v-list>
							</v-tab-item>
							<v-tab-item :value="'mobile-tabs-5-2'">
								<v-list>
									<v-list-item-group
										color="indigo"
										v-model="expense_item"
									>
										<v-list-item
											v-for="(category, i) in categories"
											:key="i"
											v-if="category.type == 'expense'"
										>
											<v-list-item-icon>
												<v-icon
													v-text="categories.name"
												></v-icon>
											</v-list-item-icon>

											<v-list-item-content>
												<v-list-item-title
													v-text="category.name"
													@click="
														setCategory(
															category.id,
															category.name,
															category.type
														)
													"
												></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list-item-group>
								</v-list>
							</v-tab-item>
						</v-tabs-items>
					</v-card>
				</v-dialog>
				<v-text-field
					v-model="transaction.description"
					label="Description"
					required
				></v-text-field>
				<v-dialog
					ref="dialog"
					v-model="modal"
					:return-value.sync="transaction.date"
					persistent
					width="290px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="transaction.date"
							label="Date"
							readonly
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="date"
						@input="
							$refs.dialog.save(date);
							modal = false;
						"
					></v-date-picker>
				</v-dialog>

				<v-text-field
					v-model="transaction.amount"
					label="Amount"
					required
				></v-text-field>

				<v-select
					v-model="transaction.account_id"
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
		amount: "",
		category_model: false,
		category_id: null,
		category_name: null,
		category_type: null,
		item: null,
		account_id: null,
		income_expense: null,

		date: new Date().toISOString().substr(0, 10),
		modal: false,

		categories: [],
		accounts: [],
		transaction: [],
		tabs: "",
		income_item: null,
		expense_item: null,
	}),

	methods: {
		setCategory(id, name, type) {
			this.category_model = false;
			this.category_id = id;
			this.category_name = name;
			this.category_type = type;
		},
		onChange(event) {
			this.$axios
				.$get("/categories")
				.then((response) => (this.categories = response));
		},
		onSave() {
			this.$axios
				.$put("/transactions/" + this.$route.params.edit, {
					category_id: this.category_id,
					date: this.transaction.date,
					amount: this.transaction.amount,
					account_id: this.transaction.account_id,
					transaction_type: this.category_type,
					description: this.transaction.description,
				})
				.then((response) => this.$router.push("/transaction"));
		},
		getAccounts() {
			this.$axios
				.$get("/accounts")
				.then((response) => (this.accounts = response));
		},
		getCategories() {
			this.$axios
				.$get("/categories")
				.then((response) => (this.categories = response));
		},
		getTransaction() {
			this.$axios
				.$get("/transactions/" + this.$route.params.edit)
				.then((response) => {
					this.transaction = response;
					this.category_id = response.category.id;
					this.category_name = response.category.name;
					this.category_type = response.category.type;
				});
		},
	},
	created() {
		this.getAccounts();
		this.getCategories();
		this.getTransaction();
	},
};
</script>
