<template>
  <v-card class="mx-auto" max-width="800">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">Category</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn to="category/create" color="warning" dark>
          Add CAtegory
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-card-text>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th>ID</th>
              <th class="text-left">Title</th>
              <th>Type</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>{{ category.type == "income" ? "Income" : "Expense" }}</td>
              <td>
                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                  :to="'category/' + category.id"
                  >Edit</v-btn
                >
                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                  @click="deletedata(category.id)"
                  >Delete</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>
<script>
import CategoryList from "~/components/category/CategoryList";
export default {
  middleware: "auth",
  data: () => ({
    dialog: false,
    dialog1: false,
    name: "",
    type: ""
  }),
  components: {
    CategoryList
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    deletedata(e) {
      this.$axios
        .$delete("/categories/" + e)
        .then(response => this.$store.dispatch("loadCategories"));
    },

    getData() {
      this.$axios
        .$get("/categories")
        .then(response => (this.categories = response));
    }
  },
  created() {
    this.$store.dispatch("loadCategories");
  }
};
</script>
