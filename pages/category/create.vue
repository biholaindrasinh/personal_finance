<template>
  <v-card class="mx-auto"
    max-width="500" >
   
     <form @submit.prevent="onSave">
      
        <v-card-title>
          <span class="headline">Category Add</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Category name*" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="income_expense" :items="income_expenses" item-text="name" item-value="id"  label="Income/Expense" required></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text type="submit">Save</v-btn>
        </v-card-actions>
      
     </form>
 </v-card> 
</template>
<script>
   
  export default {
    data: () => ({
      name: '',
      income_expense: null,
      income_expenses: [
        { 
          id:'income',
          name:'Income',
        },
        {
          id:'expense',
          name:'Expense',
        }
      ],
    }),
      methods: {
      onSave() {
            this.$axios.$post('http://api.panimtechnology.com/api/categories', {
              name: this.name,
              type: this.income_expense,
            }).then(response => ( this.$router.push('/category') )) 
        },
    },
  }
</script>
