<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <panel title="Login">

        <v-text-field
          label="Email"
          v-model="email"
        ></v-text-field>
        <br>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
        ></v-text-field>
        <br>
        <div class="error" v-html="error" />
        <v-btn
          @click='login'
          class="cyan"
          dark>
          Login
        </v-btn>
        <!-- <div v-html="comments" /> -->
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/global/Panel'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
      // comments: `'farmowner','farmerJoe@gmail.com','farming123','OWNER'`
      // comment: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

        // console.log(response.data)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        switch (response.data.user.UserType) {
          case 'OWNER':
            // jump to owner_overview page
            this.$router.push({
              name: 'owner_overview'
            })
            break
          case 'ADMIN':
            // jump to owner_overview page
            this.$router.push({
              name: 'admin_overview'
            })
            break
          case 'VISITOR':
            // jump to owner_overview page
            this.$router.push({
              name: 'visitor_overview'
            })
            break
          default:
            this.error = 'Error jumping to the overview page'
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>
<style scoped>
</style>
