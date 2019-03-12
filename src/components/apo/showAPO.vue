<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Alteration Purchase Order</div>
      </md-card-header>
      <md-card-actions>
        <md-button class="md-raised md-default pull-right" @click="generatePdf">Generate PDF</md-button>
        <md-button v-if="APO_order.arrived_date" disabled class="md-raised md-primary">Arrived</md-button>
        <md-button v-on:click="arrived" v-else class="md-raised md-primary">Arrived</md-button>
        <!-- <md-button v-bind:href='"/apo/edit/"+ APO_order.code' v-if="showCreateAndButton" class="md-raised md-primary">Modify</md-button> -->
        <router-link tag="md-button" :to='"/apo/edit/"+ APO_order.code' class="md-raised md-primary" v-if="showCreateAndButton">Modify</router-link>
      </md-card-actions>
      <md-card-content>
        <br>
        <md-layout>
          <md-card style="width:100%">
            <md-card-header>
            </md-card-header>
            <md-card-content>
              <div class="col-md-6">
                <div class="panel panel-default">
                  <div class="panel-heading text-center">Sales Order</div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="col-md-6">
                          Order Date:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.orderDate|formatDate}}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="col-md-6">
                          Order ID:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData._id}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-6">
                          Staff ID:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.staffId}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-6">
                          Status:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.status}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-6">
                          Amount:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.amount}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-6">
                          Balance:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.balance}}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="panel panel-default">
                  <div class="panel-heading text-center">Customer</div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="col-md-4">
                          name:
                        </div>
                        <div class="col-md-8">
                          {{customerData.name}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-4">
                          Phone:
                        </div>
                        <div class="col-md-8">
                          {{customerData.phone}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-4">
                          DOB:
                        </div>
                        <div class="col-md-8">
                          {{customerData.dob|formatDate}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-4">
                          Refer:
                        </div>
                        <div class="col-md-8">
                          {{customerData.referby}}
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="col-md-2">
                          Delivery:
                        </div>
                        <div class="col-md-10">
                          {{customerData.deliveryOffice}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <br>
                <br>
                <br>
                <h4>Measurements (Item: <code>{{selectedItem}}</code> | APO: <code>{{APO_order.code}}</code>)</h4>
                <br>
                <br>
              </div>
              <div class="row text-left">

                <div class="col-md-12 padclasscustomer" style="border-bottom: 1px solid lightgrey;
padding-bottom: 18px;
margin-bottom: 18px;">
                <div class="col-md-4">
                    <div class="col-md-6">
                        <strong> Altertaion Price</strong>
                    </div>
                    <div class="col-md-6">
                        {{ APO_order.alteration_price }}
                  </div>
                </div>

                 <div class="col-md-8">
                    <div class="col-md-3">
                        <strong> Remarks  </strong>
                    </div>
                    <div class="col-md-4">
                        {{ APO_order.remark }}
                  </div>
                </div>
                <!-- delivery -->

                <div class="col-md-4">
                    <div class="col-md-3">
                        <strong> Delivery Address</strong>
                    </div>
                    <div class="col-md-4">
                        {{ APO_order.deliveryAddress }}
                  </div>
                </div>

                 <div class="col-md-4">
                    <div class="col-md-3">
                        <strong> Delivery Phone  </strong>
                    </div>
                    <div class="col-md-4">
                        {{ APO_order.deliveryPhone }}
                  </div>
                </div>


                 <div class="col-md-4">
                    <div class="col-md-3">
                        <strong> Delivery Date  </strong>
                    </div>
                    <div class="col-md-4">
                        {{deliveryDate }}
                  </div>
                </div>

            </div>



                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Jacket front Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.jacketFrontLength}}
                      </div>
                    </div>
                  </div>
                </div>


                <div class="col-md-6 padclasscustomer" >
                  <div class="col-md-6">
                    Jacket Back Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.jacketBackLength}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer" >
                  <div class="col-md-6">
                    Vest Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.vestLength}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer" >
                  <div class="col-md-6">
                    Shoulder
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.shoulder}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Jacket SL Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.jktSlLength}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Whole Chest
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.wholeChest}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Front Chest
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.frontChest}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Back Chest
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.backChest}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Chest vertical
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.chestVertical}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Chest Horizontal
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.chestHorizontal}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Front Chest Pt
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.frtChestPart}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Back Chest pt
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.backChestPart}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Waist
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.waist}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Shirt Collor
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.shirttCollor}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Arm
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.arm}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    ForeArm
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.forearm}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Wrist
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.wrist}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Shirt Sl Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.shirtSlLength}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Sk Size
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.SkSize}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Sk Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.SkLength}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Height
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.height}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Dress Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.dressLength}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Female Blouse Collar
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.femaleBlouseCollor}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Pant Waist
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.pantWaist}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Hip
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.hip}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Crotch
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.crotch}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    PT Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.ptLength}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Thigh
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.thigh}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Shin
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.shin}}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Hem
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        {{APO_order.measurements.labor.hem}}
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </md-card-content>
          </md-card>
        </md-layout>
      </md-card-content>
    </md-card>

  </div>
</template>

<script>
export default {
  name: 'vendor',
  data () {
    return {
      showCreateAndButton: true,
      customerData: '',
      salesOrderData: '',
      selectedItem: '',
      ArrivedButton: true,
      APO_order: {
        measurements: {
          labor: {

          }
        }
      },
      authData: '',
      params: this.$route.params.apoID,
      deliveryDate:'',
      del:''
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

      var userData = JSON.parse(getCookie('userData'));

      // Restriction
      var isAdmin = false;
      var isSales = false;
      var isPurchasing = false;

      for (let i=0; i<userData.role.length; i++) {
        if (userData.role[i] == 'admin') {
          isAdmin = true;
        }
        if (userData.role[i] == 'purchasing') {
          isPurchasing = true;
        }
        if (userData.role[i] == 'sales') {
          isSales = true;
        }
      }

      if (isAdmin) {
        // Nothing to hide
      }

      // For sales
      else if (isSales && isPurchasing == false) {
        this.showCreateAndButton = false;
      }

      this.authData = userData;
      this.getAPO();
      console.log(this.del);
  //
    },
    getAPO: async function () {
      var apo_order_url = this.apiURL + 'api/alteration-order/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id
      await this.$http.get(apo_order_url).then(response => {
        this.APO_order = response.body;
        this.del=  this.APO_order.deliveryDate;
        console.log(this.del);
        this.deliveryDate1();
        console.log(response);
      }, response => {
        console.log(response)
      })

      var customerID;

      var sales_url = this.apiURL + 'salesOrder/' + (this.APO_order.SO).trim() + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id
      await this.$http.get(sales_url).then(response => {
        customerID = response.body.customerId;
        this.salesOrderData = response.body;
        for (let i=0;i<response.body.itemsDetail.length;i++) {
          if (response.body.itemsDetail[i].so_row == this.APO_order.SO_row) {
            this.selectedItem = response.body.itemsDetail[i].productType;
          }
        }
        console.log(response);
      }, response => {
        console.log(response)
      })

      var customer_url = this.apiURL + 'customer/' + customerID + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id
      await this.$http.get(customer_url).then(response => {
        this.customerData = response.body;
      }, response => {
        console.log(response)
      })
    },
    // Update date in APO order
    arrived: async function () {
      var d = new Date();
      this.APO_order.arrived_date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
      this.APO_order.status = "arrived"
      this.ArrivedButton = false;

      var updateDateURL = this.apiURL + 'api/alteration-order/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id
      await this.$http.put(updateDateURL, this.APO_order).then(response => {
        console.log(response);
        this.APO_order = response.body;
      }, response => {
        console.log(response)
      })
    },
    generatePdf: async function functionName() {

        var pdfURL = this.apiURL + 'api/alteration-order-pdf/' + this.params  +'/?' + 'token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id
        var filepath = ''

        await this.$http.get(pdfURL).then(response => {
          //  filepath = response.body.filename.replace('./public/', '');
          }, response => {
            console.log('ds');
            console.log(response);
          })
          var fileURL = this.apiURL +  filepath;
          window.open(pdfURL, '_blank');
    },
    deliveryDate1 :async function(currentDate){
      if(this.del!=''){
    //    alert(this.del);
       var currentDate =new  Date(this.del);

        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Be careful! January is 0 not 1
        var year = currentDate.getFullYear();
        console.log(date + "-" +(month + 1) + "-" + year);

        this.deliveryDate = date + "-" +(month + 1) + "-" + year;
      }
    },


  },


  created: function () {
    this.getCookie();
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
