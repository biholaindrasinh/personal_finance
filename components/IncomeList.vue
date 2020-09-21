<template>
     <tr>
          <td>{{ title }}</td>
          <td>{{ date }}</td>
          <td>{{ category}}</td>
          <td>{{ amount }}</td>
          <td>{{ account }}</td>
          <td>
           <v-btn class="ma-2" outlined color="indigo">Edit</v-btn><v-btn class="ma-2" outlined color="indigo">Delete</v-btn>
          </td>
        </tr>
</template>
<script>
export default {
    props: {
        title: {
            type:String,
            required:true
        },
         date: {
            type:String,
            required:true
        },
         amount: {
            type:String,
            required:true
        },
         account: {
            type:String,
            required:true
        },
         category: {
            type:String,
            required:true
        },
    }
}
</script>