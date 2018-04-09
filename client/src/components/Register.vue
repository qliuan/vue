<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <form
            name="form"
            autocomplete="off">
            <v-text-field
              label="User Name"
              v-model="username"
            ></v-text-field>
            <br>
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
            <br>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              autocomplete="new-password"
            ></v-text-field>
            <br>
            <v-text-field
              label="User Type"
              v-model="usertype"
            ></v-text-field>
          </form>
          <br>
          <div class="error" v-html="error" />
          <br>
          <v-btn
            @click='register'
            class="cyan"
            dark>
            Register
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
// controller
export default {

  data () {
    return {
      username: '',
      email: '',
      password: '',
      usertype: '',
      error: null

    }
  },
  // v-model is for 2-way binding
  // watch: {
  //   email (value) {
  //     console.log('Email has changed to', value)
  //   }
  // }
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password,
          usertype: this.usertype
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
