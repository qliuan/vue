<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <panel title="Visitor Register">
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
            label="Confirm Password"
            v-model="confirm_password"
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

      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/global/Panel'
// controller
export default {

  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      usertype: 'VISITOR',
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
      // console.log('register was clicked', this.email, this.password)
      if (!(this.password === this.confirm_password)) {
        this.error = 'Confirm Password must be the same as your Password'
      } else {
        try {
          const response = await AuthenticationService.register({
            username: this.username,
            email: this.email,
            password: this.password,
            usertype: this.usertype
          })
          console.log(response)
          this.$router.push('login')
        } catch (error) {
          this.error = error.response.data.error
        }
        this.$router.push({name: 'login'})
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
