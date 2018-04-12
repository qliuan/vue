<template>
  <v-layout align-center>
    <v-flex xs12 sm4 text-xs-center>
      <v-toolbar-title>Welcome</v-toolbar-title>
      <div>
        <v-btn color="primary"
          @click="navigateTo({name: 'visitorlist'})">
          View Visitors List
        </v-btn>
      </div>
      <div>
        <v-btn color="primary"
          @click="navigateTo({name: 'ownerlist'})">
          View Confirmed Properties
        </v-btn>
        <v-btn color="primary"
          @click="navigateTo({name: 'confirmed_property_list'})">
          View Confirmed Properties
        </v-btn>
        <v-btn color="primary"
          @click="navigateTo({name: 'unconfirmed_property_list'})">
          View Unconfirmed Properties
        </v-btn>
        <v-btn color="primary"
          @click="navigateTo({name: 'approveditem'})">
          View Approved Animals and Crops
        </v-btn>
        <v-btn color="primary"
          @click="navigateTo({name: 'pendingitem'})">
          View Pending Animals and Crops
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
