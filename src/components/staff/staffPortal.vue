<template>
  <div id="content-div">
    <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Staff Portal</div>
      </md-card-header>
      <br>
      <md-card-actions>
        <!-- <md-button href="/staff" class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to='"/staff"' class="md-raised md-primary">New</router-link>
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
      <br>
        <!-- <md-layout> -->
            <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>E-Mail</th>
                        <th>Dept.</th>
                        <th>Roles</th>
                        <th style="display:none">Created At</th>
                        <th>Suspended Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="staff in staffData">
                        <td>
                          <router-link v-bind:to='"/staff/"+ staff._id'>{{staff._id}}</router-link>
                          <!-- <a v-bind:href='"/staff/"+ staff._id'>{{staff._id}}</a> -->
                        </td>
                        <td style="text-transform: capitalize;">{{staff.name}}</td>
                        <td style="text-transform: capitalize;">{{staff.title}}</td>
                        <td style="text-transform: lowercase;">{{staff.email}}</td>
                        <td>
                          <template v-for="(dept, index) in staff.department_data">
                            {{dept}}<span v-if="index == staff.department_data.length - 1"></span><span v-else> |</span>
                          </template>
                        </td>
                        <td style="text-transform: capitalize;" >
                          <template v-for="(role, index) in staff.role">
                            {{role}}<span v-if="index == staff.role.length - 1"></span><span v-else> |</span>
                          </template>
                        </td>
                        <td style="display:None">{{staff.createdAt | formatDate}}</td>
                        <td><span id="noDate">{{staff.suspendDate | formatDate2 }} </span>{{staff.suspendDate | formatDate}} </td>
                    </tr>
                </tbody>
            </table>

        <!-- </md-layout> -->
      </md-card-content>
    </md-card>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'department',
  data () {
    return {
      validDateRange: false,
      fromDate: '',
      toDate: '',
      tableRowCount: 0,
      staffDataBeforeDepartment: '',
      staffData: '',
      mainStaffData: ''
    }
  },
  methods: {
    filterData: function () {
      $('#poDashboardLoader').addClass('is-active');
      var table = $('#example').DataTable();
      table.destroy();

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

      let tempArray = []

      this.staffData = []

      for (let j=0;j<this.mainStaffData.length;j++) {
        this.staffData.push(this.mainStaffData[j])
      }

      for (let i=0;i<this.staffData.length;i++) {
        var pDate = new Date(this.fromDate);
        var nDate = new Date(this.toDate);
        var yDate = new Date(this.staffData[i].suspendDate)
        yDate.setHours(0,0,0,0);

        console.log(pDate)
        console.log(nDate)
        console.log(yDate)
        console.log("***********************");
        if (yDate >= pDate && yDate <= nDate) {
          console.log('a');
          tempArray.push(this.staffData[i])
        }
      }
      console.log(tempArray);
      this.staffData = tempArray;

      setTimeout(function () {
        $('#example').DataTable( {
          "order": [[ 0, "desc" ]],
          'bdestroy': true,
          dom: 'Bfrtip',
          buttons: [{
                         extend: 'excelHtml5',
                         title: 'Staff'
                   }],
          columnDefs: [
            // { "type": "date", "targets": 7 }
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

      this.getStaff()
    },
    getStaff: function () {

      var url = this.apiURL + 'staff' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(url).then(response => {
        var data = response.body;
        console.log(data);
        this.tableRowCount = response.body.length;
        this.staffDataBeforeDepartment = data;
        this.updateStaffData();
        this.dtablefun();
      }, response => {
        console.log(response)
      })
    },
    dtablefun: function () {

      // Count Rows
      var dataRow = this.tableRowCount;

      var myInterval = setInterval(function(){
          var rowCount = $('#example tr').length;
          if (rowCount == 1 && dataRow == 0) {

          } else if (rowCount > dataRow) {
            console.log("found");

            // Datatables
            $('#example').DataTable( {
              "order": [[ 0, "desc" ]],
              'bdestroy': true,
              dom: 'Bfrtip',
              buttons: [{
                             extend: 'excelHtml5',
                             title: 'Staff'
                       }],
              columnDefs: [
                // { "type": "date", "targets": 7 }
              ]
             });

            clearInterval(myInterval);
          }
      }, 10);
    },
    updateStaffData: async function () {
      var data = this.staffDataBeforeDepartment;
      // Add Department Data
      for (let i=0;i<data.length;i++) {
        var temp = []
        for (let j=0; j<data[i].department.length;j++) {

          var url = this.apiURL + 'api/department/' + data[i].department[j] + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
          await this.$http.get(url).then(response => {
            temp.push(response.body.name);
          }, response => {
            console.log(response)
          })
        }
        data[i].department_data = temp;
      }
      this.staffData = data;
      this.mainStaffData = data;
      setTimeout(function () {
          $('#poDashboardLoader').removeClass('is-active');
      }, 1000)
    }
  },
  created() {
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
#example_wrapper {
  width: -webkit-fill-available
}

#noDate {
  display: none
}

</style>
