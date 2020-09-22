<template>
  <v-card class="mx-auto" max-width="400">
    <form>
     <v-card-title>
          <span class="headline">Login</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="email*"
                v-model="credentials.email"
                type="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="password*"
                v-model="credentials.password"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn to="/register" color="blue darken-1" text> Registration </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="login()">Save</v-btn>
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
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      this.error = {};
      try {
        await this.$auth.loginWith("local", {
          data: this.credentials
        });
        this.$router.push("/dashboard");
      } catch (err) {
        this.error = err;
      }
    }
  }
};
</script>
