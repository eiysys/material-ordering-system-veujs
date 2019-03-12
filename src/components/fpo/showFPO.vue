<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Fabric Purchase Order </div>
      </md-card-header>
      <br>
      <md-card-actions>
        <!-- <md-button v-on:click="updateFPO">Arrived</md-button> -->
        <!-- <md-button v-bind:href='"/fpo/edit/"+ fabricData.code' v-if="showCreateAndButton" class="md-raised md-primary">Modify</md-button> -->
        <router-link tag="md-button" :to='"/fpo/edit/"+ fabricData.code' class="md-raised md-primary" v-if="showCreateAndButton">Modify</router-link>

        <md-button v-on:click="generatePDF" class="md-raised md-primary">Generate PDF</md-button>
      </md-card-actions>
      <br>
      <md-card-content>
        <md-card style="width:100%">
          <md-card-content id="pdfContent">
            <div class="row">
              <div class="col-md-4">
                <h5>FPO: {{this.$route.params.fpoID}}</h5>
                <h5>Date: {{fabricData.createdDate |formatDate}}</h5>
                <h5>Total Price: {{totalFPOPrice}}</h5>
              </div>
              <div class="col-md-4">
                <h5>Staff: {{fabricData.staff}}</h5>
                <h5>Vendor: {{fabricData.vendor}}</h5>
              </div>
              <div class="col-md-4">
                <h5>Status: {{fabricData.status }}</h5>
                <h5>Remark: {{fabricData.remark }}</h5>
              </div>
            </div>
            <br>
            <h4>Order Items</h4>
            <template v-for="fabric in fabricData.fab_data">
              <md-card>
                <md-card-content>
                  <div class="row">
                    <div class="col-md-3">
                      <p><strong>SO:</strong> {{fabric.SO}}</p>
                      <p><strong>Line</strong> {{fabric.so_row}}</p>
                    </div>
                    <div class="col-md-3">
                      <strong>Fabric:</strong> {{fabric.fabric}}<br>
                      <strong>Fabric Color:</strong> {{fabric.color}} <br>
                      <strong>Description:</strong> {{fabric.description}}
                    </div>
                    <div class="col-md-3">
                      <!-- <button class="btn btn-default" v-if="fabric.arrived_date" disabled >Arrived</button>
                      <button class="btn btn-default"  v-on:click="updateArrivedDate(fabric.so_row, fabric.po_row)" v-else>Arrived</button> -->
                      <md-button class="md-raised md-primary" v-if="fabric.arrived_date" disabled >Arrived</md-button>
                      <md-button class="md-raised md-primary" v-on:click="updateArrivedDate(fabric.so_row, fabric.po_row)" v-else>Arrived</md-button>
                    </div>
                    <div class="col-md-3">
                      <strong>Arrived Date:</strong> {{fabric.arrived_date}}
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-3">
                      <p><strong>Price: </strong>$ {{fabric.price}}</p>
                    </div>
                    <div class="col-md-3">
                      <p><strong>Quantity: </strong>{{fabric.quantity}}</p>
                    </div>
                    <div class="col-md-3">
                      <p><strong>Unit: </strong>{{fabric.unit}}</p>
                    </div>
                  <!--   <div class="col-md-3">
                      <p><strong>Fabric Price: </strong>{{fabricData.fabricPrice}}</p>
                    </div> -->
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <p><strong>Deliver Address: </strong> {{fabricData.deliveryAddress}}</p>
                    </div>
                    <div class="col-md-3">
                      <p><strong>Delivey Phone No: </strong>{{fabricData.deliveryPhone}}</p>
                    </div>
                    <div class="col-md-3">
                      <p><strong>Delivery Date: </strong>{{deliveryDate1(fabricData.deliveryDate)._v }}</p>
                    </div>

                  </div>
                </md-card-content>
              </md-card>
              <br>
            </template>
          </md-card-content>
        </md-card >
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'fabric-display',
  data () {
    return {
      showCreateAndButton: true,
      authData: '',
      totalFPOPrice: 0,
      fabricData: {
        name: '',
        phone: '',
        address: '',
        remark: '',
        type: ''
      },
      params: this.$route.params.fpoID,
      showIndividualArrivedButton: true,
      fabricDataForArriveStatus: '',
      deliveryDate:'',
      del:''
    }
  },
  methods: {
    showPanel: function () {
      $("#fadeout").show();
      $("#poDashFull").css('margin-left','20%');
    },
    generatePDF: async function () {
      console.log('this is pdf generation');
      var pdfURL = this.apiURL + 'api/fpo-pdf/'+ this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      var filepath = ''

      await this.$http.get(pdfURL).then(response => {
      console.log('ddd');
       // filepath = response.body.filename.replace('./public/', '');
      }, response => {
      console.log('dddo');
        //console.log(response);
      })

      var fileURL = this.apiURL +  filepath;
      window.open(pdfURL, '_blank');

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
      this.getFabric();
    },
    updateFPO: function () {
      var d = new Date();
      var data = {
        arrived_date: d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(),
        status: 'arrived'
      }
      var fabricURL = this.apiURL + 'api/fabric-order/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.put(fabricURL, data).then(response => {
        console.log(response);
        // this.fabricData = response.body;
      }, response => {
        console.log(response)
      })
    },

    // Update FPO Data
    fabricdetail: async function (fabricDataWithDetails) {
      for (let i=0;i<fabricDataWithDetails.fab_data.length;i++) {
        var fabricURL = this.apiURL + 'api/fabric/' + fabricDataWithDetails.fab_data[i].fabric.replace( /^\s+|\s+$/g, '') + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        await this.$http.get(fabricURL).then(response => {
          fabricDataWithDetails.fab_data[i].color = response.body.color;
          fabricDataWithDetails.fab_data[i].description = response.body.description;
        }, response => {
          console.log(response)
        })

        // console.log(fabricDataWithDetails.fab_data);

      }

      for (let i=0; i<fabricDataWithDetails.fab_data.length;i++) {
          this.totalFPOPrice += parseFloat(fabricDataWithDetails.fab_data[i].price)
      }

      this.fabricData =  fabricDataWithDetails;
     // this.del = this.fabricData.deliveryDate;
      //this.deliveryDate1();

      console.log(this.fabricData);

      var arrButtonDisable = 0;
      // Arrived button logic
      for (let i=0;i<this.fabricData.fab_data.length;i++) {
        if (this.fabricData.fab_data[i].arrived_date) {
          arrButtonDisable += 1
        }
      }

      if (arrButtonDisable == this.fabricData.fab_data.length) {
        this.showCreateAndButton = false
      }


    },

    // Get Fabric Order by parameter
    getFabric: function () {
      if (this.params) {
        var getFabricURL = this.apiURL + 'api/fabric-order/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.get(getFabricURL).then(response => {
          this.fabricDataForArriveStatus = response.body;
          this.fabricdetail(response.body)
        }, response => {
          console.log(response)
        })
      }
    },
    updateArrivedDate: function (so_row, po_row) {
      var d = new Date();


      var data = this.fabricDataForArriveStatus;
      for (let i=0;i<data.fab_data.length; i++) {

        if (data.fab_data[i].so_row == so_row && data.fab_data[i].po_row == po_row) {
          data.fab_data[i].arrived_date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
          data.fab_data[i].status = "arrived";
        }
      }


      var updateDateURL = this.apiURL + 'api/fabric-order/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;


      this.$http.put(updateDateURL, data).then(response => {
        this.fabricData = response.body;
        this.showIndividualArrivedButton = false;
      }, response => {
        console.log('df');
      //  console.log(response)
      })
    //  location.reload();
    },
     deliveryDate1 :async function(currentDate){
      if(currentDate){

       var currentDate =new  Date(currentDate);

        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Be careful! January is 0 not 1
        var year = currentDate.getFullYear();
        console.log(date + "-" +(month + 1) + "-" + year);

      return  date + "-" +(month + 1) + "-" + year;
      }
    },
  },
  created() {
    this.getCookie()
    this.showPanel()
  }
}

</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px
}
html {
overflow:   scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
