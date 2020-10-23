<template>
	<v-card class="mx-auto" max-width="800">
		<v-list-item two-line>
			<v-list-item-content>
				<v-list-item-title class="headline"
					>Show Transaction</v-list-item-title
				>
			</v-list-item-content>
			<div class="text-center">
				<v-btn class="mx-2" fab small :to="'edit/' + $route.params.id">
					<v-icon dark>
						mdi-grease-pencil
					</v-icon>
				</v-btn>
				<v-btn class="mx-2" fab small @click="deleteTransaction($route.params.id)">
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
				{{ transaction.amount }}
			</v-list-item-subtitle>
		</v-list-item>
		<v-list-item>
			<v-list-item-title>Category</v-list-item-title>
			<v-list-item-subtitle class="text-right">
				{{ category }}
			</v-list-item-subtitle>
		</v-list-item>
		<v-list-item>
			<v-list-item-title>Description</v-list-item-title>
			<v-list-item-subtitle class="text-right">
				{{ transaction.description }}
			</v-list-item-subtitle>
		</v-list-item>
		<v-list-item>
			<v-list-item-title>Date</v-list-item-title>
			<v-list-item-subtitle class="text-right">
				{{ transaction.date }}
			</v-list-item-subtitle>
		</v-list-item>
		<v-list-item>
			<v-list-item-title>Account</v-list-item-title>
			<v-list-item-subtitle class="text-right">
				{{ account }}
			</v-list-item-subtitle>
		</v-list-item>
	</v-card>
</template>
<script>
export default {
	middleware: "auth",
	data() {
		return {
			category: null,
			account: null,
			date: new Date().toISOString().substr(0, 10),
			modal: false,
			transaction: [],
		};
	},
	methods: {
		getTransaction() {
			this.$axios
				.$get("/transactions/" + this.$route.params.id)
				.then((response) => {
					this.transaction = response;
					this.category = this.transaction.category.name;
					this.account = this.transaction.account.name;
				});
		},
		deleteTransaction(e) {
			this.$axios
				.$delete("/transactions/" + e)
				.then((response) => this.$router.push("/transaction"));
		},
	},
	created() {
		this.getTransaction();
	}
};
</script>
