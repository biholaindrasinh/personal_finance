<template>
	<div>
		<v-card class="mx-auto mb-10" max-width="800">
			<v-tabs v-model="tab" centered icons-and-text >
				<v-tabs-slider></v-tabs-slider>
				<v-tab
					v-for="item in months"
					:key="item.months"
					@click="getTransactionsAccordingToMonth(item.months)"
				>
        		{{ item.months }}
				</v-tab>
				<v-tab key="tab-1" href="#tab-1" @click="getTransactionsAccordingToMonth('past')">
					Last month
				</v-tab>

				<v-tab key="tab-2" href="#tab-2" @click="getTransactionsAccordingToMonth('current')">
					This month
				</v-tab>

				<v-tab key="tab-3" href="#tab-3" @click="getTransactionsAccordingToMonth('future')">
					Future
				</v-tab>
			</v-tabs>
			<v-divider class="mb-10"></v-divider>
			<v-expansion-panels class="pl-5 pr-5">
				<v-expansion-panel
					v-for="transaction in getTransactions"
					:key="transaction.id"
				>
					<v-expansion-panel-header class="pt-0 pb-0">
						<v-row>
							<v-col cols="3">{{ transaction.date }} {{ transaction.month_with_year }}</v-col>
							<v-col cols="3" offset="6">{{ transaction.total }}</v-col>
						</v-row>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-divider></v-divider>
						<a>
						<v-row
							align="center"
							v-for="(detail, index) in transaction"
							:key="detail.id"
							v-if="
								index != 'date' &&
									index != 'day' &&
									index != 'month_with_year' &&
									index != 'total'
							"
							@click="check(detail.id)"
						>
							<v-col cols="1">
								<v-img
									src="https://cdn.vuetifyjs.com/images/cards/sun.png"
									alt="Sunny image"
									width="50"
								></v-img>
							</v-col>
							<v-col cols="8">
								<v-list-item-title>{{
									detail.category.name
								}}</v-list-item-title>
							</v-col>
							<v-col cols="3">
								<v-list-item-subtitle
									v-if="detail.transaction_type == 'income'"
									class="blue--text"
									>{{ detail.amount }}</v-list-item-subtitle
								>
								<v-list-item-subtitle
									v-else
									class="red--text"
									>{{ detail.amount }}</v-list-item-subtitle
								>
							</v-col>
						</v-row>
						</a>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
			<v-card-text>
				<v-fab-transition>
					<v-btn
						color="pink"
						dark
						fixed
						bottom
						right
						fab
						to="transaction/create"
					>
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</v-fab-transition>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
	middleware: "auth",
	data: () => ({
		tab: "tab-2",
		expense: 0,
		income: 0,
		total_transaction: [],
		months: [],
	}),
	computed: {
		...mapGetters([
			"getTransactions"
		])
	},
	methods: {
		getTransactionsAccordingToMonth(month) {
			this.loadTransactions(month);
		},
		async getAllMonths() {
      		await this.$axios
				.$get("/getalltransactionmonth")
				.then((response) => (this.months = response));
		},
		check(data) {
			this.$router.push("/transaction/" + data);
		},
		deleteTransaction(e) {
			this.$axios
				.$delete("/transactions/" + e)
				.then((response) => this.loadTransactions('current'));
		},
		...mapActions([
			"loadTransactions"
		])
	},
	created() {
		this.getAllMonths();
		this.loadTransactions('current');
	},
};
</script>
