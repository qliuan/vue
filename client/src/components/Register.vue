<template>
  <div class="hello">
    <h1>Register</h1>
    <input
      type="username"
      name="username"
      v-model="username"
      placeholder="username" />
    <br>
    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email" />
    <br>
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password" />
    <br>
    <input
      type="usertype"
      name="usertype"
      v-model="usertype"
      placeholder="usertype" />
    <br>
    <div class="error" v-html="error" />
    <br>
    <button
      @click='register'>
      Register
    </button>
  </div>
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
      // console.log('register was clicked', this.email, this.password)
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
.error{
  color: red;
}
</style>
