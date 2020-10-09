<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ name }}</td>
    <td>{{ type }}</td>
    <td>
      <v-btn class="ma-2" outlined color="indigo" :to="'category/' + id"
        >Edit</v-btn
      >
      <v-btn class="ma-2" outlined color="indigo" @click="deletedata(id)"
        >Delete</v-btn
      >
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    id: {},
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
  },
  methods: {
    deletedata(id) {
      this.$axios
        .$delete("http://api.panimtechnology.com/api/categories/" + id)
        .then((response) => this.$router.push("/category"));
    },
  },
};
</script>
