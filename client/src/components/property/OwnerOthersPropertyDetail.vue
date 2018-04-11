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
      @click="back()">
      Back
    </v-btn>
  </div>
</template>

<script>
import PropertyService from '@/services/PropertyService'
import FarmItemService from '@/services/FarmItemService'

export default {
  data () {
    return {
      id: '',
      property: {},
      animals: [],
      crops: [],
      titles: ['Name', 'Owner', 'Email', 'Street', 'City', 'Zip', 'Size', 'PropertyType', 'IsPublic', 'IsCommercial', 'ID', 'IsValid', 'Avg_Rating'],
      error: null
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    var pList = (await PropertyService.owner_property_detail({
      id: this.id
    })).data

    pList.forEach(function (property) { // converting the formats
      property.IsPublic = Boolean(Number(property.IsPublic))
      property.IsCommercial = Boolean(Number(property.IsCommercial))
      property.IsValid = Boolean(Number(property.IsValid))
      property.ID = Number(property.ID).toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping: false})
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
        name: 'owner_others_overview'
      })
    }
  }
}
</script>

<style scoped>
</style>
