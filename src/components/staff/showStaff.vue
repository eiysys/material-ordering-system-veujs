<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Show Staff</div>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button v-bind:href='"/staff"' class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to='"/staff"' class="md-raised md-primary">New</router-link>

        <!-- <md-button v-bind:href='"/staff/edit/" + staffData._id' class="md-raised md-primary">Modify</md-button> -->
        <router-link tag="md-button" :to='"/staff/edit/" + staffData._id' class="md-raised md-primary">Modify</router-link>
      </md-card-actions>
      <br>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <h5> </h5>
              <p class="text-danger">{{APIerror}}</p>
              <div class="row">
                <div class="col-md-12">
                  <div class="col-md-1">

                  </div>
                  <div class="col-md-4">
                    <form validate @submit.stop.prevent="editStaff">

                      <md-input-container>
                        <md-icon>code</md-icon>
                        <label>Staff ID</label>
                        <md-input v-model="staffData._id" required disabled></md-input>
                      </md-input-container>

                      <md-input-container>
                        <md-icon>account_box</md-icon>
                        <label>Name</label>
                        <md-input v-model="staffData.name" required disabled></md-input>
                        <span class="md-error">Validation message</span>
                      </md-input-container>

                      <md-input-container>
                        <md-icon>email</md-icon>
                        <label>Email</label>
                        <md-input v-model="staffData.email" required disabled></md-input>
                        <span class="md-error">Validation message</span>
                      </md-input-container>

                      <md-input-container>
                        <md-icon>class</md-icon>
                        <label>Title</label>
                        <md-input v-model="staffData.title" required disabled></md-input>
                        <span class="md-error">Validation message</span>
                      </md-input-container>

                      <md-input-container>
                        <md-icon>date_range</md-icon>
                        <label>Suspend Date</label>
                        <md-input v-model="staffData.suspendDate" disabled></md-input>
                      </md-input-container>
                    </form>
                  </div>
                  <div class="col-md-2">

                  </div>

                  <div class="col-md-4">
                    <br>
                    <h4>Roles:</h4>
                    <br>
                    <input type="checkbox" id="jack" value="admin" v-model="staffData.role" disabled>
                    <label for="jack">Admin</label><br>
                    <input type="checkbox" id="john" value="sales" v-model="staffData.role" disabled>
                    <label for="john">Sales</label><br>
                    <input type="checkbox" id="mike" value="purchasing" v-model="staffData.role" disabled>
                    <label for="mike">Purchasing</label>
                    <br><br>
                    <div v-if="showDeptDiv">
                      <h4>Department:</h4>
                      <br>
                      <div class="" style="height:150px; overflow-y:scroll; border:1px solid #ccc; padding:10px; width:200px; border-radius:2px">
                        <template v-for="dept in departmentData">
                          <input type="checkbox" v-bind:value="dept._id" v-model="staffData.department" disabled>
                          <label >{{dept.name}}</label><br>
                        </template>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card >
        </md-layout>
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
      showDeptDiv: false,
      APIerror: '',
      staffData : {
        name: '',
        email: '',
        title: '',
        date: '',
        password: '',
        role: [],
        department: []
      },
      departmentData: '',
      params: this.$route.params.staffID,
      staffID: ''
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
      var userData = getCookie('userData');
      this.authData = JSON.parse(userData);

      this.getDepartments();
      this.getStaff();
    },
    getStaff: function () {

      var url = this.apiURL + 'staff/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(url).then(response => {
        console.log(response);
        if (response.body.department.length > 0) {
            this.showDeptDiv = true
        }

        var data = response.body;
        if (data.suspendDate) {
          data.suspendDate = moment(String(data.suspendDate)).format('DD-MM-YYYY')
        }

        this.staffID = response.body._id;
        this.staffData = data;

      }, response => {
        console.log(response)
      })
    },
    editStaff:  function () {
      window.location.href = '/staff/edit/'+ this.staffID;
    },
    getDepartments: function () {

      var url = this.apiURL + 'api/department' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(url).then(response => {
        console.log(response);
        this.departmentData = response.body;
      }, response => {
        console.log(response)
      })
    }
  },
  created() {
    this.getCookie()
  }
}

</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px
}
input[type="checkbox"]{
  width: 12px; /*Desired width*/
  height: 12px; /*Desired height*/
  cursor: pointer;
}

html {
overflow:   scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
