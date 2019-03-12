<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Department Portal</div>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button href="/department" class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to='"/department"' class="md-raised md-primary">New</router-link>
      </md-card-actions>
      <md-card-content>

        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th class="text-center">Suspended Date</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="department in departmentData">
                        <td style="text-transform: capitalize;">
                          <router-link v-bind:to='"/department/"+ department._id'>{{ department.name }}</router-link>
                          <!-- <a v-bind:href='"/department/"+ department._id'>{{ department.name }}</a> -->
                        </td>
                        <td class="text-center"><span id="noDate">{{department.date | formatDate2 }} </span>{{ department.date | formatDate}}</td>
                        <td style="text-transform: capitalize;">{{department.remark}}</td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
    <!-- {{ dtablefun() }} -->
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'fabric-portal',
  data () {
    return {
      departmentData : {
        name: '',
        date: '',
        remark: ''
      },

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

      this.getDepartment()
    },
    dtablefun: function () {
      var dataRow = this.tableRowCount;
      setTimeout(function () {
        var rowCount = $('#example tr').length;
        if (1==1) {
          $('#example').DataTable( {
              "order": [[ 0, "desc" ]],
               dom: 'Bfrtip',
               buttons: [{
                              extend: 'excelHtml5',
                              title: 'departments'
                        }
                        ],
              columnDefs: [
                { "searchable": false, "targets": 1 },
                { "searchable": false, "targets": 2 }
              ]
           });
        } else {
          // this.dtablefun()
        }
      }, 1000)
    },
    getDepartment: function () {

      var getDeptURL = this.apiURL + 'api/department' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(getDeptURL).then(response => {
        // Saving vendor response in vendorlist variable
        this.departmentData = response.body;
        // Count of response objects
        // this.tableRowCount = response.body.length;
        this.dtablefun()
      }, response => {
        console.log(response);
      })
    },
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
#noDate {
  display: none
}
</style>
