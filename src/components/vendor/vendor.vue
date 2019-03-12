<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">New Vendor</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="saveVendor" class="md-raised md-primary">Save</md-button>
      </md-card-actions>
      <br>
      <md-card-content>

        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <div class="row">
                <div class="col-md-6">
                  <div class="col-md-8 col-md-offset-2">
                    <md-input-container>
                      <md-icon>account_box</md-icon>
                      <label>Name</label>
                      <md-textarea v-model="vendorData.name" required></md-textarea>
                    </md-input-container>
                    <p class="text-danger error-msg" v-if="error">*Name Field Required</p>
                    <p class="text-danger error-msg" v-if="nameError">Please enter valid Name</p>
                    <md-input-container>
                        <md-icon>phone</md-icon>
                        <label>Phone</label>
                        <md-input v-model="vendorData.phone" required></md-input>
                    </md-input-container>
                    <p class="text-danger error-msg" v-if="phoneError">*Phone Field Required</p>
                    <p class="text-danger error-msg" v-if="phoneDigitError">Please enter valid Phone number</p>
                    <md-input-container>
                      <md-icon>home</md-icon>
                      <label>Address</label>
                      <md-textarea v-model="vendorData.address"></md-textarea>
                    </md-input-container>
                    <!-- new fields -->
                      <md-input-container>
                      <md-icon>account_box</md-icon>
                      <label>Contact Person</label>
                      <md-textarea v-model="vendorData.contact_person" required></md-textarea>
                    </md-input-container>
                      <p class="text-danger error-msg" v-if="contact_personError">*Contact Person field required. </p>

                     <md-input-container>
                      <md-icon>email</md-icon>
                      <label>Email</label>
                      <md-textarea v-model="vendorData.email" required></md-textarea>
                    </md-input-container>
                      <p class="text-danger error-msg" v-if="emailRequirtedError">*Email field required</p>
                      <p class="text-danger error-msg" v-if="emailValidError">Please enter valid email</p>

                     <md-input-container>
                      <md-icon>email</md-icon>
                      <label>FAX</label>
                      <md-textarea v-model="vendorData.fax"></md-textarea>
                    </md-input-container>
                       <!-- <p class="text-danger error-msg" v-if="faxError">FAX field required</p> -->
                       <p class="text-danger error-msg" v-if="faxValidError">Please enter valid FAX</p>
                    <!-- end new fields -->
                    <md-input-container>
                      <md-icon>create</md-icon>
                      <label>Remark</label>
                      <md-textarea v-model="vendorData.remark"></md-textarea>
                    </md-input-container>

                  </div>
                </div>
                <div class="col-md-6">
                  <div class="col-md-8 col-md-offset-2">
                    <h3 class="text-center">Vendor Type</h3>
                    <hr>
                    <md-button-toggle md-single class="md-primary" style="padding-left:20px">
                      <md-button class="md-toggle" @click="changeMethod('fabric')">Fabric</md-button>
                      <md-button @click="changeMethod('labor')">Labor</md-button><br>
                      <md-button @click="changeMethod('other')">Other</md-button><br>
                    </md-button-toggle>
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
import Router from '../../router/index.js';

export default {
  name: 'vendor',
  data () {
    return {
      error: '',
      nameError: false,
      phoneError: false,
      phoneDigitError: false,
      emailValidError:false,
      contact_personError:false,
      faxError:false,
      faxValidError: false,
      emailRequirtedError:false,
      vendorData: {
        name: '',
        phone: '',
        address: '',
        contact_person:'',
        email:'',
        fax:'',
        remark: '',
        type: 'fabric'
      }
    }
  },
  methods: {
    // Number Validation
    validate: function () {
      console.log("validate this");
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
    },
    changeMethod:  function (param) {
      this.vendorData.type = param
    },
    saveVendor: function () {
      // Error Messages

      // Name
      this.error = false
      this.nameError = false
      // Phone
      this.phoneError = false
      this.phoneDigitError = false
      // Email
      this.emailValidError=false
      this.emailRequirtedError=false
      // Contact
      this.contact_personError=false
      // Fax
      this.faxValidError = false
      // this.faxError = false

      var nameValidated = false
      var phoneValidated = false
      var contactValidated = false
      var emailValidated = false
      var faxValidated = false

      var data = this.vendorData


      //  Name validation
      if (data.name.trim() == '') {
        this.error = true
      } else if (!/^[a-zA-Z .]+$/.test(data.name)) {
        this.nameError = true
      } else {
        nameValidated = true
      }

      // Phone Validation
      if (data.phone.trim() == '') {
          this.phoneError = true
      } else if (!/^\d+$/.test(data.phone)) {
          this.phoneDigitError = true
      } else if (data.phone.length < 7 || data.phone.length > 11) {
          this.phoneDigitError = true
      } else {
        phoneValidated = true
      }

      // Contact validation
      if (data.contact_person.trim() == '') {
        this.contact_personError = true
      } else {
        this.contact_personError = false;
        contactValidated = true
      }

      //  Email validation
      if (data.email.trim() == '') {
        this.emailRequirtedError = true
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        this.emailValidError = true;
      } else {
        emailValidated = true
      }


      //  Fax Validation
       if (data.fax.trim() == '') {
        // this.faxError = true
        faxValidated = true
      } else if (!/^[0-9() -]+$/.test(data.fax)) {
        this.faxValidError = true
      } else {
        this.faxError = false;
        faxValidated = true
      }


      if (nameValidated && phoneValidated && contactValidated && emailValidated && faxValidated) {
        var url = this.apiURL + 'api/vendor' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id
        this.$http.post(url, data).then(response => {
          // console.log(response);
          // window.location = "/vendor/" + response.body._id;

          var redirectURL = "/vendor/" + response.body._id;
          Router.push(redirectURL)
        }, response => {
          alert(response.body)

        })
      }
    },
  },
  created() {
    this.getCookie()
  },
  watch: {
    vendorData: function () {
      console.log("watching");
    }
  }
}

</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px
}

/* For Firefox */
input[type='number'] {
    -moz-appearance:textfield;
}

/* Webkit browsers like Safari and Chrome */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.md-input-container {
  margin: 4px 0 10px
}

.error-msg {
  font-size: 12px
}
</style>
