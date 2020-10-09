<template>
	<div>
		<v-card class="mx-auto mb-10"
		max-width="900">
			<v-tabs
			v-model="tab"
			centered
			icons-and-text
			
		>
     		<v-tabs-slider></v-tabs-slider>

			<v-tab key="tab-1" href="#tab-1" @click="checktest('past')">
				Past
				<v-icon>mdi-arrow-left-bold</v-icon>
			</v-tab>

			<v-tab key="tab-2" href="#tab-2" @click="checktest('current')">
				This month
				<v-icon>mdi-heart</v-icon>
			</v-tab>

			<v-tab key="tab-3" href="#tab-3" @click="checktest('future')">
				Future
				<v-icon>mdi-arrow-right-bold</v-icon>
			</v-tab>
    	</v-tabs>
		<v-divider class="mb-10"></v-divider>
		<v-card
			class="mx-auto mb-10"
			max-width="800"
			v-for="transaction in transactions" :key="transaction.id"
		>
		
		<v-card-text  >
			<v-row align="center">
				<v-col class="display-1" sm="1" cols="3">
					{{  transaction.date }}
				</v-col>
				<v-col  sm="10" cols="6">
					<v-list-item-title>{{  transaction.day }}</v-list-item-title>
					<v-list-item-subtitle>{{ transaction.month_with_year }}</v-list-item-subtitle>
				</v-col>
				<v-col sm="1" cols="3">
					<v-list-item-subtitle>{{  transaction.total }}</v-list-item-subtitle>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row align="center" v-for="(detail , index) in transaction"
					:key="detail.id" v-if="index != 'date' && index != 'day' && index != 'month_with_year' && index != 'total'" @click="check(detail.id)">

				<v-col sm="1" cols="3">
					<v-img
						src="https://cdn.vuetifyjs.com/images/cards/sun.png"
						alt="Sunny image"
						width="50"
					></v-img>
				</v-col>
				<v-col  sm="10" cols="6">
					<v-list-item-title>{{ detail.category.name }}</v-list-item-title>
				</v-col>
				<v-col sm="1" cols="3">
					<v-list-item-subtitle v-if="detail.transaction_type == 'income'" class="blue--text">{{ detail.amount }}</v-list-item-subtitle>
					<v-list-item-subtitle v-else class="red--text">{{ detail.amount }}</v-list-item-subtitle>
				</v-col>
			</v-row>
			
		</v-card-text>
	
	

  		</v-card>
		<v-card-text style="height: 100px; position: relative">
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
export default {
  middleware: "auth",
  data: () => ({
	  tab:'tab-2',
    expense: 0,
    income: 0,
	total_transaction: [],
	transactions: [],
  }),
  computed: {
    user() {
      console.log(this.$auth.user);
      return this.$auth.user;
    }
  },
  methods: {
	  checktest(data) {
		  this.$axios
			.$get("/transactions?type="+data)
			.then(response => (this.transactions = response));
	  },
	  check( data) {
		  this.$router.push("/transaction/"+data);
	  },
    deletedata(e) {
      this.$axios
        .$delete("/transactions/" + e)
        .then(response => this.$store.dispatch("loadTransactions"));
    },
  },
  created() {
	   this.$axios
			.$get("/transactions?type=current")
			.then(response => (this.transactions = response));
    this.$store.dispatch("loadTransactions");
  }
};
</script>
