<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
        <router-link to="/">
          <img src="../../assets/persuit-logo.png" class="img img-responsive" width="250" height="70">
        </router-link>
        <!-- <a href="/#/"</a> -->
        <br>
        <div class="md-title text-center">PO Dashboard</div>
        <br>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button v-bind:href='"/#/fpo/new/?id="+ FPO_Order'>Create FPO</md-button> -->
        <template v-if="showCreateAndButton">
          <md-button v-on:click="createFPO" v-if="enableCreateFPO">Create FPO</md-button>
          <md-button v-else disabled>Create FPO</md-button>
          <md-button v-on:click="createLPO" v-if="enableCreateLPO">Create LPO</md-button>
          <md-button v-else disabled>Create LPO</md-button>
        </template>
        
      </md-card-actions>
      <md-card-content>
        <!-- {{fromDateVue}}
        {{toDateVue}} -->
        <div class="row">
          <div class="col-md-6">

            <div class="col-md-4">
              <!-- <sstrong>from Date:</sstrong> -->
              <datepicker v-model="fromDateVue" placeholder="from date"></datepicker>
            </div>



            <div class="col-md-4">
              <datepicker v-model="toDateVue" placeholder="to date"></datepicker>

            </div>
            <div class="col-md-4">
              <button type="button" name="button" v-on:click="filterData" v-if="fromDateVue && toDateVue">Filter</button>
              <button type="button" name="button" v-on:click="filterData" v-if="!fromDateVue || !toDateVue" disabled>Filter</button>
            </div>

          </div>
        </div>


        <!-- <div class="container">
          <div class="row">
            <div class='col-sm-6'>
              <div class="form-group">
                <div class='input-group date' id='datetimepicker1'>
                  <input type='text' class="form-control" />
                  <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div> -->
        <!-- <label for="">From Date: </label>
        <input type="text" name="" value="" placeholder="MM-DD-YYYY" v-model="fromDate">
        <label for="">To Date: </label>
        <input type="text" name="" placeholder="MM-DD-YYYY" v-model="toDate"> -->
        <!-- <button type="button" name="button" v-on:click="filterData" v-if="fromDate && toDate">Filter</button>
        <button type="button" name="button" v-on:click="filterData" v-if="!fromDate || !toDate" disabled>Filter</button> -->
        <br>
        <br>
        <p class="text-danger" v-if="validDateRange"> Please enter valid date range</p>
        <br>
        <table id="example" class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>PO</th>
              <th>SO</th>
              <th>CustID</th>
              <th>SO Row</th>
              <th>PO Type</th>
              <th>Item</th>
              <th>PO Date</th>
              <th>Item #</th>
              <th>Item Description</th>
              <th>Sales Person</th>
              <th>Vendor</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Del. Date</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="order in salesOrders">
              <template v-for="(item,index) in order.itemsDetail">

                <template v-if="item.productType === 'tie'">

                </template>

                <template v-else-if="item.productType === 'shoes'">

                </template>

                <template v-else-if="item.productType === 'bow tie'">

                </template>

                <template v-else>
                  <tr v-for="codeobj in item.fpo" bgcolor="#F7F7F7">
                    <template v-if="codeobj">
                      <template v-if="showCreateAndButton ">
                        <td v-if='codeobj.objID == ""'>
                          <input type="checkbox" v-bind:value="{SO: order._id, item:item.productType, fabric:codeobj.code, so_row:item.so_row}" v-model="FPO_Order">
                        </td>
                        <td v-else>-</td>
                      </template>
                      <template v-else-if="!showCreateAndButton">
                        <td>-</td>
                      </template>

                      <!-- Purchase Order Number -->
                      <td v-if="codeobj.objID">
                        <!-- <a v-bind:href='"/fpo/"+ codeobj.objID'>{{codeobj.objID}}</a> -->
                        <router-link :to='"/fpo/"+ codeobj.objID'>{{codeobj.objID}}</router-link>
                        #{{codeobj.po_row}}
                      </td>
                      <td v-else>-</td>

                      <!-- Sales Order Number -->
                      <td>
                        <!-- <a v-bind:href='"/sales/"+ order._id'>{{order._id}}</a> -->
                        <router-link :to='"/sales/"+ order._id'>{{order._id}}</router-link>
                      </td>

                      <!-- Customer ID  -->
                      <td>
                        <!-- <a v-bind:href='"/customer/"+ order.customerId'>{{order.customerId}}</a> -->
                        <router-link :to='"/customer/"+ order.customerId'>{{order.customerId}}</router-link>
                      </td>
                      <!-- Sales Row -->
                      <td>{{item.so_row}}</td>

                      <!-- Purchase Order Type -->
                      <td>FPO</td>

                      <!-- Product Type -->
                      <td>{{item.productType}}</td>

                      <!-- FPO create date -->
                      <td v-if="codeobj.objID">{{codeobj.date | formatDate}}</td>
                      <td v-else>-</td>

                      <!-- Fabric Code -->
                      <td>{{codeobj.code}}</td>

                      <!-- Fabric Descrition -->
                      <td v-if="codeobj.objID">{{item.description}}</td>
                      <td v-else>-</td>

                      <!-- Staff ID for sales order -->
                      <td>{{order.staffId}}</td>

                      <!-- Fabric Order Vendor -->
                      <td v-if="codeobj.objID">{{codeobj.vendor}}</td>
                      <td v-else>-</td>

                      <!-- Fabric Unit (Yard/Piece) -->
                      <td v-if="codeobj.objID">{{codeobj.unit}}</td>
                      <td v-else>-</td>

                      <!-- Fabric Order Price -->
                      <td v-if="codeobj.objID">&#36; {{codeobj.price}}</td>
                      <td v-else>-</td>

                      <!-- Fabric Quantity -->
                      <td v-if="codeobj.objID">{{codeobj.quantity}}</td>
                      <td v-else>-</td>

                      <!-- Delivery Date, to be added -->
                      <td v-if="codeobj.objID">{{codeobj.arrived_date}}</td>
                      <td v-else>-</td>
                    </template>

                    <!-- CheckBox -->

                  </tr>

                  <template v-if="item.lpo != 11">
                    <tr bgcolor="#DFE3EE">
                      <!-- CheckBox -->

                      <template v-if="showCreateAndButton">
                        <td v-if="item.apo">
                          <a style="cursor:pointer" v-on:click="createAPO(order._id, item.so_row)">Alt</a>
                        </td>
                        <td v-else-if="item.lpo">
                          <a style="cursor:pointer" v-on:click="createAPO(order._id, item.so_row)">Alt</a>
                        </td>
                        <td v-else>
                          <input type="checkbox" v-bind:value="{SO: order._id, item:item.productType, so_row:item.so_row}" v-model="LPO_Order">
                        </td>
                      </template>
                      <template v-else-if="!showCreateAndButton">
                        <td>-</td>
                      </template>

                      <!-- Purchase Order Number -->
                      <td v-if="item.lpo">
                        <!-- <a v-bind:href='"/lpo/"+ item.lpo.objID'>{{item.lpo.objID}}</a> -->
                        <router-link :to='"/lpo/"+ item.lpo.objID'>{{item.lpo.objID}}</router-link>
                        #{{item.lpo.lpo_row}}</td>
                      <td v-else>-</td>

                      <!-- Sales Order Number -->
                      <td>
                        <!-- <a v-bind:href='"/sales/"+ order._id'>{{order._id}}</a> -->
                        <router-link :to='"/sales/"+ order._id'>{{order._id}}</router-link>
                      </td>


                      <td>
                        <!-- <a v-bind:href='"/customer/"+ order.customerId'>{{order.customerId}}</a> -->
                        <router-link :to='"/customer/"+ order.customerId'>{{order.customerId}}</router-link>
                      </td>

                      <!-- SO Row -->
                      <td>{{index+1}}</td>

                      <!-- Purchase Order Type -->
                      <td>LPO</td>

                      <!-- Product Type -->
                      <td>{{item.productType}}</td>

                      <!-- LPO create date -->
                      <td v-if="item.lpo">{{item.lpo.createdDate | formatDate}}</td>
                      <td v-else>-</td>

                      <!-- Item Not Available -->
                      <td>NA</td>

                      <!-- Labor Order Description -->
                      <td v-if="item.lpo">-</td>
                      <td v-else>-</td>

                      <!-- Staff ID for sales order / Need to be changed to PO staff-->
                      <td>{{order.staffId}}</td>

                      <!-- LPO Vendor -->
                      <td v-if="item.lpo">{{item.lpo.vendor}}</td>
                      <td v-else>-</td>

                      <!-- Labor Unit (Yard/Piece)  -->
                      <td v-if="item.lpo">Piece</td>
                      <td v-else>-</td>

                      <!-- Labor Order Price -->
                      <td v-if="item.lpo">&#36; {{item.lpo.price}}</td>
                      <td v-else>-</td>

                      <!-- Labor Quantity -->
                      <td v-if="item.lpo">{{item.lpo.quantity}}</td>
                      <td v-else>-</td>

                      <td v-if="item.lpo">{{item.lpo.arrived_date}}</td>
                      <td v-else>-</td>
                    </tr>
                  </template>

                  <!-- APO TR -->

                  <template v-for="(apo, index) in item.apo">
                    <tr bgcolor="#CCC" v-if="item.apo">
                      <!-- CheckBox -->
                      <td v-if="item.apo"></td>

                      <!-- Purchase Order Number -->
                      <td v-if="item.apo">
                        <!-- <a v-bind:href='"/apo/"+ item.apo.objID'>{{apo.objID}}</a> -->
                        <router-link :to='"/apo/"+ item.apo.objID'>{{apo.objID}}</router-link>
                      </td>
                      <td v-else>-</td>

                      <!-- Sales Order Number -->
                      <td>
                        <!-- <a v-bind:href='"/sales/"+ order._id'>{{order._id}}</a> -->
                        <router-link :to='"/sales/"+ order._id'>{{order._id}}</router-link>
                      </td>

                      <td>
                        <!-- <a v-bind:href='"/customer/"+ order.customerId'>{{order.customerId}}</a> -->
                        <router-link :to='"/customer/"+ order.customerId'>{{order.customerId}}</router-link>
                      </td>

                      <!-- SO Row -->
                      <td>-</td>

                      <!-- Purchase Order Type -->
                      <td>APO</td>

                      <!-- Product Type -->
                      <td>{{item.productType}}</td>

                      <!-- LPO create date -->
                      <td v-if="apo">{{apo.createdDate | formatDate}}</td>
                      <td v-else>-</td>

                      <!-- Item Not Available -->
                      <td>NA</td>

                      <!-- Labor Order Description -->
                      <td v-if="item.apo">-</td>
                      <td v-else>-</td>

                      <!-- Staff ID for sales order / Need to be changed to PO staff-->
                      <td>{{order.staffId}}</td>

                      <!-- LPO Vendor -->
                      <td v-if="item.apo">{{item.lpo.vendor}}</td>
                      <td v-else>-</td>

                      <!-- Labor Unit (Yard/Piece)  -->
                      <td v-if="item.apo">Piece</td>
                      <td v-else>-</td>

                      <!-- Labor Order Price -->
                      <!-- <td v-if="item.apo">-</td> -->
                      <td>{{apo.alteration_price}}</td>

                      <!-- Labor Quantity -->
                      <td v-if="item.apo">-</td>
                      <td v-else>-</td>

                      <td v-if="item.apo">{{apo.arrived_date}}</td>
                      <td v-else>-</td>
                    </tr>
                  </template>
                </template>



              </template>
            </template>
          </tbody>
        </table>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
  import Router from '../../router/index.js';
  import Datepicker from 'vuejs-datepicker';

  export default {
    name: 'vendor',
    components: {
      Datepicker
    },
    data() {
      return {
        fromDateVue: '',
        toDateVue: '',
        validDateRange: false,
        fromDate: '',
        toDate: '',
        showCreateAndButton: true,
        salesOrdersIncomplete: '',
        salesOrderWithoutLPO: '',
        salesOrderWithoutAPO: '',
        salesOrders: '',
        salesMainOrders: '',
        salesData: '',
        FPO_Order: [],
        LPO_Order: [],
        enableCreateFPO: false,
        enableCreateLPO: false,
        authData: ''
      }
    },
    methods: {
      filterData: function () {

        // console.log('lala land')

        this.validDateRange = false;

        var validDateRangeValidated = false;


        if (new Date(this.fromDateVue) >= new Date(this.toDateVue)) {
          this.validDateRange = true
        } else {
          validDateRangeValidated = true
        }

        if (validDateRangeValidated) {

        } else {
          return
        }

        // $('#poDashboardLoader').addClass('is-active');

        var table = $('#example').DataTable();
        table.destroy();

        let tempArray = []

        this.salesOrders = []

        for (let j = 0; j < this.salesMainOrders.length; j++) {
          this.salesOrders.push(this.salesMainOrders[j])
        }

        // FilterData

        var pDate = new Date(this.fromDateVue);
        var nDate = new Date(this.toDateVue);

        for (let k = 0; k < this.salesOrders.length; k++) {
          for (let l = 0; l < this.salesOrders[k].itemsDetail.length; l++) {
            // FPO
            for (let m = 0; m < this.salesOrders[k].itemsDetail[l].fpo.length; m++) {
              debugger;
              var a = this.salesOrders[k].itemsDetail[l];
              if (this.salesOrders[k].itemsDetail[l].fpo[m].date) {
                // search logic
                var yDate = new Date(this.salesOrders[k].itemsDetail[l].fpo[m].date)
                yDate.setHours(0, 0, 0, 0);

                if (yDate < pDate || yDate > nDate) {
                  delete this.salesOrders[k].itemsDetail[l].fpo[m]
                }

              } else {
                delete this.salesOrders[k].itemsDetail[l].fpo[m]
              }
            }

            // LPO
            try {
              if (this.salesOrders[k].itemsDetail[l].lpo.createdDate) {
                // console.log("hmmm");
                // console.log(this.salesOrders[k].itemsDetail[l].lpo.createdDate);
                // search logic
                var yDate = new Date(this.salesOrders[k].itemsDetail[l].lpo.createdDate)
                yDate.setHours(0, 0, 0, 0);

                if (yDate < pDate || yDate > nDate) {
                  this.salesOrders[k].itemsDetail[l].lpo = 11
                }

              } else {
                this.salesOrders[k].itemsDetail[l].lpo = 11
              }
            } catch (e) {
              this.salesOrders[k].itemsDetail[l].lpo = 11
            }

          }
        }

        this.dtablefun()

        // $('#example').DataTable({
        //   "order": [
        //     [2, "desc"]
        //   ],
        //   dom: 'Bfrtip',
        //   // buttons: [{
        //   //                extend: 'excelHtml5',
        //   //                title: 'PO_Dashboard'
        //   //          }
        //   //          ],
        //   // columnDefs: [
        //   //   // { "searchable": false, "targets": 1 },
        //   // ]
        // });
        // setTimeout(function () {
        //   $('#example').DataTable( {
        //       "order": [[ 2, "desc" ]],
        //        dom: 'Bfrtip',
        //        // buttons: [{
        //        //                extend: 'excelHtml5',
        //        //                title: 'PO_Dashboard'
        //        //          }
        //        //          ],
        //       // columnDefs: [
        //       //   // { "searchable": false, "targets": 1 },
        //       // ]
        //    });
        //    // $('#poDashboardLoader').removeClass('is-active');
        // }, 10000)

      },
      getCookie: function () {
        function getCookie(cname) {
          var name = cname + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for (var i = 0; i < ca.length; i++) {
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

        for (let i = 0; i < userData.role.length; i++) {
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
        this.getAllSalesData();
      },
      createFPO: function () {
        // Calculate Expiration Date for cookie (default => 1 day)
        var date = new Date();
        date.setDate(date.getDate() + 1);
        // Push Data to Cookie
        // document.cookie = 'fpo_order="dab";expires='+date.toGMTString()+';path=/';
        document.cookie = 'fpo_order_data=' + JSON.stringify(this.FPO_Order) + ';expires=' + date.toGMTString() +
          ';path=/';
        Router.push('/fpo/new')
        // window.location = '/fpo/new'
      },
      createLPO: function () {
        // Calculate Expiration Date for cookie (default => 1 day)
        var date = new Date();
        date.setDate(date.getDate() + 1);
        // Push Data to Cookie
        // console.log("saving data to cookies");
        // document.cookie = 'fpo_order="dab";expires='+date.toGMTString()+';path=/';
        document.cookie = 'lpo_order_data=' + JSON.stringify(this.LPO_Order) + ';expires=' + date.toGMTString() +
          ';path=/';
        Router.push('/lpo/new')
        // window.location = '/lpo/new'
      },
      createAPO: function (SO, SO_row) {
        // Calculate Expiration Date for cookie (default => 1 day)
        var date = new Date();
        date.setDate(date.getDate() + 1);
        // Push Data to Cookie
        // console.log("saving APO data to cookies");
        var data = {
          SO: SO,
          SO_row: SO_row
        }
        // document.cookie = 'fpo_order="dab";expires='+date.toGMTString()+';path=/';
        document.cookie = 'apo_order_data=' + JSON.stringify(data) + ';expires=' + date.toGMTString() + ';path=/';
        Router.push('/apo/new')
        // window.location = '/apo/new'
      },

      fadePanel: function () {
        $("#fadeout").hide();
        $("#poDashFull").css('margin-left', 0);
      },
      getAllSalesData: function () {

        var salesURL = this.apiURL + 'api/podashboarddata' + '/?token=' + this.authData.passwordHash + '&' +
          'staffId=' + this.authData._id
        this.$http.get(salesURL).then(response => {

          this.salesOrders = response.body;
          this.salesMainOrders = response.body;
          $('#poDashboardLoader').removeClass('is-active');
          // $('#datetimepicker1').datetimepicker();
          this.dtablefun()
        }, response => {
          // console.log('response');
          // console.log(response);
        });
      },
      // Pending
      dtablefun: function () {
        var dataRow = this.tableRowCount;
        setTimeout(function () {
          // debugger;
          var rowCount = $('#example tr').length;
          if (rowCount != dataRow) {
            $('#example').DataTable({
              "order": [
                [2, "desc"]
              ],
              dom: 'Bfrtip',
              buttons: [{
                extend: 'excelHtml5',
                title: 'PO_Dashboard'
              }],
              columnDefs: [{
                "searchable": false,
                "targets": 1
              }, ]
            });
          } else {
            // console.log("here");
            // this.dtablefun()
          }
          $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
      },


    },
    created: function () {
      // $('#poDashboardLoader').addClass('is-active');
      this.getCookie();
      // $(function () {
      //
      // });
    },
    mounted: function () {
      this.fadePanel();

      // this.dtablefun();
    },
    watch: {
      salesOrdersIncomplete: function () {
        // this.updateSalesDataFPO();
      },
      FPO_Order: function functionName() {
        if (this.FPO_Order.length > 0) {
          this.enableCreateFPO = true;
        } else {
          this.enableCreateFPO = false;
        }
      },
      LPO_Order: function functionName() {
        if (this.LPO_Order.length > 0) {
          this.enableCreateLPO = true;
        } else {
          this.enableCreateLPO = false;
        }
      }
    }
  }

</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
  #content-div {
    margin-top: 10px;
    margin-bottom: 10px
  }

  html {
    overflow: scroll;
  }

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
    /* make scrollbar transparent */
  }

</style>
