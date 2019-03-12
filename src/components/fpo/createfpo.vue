<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Fabric Purchase Order</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="saveFPO" class="md-raised md-primary">Save</md-button>
      </md-card-actions>
      <br>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <div class="row">
                <div class="col-md-2">

                </div>
                <div class="col-md-4">
                  <!-- AutoComplete Test -->
                  <md-input-container md-theme="default">
                    <label>Choose a Vendor</label>
                    <md-autocomplete v-model="vendorValue"
                                      :list="vendors"
                                      print-attribute="name"
                                      :filter-list="vendorFilter"
                                      :min-chars="0"
                                      :max-height="6"
                                      :debounce="500" id="vendorBox">
                    </md-autocomplete>
                  </md-input-container>
                  <p class="text-danger" v-if="vendorValidation">*Vendor field Required</p>
                  <p class="text-danger" v-if="vendorValidValidation">Please enter valid Vendor</p>
                </div>
                <div class="col-md-4">
                  <md-input-container>
                    <label>Remark</label>
                    <md-textarea v-model="remark"></md-textarea>
                  </md-input-container>
                  <!-- <p class="text-danger">Remark</p> -->
                </div>
              </div>
              <br>
              <template v-for="fabric in fabricListForOrder">
                <md-card>
                  <md-card-content>

                    <div class="row">
                      <div class="col-md-3">
                        <p><strong>SO:</strong> {{fabric.SO}}</p>
                        <p>Line {{fabric.so_row}}</p>
                      </div>
                      <div class="col-md-3">
                        <strong>Fabric:</strong> {{fabric.fabric}}<br>
                        <strong>Fabric Color:</strong> {{fabric.fab_data.color}} <br>
                        <strong>Description:</strong> {{fabric.fab_data.description}}
                      </div>
                      <div class="col-md-3">
                        <!-- <button class="btn btn-default" disabled>Arrived</button> -->
                      </div>
                      <!-- <div class="col-md-3">
                        Arrived Date : NA
                      </div> -->
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
                    </div>
                      <!-- delievery address -->
                        <div class="row">
                          <div class="col-md-3">
                            <md-input-container>
                              <md-icon>home</md-icon>
                              <label>Delivery Address</label>
                              <md-textarea v-model="deliveryAddress"></md-textarea>
                            </md-input-container>
                            <p class="text-danger" v-if="delAddValidation">*Delivery address field Required</p>

                          </div>
                          <div class="col-md-3">
                            <md-input-container>
                                <md-icon>phone</md-icon>
                              <label>Delivery Phone No </label>
                              <md-textarea v-model="deliveryPhone"></md-textarea>
                            </md-input-container>
                            <p class="text-danger" v-if="delPhnValidation">*Phone no. field Required</p>
                                <p class="text-danger" v-if="delPhoneVlidations">*Please enter valid phone no.</p>


                          </div>

                           <div class="col-md-3 date-cl-new">

                            <label></label>

                              <v2-datepicker v-model='deliveryDate' lang="en" format="MM/DD/YYYY"  placeholder="Delivery Date"></v2-datepicker>

                            <p class="text-danger" v-if="deldatelidation">*Delivery Date field Required</p>
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

      // Validations
      vendorValidation: false,
      vendorValidValidation: false,
      priceValidation: false,
      quantityValidation: false,
      unitValidation: false,
      delPhoneVlidations:false,

      authData: '',
      // FPO Data
      price: '',
      quantity: '',
      unit: '',
      remark: '',
      updateStatusInSalesOrder: '',
      fpoCode: '',
      // Autocomplete
      vendorValue: '',
      vendors: [
        {name: "aqua", color: "#00ffff"},
      ],
      // Autocomplete Ends
      fabricListForOrder : [],
      delAddValidation:'',
      delPhnValidation:'',
      deldatelidation:'',
      deliveryAddress:'',
      deliveryPhone:'',
      deliveryDate:''
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
      this.getDataFromLocalStorage();
      this.getVendors()
    },
    // Get data from local storage
    getDataFromLocalStorage: async function () {
      // Parse Data from Cookie
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

      let FPO_order = JSON.parse(getCookie('fpo_order_data'));

      for(let i=0; i<FPO_order.length; i++){

        var fabricURL = this.apiURL + 'api/fabric/' + (FPO_order[i].fabric).trim() + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        await this.$http.get(fabricURL).then(response => {
          FPO_order[i].fab_data = response.body;
          FPO_order[i].price = response.body.price;
          FPO_order[i].quantity = '';
          FPO_order[i].unit = '';
        }, response => {
          console.log(response)
        })
      }
      this.fabricListForOrder =  FPO_order;
    },
    // Save FPO
    saveFPO: function () {
      console.log("acha");
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

      this.delAddVlidation=false;
      this.delPhoneVlidation=false;
      this.deldatelidation=false;
      this.delPhoneVlidations=false;



      if (this.deliveryAddress.trim() == '') {
            this.delAddVlidation = true
            allValidated = false
        }else{
            this.delAddVlidation = false
            allValidated = true
        }

        if (this.deliveryPhone.trim() == '') {
            this.delPhoneVlidation = true
            allValidated = false
        }else{

          if (!/^\d+$/.test(this.deliveryPhone.trim())) {
            this.delPhoneVlidations = true
         //   this.deliveryPhone = ''
             allValidated = false

          } else {
              if (this.deliveryPhone.length < 7 || this.deliveryPhone.length > 12) {
                this.delPhoneVlidations = true
               // this.deliveryPhone = ''
                  allValidated = false
              } else {
                this.delPhoneVlidations = false
                 allValidated = true
              }
          }

           /* this.delPhoneVlidation = false
            allValidated = true*/
        }

        if (this.deliveryDate == '') {
            this.deldatelidation = true
            allValidated = false
        }else{
            this.deldatelidation = false
            allValidated = true
        }






      // Row Validation

      for (let i=0;i<this.fabricListForOrder.length;i++) {
        // Price Validation
        if(this.fabricListForOrder[i].price == '') {
            this.fabricListForOrder[i].priceBlankValidation = true
            this.fabricListForOrder[i].priceValidation = false
            allValidated = false
        } else if (!/^-?\d*(\.\d+)?$/.test(this.fabricListForOrder[i].price)) {
            this.fabricListForOrder[i].priceBlankValidation = false
            this.fabricListForOrder[i].priceValidation = true
            allValidated = false
        } else {
            this.fabricListForOrder[i].priceBlankValidation = false
            this.fabricListForOrder[i].priceValidation = false
        }

        // Quantity Validation
        if(this.fabricListForOrder[i].quantity.trim() == '') {
            this.fabricListForOrder[i].quantityBlankValidation = true
            this.fabricListForOrder[i].quantityValidation = false
            allValidated = false
        } else if (!/^-?\d*(\.\d+)?$/.test(this.fabricListForOrder[i].quantity.trim())) {
            this.fabricListForOrder[i].quantityBlankValidation = false
            this.fabricListForOrder[i].quantityValidation = true
            allValidated = false
        } else {
            this.fabricListForOrder[i].quantityBlankValidation = false
            this.fabricListForOrder[i].quantityValidation = false
        }

        // Unit Validation
        if(this.fabricListForOrder[i].unit.trim() == '') {
            this.fabricListForOrder[i].unitValidation = true
            allValidated = false
        } else {
            this.fabricListForOrder[i].unitValidation = false
        }

          //Delivery Address validatiion
        if(this.deliveryAddress.trim() == '') {
            this.delAddValidation = true
            allValidated = false
        } else {
            this.delAddValidation = false
        }

        //Delivery Phone validatiion
        if(this.deliveryPhone.trim() == '') {
            this.delPhnValidation = true
            allValidated = false
        } else {
            this.delPhnValidation = false
        }

         //Delivery date validatiion
         /* if(this.fabricData.fab_data[i].deliveryDate.trim() == '') {
              this.fabricData.fab_data[i].delDateValidation = true
              allValidated = false
          } else {
              this.fabricData.fab_data[i].delDateValidation = false
          }*/


      }

      // vendor validation
      if (this.vendorValue.trim() == '') {
        this.vendorValidation = true
        allValidated = false
      } else {

        var found = false;
        for (let i=0; i<this.vendors.length;i++){
          if (this.vendorValue.trim() == this.vendors[i].name) {
            found = true
          }
        }
        if (found) {
          vendorValidated = true
        } else {
          this.vendorValidValidation = true
        }
      }

      if (allValidated) {

      } else {
        this.vendorValue  += ' '
        this.vendorValue.trim()
        return
      }

      // Remove fabric Data from fabricListForOrder
      for (let j=0; j<this.fabricListForOrder.length; j++) {
        delete this.fabricListForOrder[j].fab_data
      }

      // Drafy Data for FPO order
      var data = {
        staff: this.authData._id,
        orderType: 'fabric',
        vendor: this.vendorValue.trim(),
        status: 'placed',
        remark: this.remark,
        deliveryAddress:this.deliveryAddress,
        deliveryPhone:this.deliveryPhone,
        deliveryDate:this.deliveryDate,
        fab_data: this.fabricListForOrder
      }

      for (let k=0;k<data.fab_data.length;k++) {
        data.fab_data[k].po_row = k+1;
      }

      // Saving Fabric Order Data
      var saveFabricURL = this.apiURL + 'api/fabric-order' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.post(saveFabricURL, data).then(response => {
        this.updateStatusInSalesOrder = response.body;
        this.fpoCode = response.body.code;
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

    // Update Sales Order
    updateSalesOrder: function () {
      var data = this.updateStatusInSalesOrder;
      // console.log("This is update sales order method");
      // console.log(data);

      // Remove fab data from Sales Order
      for (let i=0; i<data.fab_data.length; i++ ) {
        delete data.fab_data[i].fab_data
      }

      var updateSalesURL = this.apiURL + 'salesOrder/updateFPO' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      console.log(updateSalesURL);

      this.$http.put(updateSalesURL, data).then(response => {
        console.log(response);
        // window.location.href = '/fpo/'+this.fpoCode;
        var redirectURL = '/fpo/'+this.fpoCode
        Router.push(redirectURL)
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
      return arr;;
    }
  },
  created: function () {
    this.getVendors()
  },
  mounted: function () {
    this.showPanel()
    this.getCookie()
  },
  watch: {
    updateStatusInSalesOrder: function () {
      this.updateSalesOrder()
    }
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
