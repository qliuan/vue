<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <v-btn flat dark
        @click="navigateTo({name: 'root'})">
        Atlanta Property Inventory
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat dark
        @click="navigateTo({name: 'visitor_register'})">
        Visitor Sign Up
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn flat dark
        @click="navigateTo({name: 'owner_register'})">
        Owner Sign Up
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn flat dark
        v-if="!$store.state.isUserLoggedIn"
        @click="navigateTo({name: 'login'})">
        Log In
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn flat dark
        v-if="$store.state.isUserLoggedIn"
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
// controller
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
