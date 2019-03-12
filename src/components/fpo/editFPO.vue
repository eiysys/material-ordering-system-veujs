<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Fabric Purchase Order</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="updateFPO">Update</md-button>
      </md-card-actions>
      <br>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <div class="row">
                <div class="col-md-3">
                  FPO:
                  <code>{{fpoCode}}</code>
                </div>
                <div class="col-md-4">
                  <!-- AutoComplete Test -->
                  <md-input-container md-theme="default">
                    <label>Choose a Vendor</label>
                    <md-autocomplete v-model="fabricData.vendor"
                                      :list="vendors"
                                      print-attribute="name"
                                      :filter-list="vendorFilter"
                                      :min-chars="0"
                                      :max-height="6"
                                      :debounce="500">
                    </md-autocomplete>
                  </md-input-container>
                  <p class="text-danger" v-if="vendorValidation">*Vendor field Required</p>
                  <p class="text-danger" v-if="vendorValidValidation">Please enter valid Vendor</p>
                </div>
                <div class="col-md-4">
                  <md-input-container>
                    <label>Remark</label>
                    <md-textarea v-model="fabricData.remark"></md-textarea>
                  </md-input-container>
                </div>
              </div>
              <br>
              <h4>Order Items</h4>
              <template v-for="fabric in fabricData.fab_data">
                <md-card>
                  <md-card-content>

                    <div class="row">
                      <div class="col-md-3">
                        <p><strong>SO:</strong> {{fabric.SO}}</p>
                        <p><strong>Line:</strong> {{fabric.so_row}}</p>
                      </div>
                      <div class="col-md-3">
                        <strong>Fabric:</strong> {{fabric.fabric}}<br>
                        <strong>Fabric Color:</strong> {{fabric.color}} <br>
                        <strong>Description:</strong>  {{fabric.description}}
                      </div>
                      <div class="col-md-3">
                        <button class="btn btn-default" disabled>Arrived</button>
                      </div>
                      <div class="col-md-3">
                        <strong>Arrived Date :</strong> {{fabric.arrived_date}}
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="col-md-3">
                        <md-input-container>
                          <md-icon>attach_money</md-icon>
                          <label>Price</label>
                          <md-textarea v-model="fabric.price"></md-textarea>
                        </md-input-container>
                        <p class="text-danger" v-if="fabric.priceBlankValidation">*Price field Required</p>
                        <p class="text-danger" v-if="fabric.priceValidation">Please enter valid Price</p>
                      </div>
                      <div class="col-md-3">
                        <md-input-container>
                          <label>Quantity</label>
                          <md-textarea v-model="fabric.quantity"></md-textarea>
                        </md-input-container>
                        <p class="text-danger" v-if="fabric.quantityBlankValidation">*Quantity field Required</p>
                        <p class="text-danger" v-if="fabric.quantityValidation">Please enter valid Quantity</p>
                      </div>
                      <div class="col-md-3">
                        <md-input-container>
                          <label>Unit</label>
                          <md-textarea v-model="fabric.unit"></md-textarea>
                        </md-input-container>
                        <p class="text-danger" v-if="fabric.unitValidation">*Unit field Required</p>
                      </div>
                      <!--  <div class="col-md-3">
                        <md-input-container>
                          <label>Fabric Price</label>
                          <md-textarea v-model="fabricData.fabricPrice"></md-textarea>
                        </md-input-container>
                        <p class="text-danger" v-if="fabricPricevalidation">*Fabric price field Required</p>
                      </div> -->

                    </div>
                    <!-- delievery address -->
                        <div class="row">
                          <div class="col-md-3">
                            <md-input-container>
                              <md-icon>home</md-icon>
                              <label>Delivery Address</label>
                              <md-textarea v-model="fabricData.deliveryAddress"></md-textarea>
                            </md-input-container>
                            <p class="text-danger" v-if="delAddValidation">*Delivery address field Required</p>

                          </div>
                          <div class="col-md-3">
                            <md-input-container>
                                <md-icon>phone</md-icon>
                              <label>Delivery Phone No </label>
                              <md-textarea v-model="fabricData.deliveryPhone"></md-textarea>
                            </md-input-container>
                            <p class="text-danger" v-if="delPhnValidation">*Phone no. field Required</p>
                             <p class="text-danger" v-if="delPhoneVlidations">*Please enter valid phone no.</p>
                          </div>

                          <div class="col-md-3 date-cl">
                             <label>Delivery Date</label>
                            <v2-datepicker v-model='fabricData.deliveryDate' lang="en" format="MM/DD/YYYY"  placeholder="Delivery Date"></v2-datepicker>

                            <p class="text-danger" v-if="delDateValidation">*Phone no. field Required</p>
                          </div>

                        </div>
                    <!-- end del address -->

                  </md-card-content>
                </md-card>
                <br>
              </template>
            </md-card-content>
          </md-card >
        </md-layout>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Router from '../../router/index.js';
export default {
  name: 'vendor',
  data () {
    return {


      // FPO Data
      fabricData: '',
      price: '',
      quantity: '',
      unit: '',
      remark: '',
      // Autocomplete
      vendorValue: '',
      vendors: [
        {name: "aqua", color: "#00ffff"},
      ],
      fpoCode: '',
      // Autocomplete Ends
      fabricListForOrder : [],

      // validations
      vendorValidation: '',
      vendorValidValidation: '',
      priceValidation: '',
      quantityValidation: '',
      unitValidation: '',
      fabricPricevalidation:'',
      delAddValidation:'',
      delPhnValidation:'',
      delDateValidation:'',
      delPhoneVlidations:''
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

      this.getVendors();
      this.getFPOData();
    },

    fabricdetail: async function (fabricDataWithDetails) {
      for (let i=0;i<fabricDataWithDetails.fab_data.length;i++) {

        var fabricURL = this.apiURL + 'api/fabric/' + fabricDataWithDetails.fab_data[i].fabric.replace( /^\s+|\s+$/g, '') + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        await this.$http.get(fabricURL).then(response => {
          fabricDataWithDetails.fab_data[i].color = response.body.color;
          fabricDataWithDetails.fab_data[i].description = response.body.description;
        }, response => {
          console.log(response)
        })
      }
      this.fpoCode = fabricDataWithDetails.code;
      console.log(this.fabricData);
      this.fabricData = fabricDataWithDetails;
    },
    // Get data from local storage\
    getFPOData: function () {

      var getFabricURL = this.apiURL + 'api/fabric-order/' + this.$route.params.fpoID + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(getFabricURL).then(response => {
        this.fabricdetail(response.body);
      }, response => {
        console.log(response)
      })
    },

    // Update FPO
    updateFPO: function functionName() {


      console.log('updateing fpo');
      var allValidated = true

      // Validations
      var vendorValidated = false;
      var priceValidated = false;
      var quantityValidated = false;
      var unitValidated = false;

      this.vendorValidation =  false;
      this.vendorValidValidation = false;
      this.priceValidation = false;
      this.quantityValidation = false;
      this.unitValidation = false;
      this.fabricPricevalidation = false;
      this.delAddValidation = false;
      this.delPhnValidation = false;
      this.delDateValidation=false;
      this.delPhoneVlidations=false;

      // vendor validation
      // if (this.fabricData.vendor.trim() == '') {
      //   this.vendorValidation = true
      //   allValidated = false
      // } else {
      //   this.vendorValidation = false
      //   vendorValidated = true
      // }


       //fabric price validatiion
      /*  if(this.fabricData.fabricPrice.trim() == '') {
            this.fabricPricevalidation = true
            allValidated = false
        } else {
            this.fabricPricevalidation = false
        }*/

        //Delivery Address validatiion
        if(this.fabricData.deliveryAddress.toString().trim() == '') {
            this.delAddValidation = true
            allValidated = false
        } else {
            this.delAddValidation = false
        }

        //Delivery Phone validatiion
        if(this.fabricData.deliveryPhone.toString().trim() == '') {
            this.delPhnValidation = true
            allValidated = false
        } else {
            this.delPhnValidation = false

          if (!/^\d+$/.test(this.fabricData.deliveryPhone.toString().trim())) {
            this.delPhoneVlidations = true
             allValidated = false

          } else {
              if (this.fabricData.deliveryPhone.length < 7 || this.fabricData.deliveryPhone.length > 12) {
                this.delPhoneVlidations = true
               // this.deliveryPhone = ''
                  allValidated = false
              } else {
                this.delPhoneVlidations = false
                 allValidated = true
              }
          }

        }




      if (this.fabricData.vendor.toString().trim() == '') {
        this.vendorValidation = true
        allValidated = false
      } else {

        var found = false;
        for (let i=0; i<this.vendors.length;i++){
          if (this.fabricData.vendor.toString().trim() == this.vendors[i].name) {
            found = true
          }
        }




        if (found) {
          vendorValidated = true
        } else {
          this.vendorValidValidation = true
          vendorValidated = false
          allValidated = false
        }
      }

      console.log(allValidated);

      // Row Validation

      for (let i=0;i<this.fabricData.fab_data.length;i++) {
        console.log("yes");
        // Price Validation
        if(this.fabricData.fab_data[i].price == '') {
            this.fabricData.fab_data[i].priceBlankValidation = true
            this.fabricData.fab_data[i].priceValidation = false
            allValidated = false
        } else if (!/^-?\d*(\.\d+)?$/.test(this.fabricData.fab_data[i].price) ){
            this.fabricData.fab_data[i].priceValidation = true
            this.fabricData.fab_data[i].priceBlankValidation = false
            allValidated = false
        } else {
            this.fabricData.fab_data[i].priceBlankValidation = false
            this.fabricData.fab_data[i].priceValidation = false
        }

        // Quantity Validation
        if(this.fabricData.fab_data[i].quantity.toString().trim() == '') {
            this.fabricData.fab_data[i].quantityBlankValidation = true
            this.fabricData.fab_data[i].quantityValidation = false
            allValidated = false
        } else if (!/^-?\d*(\.\d+)?$/.test(this.fabricData.fab_data[i].quantity.toString().trim())) {
              this.fabricData.fab_data[i].quantityBlankValidation = false
            this.fabricData.fab_data[i].quantityValidation = true
            allValidated = false
        } else {
            this.fabricData.fab_data[i].quantityValidation = false
            this.fabricData.fab_data[i].quantityBlankValidation = false
        }

        // Unit Validation
        if(this.fabricData.fab_data[i].unit.toString().trim() == '') {
            this.fabricData.fab_data[i].unitValidation = true
            allValidated = false
        } else {
            this.fabricData.fab_data[i].unitValidation = false
        }



         //Delivery date validatiion
     /*   if(this.fabricData.fab_data[i].deliveryDate.trim() == '') {
            this.fabricData.fab_data[i].delDateValidation = true
            allValidated = false
        } else {
            this.fabricData.fab_data[i].delDateValidation = false
        }*/



      }

      if (allValidated) {

      } else {
        return
      }

      console.log(this.fabricData);

      // Remove fabric Data from fabricListForOrder
      for (let i=0;i<this.fabricData.fab_data.length;i++) {
        delete this.fabricData.fab_data[i].color;
        delete this.fabricData.fab_data[i].description;
      }
      // Update New Data

      var updateFPOURL = this.apiURL + 'api/fabric-order/' + this.fabricData.code + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.put(updateFPOURL, this.fabricData).then(response => {

        // window.location.href = '/fpo/'+this.fabricData.code;
        var redirectURL = '/fpo/'+this.fabricData.code
        Router.push(redirectURL)
      }, response => {
        console.log(response)
      })
    },

    // Get all vendors from API
    getVendors: function () {
      // console.log(this.$route.params.data);

      var vendorURL = this.apiURL + 'api/vendor' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(vendorURL).then(response => {
        // Fiter Data
        var newData = []
        var data = response.body;
        for (var i=0;i<data.length;i++) {
          if (data[i].type == 'fabric') {
            newData.push(data[i]);
          }
        }
        this.vendors = newData;
      }, response => {
        console.log(response)
      })
    },

    // Show Side Panel (Hidden in PO Dashboard)
    showPanel: function () {
      $("#fadeout").show();
      $("#poDashFull").css('margin-left','20%');
    },

    // Sort List of Vendors according to the query
    vendorFilter: function(list, query) {
      var arr = [];
      query = query.toUpperCase();
      for(var i = 0; i < list.length; i++) {
        var q = list[i].name.toUpperCase();
        if(q.indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 3)
          break;
      }
      return arr;
    }
  },
  created: function () {
    this.getCookie()
  },
  mounted: function () {
    this.showPanel()
  }
}

</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px
}
html {
overflow:   scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
