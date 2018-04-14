<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <h1>Welcome {{username}} !</h1>
      <h2>Your Visit History:</h2>
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
            <v-btn flat light
              @click="detail(props.item)">
              {{ props.item.Name }}
            </v-btn>
          </td>
          <td class="text-xs-right">{{ props.item.VisitDate }}</td>
          <td class="text-xs-right">{{ props.item.Rating }}</td>
          <td>
            <v-btn class="cyan" dark
              @click="detail(props.item)">
              View Detail
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <div class="error" v-html="error" />
      <v-btn class="cyan" dark
        @click="back()">
        Back
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import VisitService from '@/services/VisitService'
export default {
  data () {
    return {
      username: '',
      headers: [
        { text: 'Name', value: 'Name' },
        { text: 'VisitDate', value: 'VisitDate' },
        { text: 'Rating', value: 'Rating' }
      ],
      items: [],
      data: [],
      search: '',
      error: null
    }
  },
  async mounted () {
    this.username = this.$store.state.user.Username
    var data = (await VisitService.visitHistory({
      username: this.username
    })).data
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
    async detail (prop) {
      var items = (await VisitService.checkexist({
        username: this.username,
        propertyID: prop.ID
      })).data

      if (items.length === 0) {
        this.$router.push({
          name: 'visitor_property_detail',
          params: {
            id: prop.ID,
            username: this.username
          }
        })
      } else {
        this.$router.push({
          name: 'visitor_visitedproperty_detail',
          params: {
            id: prop.ID,
            username: this.username
          }
        })
      }
    },
    async back () {
      this.$router.push({
        name: 'visitor_overview'
      })
    }
  }
}
</script>

<style scoped>
</style>
