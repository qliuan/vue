<template>
  <v-layout column>
    <v-flex xs6 offset-xs0>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Owner-Register</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
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
          <br>
          <v-btn
            @click='register'
            class="cyan"
            dark>
            Register
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import FarmItemService from '@/services/FarmItemService'
// controller
export default {

  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
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
      cropOptions: []

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
      if (!(this.password === this.confirm_password)) {
        console.log('not same')
        this.error = 'Confirm Password must be the same as your Password'
      } else {
        try {
          const response = await AuthenticationService.register({
            username: this.username,
            email: this.email,
            password: this.password,
            usertype: this.usertype
          })
          console.log(response)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
