<template>
  <div class="hello">
    <h1>{{property.Name}} Details</h1>
    <div v-for="title in titles" :key="title">
      <v-layout row>
        <v-flex xs4 />
        <v-flex xs2>
          <h3>{{title+":"}}</h3>
        </v-flex>
        <v-flex xs2>
          <h3>{{property[title]}}</h3>
        </v-flex>
      </v-layout>
    </div>
    <v-layout row>
      <v-flex xs2>
        <h3>Crops:</h3>
      </v-flex>
      <div v-for="crop in crops" :key="crop.Name">
        <v-flex xs2>
          <h3>{{crop.Name + ","}}</h3>
        </v-flex>
      </div>
    </v-layout>
    <div v-if="animals.length">
      <v-layout row>
        <v-flex xs2>
          <h3>Animals:</h3>
        </v-flex>
        <div v-for="animal in animals" :key="animal.Name">
          <v-flex xs2>
            <h3>{{animal.Name + ","}}</h3>
          </v-flex>
        </div>
      </v-layout>
    </div>
    <v-btn class="cyan" dark
      @click="unlog()">
      Unlog Visit
    </v-btn>
    <v-btn class="cyan" dark
      @click="back()">
      Back
    </v-btn>
  </div>
</template>

<script>
import PropertyService from '@/services/PropertyService'
import FarmItemService from '@/services/FarmItemService'
import VisitService from '@/services/VisitService'

export default {
  data () {
    return {
      id: '',
      property: {},
      animals: [],
      crops: [],
      titles: ['Name', 'Owner', 'Email', 'Street', 'City', 'Zip', 'Size', 'PropertyType', 'IsPublic', 'IsCommercial', 'ID', 'IsValid', 'Avg_Rating', 'Visits'],
      error: null,
      rating: 0.0,
      username: ''
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    this.username = this.$route.params.username
    var pList = (await PropertyService.owner_property_detail({
      id: this.id
    })).data

    pList.forEach(function (property) { // converting the formats
      property.IsPublic = Boolean(Number(property.IsPublic))
      property.IsCommercial = Boolean(Number(property.IsCommercial))
      property.IsValid = Boolean(Number(property.IsValid))
      property.ID = Number(property.ID).toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping: false})
      property.Avg_Rating = property.Avg_Rating || 'N/A'
    })

    this.property = pList[0]
    var items = (await FarmItemService.get_property_items({
      id: this.id
    })).data

    this.crops = items.filter( // for all objects
      function (obj) { // for all keys
        var flag = obj.Type.indexOf('ANIMAL') > -1
        return !flag
      })
    this.animals = items.filter( // for all objects
      function (obj) { // for all keys
        var flag = obj.Type.indexOf('ANIMAL') > -1
        return flag
      })
  },
  methods: {
    async back () {
      this.$router.push({
        name: 'visitor_overview'
      })
    },
    async unlog () {
      try {
        const response = await VisitService.unlog({
          username: this.username,
          propertyID: this.id
        })
      } catch (error) {
        this.error = error.response.data.error
      }

      this.$router.push({
        name: 'visitor_property_detail',
        params: {
          id: this.id,
          username: this.username
        }
      })
      // this.$router.push({
      //   name: 'visitor_overview'
      // })
    }
  }
}
</script>

<style scoped>
</style>
