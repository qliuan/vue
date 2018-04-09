<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <!-- <td>{{ props.item.Name }}</td> -->
          <td class="text-xs-right">{{ props.item.Name }}</td>
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
      items: []
    }
  },
  async mounted () {
    this.items = (await OverviewService.owner_overview({
      username: this.$store.state.user.Username
    })).data
    console.log(this.items)
  }
}
</script>

<style scoped>
</style>
