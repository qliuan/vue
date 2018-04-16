<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <v-btn flat dark
        @click="navigateTo({name: 'root'})">
        Atlanta Property Inventory
      </v-btn>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn flat dark
        v-if="$store.state.isUserLoggedIn"
        @click="goToOverview()">
        Overview
      </v-btn>
    </v-toolbar-items>

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
    },
    goToOverview () {
      var type = this.$store.state.user.UserType
      switch (type) {
        case 'OWNER':
          // jump to owner_overview page
          this.$router.push({
            name: 'owner_overview'
          })
          break
        case 'ADMIN':
          // jump to admin_overview page
          this.$router.push({
            name: 'admin_overview'
          })
          break
        default:
          // jump to visitor_overview page
          this.$router.push({
            name: 'visitor_overview'
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
