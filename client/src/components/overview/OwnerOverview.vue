<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>

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
            <v-btn flat
              @click="detail(props.item)">
              {{ props.item.Name }}
            </v-btn>
          </td>
          <td class="text-xs-right">{{ props.item.Street }}</td>
          <td class="text-xs-right">{{ props.item.City }}</td>
          <td class="text-xs-right">{{ props.item.Zip }}</td>
          <td class="text-xs-right">{{ props.item.Size }}</td>
          <td class="text-xs-right">{{ props.item.PropertyType }}</td>
          <td class="text-xs-right">{{ Boolean(Number(props.item.IsPublic)) }}</td>
          <td class="text-xs-right">{{ Boolean(Number(props.item.IsCommercial)) }}</td>
          <td class="text-xs-right">{{ Number(props.item.ID).toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping:false}) }}</td>
          <td class="text-xs-right">{{ Boolean(Number(props.item.IsValid)) }}</td>
          <td class="text-xs-right">{{ props.item.Visits }}</td>
          <td class="text-xs-right">{{ props.item.Avg_Rating }}</td>
        </template>
      </v-data-table>
      <div class="error" v-html="error" />
    </v-flex>
  </v-layout>
</template>

<script>
import OverviewService from '@/services/OverviewService'
export default {
  data () {
    return {
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
    this.data = (await OverviewService.owner_overview({
      username: this.$store.state.user.Username
    })).data
    this.items = this.data
  },
  watch: {
    search (filter) {
      console.log(filter.toLowerCase())
      // filter the data
      this.items = this.data.filter(
        // for all objects
        function (obj) {
          // for all keys
          return Object.keys(obj).some(
            function (key) {
              try {
                return obj[key].toString().toLowerCase().indexOf(filter) > -1
              } catch (err) {
                console.log('obj', obj, 'key', key)
                return false
              }
            }
          )
        }
      )
    }
  },
  methods: {
    async detail (property) {
      console.log(property)
      // already get item, redirect to property details

      // try {
      //   const response = await PropertyService.detail({
      //     ID: property.ID,
      //     user: this.$store.state.user
      //   })
      //   console.log(response.data)

      //   // jump to owner_overview page
      //   this.$router.push({
      //     name: 'owner_property_detail'
      //   })

      // } catch (error) {
      //   this.error = error.response.data.error
      // }
    }
  }
}
</script>

<style scoped>
</style>
