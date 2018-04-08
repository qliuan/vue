<template>
  <div class="hello">
    <h1>Register</h1>
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
      email: '',
      password: ''
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
      console.log('register was clicked', this.email, this.password)
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
