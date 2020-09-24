<template>
  <v-card class="mx-auto"
    max-width="500" >
   
     <form @submit.prevent="onSave">
      
        <v-card-title>
          <span class="headline">Category Add</span>
        </v-card-title>
        <v-alert type="error" v-if="error">
            {{ message }}
          </v-alert>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Category name*" v-model="name" ></v-text-field>
                <span v-if="error_category" type="error">{{ error_category }}</span>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="income_expense" :items="income_expenses" item-text="name" item-value="id"  label="Income/Expense" ></v-select>
                <span v-if="error_transaction" type="error">{{ error_transaction }}</span>
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
    middleware: 'auth',
    data: () => ({
      name: '',
      error: false,
      message: "",
      error_category: null,
      error_transaction: null,
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
          
            this.$axios.$post('/categories', {
              name: this.name,
              type: this.income_expense,
            }).then(response => ( this.$router.push('/category') )) 
            .catch(error => {
              this.error_category = null
              this.error_transaction =null
              this.error_category = error.response.data.errors.name[0]
              this.error_transaction = error.response.data.errors.type[0]
            });
        },
    },
  }
</script>
