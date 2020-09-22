<template>
      <v-card  class="mx-auto"
    max-width="400">

   
     <form @submit.prevent="onSave">
        <v-card-title>
          <span class="headline">Account Add</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Account name*" v-model="accounts.name" required></v-text-field>
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
      accounts:[],
    }),
      methods: {
        onSave() {
          
            this.$axios.$post('/accounts', {
              name: this.accounts.name
            })
            .then(response => (  this.$router.push('/account') ))
           
        },
    },
  }
</script>