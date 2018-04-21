<template>
  <div class="hello">
    <h1>Admin Manage {{title}}</h1>

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
        <select v-model="property.IsPublic" class="select-style">
          <option disabled value={property.IsPublic}>Please select one</option>
          <option>true</option>
          <option>false</option>
        </select>
      </v-flex>
      <v-flex xs2 />
      <v-flex xs3>
        <span>Commercial ?</span>
        <select v-model="property.IsCommercial" class="select-style">
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
        <v-flex xs4>
          <td>
            <h3>{{crop.Name}}</h3>
          </td>
          <td>
            <!-- <i class="material-icons" @click='deleteItem(crop.Name, crop.Type)'>delete</i> -->
            <v-btn icon class="mx-0" @click="deleteItem(crop.Name, crop.Type)">
              <v-icon color="cyan">delete</v-icon>
            </v-btn>
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
            <!-- <i class="material-icons" @click='deleteItem(animal.Name, animal.Type)'>delete</i> -->
            <v-btn icon class="mx-0" @click="deleteItem(animal.Name, animal.Type)">
              <v-icon color="cyan">delete</v-icon>
            </v-btn>
          </td>
        </v-flex>
      </div>
    </v-layout>

    <v-layout row>
      <v-flex xs1 />
      <v-flex xs3>
        <span>Add New Crop</span>
        <select v-model="newCrop" class="select-style">
          <option selected disabled>Please select one</option>
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
        <select v-model="newAnimal" class="select-style">
          <option selected disabled>Please select one</option>
          <option v-for="animal in validAnimals" :key="animal.Name">{{animal.Name}}</option>
        </select>
        <v-btn
          @click='addAnimal'
          class="cyan"
          dark>
          Add Animal
        </v-btn>
      </v-flex>
    </v-layout>

    <div class="error" v-html="error" />
    <v-alert v-if="comment" type="success" :value="true">
      {{comment}}
    </v-alert>
    <v-btn
      @click='save'
      class="cyan"
      dark>
      Save Changes (Confirm)
    </v-btn>
    <v-btn
      @click='back'
      class="cyan"
      dark>
      Back (Don't Save)
    </v-btn>
    <v-btn
      @click='deleteProperty'
      class="red"
      dark>
      Delete the Property
    </v-btn>
  </div>
</template>

<script>
import PropertyService from '@/services/PropertyService'
import FarmItemService from '@/services/FarmItemService'
import HasService from '@/services/HasService'

export default {
  data () {
    return {
      id: '',
      title: '',
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

    this.title = this.property.Name
    var type = this.property.PropertyType

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
        if (obj.Type.indexOf('ANIMAL') > -1) {
          return false
        } else {
          console.log('Filter by Property Type', type)
          if (type === 'GARDEN') {
            var flag1 = obj.Type.indexOf('FLOWER') > -1 || obj.Type.indexOf('VEGETABLE') > -1
            console.log(obj.Name, obj.Type, flag1)
            return flag1
          } else if (type === 'ORCHARD') {
            var flag2 = obj.Type.indexOf('NUT') > -1 || obj.Type.indexOf('FRUIT') > -1
            console.log(obj.Name, obj.Type, flag2)
            return flag2
          } else {
            return true
          }
        }
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
          setTimeout(function () {
            this.error = null
          }.bind(this), 2000)
          return
        }
        // remove the item from this.animals
        this.animals = this.animals.filter(function (item) { return item.Name !== name })
        // add the item to this.validAnimals
        this.validAnimals.push({ Name: name, Type: type })
      } else {
        if (this.crops.length === 1) {
          this.error = 'Fail to delete the last crop'
          setTimeout(function () {
            this.error = null
          }.bind(this), 2000)
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
        name: 'admin_overview'
      })
    },

    async save () {
      // Update the property
      const checkpropertyID = await PropertyService.get_id_by_name({
        // propertyName: 'Kenari Company Farm'
        propertyName: this.property.Name
      })
      if ((checkpropertyID.data.length !== 0) && (Number(checkpropertyID.data[0].ID).toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping: false}) !== this.id)) {
        this.error = 'The property name must be unique'
        return
      }
      var pattern = /^[0-9]{5}$/
      if (!pattern.test(this.property.Zip)) {
        this.error = 'Please enter 5-digit zip code'
        setTimeout(function () {
          this.error = null
        }.bind(this), 2000)
        return
      }

      try {
        await PropertyService.update_property({
          property: this.property,
          user: this.$store.state.user
        })

        // Adding Has relations
        for (let item of this.itemAdding) {
          // console.log('Adding', item.Name, 'to', this.property.ID)
          await HasService.insert({
            propertyID: this.property.ID,
            farmitem: item.Name
          })
        }

        // Deleting Has relations
        for (let item of this.itemDeleting) {
          // console.log('Deleting', item.Name, 'from', this.property.ID)
          await HasService.delete({
            propertyID: this.$route.params.id,
            farmitem: item.Name
          })
        }

        this.comment = 'Updating the Property Succeeded'
        setTimeout(function () {
          this.$router.push({
            name: 'confirmed_property_list'
          })
        }.bind(this), 2000)
      } catch (error) {
        this.error = error.response.data.error
      }
    },

    async deleteProperty () {
      try {
        await PropertyService.delete_property({
          id: this.id
        })
        this.comment = 'Deleting the Porperty Succeeded'
        setTimeout(function () {
          this.$router.push({
            name: 'confirmed_property_list'
          })
        }.bind(this), 2000)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.select-style {
    border: 1px solid #ccc;
    width: 120px;
    border-radius: 3px;
    overflow: hidden;
    background: #fafafa no-repeat 90% 50%;
}

.select-style select {
    padding: 5px 8px;
    width: 130%;
    border: none;
    box-shadow: none;
    background: transparent;
    background-image: none;
    -webkit-appearance: none;
}

.select-style select:focus {
    outline: none;
}
</style>
