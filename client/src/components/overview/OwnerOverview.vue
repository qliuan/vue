<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <h1>Welcome {{username}} !</h1>
      <h2>Your properties:</h2>

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
          <td class="text-xs-right">
            <v-btn flat light
              @click="detail(props.item)">
              {{ props.item.Name }}
            </v-btn>
          </td>
          <td class="text-xs-right">{{ props.item.Street }}</td>
          <td class="text-xs-right">{{ props.item.City }}</td>
          <td class="text-xs-right">{{ props.item.Zip }}</td>
          <td class="text-xs-right">{{ props.item.Size }}</td>
          <td class="text-xs-right">{{ props.item.PropertyType }}</td>
          <td class="text-xs-right">{{ props.item.IsPublic }}</td>
          <td class="text-xs-right">{{ props.item.IsCommercial }}</td>
          <td class="text-xs-right">{{ props.item.ID }}</td>
          <td class="text-xs-right">{{ props.item.IsValid }}</td>
          <td class="text-xs-right">{{ props.item.Visits }}</td>
          <td class="text-xs-right">{{ props.item.Avg_Rating }}</td>
          <td>
            <v-btn class="cyan" dark
              @click="edit(props.item)">
              Edit
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <v-btn class="cyan" dark
        @click="viewOthers()">
        View Other Properties
      </v-btn>
      <v-btn class="cyan" dark
        @click="addProperty()">
        Add Property
      </v-btn>
      <div class="error" v-html="error" />
    </v-flex>
  </v-layout>
</template>

<script>
import OverviewService from '@/services/OverviewService'
export default {
  data () {
    return {
      username: '',
      headers: [
        { text: 'Name', value: 'Name' },
        { text: 'Street', value: 'Street', sortable: false }, /*, align: 'left' */
        { text: 'City', value: 'City' },
        { text: 'Zip', value: 'Zip', sortable: false },
        { text: 'Size', value: 'Size', sortable: false },
        { text: 'PropertyType', value: 'PropertyType' },
        { text: 'IsPublic', value: 'IsPublic', sortable: false },
        { text: 'IsCommercial', value: 'IsCommercial', sortable: false },
        { text: 'ID', value: 'ID', sortable: false },
        { text: 'IsValid', value: 'IsValid', sortable: false },
        { text: 'Visits', value: 'Visits' },
        { text: 'Avg_Rating', value: 'Avg_Rating' }
      ],
      items: [],
      data: [],
      filter: '',
      filterKey: '',
      keys: [
        'Name', 'Street', 'City', 'Zip', 'Size', 'PropertyType',
        'IsPublic', 'IsCommercial', 'ID', 'IsValid', 'Visits', 'Avg_Rating'
      ],
      error: null
    }
  },
  async mounted () {
    this.username = this.$store.state.user.Username
    var data = (await OverviewService.owner_overview({
      username: this.$store.state.user.Username
    })).data
    data.forEach(function (property) { // converting the formats
      property.IsPublic = Boolean(Number(property.IsPublic))
      property.IsCommercial = Boolean(Number(property.IsCommercial))
      property.IsValid = Boolean(Number(property.IsValid))
      property.ID = Number(property.ID).toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping: false})
      property.Avg_Rating = property.Avg_Rating || 'N/A'
    })
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
      this.$router.push({
        name: 'owner_property_detail',
        params: { id: prop.ID }
      })
    },
    async edit (prop) {
      this.$router.push({
        name: 'owner_manage_property',
        params: { id: prop.ID }
      })
    },

    async viewOthers () {
      this.$router.push({
        name: 'owner_others_overview'
      })
    },

    async addProperty () {
      this.$router.push({
        name: 'owner_add_property'
      })
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
    }
  }
}
</script>

<style scoped>
</style>
