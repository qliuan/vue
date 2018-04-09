<template>
  <div class="login">
    <h1>ATL Gardens, Farms, and Orchard</h1>
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
    <div class="error" v-html="error" />
    <br>
    <button
      @click='login'>
      Login
    </button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        if (response.data.userType === 'ADMIN') {
          this.$router.push({name: 'adminoverview'})
        } else if (response.data.userType === 'OWNER') {
          this.$router.push({name: 'owneroverview'})
        } else {
          this.$router.push({name: 'visitoroverview'})
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error{
  color: red;
}
</style>
