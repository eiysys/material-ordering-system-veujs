<template>
  <div id="content-div">
    <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Vendor Portal</div>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button href="/vendor" v-if="showCreateAndButton" class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to='"/vendor"' class="md-raised md-primary" v-if="showCreateAndButton">New</router-link>
      </md-card-actions>
      <md-card-content>
        <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <!-- new fields -->
                <th>Contact Person</th>
                <th>Email</th>
                <th>FAX</th>
                <!-- end new fields  -->
                <th>Remark</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vendor in vendorList">
                <td>
                  <router-link v-bind:to='"/vendor/"+ vendor._id'>{{ vendor._id }}</router-link>
                  <!-- <a v-bind:href='"/vendor/"+ vendor._id'>{{ vendor._id }}</a> -->
                </td>
                <td style="text-transform: capitalize;">{{vendor.name}}</td>
                <td>{{vendor.phone}}</td>
                <td style="text-transform: capitalize;">{{vendor.address}}</td>
                <!-- new fields -->
                  <td>{{vendor.contact_person}}</td>
                  <td>{{vendor.email}}</td>
                  <td>{{vendor.fax}}</td>
                <!-- end new fields -->
                <td>{{vendor.remark}}</td>
                <td style="text-transform: capitalize;">{{vendor.type}}</td>
            </tr>
        </tbody>
    </table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'customer-portal',
  data () {
    return {
      showCreateAndButton: true,
      vendorList: '',
      tableRowCount: '',
      authData: {
        staffId: '',
        token: ''
      }
    }
  },
  methods:{
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
      // console.log(this.authData);
      this.getVendors()
    },
    getVendors: function () {
      var url = this.apiURL + 'api/vendor' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id
      console.log(url);
      this.$http.get(url).then(response => {
        setTimeout(function () {
            $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
        if (response.body.error_msg) {
            alert("user: " + this.authData._id + "error: " + response.body.error_msg);
            window.location.href = '/#/login'
        } else {

          this.vendorList = response.body;
          // Count of response objects
          this.tableRowCount = response.body.length;
          this.dtablefun()
        }

        // Saving vendor response in vendorlist variable

      }, response => {
        $('#poDashboardLoader').removeClass('is-active');
        console.log(response);
      })
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
                              title: 'vendors'
                        }
                        ],
              columnDefs: [
                { "searchable": false, "targets": 2 },
                { "searchable": false, "targets": 3 },
                { "searchable": false, "targets": 4 },
                { "searchable": false, "targets": 5 }
              ]
           });
        } else {
          this.dtablefun()
        }
      }, 10)
    }
  },
  created() {
    this.getCookie()
    // this.post()
  }
}
</script>

<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px
}
</style>
