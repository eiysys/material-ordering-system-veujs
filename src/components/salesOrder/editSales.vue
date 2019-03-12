<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Modify Sales Order</div>
      </md-card-header>
      <md-card-content>
        <md-layout>
          <md-stepper @completed="completeSalesOrder">
          <!-- First Step :  Customer Information -->
          <md-step md-label="Customer" :md-continue="stepOneContinue">
            <div class="text-center">
              <span style="color:red; font-size:15px" v-if="error"> No Record Found</span>
            </div>
            <br>
            <br>
            <div class="row" style="font-size:15px">
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Name</label>
                  <md-textarea v-model="customerData.name" disabled></md-textarea>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Occupation</label>
                  <md-textarea v-model="customerData.occupation" disabled></md-textarea>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Office Address</label>
                  <md-textarea v-model="customerData.officeAddress" disabled></md-textarea>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Phone No</label>
                  <md-textarea v-model="customerData.phone" disabled></md-textarea>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Date of Birth</label>
                  <md-textarea v-model="customerData.dob" type="date" disabled></md-textarea>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Delivery Address</label>
                  <md-textarea v-model="customerData.deliveryOffice" disabled></md-textarea>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>E-mail</label>
                  <md-textarea v-model="customerData.email" disabled></md-textarea>
                </md-input-container>
              </div>
              <div class="col-md-4 botmargin">
                <md-input-container>
                  <label>Refer By</label>
                  <md-textarea v-model="customerData.referby" disabled></md-textarea>
                </md-input-container>
              </div>
            </div>
            <hr>
          </md-step>
          <!-- Step 2 Items -->
          <md-step md-label="Create Order"  md-button-continue="PAY NOW">
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
            <!-- <br> -->
            <md-card>

              <md-card-content>
                <h4 class="text-center">Item Details</h4>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th></th>
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
                    <tr v-for="(details,index) in existingSalesData.itemsDetail">
                      <td><a v-on:click.prevent="removeItem(details.so_row)" href="">Remove</a></td>
                      <td v-if="!salesOrderNumber"> <a style="cursor:pointer" v-on:click="removeItemBeforeSalesCreated(index)">Remove</a></td>
                      <td>{{index+ 1}}</td>
                      <td>{{details.productType}} (<template v-for="code in details.codes"></template>{{details.codes}})</td>
                      <td>{{details.description}}</td>
                      <td>{{details.quality}}</td>
                      <td>&#36; <span style="float:right">{{details.price}}</span> </td>
                      <td>&#36; <span style="float:right">{{details.pPrice}}</span> </td>
                      <td>{{details.quantity}}</td>
                      <td>&#36; <span style="float:right">{{details.pPrice * details.quantity}}</span></td>
                    </tr>
                    <tr>
                      <td colspan="8" class="text-right"><strong>Total price</strong></td>
                      <td>&#36; <span style="float:right">{{totalPromotionalPrice}}</span> </td>
                    </tr>
                  </tbody>
                </table>
                <!-- <button type="button" name="button" class="btn btn-info text-center" v-on:click="saveSalesOrder" v-if="SalesOrderButtonDisable" disabled>Save Order</button>
                <button type="button" name="button" class="btn btn-info text-center" v-on:click="saveSalesOrder" v-if="!SalesOrderButtonDisable">Save Order</button>
                <router-link v-bind:to='"/sales/edit/" + salesOrderNumber' tag="button" v-if="SalesOrderButtonDisable" class="btn btn-info text-center">Modify Order</router-link> -->
              </md-card-content>
            </md-card>
            <br><br>


            <!-- <div class="text-center">
                <h4>Add / Modify Row</h4>
            </div>
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
              </div>
              <div class="col-md-3">
                <md-input-container>
                  <label>Price</label>
                  <md-input type="text" v-model="addModifyDiv.price"></md-input>
                </md-input-container>
              </div>
              <div class="col-md-3">
                <md-input-container>
                  <label>Promotional Price</label>
                  <md-input type="text" v-model="addModifyDiv.pPrice"></md-input>
                </md-input-container>
              </div>
            </div>
            <hr>
            <div class="row" v-for="(row, index) in rows">
              <div class="col-md-6">
                <div class="col-md-6">
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
                <div class="col-md-6">
                  <md-input-container>
                    <label>Color</label>
                    <md-input type="text" v-model="row.color"></md-input>
                  </md-input-container>
                </div>
              </div>
              <div class="col-md-6">
                <div class="col-md-6">
                  <md-input-container>
                    <label>Desciprtion</label>
                    <md-input type="text" v-model="row.description"></md-input>
                  </md-input-container>
                </div>
              </div>
            </div>
            <br>
            <button class="btn btn-default" @click="addRow">Add Fabric</button>
            <button class="btn btn-default" @click="removeRow">Remove Fabric</button>
            <button class="btn btn-default" @click="saveRow">Save Item</button>
            <br>
            <br> -->
            <!-- <hr>
            <h4 class="text-center">Fabric Details</h4>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>Details</th>
                  <th>Description</th>
                  <th>Quality</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>P.Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in existingSalesData.itemsDetail">
                  <td><a v-on:click.prevent="removeItem(item.so_row)" href="">Remove</a></td>
                  <td>{{item.so_row}}</td>
                  <td>{{item.productType}} (<template v-for="code in item.codes">{{code}} </template>)</td>
                  <td>{{item.description}}</td>
                  <td>{{item.quality}}</td>
                  <td>{{item.quantity}}</td>
                  <td>{{item.price}}</td>
                  <td>{{item.pPrice}}</td>
                </tr>
              </tbody>
            </table>
            <hr> -->
          </md-step>
          <!-- Step 3 Payment -->
          <md-step md-label="Confirmation">
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

              <md-card-content>
                <h4 class="text-center">Item Details</h4>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th></th>
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
                    <tr v-for="(details,index) in existingSalesData.itemsDetail">
                      <td><a v-on:click.prevent="removeItem(details.so_row)" href="">Remove</a></td>
                      <td v-if="!salesOrderNumber"> <a style="cursor:pointer" v-on:click="removeItemBeforeSalesCreated(index)">Remove</a></td>
                      <td>{{index+ 1}}</td>
                      <td>{{details.productType}} (<template v-for="code in details.codes"></template>{{details.codes}})</td>
                      <td>{{details.description}}</td>
                      <td>{{details.quality}}</td>
                      <td>&#36; <span style="float:right">{{details.price}}</span> </td>
                      <td>&#36; <span style="float:right">{{details.pPrice}}</span> </td>
                      <td>{{details.quantity}}</td>
                      <td>&#36; <span style="float:right">{{details.pPrice * details.quantity}}</span> </td>
                    </tr>
                    <tr>
                      <td colspan="8" class="text-right"><strong>Total price</strong></td>
                      <td>&#36; <span style="float:right">{{totalPromotionalPrice}}</span> </td>
                    </tr>
                  </tbody>
                </table>
                <!-- <button type="button" name="button" class="btn btn-info text-center" v-on:click="saveSalesOrder" v-if="SalesOrderButtonDisable" disabled>Save Order</button>
                <button type="button" name="button" class="btn btn-info text-center" v-on:click="saveSalesOrder" v-if="!SalesOrderButtonDisable">Save Order</button>
                <router-link v-bind:to='"/sales/edit/" + salesOrderNumber' tag="button" v-if="SalesOrderButtonDisable" class="btn btn-info text-center">Modify Order</router-link> -->
              </md-card-content>
            </md-card>
            <br>
            <md-card>
              <md-card-content>
            <div class="text-center">
                <h4>Payment History</h4>

            </div>
            <br>
            <div>
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
                      <td>{{payment.paymentMethod}}</td>
                    </template>
                    <template v-if="payment.void == 1">
                      <td class="bg-warning text-danger">{{payment.paymentMethod}}</td>
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
                  <label>Transaction No.</label>
                  <md-textarea v-model="paymentData.transactionNo" required></md-textarea>
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
                    <md-button class="md-raised md-default"  @click="generatePdfandmail">Send E-mail</md-button>
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
          </md-card-content>
          </md-card>
          <br><br>
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
  name: 'sales-edit',
  data () {
    return {
      totalPromotionalPrice: 0,
      balanceAmount: 0,
      // Validations
      productTyepBlankValidation: false,
      productTyepValidation: false,
      qualityBlankValidation: false,
      ppriceValidation: false,
      fabricSaveButton: false,
      priceBlankValidation: false,
      quantityValidation: false,
      ppriceBlankValidation: false,
      priceValidation: false,
      quantityBlankValidation: false,
      qualityValidation: false,
      fabColVal: false,
      paymentAmountValidation: false,
      transactionIDBlankValidation: false,
      paymentAmountBlankValidation: false,


      staffDepartment: '',
      staffDepartmentID: '',
      Departments: [{"name":"hello"}],
      departmentValidation: false,
      departmentBlankValidation: false,
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
      existingSalesData: '',
      params: this.$route.params.salesID,
      stepOneContinue: false,
      stepTwoContinue: false,
      rows: [{code:"", color:"",description:""}],
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
      showDescription: true,
      showfabricDiv: false,
      codes: [{name: "aqua", color: "#00ffff  <td>No Record Found</td>"},
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
      amount: 0
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
                  if (newValue[i].color.toString().trim() == '' || newValue[i].code.toString().trim() == '') {
                    this.fabricSaveButton = false
                  }
                }
            },
            deep: true
        }
    },
  methods: {
    removeFabricRow: function (ind) {
      if (this.rows.length == 1) {
        this.rows = [{code:"", color:"",description:""}]
      } else {
        this.rows.splice(ind,1)
      }
    },
    generatePdfandmail: async function () {
      var pdfURL = this.apiURL + 'salesOrder/mail/invoice/'+ this.salesOrderNumber + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      var filepath = ''

      await this.$http.get(pdfURL).then(response => {
        if (response.body.success == "mail sent Successfully" ) {
          alert("Invoice sent successfully")
        }
      }, response => {
        console.log(response);
      })

      // var fileURL = this.apiURL +  filepath;
      // window.open(fileURL, '_blank');
    },
    generatePdf: async function functionName() {
      var pdfURL = this.apiURL + 'salesOrder/invoice/'+ this.salesOrderNumber + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      var filepath = ''
console.log('fff');
      await this.$http.get(pdfURL).then(response => {
        filepath = response.body.filename.replace('./public/', '');
      }, response => {
        console.log('ds');
        console.log(response);
      })
      var fileURL = this.apiURL +  filepath;
      window.open(fileURL, '_blank');

    },
    // Get Cookies Data for API
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
      this.searchCustomer()
      this.getData()
      this.getDepartments()
    },
    deptCallback: function(item) {
      // //console.log(item);
      this.staffDepartmentID = item._id
      // //console.log("selected item " + JSON.stringify(item));
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
    getDepartments: async function () {

      // Get Staff Details
      var getStaffURL = this.apiURL + 'staff/' + this.authData._id + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(getStaffURL).then(response => {
        //console.log(response);
        this.staffDeptIDs = response.body.department;
      }, response => {
        //console.log(response);
      })

      var deptList = [];

      // getDepartments
      for (let i=0; i<this.staffDeptIDs.length; i++) {
        var getDeptURL = this.apiURL + 'api/department/' + this.staffDeptIDs[i] + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        await this.$http.get(getDeptURL).then(response => {

          deptList.push(response.body)
        }, response => {
          // //console.log(response);
        })
      }
      this.Departments = deptList;

    },
    // Add fabric Row
    addRow: function () {
      this.rows.push({code:"", color:"",description:""});
    },

    // Remove fabric Row
    removeRow: function (row) {
      this.rows.splice(-1,1);
    },

    // Get Customer from API
    searchCustomer: async function () {

      // Get Customer ID from sales order
      var custID;
      var salesURL = this.apiURL + 'salesOrder/'+ this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(salesURL).then(response => {
        custID = response.body.customerId;
        // console.log(response);
        this.staffDepartmentID = response.body.departmentId;
        this.salesOrderNumber = response.body._id;
        this.existingSalesData = response.body;
        this.getPaymentHistory()

        for (let i=0;i<response.body.itemsDetail.length;i++) {
          this.totalPromotionalPrice += parseFloat(response.body.itemsDetail[i].pPrice) * parseFloat(response.body.itemsDetail[i].quantity);
        }

      }, response => {
        console.log(response);
      })

      // console.log(this.staffDepartmentID);
      var getDeptURL = this.apiURL + 'api/department/' + this.staffDepartmentID + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(getDeptURL).then(response => {
        // console.log(response);
        this.staffDepartment = response.body.name
      }, response => {
        console.log(response)
      })


      // Get Customer Data
      var customerURL = this.apiURL + 'customer/' + custID + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(customerURL).then(response => {
        if(response.body){
          this.error = false;
          // Format Date by moment
          var data = response.body;
          data.dob = moment(String(data.dob)).format('DD-MM-YYYY')
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
        console.log(response)
      })
    },

    // Remove Item from DB
    removeItem: function (arg) {

      // Check if FPO is already existed or not
      // :if FPO created for Item selected: :return error:
      // :else: Remove Item from DB and update component
      for (let i=0; i<this.existingSalesData.itemsDetail.length;i++) {
          if (this.existingSalesData.itemsDetail[i].so_row == arg) {
              var isCreated = false;
              for (let j=0; j<this.existingSalesData.itemsDetail[i].fpo.length; j++ ) {
                if (this.existingSalesData.itemsDetail[i].fpo[j].objID != "") {
                  alert("You cannot Delete this Item, FPO is already created")
                  isCreated = true;
                }
              }
              if (isCreated == false) {
                // Remove Item from Sales Order Object
                this.existingSalesData.itemsDetail.splice(i, 1)
                // Update Sales order in DB
                var updateSalesURL = this.apiURL + 'salesOrder/' + this.existingSalesData._id + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
                this.$http.put(updateSalesURL, this.existingSalesData).then(response => {
                  console.log(response);
                }, response => {
                  console.log(response)
                })
              }
          }
      }
    },

    // Get Codes
    getData: function () {
      var dataURL = this.apiURL + 'api/fabric/codes' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(dataURL).then(response => {
        this.codes = response.body;
      }, response => {
        console.log(response);
      })
    },

    // When select a code
    getCodeDetails: function (code) {
      var codeDetailURL = this.apiURL + 'api/fabric/' + code + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(codeDetailURL).then(response => {
        this.fab1 = response.body;
      }, response => {console.log("Button Changed");
      console.log(event);
        console.log(response);
      })
    },

    codeFilter: function(list, query) {
      var arr = [];
      query = query.toUpperCase();
      for(var i = 0; i < list.length; i++) {
        if(list[i]._id.indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 5)
          break;
      }
      return arr;
    },
    codeCallback: function(item) {
      // this.rows[this.rows.length-1].color = item.color;
      // this.rows[this.rows.length-1].description = item.description;
      // // this.getCodeDetails(item._id);

      this.rows_old = []
      for (let i=0;i<this.rows.length;i++) {
        this.rows_old.push(this.rows[i])
      }

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

      // this.getCodeDetails(item._id);


    },
    saveNewFabric: function () {
      for (var i = 0; i < this.rows.length; i++) {
          var value = this.rows[i];
          value._id = value.code;
          delete value['code'];

          var saveFabricURL = this.apiURL + 'api/fabric' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
          this.$http.post(saveFabricURL, value).then(response => {
            console.log(response);
          }, response => {
            console.log(response);
          })
      }
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
    pTypeCallback: function(item) {
      console.log("selected item " + item);
    },
    qualityCallback: function(item) {
      console.log("selected item " + item);
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


      // Department Validation
      if (this.staffDepartment.toString().trim() == '') {
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
      if (this.addModifyDiv.productType.toString().trim() == '') {
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
      if (this.addModifyDiv.quality.toString().trim() == '') {
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
          if (qualityExists) {
            qualityValidated = true
            this.qualityValidation = false
          } else {
            this.qualityValidation = true
          }
        }

      // Quantity (Work to do tommorow)
      if (this.addModifyDiv.quantity.toString().trim() == '') {
          this.quantityBlankValidation = true
        } else if (!/^-?\d*(\.\d+)?$/.test(this.addModifyDiv.quantity.toString().trim())) {
          this.quantityValidation = true
        } else {
          quantityValidated = true
        }

      // price validation
      if (this.addModifyDiv.price.toString().trim() == '') {
          this.priceBlankValidation = true
        } else if (!/^-?\d*(\.\d+)?$/.test(this.addModifyDiv.price.toString().trim())) {
          this.priceValidation = true
        } else {
          priceValidated = true
        }

      // promotional price
      if (this.addModifyDiv.pPrice.toString().trim() == '') {
          this.ppriceBlankValidation = true
        } else if (!/^-?\d*(\.\d+)?$/.test(this.addModifyDiv.pPrice.toString().trim())) {
          this.ppriceValidation = true
        } else {
          ppriceValidated = true
        }

      if (!departmentValidated || !productTyepValidated || !qualityValidated || !quantityValidated || !priceValidated || !ppriceValidated) {
        return
      }

      // Details for Table Row
      var codes = [];
      $.each(this.rows, function(key, value) {
         if (codes === '' ) {
           codes.push(value.code);
         } else {
           codes.push(value.code);
         }
      });


      // codes = ['AX001', 'BX001']
      this.addModifyBox.codes = codes;
      var code_objs = []
      let c = codes;
      for(let k=0; k<codes.length; k++){
        let temp = {code: c[k], objID: ''}
        code_objs.push(temp)
      }

      this.addModifyBox.fpo = code_objs;
      // this.addModifyBox.codes = codes;
      this.addModifyBox.codes = codes;
      this.addModifyBox.productType = this.addModifyDiv.productType;
      this.addModifyBox.quality = this.addModifyDiv.quality;
      this.addModifyBox.quantity = this.addModifyDiv.quantity;
      this.addModifyBox.description = this.addModifyDiv.description;
      this.addModifyBox.price = this.addModifyDiv.price;
      this.addModifyBox.pPrice = this.addModifyDiv.pPrice;

      this.detailsTable.push(this.addModifyBox);
      //  Calculate amount
      this.amount =  parseInt(this.amount) + parseInt(this.addModifyBox.pPrice);
      //
      this.stepTwoContinue = true;

      this.addModifyBox.status = "pending"

      // calculate SO row
      debugger;
      var latest_so_row = this.existingSalesData.itemsDetail[this.existingSalesData.itemsDetail.length - 1].so_row
      this.addModifyBox.so_row = latest_so_row + 1;

      this.existingSalesData.itemsDetail.push(this.addModifyBox);

      // Update Sales Order
      var updateSalesURL = this.apiURL + 'salesOrder/' + this.existingSalesData._id + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.put(updateSalesURL, this.existingSalesData).then(response => {
        console.log(response);
      }, response => {
        console.log(response)
      })

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
    completeSalesOrder: function functionName() {
      // window.location.href = '/sales/' + this.salesOrderNumber;
      var redirectURL = '/sales/' + this.salesOrderNumber
      Router.push(redirectURL)
    },
    changeMethod: function (method) {
      this.paymentData.paymentMethod = method;
    },
    addToPaymentHistory: function () {

      var itemDetailTotal = 0;
      var paymentHistoryTotal = 0;

      // Get total amount
      for (let j=0;j<this.existingSalesData.itemsDetail.length;j++){
        itemDetailTotal += parseFloat(this.existingSalesData.itemsDetail[j].pPrice)
      }

      // get payment history total
      for (let i=0;i<this.paymentHistory.length;i++) {
        if (this.paymentHistory[i].void == 0) {
            paymentHistoryTotal += parseFloat(this.paymentHistory[i].amount)
        }
      }

      var BalanceAmount = 0;

      BalanceAmount = itemDetailTotal - paymentHistoryTotal;

      console.log(BalanceAmount);

      // validations
      var paymentAmountValidated = false;
      var transactionIDBlankValidated = false;

      this.paymentAmountBlankValidation = false;
      this.paymentAmountValidation = false;
      this.transactionIDBlankValidation = false;

      // Amount Validation
      if (this.paymentData.amount.toString().trim() == '') {
        this.paymentAmountBlankValidation = true;
      } else if (!/^-?\d*(\.\d+)?$/.test(this.paymentData.amount.toString().trim())) {
        this.paymentAmountValidation = true;
      } else {
        if (parseFloat(this.paymentData.amount.toString().trim()) <= 0) {
          this.paymentAmountValidation = true;
        } else {
            paymentAmountValidated = true
        }
      }

      // transaction ID validation
      // console.log(this.paymentData);
      if (this.paymentData.paymentMethod != 'cash') {
        if (this.paymentData.transactionNo.toString().trim() == '') {
          this.transactionIDBlankValidation = true
        } else {
            transactionIDBlankValidated = true
        }
      } else {
        transactionIDBlankValidated = true
      }


      if (paymentAmountValidated && transactionIDBlankValidated) {
        if (parseFloat(this.paymentData.amount.toString().trim()) > BalanceAmount) {
          alert("Amount exceed")
          return
        }
      } else {
        return
      }


      var parameter = this.salesOrderNumber;
      var data = this.paymentData;

      var addPaymentURL = this.apiURL + 'salesOrder/updatePayment/' + parameter + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.put(addPaymentURL, data).then(response => {
        this.paymentData = {
          paymentMethod: 'cash',
          transactionNo: '',
          amount: '',
          remarks: '',
        };
        this.getPaymentHistory();
      }, response => {
        console.log("Error in update Payment");
        console.log(response);
      })
    },
    getPaymentHistory: function () {
      var parameter = this.salesOrderNumber;
      var getPaymentURL = this.apiURL + 'salesOrder/' + parameter + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(getPaymentURL).then(response => {
        this.paymentHistory = response.body.payment;
      }, response => {
        console.log(response);
      })
    },
    saveSalesOrder: function (step) {







      var dataOfFabric = this.detailsTable
      for (var i = 0; i < dataOfFabric.length; i++) {
          dataOfFabric[i].status = "pending";
          dataOfFabric[i].codes = dataOfFabric[i].codes.split(",");
      }
      if (step == 2) {
        var data = {
          staffId: "staff0001",
          customerId: this.customerData._id,
          fabricDetails: this.detailsTable,
          amount: this.amount
        };

        var saveSalesURL = this.apiURL + 'salesOrder' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.post(saveSalesURL , data).then(response => {
          this.salesOrderNumber = response.body._id;
        }, response => {
          console.log(response);
        })
      }
    },
    makePaymentVoid: async function (arg) {
      var salesOrderNumber = this.salesOrderNumber;
      var voidURL = this.apiURL + 'salesOrder/void/' + arg + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.put(voidURL, {'salesOrderNumber': salesOrderNumber}).then(response => {
        // Refresh Data of Payment (void=1)
        this.paymentHistory = response.body.payment;
        // Refresh Ends
      }, response => {
        console.log(response);
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
</style>
