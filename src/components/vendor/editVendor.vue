<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Edit Vendor</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="saveVendor" class="md-raised md-primary">Save</md-button>
      </md-card-actions>
      <md-card-content>
        <br>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>


              <div class="row">
                <div class="col-md-6">
                  <div class="col-md-8 col-md-offset-2">
                    <md-input-container>
                      <md-icon>keyboard_arrow_right</md-icon>
                      <label>Code</label>
                      <md-textarea v-model="vendorData._id" disabled required></md-textarea>
                    </md-input-container>
                    <md-input-container>
                      <md-icon>account_box</md-icon>
                      <label>Name</label>
                      <md-textarea v-model="vendorData.name" required style="text-transform: capitalize;"></md-textarea>
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
                      <md-textarea v-model="vendorData.contact_person"></md-textarea>
                    </md-input-container>
                    <p class="text-danger error-msg" v-if="contact_personError">*Contact Person field required. </p>
                    <p class="text-danger error-msg" v-if="contact_personValidError">Please enter valid contact person</p>


                     <md-input-container>
                      <md-icon>email</md-icon>
                      <label>Email</label>
                      <md-textarea v-model="vendorData.email"></md-textarea>
                    </md-input-container>
                     <p class="text-danger error-msg" v-if="emailValidError">Please enter valid email</p>
                    <p class="text-danger error-msg" v-if="emailRequirtedError">*Email field required. </p>


                     <md-input-container>
                      <md-icon>email</md-icon>
                      <label>FAX</label>
                      <md-textarea v-model="vendorData.fax"></md-textarea>
                    </md-input-container>
                      <p class="text-danger error-msg" v-if="faxError">*FAX field required. </p>
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
                      <md-button @click="changeMethod('fabric')" id="fabricButton">Fabric</md-button>
                      <md-button @click="changeMethod('labor')" id="laborButton">Labor</md-button><br>
                      <md-button @click="changeMethod('other')" id="otherButton">Other</md-button><br>
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
  name: 'vendor-edit',
  data () {
    return {
      error: false,
      nameError: false,
      phoneError: false,
      phoneDigitError: false,
      emailValidError:false,
      contact_personError:false,
      contact_personValidError: false,
      faxError:false,
      faxValidError: false,
      emailRequirtedError:false,
      authData: '',
      vendorData: {
        name: '',
        phone: '',
        address: '',
        remark: '',
        contact_person:'',
        email:'',
        fax:'',
        type: ''
      },
      params: this.$route.params.vendorID,

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
      this.getVendor()
    },
    changeMethod:  function (param) {
      this.vendorData.type = param
    },
    saveVendor: function () {
      this.error= false
      this.nameError = false
      this.phoneError = false
      this.phoneDigitError = false

      this.emailValidError=false
      this.emailRequirtedError=false
      this.contact_personError=false
      this.contact_personValidError = false
      this.faxError=false
      this.faxValidError = false

      var nameValidated = false
      var phoneValidated = false
      var allValid=false;
      var contactPersonValidated = false;



      var data = this.vendorData

      //  Name validation
      if (data.name.toString().trim() == '') {
        this.error = true
      } else if (!/^[a-zA-Z .]+$/.test(data.name)) {
        this.nameError = true
      } else {
        nameValidated = true
      }

      data.phone = data.phone.toString()

      // Phone Validation
      if (data.phone.toString().trim() == '') {
          this.phoneError = true
      } else if (!/^\d+$/.test(data.phone)) {
          this.phoneDigitError = true
      } else if (data.phone.length < 7 || data.phone.length > 11) {
          this.phoneDigitError = true
      } else {
        phoneValidated = true
      }


      if (data.email.toString().trim() == '') {
        this.emailRequirtedError = true
        allValid=true;
      } else {
        this.emailRequirtedError = false;
      }

      if (data.contact_person.toString().trim() == '') {
        this.contact_personError = true
         allValid=true;
      } else if (!/^[a-zA-Z .]+$/.test(data.contact_person)) {
        this.contact_personValidError = true
      } else {
        this.contact_personError = false;
        contactPersonValidated = true
      }



       if (data.fax.toString().trim() == '') {
        this.faxError = true
         allValid=true;
      } else if (!/^[0-9() -]+$/.test(data.fax)) {
        this.faxValidError = true
      } else {
        this.faxError = false;
      }


       // Email Validation
      if (data.email.toString().trim() != "") {

          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))
            {
              this.emailValidError = true

              //this.customerData.email = ''
            } else {
              this.emailValidError = false
             // emailValidated = true
            }
        }
        if(allValid){
          return
        }



      delete data.createdAt
      delete data.updatedAt

      if (nameValidated && phoneValidated && contactPersonValidated) {
        var vendorURL = this.apiURL + 'api/vendor/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.put(vendorURL, data).then(response => {
          console.log(response);
          // window.location = "/vendor/"+response.body._id;

          var redirectURL = "/vendor/"+response.body._id;
          Router.push(redirectURL)

        }, response => {
          alert(response.body)
          console.log(response)
        })
      }

      // var data = this.vendorData
      // if (data.name == '') {
      //   this.error = true
      //   // Validate Phone Number
      //   if (!/^\d+$/.test(data.phone)) {
      //     this.phoneError = true
      //     data.phone = ''
      //   } else {
      //     if (data.phone.length < 7 || data.phone.length > 11) {
      //       console.log("clear phone number");
      //       this.phoneDigitError = true;
      //       data.phone = ''
      //       condition = false;
      //     }
      //   }
      // } else {
      //   this.error = ''
      //   // Validate Name
      //   if(!/^[a-zA-Z ]+$/.test(data.name)){
      //     this.nameError = true
      //     data.name = ''
      //   }
      //
      //   var condition = true;
      //   // Validate Phone Number
      //   if (!/^\d+$/.test(data.phone)) {
      //     this.phoneError = true
      //     data.phone = ''
      //   } else {
      //     if (data.phone.length < 7 || data.phone.length > 11) {
      //       this.phoneDigitError = true
      //       data.phone = ''
      //       condition = false;
      //     }
      //   }
      //
      //   if (data.phone != '' && data.name != '' && condition == true) {
      //     var vendorURL = this.apiURL + 'api/vendor/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      //     this.$http.put(vendorURL, data).then(response => {
      //       console.log(response);
      //       window.location = "/#/vendor/"+response.body._id;
      //     }, response => {
      //       console.log(response)
      //     })
      //   }
      // }
    },
    getVendor: function () {
      if (this.params) {
        var getVendorURL = this.apiURL + 'api/vendor/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.get(getVendorURL).then(response => {
          this.vendorData = response.body;
          console.log(response);
          $("#myButton").attr("selected", true);

          if (this.vendorData.type == 'fabric') {
            $('#fabricButton').addClass('md-toggle')
          } else if (this.vendorData.type == 'labor') {
            $('#laborButton').addClass('md-toggle')
          } else if (this.vendorData.type == 'other') {
            $('#otherButton').addClass('md-toggle')
          }


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

.error-msg {
  font-size: 12px
}

.md-input-container {
  margin: 4px 0 10px
}
</style>
