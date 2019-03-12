<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Sales Order</div>
      </md-card-header>
      <md-card-content>
        <md-layout>
          <md-stepper @completed="completeSalesOrder">
          <md-step md-label="Customer" :md-continue="stepOneContinue">
            <div class="text-center">
              <!-- <h4>Customer Details<span style="color:red; font-size:15px" v-if="error"> - No Record Found</span> </h4> -->
              <span class="text-danger text-center" v-if="error"> No Record Found</span>
            </div>
            <br>
            <div class="row">
              <div class="col-md-6">
                <input class="searchbox" type="number" maxlength=10 placeholder="Customer Phone" v-model="searchInput" v-on:keyup.enter="searchCustomer"> <button @click="searchCustomer">Search</button>
                <button @click="clearSearch">Clear</button>
              </div>
            </div>
            <br>
            <div class="row" style="font-size:15px">
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Name</label>
                  <md-input v-model="customerData.name" readonly disabled style="text-transform: capitalize;"></md-input>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Occupation</label>
                  <md-input v-model="customerData.occupation" readonly disabled style="text-transform: capitalize;"></md-input>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Office Address</label>
                  <md-input v-model="customerData.officeAddress" readonly disabled style="text-transform: capitalize;"></md-input>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Phone No</label>
                  <md-input v-model="customerData.phone" readonly disabled></md-input>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Date of Birth</label>
                  <md-input v-model="customerData.dob" readonly disabled></md-input>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Delivery Address</label>
                  <md-input v-model="customerData.deliveryOffice" readonly disabled style="text-transform: capitalize;"></md-input>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>E-mail</label>
                  <md-input v-model="customerData.email" readonly disabled style="text-transform: capitalize;" ></md-input>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Refer By</label>
                  <md-input v-model="customerData.referby" readonly disabled style="text-transform: capitalize;"></md-input>
                </md-input-container>
              </div>
            </div>
            <hr>
          </md-step>

          <md-step md-label="Create Order" :md-disabled="!stepOneContinue" :md-continue="stepTwoContinue" md-button-continue="PAY NOW">
            <md-card>
              <md-card-header>
                <h4 class=text-center>Customer</h4>
              </md-card-header>
              <md-card-content>
                  <div class="col-md-row">
                      <div class="col-md-4">
                        <div class="col-md-3">
                          <strong>Name:</strong>
                        </div>
                        <div class="col-md-9">
                          {{customerData.name}}
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="col-md-3">
                          <strong>Phone:</strong>
                        </div>
                        <div class="col-md-9">
                          {{customerData.phone}}
                        </div>
                      </div>
                      <div class="col-md-4" v-if="customerData.email">
                        <div class="col-md-3">
                          <strong>Email:</strong>
                        </div>
                        <div class="col-md-9">
                          {{customerData.email}}
                        </div>
                      </div>
                  </div>
              </md-card-content>
            </md-card>
            <br>
            <md-card>
              <md-card-header>
                <h4 class="text-center">Sales Order</h4>
              </md-card-header>
              <md-card-content>
                <div class="row">
                    <div class="col-md-3">
                      <md-input-container>
                       <label>Department</label>
                       <md-autocomplete  v-model="staffDepartment"
                                           :list="Departments"
                                           print-attribute="name"
                                           :filter-list="codeFilterDept"
                                           :min-chars="0"
                                           :max-height="6"
                                           @selected="deptCallback">
                       </md-autocomplete>
                      </md-input-container>
                      <p v-if="departmentValidation" class="text-danger">Please enter valid Department</p>
                      <p v-if="departmentBlankValidation" class="text-danger">*Department field required</p>

                    </div>
                </div>
              </md-card-content>
            </md-card>
            <br>
            <md-card>
              <md-card-header>
                <h4 class="text-center">Sales Items</h4>
              </md-card-header>
              <md-card-content>
                <div class="row">
                  <div class="col-md-3">
                    <md-input-container>
                     <label>Product Type</label>
                     <md-autocomplete v-model="addModifyDiv.productType"
                                         :list="productTypeList"
                                         print-attribute="pType"
                                         :filter-list="codeFilterType"
                                         :min-chars="0"
                                         :max-height="6"
                                         @selected="pTypeCallback">
                     </md-autocomplete>
                    </md-input-container>
                    <p v-if="productTyepBlankValidation" class="text-danger">*Product Type field required</p>
                    <p v-if="productTyepValidation" class="text-danger">Please enter valid Product Type</p>
                  </div>
                  <div class="col-md-3" >
                    <md-input-container>
                     <label>Quality</label>
                     <md-autocomplete v-model="addModifyDiv.quality"
                                         :list="QualityList"
                                         print-attribute="quality"
                                         :filter-list="codeFilterQuality"
                                         :min-chars="0"
                                         :max-height="6"
                                         @selected="qualityCallback">
                     </md-autocomplete>
                   </md-input-container>
                   <p v-if="qualityBlankValidation" class="text-danger">*Quality field required</p>
                   <p v-if="qualityValidation" class="text-danger">Please enter valid Quality</p>
                  </div>
                  <div class="col-md-3" v-if="addModifyDiv.productType == 'Other'">
                    <md-input-container>
                      <label>Description</label>
                      <md-input type="text" v-model="addModifyDiv.description"></md-input>
                    </md-input-container>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <md-input-container>
                      <label>Quantity</label>
                      <md-input type="text" v-model="addModifyDiv.quantity"></md-input>
                    </md-input-container>
                    <p v-if="quantityBlankValidation" class="text-danger">*Quantity field required</p>
                    <p v-if="quantityValidation" class="text-danger">Please enter valid Quantity</p>
                  </div>
                  <div class="col-md-3">
                    <md-input-container>
                      <md-icon>attach_money</md-icon>
                      <label>Price</label>
                      <md-input type="text" v-model="addModifyDiv.price"></md-input>
                    </md-input-container>
                    <p v-if="priceBlankValidation" class="text-danger">*Price field required</p>
                    <p v-if="priceValidation" class="text-danger">Please enter valid Price</p>
                  </div>
                  <div class="col-md-3">
                    <md-input-container>
                      <md-icon>attach_money</md-icon>
                      <label>Promotional Price</label>
                      <md-input type="text" v-model="addModifyDiv.pPrice"></md-input>
                    </md-input-container>
                    <p v-if="ppriceBlankValidation" class="text-danger">*Promotional price field required</p>
                    <p v-if="ppriceValidation" class="text-danger">Please enter valid Promotional price</p>
                  </div>
                </div>

                <hr>
                <br>
                <h4 class="text-center">Add Fabric</h4>
                <div class="row" v-for="(row, index) in rows">

                  <div class="col-md-3">
                    <md-input-container>
                     <label>Fabric Code</label>
                     <md-autocomplete v-model="row.code"
                                         :list="codes"
                                         print-attribute="_id"
                                         :filter-list="codeFilter"
                                         :min-chars="0"
                                         :max-height="6"
                                         @selected="codeCallback"
                                         :debounce="500">
                     </md-autocomplete>
                    </md-input-container>
                  </div>
                  <template v-if="row.disabled">
                    <div class="col-md-3">
                      <md-input-container>
                        <label>Color</label>
                        <md-input type="text" v-model="row.color" disabled></md-input>
                      </md-input-container>
                    </div>
                  </template>
                  <template v-else>
                    <div class="col-md-3">
                      <md-input-container>
                        <label>Color</label>
                        <md-input type="text" v-model="row.color"></md-input>
                      </md-input-container>
                    </div>
                  </template>

                  <template v-if="row.disabled">
                    <div class="col-md-3">
                      <md-input-container>
                        <label>Description</label>
                        <md-input type="text" v-model="row.description" disabled></md-input>
                      </md-input-container>
                    </div>
                  </template>
                  <template v-else>
                    <div class="col-md-3">
                      <md-input-container>
                        <label>Description</label>
                        <md-input type="text" v-model="row.description"></md-input>
                      </md-input-container>
                    </div>
                  </template>

                  <div class="col-md-1 text-center" style="padding-top:25px">
                    <i class="fa fa-remove" style="font-size:10px;color:#800000; cursor:pointer" v-on:click="removeFabricRow(index)"></i>
                  </div>
                </div>
                <p v-if="fabColVal && fabricSaveButton" class="text-danger">Please enter valid Color</p>
                <br>
                <button class="btn btn-info" @click="addRow" v-if="!fabricSaveButton" disabled>Add Fabric</button>
                <button class="btn btn-info" @click="addRow" v-if="fabricSaveButton">Add Fabric</button>
                <button class="btn btn-danger" @click="removeRow" v-if="rows.length > 1">Remove Fabric</button>
                <button class="btn btn-default" @click="saveRow" v-if="!fabricSaveButton" disabled>Save Item</button>
                <button class="btn btn-default" @click="saveRow" v-if="fabricSaveButton">Save Item</button>
              </md-card-content>
            </md-card>
            <br>
            <md-card v-if="detailsTable.length > 0">

              <md-card-content>
                <h4 class="text-center">Item Details</h4>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th v-if="!salesOrderNumber"></th>
                      <th>#</th>
                      <th>Details</th>
                      <th>Description</th>
                      <th>Quality</th>
                      <th>Price</th>
                      <th>P.Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(details, index) in detailsTable">
                      <td v-if="!salesOrderNumber"><a style="cursor:pointer" v-on:click="removeItemBeforeSalesCreated(index)">Remove</a></td>
                      <td>{{index+ 1}}</td>
                      <td>{{details.productType}} (<template v-for="code in details.codes"></template>{{details.codes}})</td>
                      <td>{{details.description}}</td>
                      <td>{{details.quality}}</td>
                      <td>&#36; <span style="float:right">{{details.price}}</span></td>
                      <td>&#36; <span style="float:right">{{details.pPrice}}</span></td>
                      <td>{{details.quantity}}</td>
                      <td>&#36; <span style="float:right">{{details.pPrice * details.quantity}}</span></td>
                    </tr>
                    <tr v-if="salesOrderNumber">
                      <td colspan="7" class="text-right"><strong>Total price</strong></td>
                      <td>&#36; <span style="float:right">{{totalPromotionalPrice}}</span></td>
                    </tr>
                  </tbody>
                </table>
                <!-- <h5>Total Price: <small>&#36; {{totalPromotionalPrice}}</small> </h5> -->
                <button type="button" name="button" class="btn btn-info text-center" v-on:click="saveSalesOrder" v-if="SalesOrderButtonDisable" disabled>Save Order</button>
                <button type="button" name="button" class="btn btn-info text-center" v-on:click="saveSalesOrder" v-if="!SalesOrderButtonDisable">Save Order</button>
                <router-link v-bind:to='"/sales/edit/" + salesOrderNumber' tag="button" v-if="SalesOrderButtonDisable" class="btn btn-info text-center">Modify Order</router-link>
              </md-card-content>
            </md-card>
            <br>
          </md-step>

          <md-step md-label="Confirmation" :md-disabled="!stepTwoContinue" >
            <md-card>
              <md-card-header>
                <h4 class=text-center>Customer</h4>
              </md-card-header>
              <md-card-content>
                  <div class="col-md-row">
                      <div class="col-md-4">
                        <div class="col-md-3">
                          <strong>Name:</strong>
                        </div>
                        <div class="col-md-9">
                          {{customerData.name}}
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="col-md-3">
                          <strong>Phone:</strong>
                        </div>
                        <div class="col-md-9">
                          {{customerData.phone}}
                        </div>
                      </div>
                      <div class="col-md-4" v-if="customerData.email">
                        <div class="col-md-3">
                          <strong>Email:</strong>
                        </div>
                        <div class="col-md-9">
                          {{customerData.email}}
                        </div>
                      </div>
                  </div>
              </md-card-content>
            </md-card>
            <br>
            <md-card v-if="detailsTable.length > 0">
              <md-card-content>
                <h4 class="text-center">Item Details</h4>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Details</th>
                      <th>Description</th>
                      <th>Quality</th>
                      <th>Price</th>
                      <th>P.Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(details,index) in detailsTable">
                      <td>{{index+1}}</td>
                      <td>{{details.productType}} (<template v-for="code in details.codes"></template>{{details.codes}})</td>
                      <td>{{details.description}}</td>
                      <td>{{details.quality}}</td>
                      <td>&#36; <span style="float:right">{{details.price}}</span></td>
                      <td>&#36; <span style="float:right">{{details.pPrice}}</span></td>
                      <td>{{details.quantity}}</td>
                      <td>&#36; <span style="float:right">{{details.pPrice * details.quantity}}</span></td>
                    </tr>
                    <tr>
                      <td colspan="7" class="text-right"><strong>Total price</strong></td>
                      <td>&#36; <span style="float:right">{{totalPromotionalPrice}}</span></td>
                    </tr>
                  </tbody>
                </table>
              </md-card-content>
            </md-card>
            <br>
            <md-card style="padding:10px">
              <div v-if="paymentHistory.length > 0">
                <div class="text-center">
                    <h4>Payment History</h4>
                </div>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Method</th>
                      <th>Transaction ID</th>
                      <th>Amount</th>
                      <th>Remarks</th>
                      <th>Void</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="payment in paymentHistory">
                      <template v-if="payment.void == 0">
                        <td>{{payment.paymentDate|formatDate}}</td>
                      </template>
                      <template v-if="payment.void == 1">
                        <td class="bg-warning text-danger">{{payment.paymentDate|formatDate}}</td>
                      </template>

                      <template v-if="payment.void == 0">
                        <td style="text-transform: capitalize;">{{payment.paymentMethod}}</td>
                      </template>
                      <template v-if="payment.void == 1">
                        <td class="bg-warning text-danger" style="text-transform: capitalize;">{{payment.paymentMethod}}</td>
                      </template>

                      <template v-if="payment.void == 0">
                        <td>{{payment.transactionNo}}</td>
                      </template>
                      <template v-if="payment.void == 1">
                        <td class="bg-warning text-danger">{{payment.transactionNo}}</td>
                      </template>

                      <template v-if="payment.void == 0">
                        <td>{{payment.amount}}</td>
                      </template>
                      <template v-if="payment.void == 1">
                        <td class="bg-warning text-danger">{{payment.amount}}</td>
                      </template>

                      <template v-if="payment.void == 0">
                        <td>{{payment.remarks}}</td>
                      </template>
                      <template v-if="payment.void == 1">
                        <td class="bg-warning text-danger">{{payment.remarks}}</td>
                      </template>

                      <template v-if="payment.void == 0">
                        <td class="text-center"><button @click="makePaymentVoid(payment._id)" class="btn btn-default btn-sm">Void </button></td>
                      </template>
                      <template v-if="payment.void == 1">
                        <td class="bg-warning text-danger text-center"><button @click="makePaymentVoid(payment._id)" class="btn btn-default btn-sm disabled">Void</button></td>

                      </template>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr>

              <div class="text-center">
                  <h4>Payment Details (SO Number: <a v-bind:href='"/sales/"+ salesOrderNumber'>{{salesOrderNumber}}</a>)</h4>
              </div>
              <h5>Total Price: <span>&#36; {{totalPromotionalPrice}}</span> </h5>
              <br>
              <div class="row">
                <div class="col-md-6">
                  <md-button-toggle md-single class="md-primary">
                    <md-button class="md-toggle" @click="changeMethod('cash')">Cash</md-button>
                    <md-button @click="changeMethod('cheque')" value="cheque" >Cheque</md-button>
                    <md-button @click="changeMethod('direct')">DD</md-button>
                    <md-button @click="changeMethod('paypal')">Paypal</md-button>
                  </md-button-toggle>
                </div>
              </div>
              <br>
              <div class="row">
                <div class="col-md-3" style="padding-left:20px; padding-right:20px">
                  <md-input-container>
                    <label>Transaction Id.</label>
                    <md-textarea v-model="paymentData.transactionNo"></md-textarea>
                  </md-input-container>
                  <p v-if="transactionIDBlankValidation" class="text-danger">*Transaction Id field required</p>
                </div>
                <div class="col-md-2">
                  <md-input-container>
                    <label>Amount</label>
                    <md-textarea v-model="paymentData.amount" required></md-textarea>
                  </md-input-container>
                  <p v-if="paymentAmountBlankValidation" class="text-danger">*Amount field required</p>
                  <p v-if="paymentAmountValidation" class="text-danger">Please enter valid Amount</p>
                </div>
                <div class="col-md-5">
                  <md-input-container>
                    <label>Remarks</label>
                    <md-textarea v-model="paymentData.remarks"></md-textarea>
                  </md-input-container>
                </div>
                <div class="col-md-2">
                  <md-button @click="addToPaymentHistory" class="md-primary" style="border:1px solid #ccc">Save</md-button>
                </div>
              </div>
              <br>
              <div class="row text-center">
              <div class="col-md-2">

              </div>
              <div class="col-md-4">
                <div class="panel panel-default">
                  <div class="panel-heading text-center">Invoice</div>
                  <div class="panel-body text-center">
                    <md-button class="md-raised md-default" @click="generatePdf">View PDF</md-button>
                    <md-button class="md-raised md-default" @click="generatePdfandmail">Send E-mail</md-button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="panel panel-default">
                  <div class="panel-heading text-center">Receipt</div>
                  <div class="panel-body text-center">
                      <md-button class="md-raised md-default">View PDF</md-button>
                      <md-button class="md-raised md-default">Send Email</md-button>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
              </div>
            </div>
            </md-card>
            <br>
          </md-step>
          </md-stepper>
        </md-layout>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import moment from 'moment'
import Router from '../../router/index.js';

export default {
  name: 'vendor',
  data () {
    return {

      // total promotional price
      totalPromotionalPrice: 0,
      balanceAmount: 0,
      // Disable sales order button
      SalesOrderButtonDisable: false,

      // Product Type
      productTypeList: [
        {pType:"Jacket"},
        {pType:"Pant"},
        {pType:"Vest"},
        {pType:"Shirt"},
        {pType:"Other"}
      ],

      // Quality List
      QualityList: [
        {quality:"Premium wool"},
        {quality:"Cotton"},
        {quality:"Linen"},
        {quality:"Wool"},
        {quality:"Denim"}
      ],

      // Department Data
      staffDepartment:'',
      staffDepartmentID: '',
      staffDeptIDs: '',
      Departments: [{"name":"hello"}],
      authData: '',
      stepOneContinue: false,
      stepTwoContinue: false,
      rows: [{code:"", color:"",description:""}],
      rows_old:[{code:"", color:"",description:""}],
      customerData: {
        _id: '',
        name: '',
        occupation: '',
        phone: '',
        officeAddress: '',
        deliveryOffice: '',
        dob: '',
        email: '',
        referby: ''
      },
      searchInput: '',
      error: false,
      itemTypes: '',
      description: '',
      price: '',
      pprice: '',
      showfabricDiv: false,
      codes: [{name: "aqua", color: "#00ffff"},
              {name: "aquamarine", color: "#7fffd4"}],
      detailsTable: [],
      addModifyBox: {
        serialNumber: '1',
        codes: '',
        productType: '',
        quality: '',
        quantity: '',
        description: '',
        price: '',
        pPrice: ''
      },
      addModifyDiv: {
        productType: '',
        quality: '',
        quantity: '',
        description: '',
        price: '',
        pPrice: ''
      },
      paymentHistory: [],
      paymentData : {
        paymentMethod: 'cash',
        transactionNo: '',
        amount: '',
        remarks: '',
      },
      salesOrderNumber: '',
      amount: 0,
      salesON: '',

      // validations
      departmentValidation: false,
      departmentBlankValidation: false,
      productTyepValidation: false,
      productTyepBlankValidation: false,
      qualityValidation: false,
      qualityBlankValidation: false,
      quantityValidation: false,
      quantityBlankValidation: false,
      priceValidation: false,
      priceBlankValidation: false,
      ppriceValidation: false,
      ppriceBlankValidation: false,
      fabricSaveButton: false,
      paymentAmountBlankValidation: false,
      paymentAmountValidation: false,
      transactionIDBlankValidation: false,
      fabColVal: false
    }
  },
  watch: {
        rows: {
            handler: function(newValue) {
                this.fabColVal = false
                for (let i=0;i<newValue.length;i++){
                  if (!/^[a-zA-Z]+$/.test(newValue[i].color)) {
                    this.fabColVal = true
                    newValue.error = true
                  }
                }
                this.fabricSaveButton = true
                for (let i=0;i<newValue.length;i++) {
                  if (newValue[i].color.trim() == '' || newValue[i].code.trim() == '') {
                    this.fabricSaveButton = false
                  }
                }
            },
            deep: true
        }
    },
  methods: {
    removeItemBeforeSalesCreated: function (index) {
      this.detailsTable.splice(index, 1)
    },
    generatePdfandmail: async function () {
      if (this.customerData.email) {
        var pdfURL = this.apiURL + 'salesOrder/mail/invoice/'+ this.salesOrderNumber + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        var filepath = ''

        await this.$http.get(pdfURL).then(response => {
          if (response.body.success == "mail sent Successfully" ) {
            alert("Invoice sent successfully")
          }
        }, response => {
          //console.log(response);
        })
      } else {
        alert("Customer email is not registered with us.")
      }

    },
    generatePdf: async function functionName() {
      var pdfURL = this.apiURL + 'salesOrder/invoice/'+ this.salesOrderNumber + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      var filepath = ''

      await this.$http.get(pdfURL).then(response => {
        filepath = response.body.filename.replace('./public/', '');
      }, response => {
        //console.log(response);
      })

      var fileURL = this.apiURL +  filepath;
      window.open(fileURL, '_blank');
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
      this.getDepartments()
      this.getData()

    },
    getDepartments: async function () {

      // Get Staff Details
      var getStaffURL = this.apiURL + 'staff/' + this.authData._id + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(getStaffURL).then(response => {
        //console.log(response);
        this.staffDeptIDs = response.body.department;
      }, response => {
        console.log(response);
      })

      var deptList = [];

      // getDepartments
      for (let i=0; i<this.staffDeptIDs.length; i++) {
        var getDeptURL = this.apiURL + 'api/department/' + this.staffDeptIDs[i] + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        await this.$http.get(getDeptURL).then(response => {
          deptList.push(response.body)
        }, response => {
             console.log('sdsd');
          console.log(response);
        })
      }
      this.Departments = deptList;

    },
    addRow: function () {
      this.rows.push({code:"", color:"",description:""});
    },
    removeRow: function (row) {
      // this.rows.$remove(row);
      this.rows.splice(-1,1);
    },
    removeFabricRow: function (ind) {
      if (this.rows.length == 1) {
        this.rows = [{code:"", color:"",description:""}]
      } else {
        this.rows.splice(ind,1)
      }
    },
    searchCustomer: function () {
      var data = this.searchInput;

      if(data.trim() == '') {
        this.error = true;
      } else {
        var searchCustomerURL = this.apiURL + 'customer/search/'  + data + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.get(searchCustomerURL).then(response => {
          if(response.body){
            this.error = false;
            var data = response.body;
            if (data.dob) {
                console.log(data.dob);
                var dateOfBirth = new Date(data.dob);
                data.dob = (dateOfBirth.getMonth()+1) + '-' + dateOfBirth.getDate() + '-' + dateOfBirth.getFullYear()
                console.log(data.dob)
                // data.dob = moment(String(data.dob)).format('MM-DD-YYYY')

            } else {
              data.dob = ''
            }
            this.customerData = data;
            this.stepOneContinue = true;
          } else {
            this.customerData = {
              _id: '',
              name: '',
              occupation: '',
              phone: '',
              officeAddress: '',
              deliveryOffice: '',
              dob: '',
              email: '',
              referby: ''
            }
            this.error = true;
          }
        }, response => {
          //console.log(response)
        })
      }
    },
    clearSearch: function () {
      this.customerData ={
        _id: '',
        name: '',
        occupation: '',
        phone: '',
        officeAddress: '',
        deliveryOffice: '',
        dob: '',
        email: '',
        referby: ''
      },
      this.searchInput = 'aa';
      this.error = false;
      this.stepOneContinue = false;
    },
    getData: function () {
      var fabricCodeURL = this.apiURL + 'api/fabric/codes' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(fabricCodeURL).then(response => {
        this.codes = response.body;
      }, response => {
        //console.log(response);
      })
    },
    getCodeDetails: function (code) {
      var fabricURL = this.apiURL + 'api/fabric/' + code + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(fabricURL).then(response => {
        this.fab1 = response.body;
      }, response => {//console.log("Button Changed");
      //console.log(event);
        //console.log(response);
      })
    },
    codeFilter: function(list, query) {
      // debugger;
      var arr = [];
      query = query.toUpperCase();
      for(var i = 0; i < list.length; i++) {
        if(list[i]._id.toUpperCase().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 5)
          break;
      }
      return arr;
    },

    codeFilterDept: function(list, query) {
      var arr = [];
      query = query.toUpperCase();
      for(var i = 0; i < list.length; i++) {
        if(list[i].name.toUpperCase().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 5)
          break;
      }
      return arr;
    },
    codeFilterType: function(list, query) {
      var arr = [];
      query = query.toUpperCase();
      for(var i = 0; i < list.length; i++) {
        if(list[i].pType.toUpperCase().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 5)
          break;
      }
      return arr;
    },
    codeFilterQuality: function(list, query) {
      var arr = [];
      query = query.toUpperCase();
      for(var i = 0; i < list.length; i++) {
        if(list[i].quality.toUpperCase().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 5)
          break;
      }
      return arr;
    },

    codeCallback: function(item) {
      // check if code already exists

      this.rows_old = []
      for (let i=0;i<this.rows.length;i++) {
        this.rows_old.push(this.rows[i])
      }

      console.log(this.rows)
      for (let i=0;i<this.rows.length;i++) {
        if (this.rows[i].color != "") {
          if(item._id == this.rows[i].code) {
            // console.log("found");
            alert('Fabric already exist')
            return
          }
        }
      }


      // console.log(index);
      this.rows[this.rows.length-1].color = item.color;
      this.rows[this.rows.length-1].description = item.description;
      this.rows[this.rows.length-1].disabled = true

      this.getCodeDetails(item._id);
    },
    deptCallback: function(item) {
      // //console.log(item);
      this.staffDepartmentID = item._id
      // //console.log("selected item " + JSON.stringify(item));
    },
    pTypeCallback: function(item) {
      //console.log("selected item " + item);
    },
    qualityCallback: function(item) {
      //console.log("selected item " + item);
    },
    saveNewFabric: function () {
      for (var i = 0; i < this.rows.length; i++) {
          var value = this.rows[i];
          value._id = value.code;
          delete value['code'];
          var savefabricURL = this.apiURL + 'api/fabric' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
          this.$http.post(savefabricURL, value).then(response => {
            //console.log(response);
          }, response => {
            //console.log(response);
          })
      }
    },
    saveRow: function () {

      // Validations
      var departmentValidated = false;
      var productTyepValidated = false;
      var qualityValidated = false;
      var quantityValidated = false;
      var priceValidated = false;
      var ppriceValidated = false;

      this.departmentValidation = false;
      this.departmentBlankValidation = false
      this.productTyepValidation = false;
      this.productTyepBlankValidation = false;
      this.qualityValidation = false;
      this.qualityBlankValidation = false;
      this.quantityValidation = false;
      this.quantityBlankValidation = false;
      this.priceValidation = false;
      this.priceBlankValidation = false;
      this.ppriceValidation = false;
      this.ppriceBlankValidation = false;




      console.log(this.Departments);

      // Department Validation
      if (this.staffDepartment.trim() == '') {
          this.departmentBlankValidation = true
        } else {
          var deptExists = false;
          for (let i=0; i<this.Departments.length;i++) {
            if (this.staffDepartment == this.Departments[i].name) {
              deptExists = true
            }
          }
          if (deptExists) {
              departmentValidated = true
          } else {
            this.departmentValidation = true
          }
        }

      // Producttype
      if (this.addModifyDiv.productType.trim() == '') {
          this.productTyepBlankValidation = true
        } else {
          var producttypeExists = false;
          for (let i=0;i<this.productTypeList.length;i++) {
            if (this.addModifyDiv.productType == this.productTypeList[i].pType) {
              producttypeExists = true
            }
          }
          if (producttypeExists) {
              productTyepValidated = true
          } else {
            this.productTyepValidation = true
          }
        }

      //  Quality
      if (this.addModifyDiv.quality.trim() == '') {
          this.qualityBlankValidation = true
        } else {
          var qualityExists = false;
          for (let i=0; i<this.QualityList.length;i++) {
            if (this.addModifyDiv.quality == this.QualityList[i].quality) {
              qualityExists = true
            } else {
              this.qualityValidation = true
            }
          }
          console.log(qualityExists);
          if (qualityExists) {
            qualityValidated = true
            this.qualityValidation = false
          } else {
            this.qualityValidation = true
          }
        }

      // Quantity (Work to do tommorow)
      if (this.addModifyDiv.quantity.trim() == '') {
          this.quantityBlankValidation = true
        } else if (!/^-?\d*(\.\d+)?$/.test(this.addModifyDiv.quantity.trim())) {
          this.quantityValidation = true
        } else {
          quantityValidated = true
        }

      // price validation
      if (this.addModifyDiv.price.trim() == '') {
          this.priceBlankValidation = true
        } else if (!/^-?\d*(\.\d+)?$/.test(this.addModifyDiv.price.trim())) {
          this.priceValidation = true
        } else {
          priceValidated = true
        }

      // promotional price
      if (this.addModifyDiv.pPrice.trim() == '') {
          this.ppriceBlankValidation = true
        } else if (!/^-?\d*(\.\d+)?$/.test(this.addModifyDiv.pPrice.trim())) {
          this.ppriceValidation = true
        } else {
          ppriceValidated = true
        }

      if (!departmentValidated || !productTyepValidated || !qualityValidated || !quantityValidated || !priceValidated || !ppriceValidated) {
        return
      }

      var codes = '';
      $.each(this.rows, function(key, value) {
         if (codes === '' ) {
           codes = value.code;
         } else {
           codes  = codes + ", " + value.code;
         }
      });

      // codes = ['AX001', 'BX001']
      this.addModifyBox.codes = codes;

      var code_objs = []
      let c = codes.split(",");
      for(let k=0; k<c.length; k++){
        let temp = {code: c[k], objID: ''}
        code_objs.push(temp)
      }
      this.addModifyBox.fpo = code_objs
      this.addModifyBox.productType = this.addModifyDiv.productType;
      this.addModifyBox.quality = this.addModifyDiv.quality;
      this.addModifyBox.quantity = this.addModifyDiv.quantity;
      this.addModifyBox.description = this.addModifyDiv.description;
      this.addModifyBox.price = this.addModifyDiv.price;
      this.addModifyBox.pPrice = this.addModifyDiv.pPrice;

      this.detailsTable.push(this.addModifyBox);

      //  Calculate amount
      this.amount =  parseInt(this.amount) + parseInt(this.addModifyBox.pPrice);

      // this.stepTwoContinue = true;
      this.addModifyBox = {
        serialNumber: '1',
        codes: '',
        productType: '',
        quality: '',
        quantity: '',
        description: '',
        price: '',
        pPrice: ''
      };
      this.addModifyDiv= {
        productType: '',
        quality: '',
        quantity: '',
        description: '',
        price: '',
        pPrice: ''
      };
      this.saveNewFabric();
      this.rows = [{code:"", color:"",description:""}]
      this.showfabricDiv = true;
    },
    changeMethod: function (method) {
      this.paymentData.paymentMethod = method;
    },

    // Save Payment to sales order after sales order is saved
    addToPaymentHistory: function () {

      var itemDetailTotal = 0;
      var paymentHistoryTotal = 0;

      // Get total amount
      for (let j=0;j<this.detailsTable.length;j++){
        itemDetailTotal += parseFloat(this.detailsTable[j].pPrice)
      }

      // get payment history total
      for (let i=0;i<this.paymentHistory.length;i++) {
        if (this.paymentHistory[i].void == 0) {
            paymentHistoryTotal += parseFloat(this.paymentHistory[i].amount)
        }
      }

      var BalanceAmount = 0;

      BalanceAmount = itemDetailTotal - paymentHistoryTotal;
      this.balanceAmount = BalanceAmount;


      // validations
      var paymentAmountValidated = false;
      var transactionIDBlankValidated = false;

      this.paymentAmountBlankValidation = false;
      this.paymentAmountValidation = false;
      this.transactionIDBlankValidation = false;

      // Amount Validation
      if (this.paymentData.amount.trim() == '') {
        this.paymentAmountBlankValidation = true;
      } else if (!/^-?\d*(\.\d+)?$/.test(this.paymentData.amount.trim())) {
        this.paymentAmountValidation = true;
      } else {
        if (parseFloat(this.paymentData.amount.trim()) <= 0) {
          this.paymentAmountValidation = true;
        } else {
            paymentAmountValidated = true
        }
      }

      // transaction ID validation
      // console.log(this.paymentData);
      if (this.paymentData.paymentMethod != 'cash') {
        if (this.paymentData.transactionNo.trim() == '') {
          this.transactionIDBlankValidation = true
        } else {
            transactionIDBlankValidated = true
        }
      } else {
        transactionIDBlankValidated = true
      }


      if (paymentAmountValidated && transactionIDBlankValidated) {
        if (parseFloat(this.paymentData.amount.trim()) > BalanceAmount) {
          alert("Amount exceed")
          return
        }
      } else {
        return
      }

      var parameter = this.salesOrderNumber;
      var data = this.paymentData;

      var paymentURL = this.apiURL + 'salesOrder/updatePayment/'+ parameter + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.put(paymentURL, data).then(response => {
        this.paymentData = {
          paymentMethod: 'cash',
          transactionNo: '',
          amount: '',
          remarks: '',
        };
        this.getPaymentHistory();
      }, response => {
        //console.log("Error in update Payment");
        //console.log(response);
      })
    },

    // Get Payment history of the sales order
    getPaymentHistory: function () {
      var parameter = this.salesOrderNumber;
      var paymentHistoryURL = this.apiURL + 'salesOrder/'+ parameter + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(paymentHistoryURL).then(response => {
        console.log(response);
        this.paymentHistory = response.body.payment;


      }, response => {
        //console.log(response);
      })
    },

    // Save Sales Order Without Payment
    saveSalesOrder: function (step) {

      var dataOfFabric = this.detailsTable
      for (var i = 0; i < dataOfFabric.length; i++) {
          dataOfFabric[i].status = "pending";
          // dataOfFabric[i].codes = dataOfFabric[i].codes.split(",");
      }
      // console.log("step is");
      // console.log(step)
      var data = {
        staffId: this.authData._id,
        departmentId : this.staffDepartmentID,
        customerId: this.customerData._id,
        fabricDetails: this.detailsTable,
        amount: this.amount
      };
      // console.log("now showing the final data");
      // console.log(data);
      // console.log('sales data');
      // console.log(data);
      // localStorage.setItem('haha', JSON.stringify(data))
      var saveSalesURL = this.apiURL + 'salesOrder' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.post(saveSalesURL, data).then(response => {

        this.salesOrderNumber = response.body._id;
        this.stepTwoContinue = true
        // Disable sales order
        this.SalesOrderButtonDisable = true

        // console.log('my data');
        // console.log(response);
        // Calculate total amount
        for(let i=0;i<response.body.itemsDetail.length;i++){
          // console.log(response.body.itemsDetail[i].pPrice);
          this.totalPromotionalPrice += parseFloat(response.body.itemsDetail[i].pPrice)
        }


      }, response => {
        //console.log(response);
      })
      // if (step == 2) {
      //
      // }
    },
    // Complete Sales Order
    completeSalesOrder: function () {
      // window.location = '/sales/'+ this.salesOrderNumber ;
      var redirectURL = '/sales/'+ this.salesOrderNumber
      Router.push(redirectURL)
    },
    // Click and Make a payment VOID (One Payment at a time)
    makePaymentVoid: function (arg) {
      var salesOrderNumber = this.salesOrderNumber;

      var paymentVoidURL = this.apiURL + 'salesOrder/void/' + arg + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.put(paymentVoidURL, {'salesOrderNumber': salesOrderNumber}).then(response => {
        // Refresh Data of Payment (void=1)

        var refreshURL = this.apiURL + 'salesOrder/' + salesOrderNumber + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.get(refreshURL).then(response => {
          this.paymentHistory = response.body.payment;
        }, response => {
          //console.log(response);
        })
        // Refresh Ends
      }, response => {
        //console.log(response);
      })
    }
  },
  mounted() {
    this.getCookie();
  }
}

</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
  #content-div{
    margin-top: 10px;
    margin-bottom: 10px
  }
  .searchbox{
    border: 1px solid grey;
    border-radius: 2px;
    width: 130px;
    padding-left: 5px
  }
  .pricebox{
    border: 1px solid grey;
    border-radius: 2px;
    width: 130px;
    padding-left: 5px;
    width: 60px
  }
  .form-control:focus {
    border-color: black
  }
  html {
  overflow:   scroll;
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}

/* Arrow Keys hide in mozilla*/
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

</style>
