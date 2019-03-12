<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Customer Details</div>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button v-bind:href='"/sales"' class="md-raised md-primary">New Order</md-button> -->
        <router-link tag="md-button" :to='"/sales"' class="md-raised md-primary">New Order</router-link>

        <!-- <md-button v-bind:href='"/customer"' class="md-raised md-primary">New</md-button> -->
        <router-link tag="md-button" :to='"/customer"' class="md-raised md-primary">New Customer</router-link>

        <!-- <md-button v-bind:href='"/customer/edit/"+ customerData._id' class="md-raised md-primary">Modify</md-button> -->
        <router-link tag="md-button" :to='"/customer/edit/"+ customerData._id' class="md-raised md-primary">Modify</router-link>

        <!-- <md-button v-bind:href='"/customer/question-answers/"+ customerData._id' class="md-raised md-primary">Ques/Ans</md-button> -->
        <router-link tag="md-button" :to='"/customer/question-answers/"+ customerData._id' class="md-raised md-primary">Ques/Ans</router-link>
      </md-card-actions>
      <md-card-content>
        <br>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-5">
              <md-card>
                <md-card-header>
                  <h4>Personal Information</h4>
                </md-card-header>
                <md-card-content>

                  <div class="row">
                    <div class="col-md-4">
                      <strong>Name:</strong>
                    </div>
                    <div class="col-md-8">
                      {{ customerData.name }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <strong>Code:</strong>
                    </div>
                    <div class="col-md-8">
                      {{ customerData._id }}
                    </div>
                  </div>


                  <div class="row">
                    <div class="col-md-4">
                      <strong>Phone:</strong>
                    </div>
                    <div class="col-md-8">
                      {{ customerData.phone }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <strong>E-mail:</strong>
                    </div>
                    <div class="col-md-8">
                      {{ customerData.email }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <strong>Occupation:</strong>
                    </div>
                    <div class="col-md-8">
                      {{ customerData.occupation }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <strong>DOB:</strong>
                    </div>
                    <div class="col-md-8">
                      {{ customerData.dob}}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <strong>Refer by:</strong>
                    </div>
                    <div class="col-md-8">
                      {{ customerData.referby }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <strong>Address:</strong>
                    </div>
                    <div class="col-md-8">
                      {{ customerData.officeAddress }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <strong>Del.Address:</strong>
                    </div>
                    <div class="col-md-8">
                      {{ customerData.deliveryOffice }}
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </div>
            <div class="col-md-7">
              <md-card>
                <md-card-header>
                  <h4>Measurements</h4>
                </md-card-header>
                <md-card-content>

                  <div class="row">
                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Jacket Front Length:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.jacketFrontLength }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Jacket Back Length:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.jacketBackLength }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Vest Length:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.vestLength }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Shoulder:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.shoulder }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Jacket Sl Length:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.jktSlLength }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Whole Chest:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.wholeChest }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Front Chest:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.frontChest }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Back Chest:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.backChest }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Chest Vertical:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.chestVertical }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Chest Horizontal:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.chestHorizontal }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Front Chest Part:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.frtChestPart }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Back Chest Part:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.backChestPart }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Waist:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.waist }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Shirt Collar:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.shirttCollor }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Arm:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.arm }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Forearm:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.forearm }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Wrist:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.wrist }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Shirt Sl Length:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.shirtSlLength }}
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-md-6 infoPad">
                      <div class="col-md-4" style="padding-left:0">
                        Remark#
                      </div>
                      <div class="col-md-8 text-right">
                        {{ customerData.measurements.remark2 }}
                      </div>
                    </div> -->

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Sk Size:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.SkSize }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Sk Length:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.SkLength }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Height:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.height }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Dress Length:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.dressLength }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Female Blouse Collar:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.femaleBlouseCollor }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Pant Waist:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.pantWaist }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Hip:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.hip }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Crotch:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.crotch }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          PT Length:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.ptLength }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Thigh:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.thigh }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Shin:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.shin }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 infoPad">
                      <div class="row">
                        <div class="col-md-9">
                          Hem:
                        </div>
                        <div class="col-md-3">
                          {{ customerData.measurements.hem }}
                        </div>
                      </div>
                    </div>
                    <br>
                    <br>
                    <div class="col-md-8" style="padding-top:20px">
                        Remarks: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ customerData.measurements.remark1 }}
                    </div>
                  </div>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'customer-display',
  data () {
    return {
      customerData: {
        _id: '',
        name: '',
        phone: '',
        email: '',
        occupation: '',
        dob: '',
        referby: '',
        officeAddress: '',
        deliveryOffice: '',
        measurements: {
          jacketFrontLength: '',
          jacketBackLength: '',
          vestLength: '',
          shoulder: '',
          jktSlLength: '',
          wholeChest: '',
          frontChest: '',
          backChest: '',
          chestVertical: '',
          chestHorizontal: '',
          frtChestPart: '',
          backChestPart: '',
          waist: '',
          remark1: '',
          shirttCollor: '',
          arm: '',
          forearm: '',
          wrist: '',
          shirtSlLength: '',
          remark2: '',
          SkSize: '',
          SkLength: '',
          height: '',
          dressLength: '',
          femaleBlouseCollor: '',
          pantWaist: '',
          hip: '',
          crotch: '',
          ptLength: '',
          thigh: '',
          shin: '',
          hem: ''
        }
      },
      params: this.$route.params.custID
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

      this.getCustomer();

    },
    getCustomer: function () {
      if (this.params) {

        var customerURL = this.apiURL + 'customer/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        console.log(customerURL);
        this.$http.get(customerURL).then(response => {
          if (response.body.dob) {
              response.body.dob = moment(String(response.body.dob)).format('DD-MM-YYYY');

              // For testing only
              var tempDay = response.body.dob.split("-")[0]
              var tempMonth = response.body.dob.split("-")[1]

              tempMonth = parseInt(tempMonth);
              tempDay = parseInt(tempDay);
              response.body.dob = tempDay + '-' + tempMonth + '-' + response.body.dob.split("-")[2]

          }
          this.customerData = response.body;
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

.infoPad {
  padding-top: 10px
}
</style>
