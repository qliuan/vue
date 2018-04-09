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
          <td class="text-xs-right">{{ props.item.IsPublic }}</td>
          <td class="text-xs-right">{{ props.item.IsCommercial }}</td>
          <td class="text-xs-right">{{ props.item.ID }}</td>
          <td class="text-xs-right">{{ props.item.IsValid }}</td>
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
        // {
        //   text: 'Dessert (100g serving)',
        //   align: 'left',
        //   sortable: false,
        //   value: 'name'
        // },
        { text: 'Name', value: 'Name' },
        { text: 'Street', value: 'Street' },
        { text: 'City', value: 'City' },
        { text: 'Zip', value: 'Zip' },
        { text: 'Size', value: 'Size' },
        { text: 'Type', value: 'PropertyType' },
        { text: 'Is Public', value: 'IsPublic' },
        { text: 'Is Commercial', value: 'IsCommercial' },
        { text: 'ID', value: 'ID' },
        { text: 'Is Valid', value: 'IsValid' },
        { text: 'Visits', value: 'Visits' },
        { text: 'Avg. Rating', value: 'Avg_Rating' }
      ],
      items: null
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
