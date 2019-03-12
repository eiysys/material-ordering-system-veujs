<template>
  <div id="content-div">
    <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Sales Order Portal</div>
      </md-card-header>
      <md-card-actions>
        <md-button href="/sales" v-if="showCreateAndButton" class="md-raised md-primary">New Order</md-button>
      </md-card-actions>
      <md-card-content>
        <label for="">From Date: </label>
        <input type="text" name="" value="" placeholder="MM-DD-YYYY" v-model="fromDate">
        <label for="">To Date: </label>
        <input type="text" name="" placeholder="MM-DD-YYYY" v-model="toDate">
        <button type="button" name="button" v-on:click="filterData" v-if="fromDate && toDate">Filter</button>
        <button type="button" name="button" v-on:click="filterData" v-if="!fromDate || !toDate" disabled>Filter</button>
        <button type="button" name="button" v-on:click="resetFilter" v-if="fromDate || toDate">Reset</button>
        <br>
        <br>
        <p class="text-danger" v-if="validDateRange"> Please enter valid date range</p>
        <br><br>
        <table id="example" class="table table-striped table-bordered" cellspacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Sales Person</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Delivered Date</th>
            <th>Outstanding</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in salesOrders">
            <tr v-for="(item, index) in order.itemsDetail">
              <td>
                <router-link v-bind:to='"/sales/"+ order._id'>{{order._id}}</router-link>
                <!-- <a v-bind:href='"/sales/"+ order._id'>{{order._id}}</a> -->
              </td>
              <td>{{order.orderDate | formatDate}}</td>
              <td>{{order.staffId}}</td>
              <td>{{order.customerId}}</td>
              <td>{{item.productType}}</td>
              <td>$ <span class="pull-right">{{item.pPrice}}</span></td>
              <!-- <td v-if="index!=0">-</td> -->
              <td>{{item.quantity}}</td>
              <td>{{item.pPrice * item.quantity}}</td>
              <td>Pending Work</td>
              <td v-if="index == 0">$ <span class="pull-right">{{order.balance}}</span></td>
              <td v-if="index!=0">-</td>
            </tr>
          </template>
        </tbody>
    </table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'fabric-portal',
  data () {
    return {
      validDateRange: false,
      fromDate: '',
      toDate: '',
      showCreateAndButton: true,
      salesOrders: '',
      salesMainOrders: ''
    }
  },
  methods:{
    resetFilter: function () {
      this.fromDate = ''
      this.toDate = ''

      var table = $('#example').DataTable();
      table.destroy();

      this.salesOrders = []
      for(let i=0;i<this.salesMainOrders.length;i++) {
        this.salesOrders.push(this.salesMainOrders[i])
      }

      setTimeout(function () {
        $('#example').DataTable( {
            "order": [[ 0, "desc" ]],
             dom: 'Bfrtip',
             buttons: [{
                            extend: 'excelHtml5',
                            title: 'Sales_Order'
                        }
                ]
         });
         // $('#poDashboardLoader').removeClass('is-active');
      }, 500)
    },
    filterData: function () {


      this.validDateRange = false;
      var validDateRangeValidated = false;


      if (new Date(this.fromDate) == 'Invalid Date' || new Date(this.toDate) == 'Invalid Date') {
        this.validDateRange = true
      } else {
        validDateRangeValidated = true
      }

      if (validDateRangeValidated) {

      } else {
        return
      }

      $('#poDashboardLoader').addClass('is-active');

      var table = $('#example').DataTable();
      table.destroy();

      let tempArray = []
      console.log(this.salesOrders);
      this.salesOrders = []

      for (let j=0;j<this.salesMainOrders.length;j++) {
        this.salesOrders.push(this.salesMainOrders[j])
      }

      for (let i=0;i<this.salesOrders.length;i++) {
        var pDate = new Date(this.fromDate);
        var nDate = new Date(this.toDate);
        var yDate = new Date(this.salesOrders[i].orderDate)
        yDate.setHours(0,0,0,0);

        if (yDate >= pDate && yDate <= nDate) {
          console.log('a');
          tempArray.push(this.salesOrders[i])
        }
      }
      console.log(tempArray);
      this.salesOrders = tempArray;

      setTimeout(function () {
        $('#example').DataTable( {
            "order": [[ 0, "desc" ]],
             dom: 'Bfrtip',
             buttons: [{
                            extend: 'excelHtml5',
                            title: 'Sales_Order'
                        }
                ]
         });
         $('#poDashboardLoader').removeClass('is-active');
      }, 500)

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
      this.getAllSalesOrders()
    },

    getAllSalesOrders: function () {
      var allSalesURL = this.apiURL + 'salesorder' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(allSalesURL, {staffId: this.authData._id}).then(response => {
        setTimeout(function () {
            $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
        console.log(response);
        this.salesOrders = response.body;
        this.salesMainOrders = response.body
      }, response => {
        setTimeout(function () {
            $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
        console.log(response);
      })
    },

    dtablefun: function () {
      setTimeout(function () {
        $(document).ready(function() {
          $('#example').DataTable( {
              "order": [[ 0, "desc" ]],
               dom: 'Bfrtip',
               buttons: [{
                              extend: 'excelHtml5',
                              title: 'Sales_Order'
                          }
                  ]
           });
        });
      }, 1000)
    }
  },
  mounted() {
    this.getCookie();
    this.dtablefun()
  }
}
</script>

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
