<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Edit Staff</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="updateStaff" class="md-raised md-primary">Save</md-button>
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
                      <md-input-container>
                        <md-icon>code</md-icon>
                        <label>Staff ID</label>
                        <md-input v-model="staffData._id" required disabled></md-input>
                      </md-input-container>

                      <md-input-container>
                        <md-icon>account_box</md-icon>
                        <label>Name</label>
                        <md-input v-model="staffData.name" required></md-input>
                      </md-input-container>
                      <p class="text-danger" v-if="nameBlankValidation">*Name field required</p>
                      <p class="text-danger" v-if="nameValidation">Please enter valid Name</p>
                      <md-input-container>
                        <md-icon>email</md-icon>
                        <label>Email</label>
                        <md-input v-model="staffData.email" required></md-input>
                        <span class="md-error">Validation message</span>
                      </md-input-container>
                      <p class="text-danger" v-if="emailBlankValidation">*Email field required</p>
                      <p class="text-danger" v-if="emailValidation">Please enter valid Email</p>
                      <md-input-container>
                        <md-icon>class</md-icon>
                        <label>Title</label>
                        <md-input v-model="staffData.title"></md-input>
                        <span class="md-error">Validation message</span>
                      </md-input-container>


                      <md-input-container md-has-password>
                        <md-icon>vpn_key</md-icon>
                        <label>New Password</label>
                        <md-input type="password" v-model="staffData.password" required></md-input>
                      </md-input-container>
                      <p class="text-danger" v-if="passwordValidation">*Password field required</p>
                      <!-- Suspend Date -->
                      <br>
                      <h5>Suspend Date:</h5>
                      <div class="col-md-1" style="padding-left:0; padding-right:0">
                        <br>
                        <div class="text-left">
                          <md-icon style="color:grey">date_range</md-icon>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <md-input-container>
                         <label>DD</label>
                         <md-autocomplete v-model="date.day"
                                             :list="days"
                                             print-attribute="day"
                                             :filter-list="codeFilterDay"
                                             :min-chars="0"
                                             :max-height="3"
                                             :max-width="1"
                                             @selected="dayCallback">
                         </md-autocomplete>
                        </md-input-container>
                      </div>
                      <div class="col-md-4">
                        <md-input-container>
                         <label>MM</label>
                         <md-autocomplete v-model="date.month"
                                             :list="months"
                                             print-attribute="month"
                                             :filter-list="codeFilterMonth"
                                             :min-chars="0"
                                             :max-height="3"
                                             :max-width="1"
                                             @selected="monthCallback">
                         </md-autocomplete>
                        </md-input-container>
                      </div>
                      <div class="col-md-4">
                        <md-input-container>
                         <label>YYYY</label>
                         <md-autocomplete v-model="date.year"
                                             :list="years"
                                             print-attribute="year"
                                             :filter-list="codeFilterYear"
                                             :min-chars="0"
                                             :max-height="3"
                                             :max-width="1"
                                             @selected="yearCallback">
                         </md-autocomplete>
                        </md-input-container>
                      </div>
                      <p class=" text-danger" v-if="dateValidation">Please enter valid Date</p>
                  </div>
                  <div class="col-md-2">

                  </div>

                  <div class="col-md-4">
                    <br>
                    <h4>Roles:</h4>

                    <p class=" text-danger" v-if="rolesValidation">*Roles Required</p>
                    <p class=" text-danger" v-if="deptValidation">*Department Required</p>
                    <br>
                    <input type="checkbox" id="jack" value="admin" v-model="staffData.role">
                    <label for="jack">Admin</label><br>
                    <input type="checkbox" id="john" value="sales" v-model="staffData.role">
                    <label for="john">Sales</label><br>
                    <input type="checkbox" id="mike" value="purchasing" v-model="staffData.role">
                    <label for="mike">Purchasing</label>

                    <br><br>
                    <div v-if="showDepartmentdiv">
                      <h4>Department:</h4>
                      <br>

                      <div class="" style="height:150px; overflow-y:scroll; border:1px solid #ccc; padding:10px; width:200px; border-radius:2px">
                        <template v-for="dept in departmentData">
                          <input type="checkbox" v-bind:value="dept._id" v-model="staffData.department">
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
import Router from '../../router/index.js';

export default {
  name: 'department',
  data () {
    return {
      showDepartmentdiv: false,
      nameValidation: false,
      nameBlankValidation: false,
      emailBlankValidation: false,
      emailValidation: false,
      rolesValidation: false,
      deptValidation: false,
      dateValidation: false,
      passwordValidation: false,
      date: {day: '', month: '', year: ''},
      months: [{"month": 1},
              {"month": 2},
              {"month": 3},
              {"month": 4},
              {"month": 5},
              {"month": 6},
              {"month": 7},
              {"month": 8},
              {"month": 9},
              {"month": 10},
              {"month": 11},
              {"month": 12}],
      days : [{"day": 1},
              {"day": 2},
              {"day": 3},
              {"day": 4},
              {"day": 5},
              {"day": 6},
              {"day": 7},
              {"day": 8},
              {"day": 9},
              {"day": 10},
              {"day": 11},
              {"day": 12},
              {"day": 13},
              {"day": 14},
              {"day": 15},
              {"day": 16},
              {"day": 17},
              {"day": 18},
              {"day": 19},
              {"day": 20},
              {"day": 21},
              {"day": 22},
              {"day": 23},
              {"day": 24},
              {"day": 25},
              {"day": 26},
              {"day": 27},
              {"day": 28},
              {"day": 29},
              {"day": 30},
              {"day": 31}],
      years: [],

      authData: '',
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
      params: this.$route.params.staffID
    }
  },
  watch: {
    staffData: {
      handler : function (val) {
        console.log(val)
        this.showDepartmentdiv = false;
        for (let i=0; i<val.role.length; i++) {
          if(val.role[i] == 'sales') {
            this.showDepartmentdiv = true
          }
        }
      },
      deep: true
    }
  },
  methods: {
    calculateYear: function () {
      var d = new Date();
      var year = d.getFullYear();
      for (let i=0;i<15;i++) {
        this.years.push({"year": year})
        year += 1
      }
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

      this.getDepartments();
      this.getStaff();
    },
    getStaff: function () {

      var getStaffURL = this.apiURL + 'staff/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(getStaffURL).then(response => {
        console.log(response);
        var data = response.body;
        data.suspendDate = moment(String(data.suspendDate)).format('DD-MM-YYYY')

        if (data.suspendDate == 'Invalid date') {
          data.suspendDate = ''
        } else {
          var tempDate = data.suspendDate.split("-")
          this.date.day = tempDate[0]
          this.date.month = tempDate[1]
          this.date.year = tempDate[2]
        }

        data.password = '';
        this.staffData = data;
      }, response => {
        console.log(response)
      })
    },
    getDepartments: function () {

      var getDeptURL = this.apiURL + 'api/department' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(getDeptURL).then(response => {
        this.departmentData = response.body;
      }, response => {
        console.log(response)
      })
    },
    updateStaff: function () {
      this.nameBlankValidation = false;
      this.nameValidation = false;
      this.emailBlankValidation = false;
      this.emailValidation = false;
      this.rolesValidation = false;
      this.deptValidation = false;
      this.dateValidation = false;
      this.passwordValidation = false;

      var nameValidated = false;
      var emailValidated = false;
      var roleValidated = false;
      var deptValidated = false;
      var dateValidated = false;
      var passwordValidated = false;

      // Validations
      // Validations of name field
      if (this.staffData.name.toString().trim() ==  '') {
        this.nameBlankValidation = true
        this.staffData.name = ''
      } else {
        this.nameValidation = false
        nameValidated = true
      }

      // Validation for password
      if (this.staffData.password.toString().trim() == '') {
        this.passwordValidation = true
      } else {
        this.passwordValidation = false
        passwordValidated = true
      }

      // Validations of email field
      if (this.staffData.email.toString().trim() == '') {
        this.emailBlankValidation = true
        this.staffData.email = ''
      } else {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.staffData.email))
          {
            this.emailValidation = true
            this.staffData.email = ''
          } else {
            this.emailValidation = false
            emailValidated = true
          }
      }

      // Roles required validation
      if (this.staffData.role.length == 0) {
        this.rolesValidation = true
      } else {
        roleValidated = true
        this.rolesValidation = false
      }

      // Validation for sales team
      var isSales = false;
      for (let i=0; i<this.staffData.role.length ;i++) {
        if (this.staffData.role[i] == 'sales') {
          isSales = true;
        }
      }

      if (isSales == true) {
        if (this.staffData.department.length == 0){
          this.deptValidation = true
        } else {
          deptValidated = true
          this.deptValidation = false
        }
      } else {
        deptValidated = true
      }
      // Validation for sales team ends

      // Date Validation
      if (this.date.day.toString().trim() == '' && this.date.month.toString().trim() == '' && this.date.year.toString().trim() == '') {
        // debugger;
        dateValidated = true
      } else if (this.date.day.toString().trim() != '' && this.date.month.toString().trim() != '' && this.date.year.toString().trim() != '') {

        let dayValidated = false
        let monthValidated = false
        let yearValidated = false

        if (!/^\d+$/.test(this.date.day.toString().trim())) {
          dateValidated = false;
          this.dateValidation = true
          this.date = {day:'', month: '', year: ''}
        } else {
          if (this.date.day.toString().trim() >0 && this.date.day.toString().trim() < 32) {
              dayValidated = true
          } else {
            this.dateValidation = true
            this.date = {day:'', month: '', year: ''}
          }
        }
        if (!/^\d+$/.test(this.date.month.toString().trim())) {
          var dateValidated = false;
          var dateValidation = true
          this.date = {day:'', month: '', year: ''}
        } else {
          if (this.date.month.toString().trim() >0 && this.date.month.toString().trim() < 13) {
              monthValidated = true
          } else {
            this.dateValidation = true
            this.date = {day:'', month: '', year: ''}
          }
        }

        if (!/^\d+$/.test(this.date.year.toString().trim())) {
          var dateValidated = false;
          var dateValidation = true
          this.date = {day:'', month: '', year: ''}
        } else {
          if (this.date.year.toString().trim() > 2016 ) {
              yearValidated = true
          } else {
            this.dateValidation = true
            this.date = {day:'', month: '', year: ''}
          }
        }
        if (dayValidated && monthValidated && yearValidated) {
          var myDate = parseInt(this.date.year.toString().trim()) + '-' + parseInt(this.date.month.toString().trim()) + '-' + parseInt(this.date.day.toString().trim())
          var dateObj = new Date(myDate)
          // console.log(dateObj);
          // console.log(dateObj.getMonth() + 1);
          if (dateObj.getMonth() + 1 != this.date.month) {
            this.dateValidation = true
            return
          } else {
              dateValidated = true
          }
          // dateValidated = true
        }
      } else {
          let dayValidated = false
          let monthValidated = false
          let yearValidated = false

          // IF SomeThing is blank
          // Day Validation
          if (this.date.month.toString().trim() == '' || this.date.year.toString().trim() == '') {
              if (this.date.day.toString().trim() != '' ){
                if (!/^\d+$/.test(this.date.day.toString().trim())) {
                  dateValidated = false;
                  this.dateValidation = true
                  this.date = {day:'', month: '', year: ''}
                } else {
                  dayValidated = true
                }
              }
          }
          // Month Validation
          if (this.date.day.toString().trim() == '' || this.date.year.toString().trim() == '') {
              if (this.date.month.toString().trim() != '' ){
                if (!/^\d+$/.test(this.date.month.toString().trim())) {
                  var dateValidated = false;
                  this.dateValidation = true
                  this.date = {day:'', month: '', year: ''}
                } else {
                  monthValidated = true
                }
              }
          }

          // Year Validation
          if (this.date.month.toString().trim() == '' || this.date.day.toString().trim() == '') {
              if (this.date.year.toString().trim() != '' ){
                if (!/^\d+$/.test(this.date.year.toString().trim())) {
                  var dateValidated = false;
                  this.dateValidation = true
                  this.date = {day:'', month: '', year: ''}
                } else {
                  yearValidated = true
                }
              }
          }

          if(dayValidated == true && monthValidated == true && yearValidated == true) {
            dateValidated = true
          } else {
            this.dateValidation = true
          }
      }
      // console.log(this.staffData);
      // return
      if (nameValidated && emailValidated && roleValidated && deptValidated && dateValidated && passwordValidated) {

        var data = this.staffData;
        delete data['updatedAt']

        if (this.date.year) {
            data.suspendDate =  this.date.year + '-' + this.date.month + '-' +  this.date.day;
        } else {
          data.suspendDate = null
        }

        var url = this.apiURL + 'staff/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.put(url, data).then(response => {
          console.log(response);
          if (response) {
            var redirectURL = '/staff/'+ response.body._id;
            Router.push(redirectURL)
          } else {
            alert("Something went wrong")
          }

        }, response => {
          console.log(response)
        })
      }
    },
    checkedNamesfun: function (role) {
      console.log(role);

    },
    codeFilterDay: function(list, query) {
      var arr = [];
      query = query.toUpperCase();

      for(var i = 0; i < list.length; i++) {
        if(list[i].day.toString().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 32)
          break;
      }
      return arr;
    },
    dayCallback: function(item) {
      // console.log(item);
      console.log("working");
      // console.log("selected item " + JSON.stringify(item));
    },
    codeFilterMonth: function(list, query) {
      var arr = [];
      query = query.toUpperCase();
      for(var i = 0; i < list.length; i++) {
        if(list[i].month.toString().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 32)
          break;
      }
      return arr;
    },
    monthCallback: function(item) {
      // console.log(item);
      console.log("working");
      // console.log("selected item " + JSON.stringify(item));
    },
    codeFilterYear: function(list, query) {
      var arr = [];
      query = query.toUpperCase();

      for(var i = 0; i < list.length; i++) {
        if(list[i].year.toString().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 32)
          break;
      }
      return arr;
    },
    yearCallback: function(item) {
      // console.log(item);
      console.log("working");
      // console.log("selected item " + JSON.stringify(item));
    },
  },
  created() {
    this.calculateYear()
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
