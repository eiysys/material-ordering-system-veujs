<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Edit Department</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="saveDepartment" class="md-raised md-primary">Save</md-button>.

      </md-card-actions>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <h5> </h5>
              <div class="row">
                <div class="col-md-12">
                  <div class="col-md-4">

                  </div>
                  <div class="col-md-4">


                    <form>
                      <md-input-container>
                        <md-icon>work</md-icon>
                        <label>Name</label>
                        <md-input v-model="departmentData.name" required></md-input>
                        <span class="md-error">Validation message</span>
                      </md-input-container>
                      <p class="text-danger" v-if="nameValidation">*Name field required</p>

                      <md-input-container>
                        <md-icon>mode_edit</md-icon>
                        <label>Remark</label>
                        <md-input v-model="departmentData.remark"></md-input>
                      </md-input-container>
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

                    </form>
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
      dateValidation: false,
      nameValidation: false,
      date: {day: '', month: '', year: ''},
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
      years: [
      ],
      departmentData : {
        name: '',
        date: '',
        remark: ''
      },
      params: this.$route.params.deptID
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

      this.getDepartment()
    },
    getDepartment: function () {
      var data = this.departmentData
      data.doctype = 'department';

      var getDeptURL = this.apiURL + 'api/department/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(getDeptURL , data).then(response => {

        var data = response.body;
        data.date = moment(String(data.date)).format('DD-MM-YYYY')

        if (data.date == 'Invalid date') {

          data.date = ''
        } else {
          var tempDate = data.date.split("-")
          this.date.day = tempDate[0]
          this.date.month = tempDate[1]
          this.date.year = tempDate[2]
        }

        console.log(data);

        this.departmentData = response.body;
      }, response => {
        console.log(response)
      })
    },
    saveDepartment: function () {

      var nameValidated = false;
      var dateValidated = false;

      this.dateValidation = false;
      this.nameValidation = false;
      // Name Validations
      if (this.departmentData.name.toString().trim() == '') {
        this.nameValidation = true
        this.departmentData.name = ''
      } else {
        this.nameValidation = false
        nameValidated = true
      }

      // Date validation
      // Date Validation
      if (this.date.day.toString().trim() == '' && this.date.month.toString().trim() == '' && this.date.year.toString().trim() == '') {
        dateValidated = true
      } else if (this.date.day.toString().trim() != '' && this.date.month.toString().trim() != '' && this.date.year.toString().trim() != '') {
        let dayValidated = false
        let monthValidated = false
        let yearValidated = false

        // Day Validation
        if (!/^\d+$/.test(this.date.day.toString().trim())) {
            dateValidated = false
            this.dateValidation = true
            this.date = {day:'', month: '', year: ''}
          } else if (this.date.day.toString().trim() >0 && this.date.day.toString().trim() < 32) {
            dayValidated = true
          } else {
            this.dateValidation = true
            this.date = {day:'', month: '', year: ''}
          }

        // Month validation
        if (!/^\d+$/.test(this.date.month.toString().trim())) {
            dateValidated = false
            this.dateValidation = true
            this.date = {day:'', month: '', year: ''}
          } else if (this.date.month.toString().trim() >0 && this.date.month.toString().trim() < 13) {
              monthValidated  = true
          } else {
              this.dateValidation = true
              this.date = {day:'', month: '', year: ''}
          }

        // Year validation
        if (!/^\d+$/.test(this.date.year.toString().trim())) {
            dateValidated = false
            this.dateValidation = true
            this.date = {day:'', month: '', year: ''}
          } else if (this.date.year.toString().trim() > 2017) {
            yearValidated = true
          } else {
            this.dateValidation = true
            this.date = {day:'', month: '', year: ''}
          }

        // Check All
        if (dayValidated && monthValidated && yearValidated) {
          var myDate = parseInt(this.date.year.toString().trim()) + '-' + parseInt(this.date.month.toString().trim()) + '-' + parseInt(this.date.day.toString().trim())
          var dateObj = new Date(myDate)
          if (dateObj.getMonth() + 1 != this.date.month) {
            this.dateValidation = true
            return
          } else {
              dateValidated = true
          }
        }

      } else {
        this.dateValidation = true
        dateValidated = false
      }

      if (nameValidated && dateValidated) {
        var data = this.departmentData
        if (this.date.year) {
            data.date =  this.date.year + '-' + this.date.month + '-' +  this.date.day;
        } else {
          data.date = null
        }


        var getDeptURL = this.apiURL + 'api/department/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.put(getDeptURL, data).then(response => {
          console.log(response);
          // window.location.href = '/department/'+ this.params;
          var redirectURL = '/department/'+ this.params
          Router.push(redirectURL)
        }, response => {
          alert()
          console.log(response)
        })
      }
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
      console.log("some rrr");
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
  created: function() {
    this.getCookie()
    this.calculateYear()
  }
}

</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px
}
</style>
