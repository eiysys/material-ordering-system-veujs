<template>
  <div id="content-div">
    <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Customer Portal</div>
      </md-card-header>
      <md-card-actions class="text-right">
        <!-- <md-button href="/customer" class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to='"/customer"' class="md-raised md-primary">New</router-link>
      </md-card-actions>
      <md-card-content>
        <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Occupation</th>
                <th>Dat of Birth</th>
                <th>Refer By</th>
                <th>Off.Address</th>
                <th>Del.Address</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="customer in customerList">
                 <td><router-link v-bind:to='"/customer/"+ customer._id'>{{customer._id}}</router-link></td>
                <td style="text-transform: capitalize;">
                  <router-link v-bind:to='"/customer/"+ customer._id'>{{customer.name}}</router-link>
                  <!-- <a v-bind:href='"/#/customer/"+ customer._id'>{{customer.name}}</a> -->
                </td>
                <td style="text-transform: lowercase;">{{customer.email}}</td>
                <td>{{customer.phone}}</td>
                <td style="text-transform: capitalize;">{{customer.occupation}}</td>
                <td><span id="noDate">{{customer.dob | formatDate2 }} </span>{{customer.dob | formatDate}} </td>
                <td style="text-transform: capitalize;">{{customer.referby}}</td>
                <td style="text-transform: capitalize;">{{customer.officeAddress}}</td>
                <td style="text-transform: capitalize;">{{customer.deliveryOffice}}</td>
            </tr>
        </tbody>
    </table>
      </md-card-content>
      <!-- {{dtablefun()}} -->
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'customer-portal',
  data () {
    return {
      name: '',
      customerList: '',
      tableRowCount: '',
      dataTableApplied: false
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
      var userData = getCookie('userData');
      this.authData = JSON.parse(userData);

      this.getCustomers();

    },
    getCustomers: function () {
      var customerURL = this.apiURL + 'customer' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(customerURL).then(response => {
        setTimeout(function () {
            $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
        this.customerList = response.body;
        this.tableRowCount = response.body.length;
        this.dtablefun();
      }, response => {
        setTimeout(function () {
            $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
        console.log(response)
      })
    },
    dtablefun: function () {
      var dataRow = this.tableRowCount;
      setTimeout(function () {
        var rowCount = $('#example tr').length;
        if (rowCount >= dataRow) {
          $('#example').DataTable( {
               dom: 'Bfrtip',
               buttons: [{
                              extend: 'excelHtml5',
                              title: 'customers'
                        }
                        ],
              columnDefs: [
                { "searchable": false, "targets": 1 },
                { "searchable": false, "targets": 3 },
                { "searchable": false, "targets": 4 },
                { "searchable": false, "targets": 5 },
                { "searchable": false, "targets": 6 },
                { "searchable": false, "targets": 7 }
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
  }
}
</script>

<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px
}
#noDate{
  display: none
}
html {
overflow:   scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
