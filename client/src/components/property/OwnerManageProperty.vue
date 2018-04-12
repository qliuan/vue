<template>
  <div class="hello">
    <h1>Manage {{property.Name}}</h1>

    <v-layout row>
      <v-flex xs2 />
      <v-flex xs3>
        <v-text-field
          label="Property Name"
          v-model="property.Name"
        ></v-text-field>
      </v-flex>

      <v-flex xs2 />
      <v-flex xs3>
        <v-text-field
          label="Type"
          v-model="property.PropertyType"
          disabled
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs2 />
      <v-flex xs3>
        <v-text-field
          label="Street Address"
          v-model="property.Street"
        ></v-text-field>
      </v-flex>

      <v-flex xs2 />
      <v-flex xs3>
        <v-text-field
          label="City"
          v-model="property.City"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs1 />
      <v-flex xs3>
        <v-text-field
          label="Zip"
          v-model="property.Zip"
        ></v-text-field>
      </v-flex>

      <v-flex xs1 />
      <v-flex xs3>
        <v-text-field
          label="Size"
          v-model="property.Size"
        ></v-text-field>
      </v-flex>

      <v-flex xs1 />
      <v-flex xs3>
        <v-text-field
          label="ID"
          v-model="property.ID"
          disabled
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs2 />
      <v-flex xs3>
        <span>Public ?</span>
        <select v-model="property.IsPublic" style="background-color:lightblue">
          <option disabled value={property.IsPublic}>Please select one</option>
          <option>true</option>
          <option>false</option>
        </select>
      </v-flex>
      <v-flex xs2 />
      <v-flex xs3>
        <span>Commercial ?</span>
        <select v-model="property.IsCommercial" style="background-color:lightblue">
          <option disabled value={property.IsCommercial}>Please select one</option>
          <option>true</option>
          <option>false</option>
        </select>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs2>
        <h3>Crops:</h3>
      </v-flex>
      <div v-for="crop in crops" :key="crop.Name">
        <v-flex xs3>
          <td>
            <h3>{{crop.Name}}</h3>
          </td>
          <td>
            <i class="material-icons" @click='deleteItem(crop.Name, crop.Type)'>delete</i>
          </td>
        </v-flex>
      </div>
    </v-layout>
    <v-layout row v-if="animals.length">
      <v-flex xs2>
        <h3>Animals:</h3>
      </v-flex>
      <div v-for="animal in animals" :key="animal.Name">
        <v-flex xs4>
          <td>
            <h3>{{animal.Name}}</h3>
          </td>
          <td>
            <i class="material-icons" @click='deleteItem(animal.Name, animal.Type)'>delete</i>
          </td>
        </v-flex>
      </div>
    </v-layout>

    <v-layout row>
      <v-flex xs1 />
      <v-flex xs3>
        <span>Add New Crop</span>
        <select v-model="newCrop" style="background-color:lightblue">
          <option disabled>Please select one</option>
          <option v-for="crop in validCrops" :key="crop.Name">{{crop.Name}}</option>
        </select>
        <v-btn
          @click='addCrop'
          class="cyan"
          dark>
          Add Crop
        </v-btn>
      </v-flex>
      <v-flex xs1 />
      <v-flex xs5 v-if="animals.length">
        <span>Add New Animal</span>
        <select v-model="newAnimal" style="background-color:lightblue">
          <option disabled>Please select one</option>
          <option v-for="animal in validAnimals" :key="animal.Name">{{animal.Name}}</option>
        </select>
        <v-btn
          @click='addAnimal'
          class="cyan"
          dark>
          Add Animal
        </v-btn>
      </v-flex>
      <!-- <v-flex xs1 />
      <v-flex xs3 v-if="animals.length">
        <span>Add New Animal</span>
        <select v-model="newAnimal" style="background-color:lightblue">
          <option disabled>Please select one</option>
          <option v-for="animal in validAnimals" :key="animal.Name">{{animal.Name}}</option>
        </select>
        <v-btn
          @click='addAnimal'
          class="cyan"
          dark>
          Add Animal
        </v-btn>
      </v-flex> -->
    </v-layout>

    <div class="error" v-html="error" />
    <div v-html="comment" />
    <v-btn
      @click='save'
      class="cyan"
      dark>
      Save Changes
    </v-btn>
    <v-btn
      @click='back'
      class="cyan"
      dark>
      Back (Don't Save)
    </v-btn>
    <v-btn
      @click='deleteProperty'
      class="cyan"
      dark>
      Delete the Property
    </v-btn>
  </div>
</template>

<script>
import PropertyService from '@/services/PropertyService'
import FarmItemService from '@/services/FarmItemService'
// import HasService from '@/services/HasService'

export default {
  data () {
    return {
      id: '',
      property: {},
      crops: [],
      animals: [],
      validCrops: [],
      validAnimals: [],
      itemAdding: [],
      itemDeleting: [],
      newCrop: '',
      newAnimal: '',
      error: null,
      comment: null
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    var pList = (await PropertyService.owner_property_detail({
      id: this.id
    })).data

    // converting the formats
    pList.forEach(function (property) { // converting the formats
      property.IsPublic = Boolean(Number(property.IsPublic))
      property.IsCommercial = Boolean(Number(property.IsCommercial))
      property.IsValid = Boolean(Number(property.IsValid))
      property.ID = Number(property.ID).toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping: false})
    })
    this.property = pList[0]

    // console.log(this.property)

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

    var otherItems = (await FarmItemService.get_other_valid_items({
      id: this.id
    })).data

    this.validCrops = otherItems.filter( // for all objects
      function (obj) { // for all keys
        var flag = obj.Type.indexOf('ANIMAL') > -1
        return !flag
      })
    this.validAnimals = otherItems.filter( // for all objects
      function (obj) { // for all keys
        var flag = obj.Type.indexOf('ANIMAL') > -1
        return flag
      })
  },

  methods: {

    async deleteItem (name, type) {
      // console.log('Delete', name, type)
      if (type === 'ANIMAL') {
        if (this.animals.length === 1) {
          this.error = 'Fail to delete the last animal'
          return
        }
        // remove the item from this.animals
        this.animals = this.animals.filter(function (item) { return item.Name !== name })
        // add the item to this.validAnimals
        this.validAnimals.push({ Name: name, Type: type })
      } else {
        if (this.crops.length === 1) {
          this.error = 'Fail to delete the last crop'
          return
        }
        // remove the item from this.animals
        this.crops = this.crops.filter(function (item) { return item.Name !== name })
        // add the item to this.validAnimals
        this.validCrops.push({ Name: name, Type: type })
      }
      // add the item to this.itemDeleting
      this.itemDeleting.push({ Name: name, Type: type })
      // remove the item from this.itemAdding
      this.itemAdding = this.itemAdding.filter(function (item) { return item.Name !== name })
      // console.log(this.animals, this.itemDeleting, this.validAnimals)
      // console.log(this.crops, this.itemDeleting, this.validCrops)
    },

    async addCrop () {
      var cropName = this.newCrop
      // console.log('Adding Crop', cropName)
      var crop = this.validCrops.find(function (item) { return item.Name === cropName })
      // console.log('Adding Crop Object', crop)
      // add the item to this.animals
      this.crops.push(crop)
      // remove the item from this.validCrops
      this.validCrops = this.validCrops.filter(function (item) { return item.Name !== crop.Name })
      // add the item to this.itemAdding
      this.itemAdding.push(crop)
      // remove the item from this.itemDeleting
      this.itemDeleting = this.itemDeleting.filter(function (item) { return item.Name !== crop.Name })
      this.newCrop = ''
      // console.log(this.animals, this.itemDeleting, this.validAnimals)
      // console.log(this.crops, this.itemDeleting, this.validCrops)
    },

    async addAnimal () {
      var animalName = this.newAnimal
      var animal = this.validAnimals.find(function (item) { return item.Name === animalName })
      // add the item to this.animals
      this.animals.push(animal)
      // remove the item from this.validAnimals
      this.validAnimals = this.validAnimals.filter(function (item) { return item.Name !== animal.Name })
      // add the item to this.itemAdding
      this.itemAdding.push(animal)
      // remove the item from this.itemDeleting
      this.itemDeleting = this.itemDeleting.filter(function (item) { return item.Name !== animal.Name })
      this.newAnimal = ''
      // console.log(this.animals, this.itemDeleting, this.validAnimals)
      // console.log(this.crops, this.itemDeleting, this.validCrops)
    },

    async back () {
      this.$router.push({
        name: 'owner_overview'
      })
    },

    async save () {
      console.log('Save the changes')
      console.log(this.property)
      // console.log(this.crops, this.animals)
      // console.log(this.validCrops, this.validAnimals)
    },

    async deleteProperty () {
      console.log('Delete the property')
    }
  }
}
</script>

<style scoped>
</style>
