<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <h1>Welcome {{username}} !</h1>
      <h2>All public properties:</h2>
      <v-text-field
        label="Search"
        v-model="search"
      ></v-text-field>

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
        </template>
      </v-data-table>
      <v-btn class="cyan" dark
        @click="viewHistory()">
        View Visit History
      </v-btn>
      <div class="error" v-html="error" />
    </v-flex>
  </v-layout>
</template>

<script>
import OverviewService from '@/services/OverviewService'
import VisitService from '@/services/VisitService'
export default {
  data () {
    return {
      username: '',
      headers: [
        { text: 'Name', value: 'Name' },
        { text: 'Address', value: 'Street', sortable: false }, /*, align: 'left' */
        { text: 'City', value: 'City' },
        { text: 'Zip', value: 'Zip', sortable: false },
        { text: 'Size', value: 'Size', sortable: false },
        { text: 'Type', value: 'PropertyType' },
        { text: 'Is Public', value: 'IsPublic', sortable: false },
        { text: 'Is Commercial', value: 'IsCommercial', sortable: false },
        { text: 'ID', value: 'ID', sortable: false },
        { text: 'Is Valid', value: 'IsValid', sortable: false },
        { text: 'Visits', value: 'Visits' },
        { text: 'Avg. Rating', value: 'Avg_Rating' }
      ],
      items: [],
      data: [],
      search: '',
      error: null
    }
  },
  async mounted () {
    this.username = this.$store.state.user.Username
    var data = (await OverviewService.visitor_overview()).data
    data.forEach(function (property) { // converting the formats
      property.IsPublic = Boolean(Number(property.IsPublic))
      property.IsCommercial = Boolean(Number(property.IsCommercial))
      property.IsValid = Boolean(Number(property.IsValid))
      property.ID = Number(property.ID).toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping: false})
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
      console.log('in detail')
      var items = (await VisitService.checkexist({
        username: this.username,
        propertyID: Number(prop.ID)
      })).data
      console.log(items)
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
    async viewHistory () {
      this.$router.push({
        name: 'view_visit_history',
        params: { username: this.username }
      })
    }
  }
}
</script>

<style scoped>
</style>
