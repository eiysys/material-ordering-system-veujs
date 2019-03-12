<template>
  <div id="content-div">
    <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Fabric Portal</div>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button href="/fabric" v-if="showCreateAndButton" class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to="'/fabric/'" class="md-raised md-primary">New</router-link>
      </md-card-actions>
      <md-card-content>
        <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Fabric Code</th>
                <th>Color</th>
                <th>Price</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Remark</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fabric in fabricList">
                <td>
                  <router-link v-bind:to='"/fabric/"+ fabric._id'>{{ fabric._id }}</router-link>
                  <!-- <a v-bind:href='"/fabric/"+ fabric._id'>{{ fabric._id }}</a> -->
                </td>
                <td style="text-transform: capitalize;">{{fabric.color}}</td>
                <td>{{fabric.price}}</td>
                <td>{{fabric.description}}</td>
                <td>{{fabric.createdAt | formatDate}}</td>
                <td>{{fabric.remark}}</td>
            </tr>
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
      showCreateAndButton: true,
      fabricList: '',
      tableRowCount: ''
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
      this.getFabrics();
    },
    getFabrics: function () {
      var fabricURL = this.apiURL + 'api/fabric' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(fabricURL).then(response => {
        setTimeout(function () {
            $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
        // Saving vendor response in vendorlist variable
        this.fabricList = response.body;
        // Count of response objects
        this.tableRowCount = response.body.length;
        this.dtablefun();
      }, response => {
        setTimeout(function () {
            $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
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
                              title: 'Fabric'
                        }
                        ],
              columnDefs: [
                // { "type": "date", "targets": 3 },
                { type: 'date-dd-mmm-yyyy', targets: 3 },
                { "searchable": false, "targets": 1 },
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
</style>
