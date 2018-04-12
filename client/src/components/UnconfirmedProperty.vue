<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <h1>Unconfirmed Properties</h1>
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
          <td class="text-xs-right">{{ props.item.Name }}</td>
          <td class="text-xs-right">{{ props.item.Street }}</td>
          <td class="text-xs-right">{{ props.item.City }}</td>
          <td class="text-xs-right">{{ props.item.Zip }}</td>
          <td class="text-xs-right">{{ props.item.Size }}</td>
          <td class="text-xs-right">{{ props.item.PropertyType }}</td>
          <td class="text-xs-right">{{ props.item.IsPublic }}</td>
          <td class="text-xs-right">{{ props.item.IsCommercial }}</td>
          <td class="text-xs-right">{{ props.item.ID }}</td>
          <td class="text-xs-right">{{ props.item.Owner }}</td>
          <td>
            <v-btn class="cyan" dark
              @click="edit(props.item)">
              Manage
            </v-btn>
          </td>
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
        { text: 'Address', value: 'Street', sortable: false },
        { text: 'City', value: 'City', sortable: false },
        { text: 'Zip', value: 'Zip', sortable: false },
        { text: 'Size', value: 'Size' },
        { text: 'Type', value: 'PropertyType', sortable: false },
        { text: 'Is Public', value: 'IsPublic', sortable: false },
        { text: 'Is Commercial', value: 'IsCommercial', sortable: false },
        { text: 'ID', value: 'ID', sortable: false },
        { text: 'Owner', value: 'Owner' }
      ],
      items: [],
      data: [],
      search: '',
      error: null
    }
  },

  async mounted () {
    this.username = this.$store.state.user.Username
    var data = (await AdminService.admin_unconfirmed_overview()).data
    data.forEach(function (property) { // converting the formats
      property.IsPublic = Boolean(Number(property.IsPublic))
      property.IsCommercial = Boolean(Number(property.IsCommercial))
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
    async edit (prop) {
      this.$router.push({
        name: 'admin_manage_property',
        params: {
          id: prop.ID,
          admin: this.$store.state.user.Username
        }
      })
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
