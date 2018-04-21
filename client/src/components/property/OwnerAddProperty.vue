<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <panel title="Owner Add Property">

          <v-text-field
            label="Property Name"
            v-model="property_name"
          ></v-text-field>
          <br>
          <v-text-field
            label="Street Address"
            v-model="street_address"
          ></v-text-field>
          <br>
          <div class="form-group col-md-4">
            <v-text-field
              label="City"
              v-model="city"
            ></v-text-field>
          </div>
          <div class="form-group col-md-4">
            <v-text-field
              label="Zip"
              v-model="zip"
            ></v-text-field>
          </div>
          <div class="form-group col-md-4">
            <v-text-field
              label="Acres"
              v-model="acres"
            ></v-text-field>
          </div>
          <br>
          <div class="form-group col-md-4">
            <span>Property Type</span>
            <select v-model="property_type" style="background-color:lightblue">
              <option disabled value="">Please select one</option>
              <option>FARM</option>
              <option>GARDEN</option>
              <option>ORCHARD</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <span>Select Animal</span>
            <select v-model="animals" style="background-color:lightblue">
              <option v-for="option in animalOptions" v-bind:value="option.Name" v-bind:key="option.Name">
                {{ option.Name }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <span>Select Crop</span>
            <select v-model="crops" style="background-color:lightblue">
              <option v-for="option in cropOptions" v-bind:value="option.Name" v-bind:key="option.Name">
                {{ option.Name }}
              </option>
            </select>
          </div>
          <br>
          <span>Public ?</span>
          <select v-model="isPublic" style="background-color:lightblue">
            <option disabled value="">Please select one</option>
            <option>true</option>
            <option>false</option>
          </select>
          <br>
          <br>
          <span>Commercial ?</span>
          <select v-model="isCommercial" style="background-color:lightblue">
            <option disabled value="">Please select one</option>
            <option>true</option>
            <option>false</option>
          </select>
          <div class="error" v-html="error" />
        <v-btn
          @click='create'
          class="cyan"
          dark>
          Create
        </v-btn>

      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/global/Panel'
import FarmItemService from '@/services/FarmItemService'
import HasService from '@/services/HasService'
import PropertyService from '@/services/PropertyService'

// controller
export default {
  data () {
    return {
      title: this.$store.state.user.Username,
      usertype: 'OWNER',
      error: null,
      property_name: '',
      street_address: '',
      city: '',
      zip: '',
      acres: '',
      property_type: '',
      animals: '',
      crops: '',
      isPublic: true,
      isCommercial: true,
      animalOptions: [],
      cropOptions: [],
      property_id: 0
    }
  },
  // v-model is for 2-way binding
  watch: {
    async property_type (value) {
      if (value === 'FARM') {
        try {
          const animals = await FarmItemService.FarmItem_register({
            Proptype: value,
            isAnimal: true
          })
          this.animalOptions = animals.data
          console.log(animals)
        } catch (error) {
          this.error = error.response.data.error
        }

        try {
          const crops = await FarmItemService.FarmItem_register({
            Proptype: value,
            isAnimal: false
          })
          this.cropOptions = crops.data
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          const crops = await FarmItemService.FarmItem_register({
            Proptype: value,
            isAnimal: false
          })
          this.cropOptions = crops.data
          this.animalOptions = []
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  },
  methods: {
    async create () {
      // console.log('Debugging', this.$store.state.user.Username, this.property_name, this.street_address, this.city, this.zip, this.acres, this.property_type, this.animals, this.crops, this.isPublic, this.isCommercial)
      if ((!this.property_name) || (!this.property_type) || (!this.street_address) || (!this.city) || (!this.zip) || (!this.acres)) {
        this.error = 'Please enter all required information'
        setTimeout(function () { this.error = null }.bind(this), 2000)
        return
      }
      var sizepattern = /^[0-9]{1,10}$/
      if (!sizepattern.test(this.acres)) {
        this.error = 'Please enter a valid Acres in integer from 1 to 10 digits'
        setTimeout(function () {
          this.error = null
        }.bind(this), 2000)
        return
      }
      var pattern = /^[0-9]{5}$/
      if (!pattern.test(this.zip)) {
        this.error = 'Please enter 5-digit zip code'
        setTimeout(function () {
          this.error = null
        }.bind(this), 2000)
        return
      }
      const checkpropertyID = await PropertyService.get_id_by_name({
        // propertyName: 'Kenari Company Farm'
        propertyName: this.property_name
      })
      if (checkpropertyID.data.length !== 0) {
        this.error = 'The property name must be unique'
      }
      if (this.zip.length !== 5) {
        this.error = 'Please enter 5-digits zip code'
      } else if ((!this.error) && (this.property_name) && (this.property_type) && (!this.property_type === 'FARM' || this.animals) && (this.crops)) {
        try {
          const response = await PropertyService.insert({
            username: this.$store.state.user.Username,
            propertyName: this.property_name,
            streetAddress: this.street_address,
            city: this.city,
            zip: this.zip,
            acres: this.acres,
            propertyType: this.property_type,
            animals: this.animals,
            crops: this.crops,
            isPublic: this.isPublic,
            isCommercial: this.isCommercial
          })
          console.log(response)
        } catch (error) {
          // console.log(error)
          this.error = error.response.data.error
        }

        // Get Property ID back by property name
        try {
          const propertyID = await PropertyService.get_id_by_name({
            // propertyName: 'Kenari Company Farm'
            propertyName: this.property_name
          })
          this.property_id = propertyID.data[0].ID
          // console.log(propertyID)
        } catch (error) {
          this.error = error.response.data.error
        }

        // insert into Has table
        try {
          const crops = await HasService.insert({
            propertyID: this.property_id,
            farmitem: this.crops
          })
          console.log(crops)
        } catch (error) {
          this.error = error.response.data.error
        }
        if (this.property_type === 'FARM') {
          try {
            const animals = await HasService.insert({
              propertyID: this.property_id,
              farmitem: this.animals
            })
            console.log(animals)
          } catch (error) {
            this.error = error.response.data.error
          }
        }
        // console.log('\n\nCreation Ends Here\n\n', this.error)
        this.$router.push({ name: 'owner_overview' })
      }
      setTimeout(function () { this.error = null }.bind(this), 2000)
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
