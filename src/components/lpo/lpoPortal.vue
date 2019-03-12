<template>
  <div id="content-div">
    <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Labor Purchase Order Portal</div>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button href="">New</md-button> -->
      </md-card-actions>
      <md-card-content>
        <label for="">From Date: </label>
        <input type="text" name="" value="" placeholder="MM-DD-YYYY" v-model="fromDate">
        <label for="">To Date: </label>
        <input type="text" name="" placeholder="MM-DD-YYYY" v-model="toDate">
        <button type="button" name="button" v-on:click="filterData" v-if="fromDate && toDate">Filter</button>
        <button type="button" name="button" v-on:click="filterData" v-if="!fromDate || !toDate" disabled>Filter</button>
        <br>
        <br>
        <p class="text-danger" v-if="validDateRange"> Please enter valid date range</p>
        <br>
        <table id="example" class="table table-striped table-bordered" cellspacing="0">
        <thead>
          <tr>
            <th>NO</th>
            <th>SO_NO</th>
            <th>Date</th>
            <th>Vendor</th>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Unit</th>
            <th>Arrived Date</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in laborOrders">
            <tr v-for="item in order.lab_data">
              <template v-if="item.showLPO != false">
                <td>
                  <router-link v-bind:to='"/lpo/"+ order.code'>{{order.code}}</router-link>
                  <!-- <a v-bind:href='"/lpo/"+ order.code'>{{order.code}}</a> -->
                </td>
                <td>
                  <router-link v-bind:to='"/sales/"+ item.SO'>{{item.SO}}</router-link>
                  <!-- <a v-bind:href='"/sales/"+ item.SO'>{{item.SO}}</a> -->
                </td>
                <td>{{order.createdDate | formatDate}}</td>
                <td>{{order.vendor}}</td>
                <td>{{item.item}}</td>
                <td>{{item.price}}</td>
                <td>{{item.quantity}}</td>
                <td>{{item.price * item.quantity}}</td>
                <td>Piece</td>
                <td>{{item.arrived_date}}</td>
              </template>
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
  name: 'labor-portal',
  data () {
    return {
      validDateRange: false,
      fromDate: '',
      toDate: '',
      authData: '',
      laborOrders: '',
      laborMainOrders: '',
      tableRowCount: '',
    }
  },
  methods:{
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

      this.laborOrders = []

      for (let j=0;j<this.laborMainOrders.length;j++) {
        this.laborOrders.push(this.laborMainOrders[j])
      }

      for (let i=0;i<this.laborOrders.length;i++) {
        var pDate = new Date(this.fromDate);
        var nDate = new Date(this.toDate);
        var yDate = new Date(this.laborOrders[i].createdDate)
        yDate.setHours(0,0,0,0);

        if (yDate >= pDate && yDate <= nDate) {
          console.log('a');
          tempArray.push(this.laborOrders[i])
        }
      }
      console.log('s');
      console.log(tempArray);
      this.laborOrders = tempArray;

      setTimeout(function () {
        $('#example').DataTable( {
            "order": [[ 0, "desc" ]],
             dom: 'Bfrtip',
             buttons: [{
                            extend: 'excelHtml5',
                            title: 'Lpo_orders'
                      }
                      ],
            columnDefs: [
              { "searchable": false, "targets": 1 }
            ]
         });
         $('#poDashboardLoader').removeClass('is-active');
      }, 5000)

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
      var userData = getCookie('userData');
      this.authData = JSON.parse(userData);

      this.getAllLaborOrders();

    },
    getAllLaborOrders: async function () {
      var allLaborOrders;

      var allLaborURL = this.apiURL + 'api/labor-order' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(allLaborURL).then(response => {
        console.log(response);
        allLaborOrders= response.body;
        this.tableRowCount = response.body.length;
        //
      }, response => {
        console.log(response);
      })

      // Filter Data According to User

      // Get Staff
      var staffDataOne;
      var staffURL = this.apiURL + 'staff/' + this.authData._id + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(staffURL).then(response => {
        staffDataOne = response.body;
      }, response => {
        console.log(response)
      })

      var isSales = false
      // Check role of user is sales or not
      for (let i=0; i<staffDataOne.role.length; i++) {
        if (staffDataOne.role[i] == 'sales') {
          isSales = true
        }
      }

console.log(staffDataOne.role);

      // If sales
      if (isSales) {
        console.log('d');
        // Information Barrier code here

        // Get Departments related to user
        var filteredDeptID = [];
        for (let j=0;j<staffDataOne.department.length;j++){
          filteredDeptID.push(staffDataOne.department)
        }
        filteredDeptID = filteredDeptID.join() // e.g.1234,1235,1235

        var customerURL = this.apiURL + 'salesOrder/searchByID/'+ filteredDeptID + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;

        var filteredSalesOrderNumber = []

        await this.$http.get(customerURL).then(response => {
          // this.salesOrderData = response.body;
          for (let k=0; k<response.body.length;k++){
            filteredSalesOrderNumber.push(response.body[k]._id)
          }
          // this.paymentHistory = response.body.payment;
        }, response => {
          console.log(response);
        })

        for (let l=0;l<allLaborOrders.length;l++) {
          for (let m=0;m<allLaborOrders[l].lab_data.length;m++) {
            if (filteredSalesOrderNumber.indexOf(allLaborOrders[l].lab_data[m].SO) != -1 ) {
              allLaborOrders[l].lab_data[m].showLPO = true
            } else {
              allLaborOrders[l].lab_data[m].showLPO = false
            }
          }
        }

        this.laborOrders = allLaborOrders;
        console.log(allLaborOrders)
      } else {

        console.log(allLaborOrders)
        // Show all data
        this.laborOrders = allLaborOrders;
      }

      this.laborMainOrders = allLaborOrders;
      // Filter data Ends
      this.dtablefun()
      setTimeout(function () {
          $('#poDashboardLoader').removeClass('is-active');
      }, 5000)

    },

    dtablefun: function () {
      var dataRow = this.tableRowCount;
      setTimeout(function () {
        var rowCount = $('#example tr').length;
        if (rowCount >= dataRow) {
          $('#example').DataTable( {
              "order": [[ 0, "desc" ]],
               dom: 'Bfrtip',
               buttons: [{
                              extend: 'excelHtml5',
                              title: 'Lpo_orders'
                        }
                        ],
              columnDefs: [
                { "searchable": false, "targets": 1 }
              ]
           });
        } else {
          this.dtablefun();
        }
      }, 10)
    }
  },
  mounted() {
    this.getCookie();

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
