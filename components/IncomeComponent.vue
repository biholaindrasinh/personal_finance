<template>
    <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Title</th>
          <th class="text-left">Date</th>
          <th class="text-left">Category</th>
          <th class="text-left">Amount</th>
          <th class="text-left">Account</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
          <IncomeList 
            v-for="income in incomes" :key="income.id" 
            :title="income.title" 
            :date="income.date" 
            :amount="income.amount" 
            :category="income.category" 
            :account="income.account" />
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import IncomeList from "~/components/IncomeList"
export default {
    components: {
        IncomeList
    },
    props: {
        incomes:{
            type:Array,
            required: true,
        },
    }
}
</script>