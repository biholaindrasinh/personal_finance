<template>
  <v-card class="mx-auto" max-width="400">
    <form>
      <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>
      <v-card-text>
        <v-alert type="error" v-if="error">
          {{ message }}
        </v-alert>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="name*"
                v-model="registration.name"
                type="name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="email*"
                v-model="registration.email"
                type="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="password*"
                v-model="registration.password"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$router.push('/')"
          >Cancel</v-btn
        >
        <v-btn color="blue darken-1" text @click.prevent="register()"
          >Register</v-btn
        >
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  layout: "basic",
  data() {
    return {
      error: false,
      message: "",
      registration: {
        name: "",
        email: "",
        password: ""
      }
    };
  },

  methods: {
    register() {
      this.$axios
        .$post("/auth/register", this.registration)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          this.error = true;
          this.message = error.response.data.errors.email[0];
        });
    }
  }
};
</script>
