<template>
  <v-card class="mx-auto" max-width="400">
    <form ref="loginform" @submit.prevent="login()">
      <v-card-title>
        <span class="headline"></span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="name*"
                name="email"
                v-model="email"
                type="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="password*"
                name="password"
                v-model="password"
                type="password"
                required
              ></v-text-field>
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
  layout:'basic',
  data() {
    return {
      error: {},
      email: "",
      password: ""
    };
  },
  methods: {
      async login() {
        this.error = {};
        try {
          const formData = new FormData(this.$refs.loginform);
          await this.$auth.loginWith('local', { 
            data: formData 
          });
          this.$router.push("/dashboard");
        } catch (err) {
          this.error = err;
         
        }
      },
  }
};
</script>
