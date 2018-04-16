<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <h1>Pending Animals/Crops</h1>

      <v-layout row>
        <v-flex xs1 />
        <v-flex xs2>
          <h3>Search By</h3>
          <select v-model="filterKey" class="select-style">
            <option selected disabled>Please select one</option>
            <option v-for="key in keys" :key="key">{{key}}</option>
          </select>
        </v-flex>
        <v-flex xs1>
          <v-text-field
              label="Search"
              v-model="filter"
            ></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-btn
            @click='search'
            class="cyan"
            dark>
            Search
          </v-btn>
        </v-flex>
      </v-layout>

      <v-data-table
        :headers="headers"
        :items="items"
        page-text
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">
            <v-btn icon class="mx-0" @click="approve(props.item)">
              <v-icon color="green">check_circle</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="remove(props.item)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
            {{ props.item.Name }}</td>
          <td class="text-xs-left">{{ props.item.Type }}</td>
        </template>
      </v-data-table>
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
      username: '',
      headers: [
        { text: 'Name', value: 'Name' },
        { text: 'Type', value: 'Type' }
      ],
      items: [],
      data: [],
      filter: '',
      filterKey: '',
      keys: [
        'Name', 'Type'
      ],
      error: null
    }
  },

  async mounted () {
    var data = (await AdminService.get_pending_items()).data
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
    async approve (prop) {
      try {
        const response = await AdminService.approve_item({
          name: prop.Name
        })
        console.log(response)
        var data = (await AdminService.get_pending_items()).data
        this.items = this.data = data
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },

    async remove (prop) {
      try {
        const response = await AdminService.delete_item({
          name: prop.Name
        })
        console.log(response)
        var data = (await AdminService.get_pending_items()).data
        this.items = this.data = data
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },

    async search () {
      var key = this.filterKey
      var filter = this.filter
      if (filter === '') {
        this.items = this.data
        return
      }
      if (key === '') {
        // filter the data
        this.items = this.data.filter( // for all objects
          function (obj) { // for all keys
            return Object.keys(obj).some(function (key) {
              try {
                return obj[key].toString().toLowerCase().indexOf(filter.toLowerCase()) > -1
              } catch (err) {
                return false
              }
            })
          })
      } else {
        // filter the data
        this.items = this.data.filter( // for all objects
          function (obj) { // for all keys
            return obj[key].toString().toLowerCase().indexOf(filter.toLowerCase()) > -1
          })
      }
    },

    async back () {
      this.$router.push({
        name: 'admin_overview'
      })
    }
  }
}
</script>

<style scoped>
</style>
