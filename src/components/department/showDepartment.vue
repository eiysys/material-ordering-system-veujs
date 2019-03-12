<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Show Department</div>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button v-bind:href='"/department"' class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to='"/department"' class="md-raised md-primary">New</router-link>

        <!-- <md-button v-bind:href='"/department/edit/" + departmentData._id' class="md-raised md-primary">Modify</md-button> -->
        <router-link tag="md-button" :to='"/department/edit/" + departmentData._id' class="md-raised md-primary">Modify</router-link>

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
                    <form @submit.stop.prevent="editDepartment">
                      <md-input-container>
                        <md-icon>work</md-icon>
                        <label>Name</label>
                        <md-input v-model="departmentData.name" required readonly disabled></md-input>
                        <span class="md-error">Validation message</span>
                      </md-input-container>

                      <md-input-container>
                        <md-icon>date_range</md-icon>
                        <label>Suspend Date</label>
                        <md-input v-model="departmentData.date" readonly disabled></md-input>
                      </md-input-container>
                      <md-input-container>
                        <md-icon>mode_edit</md-icon>
                        <label>Remark</label>
                        <md-input v-model="departmentData.remark" readonly disabled></md-input>
                      </md-input-container>
                      <br>
                      <!-- <md-button class="md-raised md-primary" type="submit">Modify</md-button> -->
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
export default {
  name: 'department',
  data () {
    return {
      date: '',
      departmentData : {
        name: '',
        date: '',
        remark: ''
      },
      params: this.$route.params.deptID
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

      this.getDepartment()
    },
    getDepartment: function () {
      var data = this.departmentData
      data.doctype = 'department';

      var getDeptURL = this.apiURL + 'api/department/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(getDeptURL , data).then(response => {
        var data = response.body;
        try {
            data.date = moment(String(data.date)).format('DD-MM-YYYY')
        } catch (e) {
          data.date = ''
        }
        if (data.date == 'Invalid date') {
          data.date = ''
        }
        this.departmentData = response.body;
        this.objid = response.body._id;
        // window.location.href = '/department/'+ response.body._id;
      }, response => {
        console.log(response)
      })
    },
    editDepartment:  function () {
      window.location.href = '/department/edit/'+ this.objid;
    }
  },
  created: function() {
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
</style>
