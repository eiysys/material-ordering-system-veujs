<template>
  <div id="content-div">
    <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Fabric Purchase Order Portal</div>
      </md-card-header>
      <md-card-actions>

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
            <th>Fabric</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Unit</th>
            <th>Arrived Date</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in fabricOrders">
            <tr v-for="fab in order.fab_data">
              <template v-if="fab.showFPO != false">
                <td>
                  <router-link v-bind:to='"/fpo/"+ order.code'>{{order.code}}</router-link>
                  <!-- <a v-bind:href='"/fpo/"+ order.code'>{{order.code}}</a> -->
                </td>
                <td>
                  <router-link v-bind:to='"/sales/"+ fab.SO'>{{fab.SO}}</router-link>
                  <!-- <a v-bind:href='"/sales/"+ fab.SO'>{{fab.SO}}</a> -->
                </td>
                <td>{{order.createdDate | formatDate}}</td>
                <td>{{order.vendor}}</td>
                <td>{{fab.fabric}}</td>
                <td>{{fab.price}}</td>
                <td>{{fab.quantity}}</td>
                <td>{{fab.price * fab.quantity}}</td>
                <td>{{fab.unit}}</td>
                <td>{{fab.arrived_date}}</td>
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
  name: 'fabric-portal',
  data () {
    return {
      validDateRange: false,
      fromDate: '',
      toDate: '',
      fabricOrders: '',
      fabricMainOrders: '',
      tableRowCount: ''
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

      this.fabricOrders = []

      for (let j=0;j<this.fabricMainOrders.length;j++) {
        this.fabricOrders.push(this.fabricMainOrders[j])
      }

      for (let i=0;i<this.fabricOrders.length;i++) {
        var pDate = new Date(this.fromDate);
        var nDate = new Date(this.toDate);
        var yDate = new Date(this.fabricOrders[i].createdDate)
        yDate.setHours(0,0,0,0);

        if (yDate >= pDate && yDate <= nDate) {
          console.log('a');
          tempArray.push(this.fabricOrders[i])
        }
      }
      console.log(tempArray);
      this.fabricOrders = tempArray;

      setTimeout(function () {
        $('#example').DataTable( {
            "order": [[ 0, "desc" ]],
             dom: 'Bfrtip',
             buttons: [{
                            extend: 'excelHtml5',
                            title: 'Fpo_orders'
                      }
                      ],
            columnDefs: [
              { "searchable": false, "targets": 1 }
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

      var userData = getCookie('userData');
      this.authData = JSON.parse(userData);
      this.getAllFabricOrders();
    },
    getAllFabricOrders: async function () {
      var allFabricOrders = [];

      var fabricURL = this.apiURL + 'api/fabric-order' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(fabricURL).then(response => {
        allFabricOrders = response.body;
        this.tableRowCount = response.body.length;
        // this.dtablefun()
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


      // If sales
      if (isSales) {
        // Information Barrier code here

        // Get Departments related to user
        var filteredDeptID = [];
        for (let j=0;j<staffDataOne.department.length;j++){
          filteredDeptID.push(staffDataOne.department)
        }
        filteredDeptID = filteredDeptID.join()

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

        for (let l=0;l<allFabricOrders.length;l++) {
          for (let m=0;m<allFabricOrders[l].fab_data.length;m++) {
            if (filteredSalesOrderNumber.indexOf(allFabricOrders[l].fab_data[m].SO) != -1 ) {
              allFabricOrders[l].fab_data[m].showFPO = true
            } else {
              allFabricOrders[l].fab_data[m].showFPO = false
            }
          }
        }

        this.fabricOrders = allFabricOrders;
        this.fabricMainOrders = allFabricOrders;
      } else {
        // console.log(allFabricOrders)
        // Show all data
        this.fabricOrders = allFabricOrders;
        this.fabricMainOrders = allFabricOrders;
      }

      console.log(this.fabricMainOrders);

      this.dtablefun()
      setTimeout(function () {
          $('#poDashboardLoader').removeClass('is-active');
      }, 1000)


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
                              title: 'Fpo_orders'
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
