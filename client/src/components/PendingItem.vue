<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <h1>Pending Animals/Crops</h1>
      <v-text-field
        label="Search"
        v-model="search"
      ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">
            <v-btn icon class="mx-0" @click="approve(props.item)">
              <v-icon color="green">check_circle</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="remove(props.item)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
            {{ props.item.Name }}</td>
          <td class="text-xs-right">{{ props.item.Type }}</td>
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
      search: '',
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
