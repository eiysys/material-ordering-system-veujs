<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Vendor Details</div>
      </md-card-header>
      <md-card-actions>

        <!-- <md-button v-bind:href='"/vendor"' v-if="showCreateAndButton" class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to='"/vendor"' class="md-raised md-primary" v-if="showCreateAndButton">New</router-link>

        <!-- <md-button v-bind:href='"/vendor/edit/"+ vendorData._id' v-if="showCreateAndButton" class="md-raised md-primary">Modify</md-button> -->
        <router-link tag="md-button" :to='"/vendor/edit/"+ vendorData._id' class="md-raised md-primary" v-if="showCreateAndButton">Modify</router-link>

      </md-card-actions>
      <md-card-content>
        <md-card>
          <md-card-content>
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-8">
                  <div class="col-md-8 col-md-offset-2">
                    <div class="row">
                      <div class="col-md-6">
                        Code:
                      </div>
                      <div class="col-md-6" style="text-transform: capitalize;">
                        {{ vendorData._id }}
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="col-md-6">
                        Name:
                      </div>
                      <div class="col-md-6" style="text-transform: capitalize;">
                        {{ vendorData.name }}
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="col-md-6">
                        Phone:
                      </div>
                      <div class="col-md-6">
                        {{ vendorData.phone }}
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="col-md-6">
                        Address:
                      </div>
                      <div class="col-md-6">
                        {{ vendorData.address }}
                      </div>
                    </div>
                    <br>
                    <!-- new fields -->
                      <div class="row">
                      <div class="col-md-6">
                        Contact Person:
                      </div>
                      <div class="col-md-6">
                        {{ vendorData.contact_person }}
                      </div>
                    </div>
                    <br>

                    <div class="row">
                      <div class="col-md-6">
                        Email:
                      </div>
                      <div class="col-md-6">
                        {{ vendorData.email }}
                      </div>
                    </div>
                    <br>

                    <div class="row">
                      <div class="col-md-6">
                        FAX:
                      </div>
                      <div class="col-md-6">
                        {{ vendorData.fax }}
                      </div>
                    </div>
                    <br>
                    <!-- new fields -->
                    <div class="row">
                      <div class="col-md-6">
                        Remark:
                      </div>
                      <div class="col-md-6">
                        {{ vendorData.remark }}
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="col-md-6">
                        Type:
                      </div>
                      <div class="col-md-6">
                        {{ vendorData.type }}
                      </div>
                    </div>

                  </div>
                </div>
                <div class="col-md-4">
                  <div class="col-md-8 col-md-offset-2">

                  </div>
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
export default {
  name: 'vendor-display',
  data () {
    return {
      showCreateAndButton: true,
      vendorData: {
        name: '',
        phone: '',
        address: '',
        remark: '',
        type: ''
      },
      params: this.$route.params.vendorID
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
        var url = this.apiURL + 'api/vendor/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id
        // var cust_url = this.apiURL + 'api/vendor/' + this.params;
        this.$http.get(url).then(response => {
          console.log(response);
          this.vendorData = response.body;
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
