<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Fabric Details</div>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button>Modify</md-button> -->
        <!-- <md-button v-bind:href="'/fabric/'" v-if="showCreateAndButton" class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to="'/fabric/'" class="md-raised md-primary">New</router-link>
        <!-- <md-button v-bind:href='"/fabric/edit/"+ fabricData._id' v-if="showCreateAndButton" class="md-raised md-primary">Modify</md-button> -->
        <router-link tag="md-button" :to='"/fabric/edit/"+ fabricData._id' class="md-raised md-primary" v-if="showCreateAndButton">Modify</router-link>
      </md-card-actions>
      <md-card-content>
        <br>
        <md-card>
          <md-card-content>
            <div class="row">
              <div class="col-md-12">
                <div class="col-md-4">

                </div>
                <div class="col-md-4">
                  <md-input-container>
                    <md-icon>code</md-icon>
                    <label>Code</label>
                    <md-textarea v-model="fabricData._id" disabled></md-textarea>
                  </md-input-container>
                  <md-input-container>
                    <md-icon>opacity</md-icon>
                    <label>Color</label>
                    <md-textarea v-model="fabricData.color" style="text-transform: capitalize;" disabled></md-textarea>
                  </md-input-container>

                  <md-input-container>
                   <md-icon>attach_money</md-icon>
                    <label>Price</label>
                    <md-textarea v-model="fabricData.price" style="text-transform: capitalize;" disabled></md-textarea>
                  </md-input-container>


                  <md-input-container>
                    <md-icon>speaker_notes</md-icon>
                    <label>Description</label>
                    <md-textarea v-model="fabricData.description" disabled></md-textarea>
                  </md-input-container>
                  <md-input-container>
                    <md-icon>create</md-icon>
                    <label>Remark</label>
                    <md-textarea v-model="fabricData.remark" disabled></md-textarea>
                  </md-input-container>
                  <md-input-container>
                    <md-icon>today</md-icon>
                    <label>Created Date</label>
                    <md-textarea v-model="fabricData.createdAt" disabled></md-textarea>
                  </md-input-container>
                  <md-input-container>
                    <md-icon>today</md-icon>
                    <label>Update Date</label>
                    <md-textarea v-model="fabricData.updatedAt"  disabled></md-textarea>
                  </md-input-container>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'fabric-display',
  data () {
    return {
      showCreateAndButton: true,
      fabricData: {
        _id: '',
        color: '',
        description: '',
        createdAt: '',
        remark: '',
        price:''
      },
      authData: '',
      params: this.$route.params.fabricID
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
      this.getVendor()
    },
    getVendor: function () {
      if (this.params) {

        var fabricURL = this.apiURL + 'api/fabric/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        // var cust_url = this.apiURL + 'api/fabric/' + this.params;
        this.$http.get(fabricURL).then(response => {
          // console.log(response.body.createdAt);
          var data = response.body;
          data.createdAt = moment(String(data.createdAt)).format('DD-MM-YYYY')
          data.updatedAt = moment(String(data.updatedAt)).format('DD-MM-YYYY')
          this.fabricData = data;
        }, response => {
          console.log(response)
        })
      }
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
</style>
