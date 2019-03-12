<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Edit Fabric</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="saveFabric" class="md-raised md-primary">Save</md-button>
      </md-card-actions>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <div class="row">
                <div class="col-md-12">
                  <div class="col-md-4">

                  </div>
                  <div class="col-md-4">

                    <md-input-container>
                      <md-icon>code</md-icon>
                      <label>Code</label>
                      <md-textarea v-model="fabricData._id" readonly disabled></md-textarea>
                    </md-input-container>
                    <md-input-container>
                      <md-icon>opacity</md-icon>
                      <label>Color</label>
                      <md-textarea v-model="fabricData.color" style="text-transform: capitalize;"></md-textarea>
                    </md-input-container>
                    <p v-if="colorBlankError" class="text-danger text-center">Please enter valid color</p>
                    <!-- price -->
                      <md-input-container>
                      <md-icon>attach_money</md-icon>
                      <label>Price</label>
                      <md-textarea v-model="fabricData.price" style="text-transform: capitalize;"></md-textarea>
                    </md-input-container>

                        <p v-if="priceBlankError" class="text-danger">*Price Field Required</p>
                        <p v-if="priceValidError" class="text-danger">Please enter valid Price</p>

                    <!-- end price -->
                    <md-input-container>
                      <md-icon>speaker_notes</md-icon>
                      <label>Description</label>
                      <md-textarea v-model="fabricData.description" ></md-textarea>
                    </md-input-container>
                    <md-input-container>
                      <md-icon>create</md-icon>
                      <label>Remark</label>
                      <md-textarea v-model="fabricData.remark" ></md-textarea>
                    </md-input-container>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card >
        </md-layout>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>

import moment from 'moment'
import Router from '../../router/index.js';

export default {
  name: 'fabric-edit',
  data () {
    return {
      codeBlankError: false,
      colorBlankError: false,
      colorValidError: false,
      priceBlankError: false,
      priceValidError: false,
      fabricData: {
        name: '',
        phone: '',
        address: '',
        price:'',
        remark: '',
        createdAt: ''
      },
      params: this.$route.params.fabricID
    }
  },
  methods: {
    getCookie: function () {
      function getCookie(cname) {
          var name = cname + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
      }

      var userData = getCookie('userData');
      this.authData = JSON.parse(userData);
      this.getFabric()
    },
    saveFabric:  function () {
      this.codeBlankError = false
      this.colorBlankError = false
      this.colorValidError = false
      this.priceBlankError = false
      this.priceValidError = false

      var codeValidated = false
      var colorValidated = false
      var priceValidated = false

      var data = this.fabricData
      console.log(data.price);

      // Validation
      if (data._id.toString().trim() == '') {
        this.codeBlankError = true
      } else {
        codeValidated = true
      }

      if (data.color.toString().trim() == '') {
        this.colorBlankError = true
      } else if (!/^[a-zA-Z]+$/.test(data.color)) {
        this.colorValidError = true
      } else {
        colorValidated = true
      }


      //price validations

      if (data.price == '' ){
        this.priceBlankError = true
         priceValidated = false
      } else if (!/^[0-9]+$/.test(data.price)) {
        this.priceValidError = true
      } else {
        priceValidated = true
      }


      if (!codeValidated || !colorValidated || !priceValidated) {
        return
      }

/*
      if (data.color.trim() == '') {
        this.colorBlankError = true
      }*/

      if (data.color.trim() != '') {
        delete data.createdAt
        delete data.updatedAt
        var fabricURL = this.apiURL + 'api/fabric/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.put(fabricURL, data).then(response => {
          // window.location.href = '/fabric/'+ response.body._id;
          var redirectURL = '/fabric/'+ response.body._id
          Router.push(redirectURL)
        }, response => {
          console.log(response)
        })
      }
    },
    getFabric: function () {
      if (this.params) {

        var fabricURL = this.apiURL + 'api/fabric/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.get(fabricURL).then(response => {

          // Date format
          var data = response.body;
          data.createdAt = moment(String(data.createdAt)).format('DD-MM-YYYY')
          data.updatedAt = moment(String(data.updatedAt)).format('DD-MM-YYYY')

          this.fabricData = data;
        }, response => {
          console.log(response)
        })
      }
    }
  },
  created() {
    this.getCookie()
  }
}

</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px
}
</style>
