<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <panel title="Owner-Register">
        <v-text-field
            label="User Name"
            v-model="username"
          ></v-text-field>
          <br>
          <v-text-field
            label="Email"
            v-model="email"
          ></v-text-field>
          <br>
          <v-text-field
            label="Password"
            v-model="password"
          ></v-text-field>
          <br>
          <v-text-field
            label="Confirm Password"
            v-model="confirm_password"
          ></v-text-field>
          <br>
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
          <div class="form-group col-md-4" v-if="property_type == 'FARM'">
            <span>Select Animal</span>
            <select v-model="animals" style="background-color:lightblue">
              <option v-for="option in animalOptions" v-bind:value="option.Name" v-bind:key="option.Name">
                {{ option.Name }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-4" v-if="property_type">
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
        <v-alert v-if="comment" type="success" :value="true">
          {{comment}}
        </v-alert>
        <v-btn
          @click='register'
          class="cyan"
          dark>
          Register
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/global/Panel'
import FarmItemService from '@/services/FarmItemService'
import HasService from '@/services/HasService'
import PropertyService from '@/services/PropertyService'

// controller
export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      usertype: 'OWNER',
      comment: null,
      error: null,
      property_name: '',
      street_address: '',
      city: '',
      zip: '',
      acres: '',
      property_type: null,
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
      console.log('property_type', value)
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
          console.log(crops)
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
          console.log(crops)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  },
  methods: {
    async register () {
      console.log('register was clicked', this.password, this.confirm_password)
      if (this.zip.length !== 5) {
        this.error = 'Please enter 5-digit zip code'
      } else if (!(this.password === this.confirm_password)) {
        this.error = 'Confirm Password must be the same as your Password'
      } else {
        try {
          const response = await AuthenticationService.register({
            username: this.username,
            email: this.email,
            password: this.password,
            usertype: this.usertype,
            property_name: this.property_name,
            street_address: this.street_address,
            city: this.city,
            zip: this.zip,
            acres: this.acres,
            property_type: this.property_type,
            animals: this.animals,
            crops: this.crops,
            isPublic: this.isPublic,
            isCommercial: this.isCommercial

          })
          console.log(response)
        } catch (error) {
          this.error = error.response.data.error
        }

        try {
          const response = await PropertyService.insert({
            username: this.username,
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
          console.log('insert into property message below: ')
          console.log(response)
          // this.$router.push('login')
        } catch (error) {
          console.log(error)
          this.error = error.response.data.error
        }

        // Get Property ID back by property name
        try {
          const propertyID = await PropertyService.get_id_by_name({
            // propertyName: 'Kenari Company Farm'
            propertyName: this.property_name
          })
          this.property_id = propertyID.data[0].ID
          console.log(propertyID)
          console.log('propertyID')
        } catch (error) {
          this.error = error.response.data.error
        }

        // insert into Has table
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

          try {
            const crops = await HasService.insert({
              propertyID: this.property_id,
              farmitem: this.crops
            })
            console.log(crops)
          } catch (error) {
            this.error = error.response.data.error
          }
        } else {
          try {
            const crops = await HasService.insert({
              propertyID: this.property_id,
              farmitem: this.crops
            })
            console.log(crops)
          } catch (error) {
            this.error = error.response.data.error
          }
        }
        this.comment = 'Visitor Account Registeration Succeeded'
        setTimeout(function () {
          this.comment = ''
          this.$router.push({name: 'login'})
        }.bind(this), 2000)
      }
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
