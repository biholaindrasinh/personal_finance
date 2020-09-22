<template>
<v-card  class="mx-auto"
    max-width="400">

   
     <form ref="registerform" @submit.prevent="registerform()">
        <v-card-title>
          <span class="headline">Registration</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="name*" v-model="name" type="name" required></v-text-field>
              </v-col>
               <v-col cols="12" sm="12" md="12">
                <v-text-field label="email*" v-model="email" type="email" required></v-text-field>
              </v-col>
               <v-col cols="12" sm="12" md="12">
                <v-text-field label="password*" v-model="password" type="password" required></v-text-field>
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
    layout: "basic",
    data() {
      return {
        error: {},
       
            name: '',
            email: '',
            password: ''
    
      };
    },
   
    methods: {
       registerform() {
          console.log(this.register)
           this.$axios.$post('/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password 
            }).then(response => this.$router.push("/"));
      },
    },
  };
</script>