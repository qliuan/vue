<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <h1>All Owners in System</h1>
      <v-text-field
        label="Search"
        v-model="search"
      ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">
            <v-btn icon class="mx-0" @click="delete_account(props.item)">
              <v-icon color="orange">delete</v-icon>
            </v-btn>
            {{ props.item.Username }}</td>
          <td class="text-xs-right">{{ props.item.Email }}</td>
          <td class="text-xs-right">{{ props.item.PropNum }}
          </td>
        </template>
      </v-data-table>
      <!-- <v-btn class="cyan" dark
        @click="delete_account(props.item.Username)">
        Delete Visitor Account
      </v-btn>
      <v-btn class="cyan" dark
        @click="delete_log(props.item)">
        Delete Log History
      </v-btn> -->
      <v-btn class="cyan" dark
        @click="back()">
        Back
      </v-btn>
      <div class="error" v-html="error" />
    </v-flex>
  </v-layout>
</template>

<script>
import AdminService from '@/services/AdminService'
export default {
  data () {
    return {
      headers: [
        { text: 'Username', value: 'Username' },
        { text: 'Email', value: 'Email' },
        { text: 'Number of Properties', value: 'PropNum' }
      ],
      items: [],
      data: [],
      search: '',
      error: null
    }
  },

  async mounted () {
    var data = (await AdminService.get_owners()).data
    this.items = this.data = data
  },

  watch: {
    search (filter) {
      // filter the data
      this.items = this.data.filter( // for all objects
        function (obj) { // for all keys
          return Object.keys(obj).some(function (key) {
            try {
              return obj[key].toString().toLowerCase().indexOf(filter) > -1
            } catch (err) {
              return false
            }
          })
        })
    }
  },

  methods: {
    async delete_account (prop) {
      try {
        const response = await AdminService.delete_account({
          username: prop.Username
        })
        console.log(response)
        var data = (await AdminService.get_owners()).data
        this.items = this.data = data
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },

    async back () {
      this.$router.push({
        name: 'adminoverview'
      })
    }
  }
}
</script>

<style scoped>
</style>
