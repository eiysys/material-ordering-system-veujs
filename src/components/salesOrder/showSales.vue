<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available; width:100%">

      <md-card-header>
        <div class="md-title">Sales Order</div>
      </md-card-header>
      <div class="action-buttons">
              <!-- <md-button class="md-raised md-primary" style=""  v-bind:href='"/sales/edit/"+ salesOrderData._id' v-if="showCreateAndButton" >Modify</md-button> -->
              <router-link tag="md-button" :to='"/sales/edit/"+ salesOrderData._id' class="md-raised md-primary" v-if="showCreateAndButton">Modify</router-link>

              <md-button v-on:click="generatePdf()" class="md-raised md-primary">Generate PDF</md-button>
      </div>
      <md-card-content>
        <md-layout>
          <div class="row">
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
                        &#36; {{salesOrderData.amount}}
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="col-md-6">
                        Balance:
                      </div>
                      <div class="col-md-6">
                        &#36; {{salesOrderData.balance}}
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
                        Name:
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
                        ReferBy:
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
            <div class="col-md-12" style="margin-bottom:20px">
              <md-card>
                <md-card-header>
                  <h4 class="text-center">Item Details</h4>
                </md-card-header>
                <md-card-content>
                  <table class="table table-bordered">
                    <thead class="text-center">
                      <tr>
                        <th>Product</th>
                        <th>Quality</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>P.Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in salesOrderData.itemsDetail">
                        <td>{{item.productType}}</td>
                        <td>{{item.quality}}</td>
                        <td>{{item.description}}</td>
                        <td>&#36; <span style="float:right">{{item.price}}</span></td>
                        <td>&#36; <span style="float:right">{{item.pPrice}}</span></td>
                        <td>{{item.quantity}}</td>
                        <td>&#36; <span style="float:right">{{item.pPrice * item.quantity}}</span></td>
                        <td>{{item.status}}</td>
                      </tr>
                    </tbody>
                  </table>
                </md-card-content>
              </md-card>
            </div>
            <div class="col-md-12">
              <md-card>
                <md-card-header>
                  <h4 class="text-center">Payment History</h4>
                </md-card-header>
                <md-card-content>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Method</th>
                        <th>TransactionID</th>
                        <th>Amount</th>
                        <th>Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="payment in salesOrderData.payment">
                        <td>{{payment.paymentDate | formatDate}}</td>
                        <td>{{payment.paymentMethod}}</td>
                        <td>{{payment.transactionNo}}</td>
                        <td>{{payment.amount}}</td>
                        <td>{{payment.remarks}}</td>
                      </tr>
                    </tbody>
                  </table>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </md-layout>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'showSalesOrder',
  data () {
    return {
      showCreateAndButton: true,
      salesOrderData: '',
      customerData: ''
    }
  },
  methods: {
    generatePdf: async function functionName() {
      var pdfURL = this.apiURL + 'salesOrder/invoice/'+ this.salesOrderData._id + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      var filepath = ''

      await this.$http.get(pdfURL).then(response => {
        filepath = response.body.filename.replace('./public/', '');
      }, response => {
        //console.log(response);
      })

      var fileURL = this.apiURL +  filepath;
      window.open(fileURL, '_blank');
    },
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
      else if (isPurchasing && isSales == false) {
        this.showCreateAndButton = false;
      }

      this.authData = userData;

      this.getData()
    },
    // Show Side Panel (Hidden in PO Dashboard)
    showPanel: function () {
      $("#fadeout").show();
      $("#poDashFull").css('margin-left','20%');
    },
    getData: function () {
      var salesID = this.$route.params.salesOrderID
      // Order Details
      var customerURL = this.apiURL + 'salesOrder/'+ salesID + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(customerURL).then(response => {
        this.salesOrderData = response.body;
        console.log(response);
        // this.paymentHistory = response.body.payment;
      }, response => {
        console.log(response);
      })
    }
  },
  mounted() {
    this.getCookie();
    this.showPanel();
  },
  watch: {
    salesOrderData: function () {
      var custID = this.salesOrderData.customerId;
      var customerURL = this.apiURL + 'customer/'+ custID + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(customerURL).then(response => {
        this.customerData = response.body;
        console.log(response);
        // this.paymentHistory = response.body.payment;
      }, response => {
        console.log(response);
      })
    }
  }
}
</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
  .action-buttons{
    margin-right: 10px;
    text-align: right;
  }
  #content-div{
    margin-top: 10px;
    margin-bottom: 10px
  }
  .form-control:focus {
    border-color: black
  }
  html {
  overflow:   scroll;
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}

th {
  text-align: center;
}

</style>
