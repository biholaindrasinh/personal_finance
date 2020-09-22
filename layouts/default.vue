<template>
  <v-app primary>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
         router
          exact>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="$auth.logout()">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

               
  
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <nav id="header" class="navbar navbar-expand header-setting">
    <div class="main-content">
          <div class="notification" @click="LogOut()"></div>
      </div>
    </div>
  </nav>
  </v-app>
</template>

<script>
export default {
  methods: {
    LogOut() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  },
  data() {

    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Dashboard",
          to: "/dashboard"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Account",
          to: "/account"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Category",
          to: "/category"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Transaction",
          to: "/transaction"
        }
      ],
      miniVariant: false,
      right: true,
      title: "Personal Finance"
    };
  }
};
</script>
