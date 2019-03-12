<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Alteration Purchase Order</div>
      </md-card-header>
      <md-card-actions>
        <md-button v-on:click="saveAPO" class="md-raised md-primary">Save</md-button>
      </md-card-actions>
      <br>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-header>
            </md-card-header>
            <md-card-content>
          <div class="col-md-6">
                <div class="panel panel-default">
                  <div class="panel-heading text-center">Sales Order</div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="col-md-6">
                          Order Date:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.orderDate|formatDate}}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="col-md-6">
                          Order ID:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData._id}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-6">
                          Staff ID:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.staffId}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-6">
                          Status:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.status}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-6">
                          Amount:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.amount}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-6">
                          Balance:
                        </div>
                        <div class="col-md-6">
                          {{salesOrderData.balance}}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="panel panel-default">
                  <div class="panel-heading text-center">Customer</div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="col-md-4">
                          name:
                        </div>
                        <div class="col-md-8">
                          {{customerData.name}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-4">
                          Phone:
                        </div>
                        <div class="col-md-8">
                          {{customerData.phone}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-4">
                          DOB:
                        </div>
                        <div class="col-md-8">
                          {{customerData.dob|formatDate}}
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="col-md-4">
                          Refer:
                        </div>
                        <div class="col-md-8">
                          {{customerData.referby}}
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="col-md-2">
                          Delivery:
                        </div>
                        <div class="col-md-10">
                          {{customerData.deliveryOffice}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <br>
                <br>
                <h4>Measurements (Item: <code>{{selectedItem}}</code>)</h4>
              </div>
              <div class="row text-left">


                 <div class="col-md-12 padclasscustomer" style="border-bottom: 1px solid lightgrey;
padding-bottom: 18px;
margin-bottom: 18px;">
 <div class="col-md-12">
                   <div class="col-md-6">
                      <md-input-container>
                        <label>Alteration Price</label>
                        <md-textarea v-model="APO_order.alteration_price"></md-textarea>
                      </md-input-container>
                      <p class="text-danger" v-if="alteration_priceValidation">* Price field is required</p>
                    </div>
                    <div class="col-md-6">
                      <md-input-container>
                        <label>Remark</label>
                        <md-textarea v-model="APO_order.remark"></md-textarea>
                      </md-input-container>
                    </div>
                  </div>

                    <!-- delivery address-->
                      <div class="col-md-3">
                      <md-input-container>
                        <label>Delivery Address</label>
                        <md-textarea v-model="APO_order.deliveryAddress"></md-textarea>
                      </md-input-container>
                       <p class="text-danger" v-if="delAddValidation">*Delivery address field Required</p>
                    </div>
                    <div class="col-md-3">
                        <md-input-container>
                        <label>Delivery Phone</label>
                         <md-textarea v-model="APO_order.deliveryPhone"></md-textarea>
                       </md-input-container>
                        <p class="text-danger" v-if="delPhnValidation">*Phone no. field Required</p>
                    </div>
                    <div class="col-md-3 date-cl-new">

                        <label> </label>

                      <v2-datepicker v-model='APO_order.deliveryDate' lang="en" format="MM/DD/YYYY" placeholder="Delivery Date"></v2-datepicker>
                       <p class="text-danger" v-if="delDateValidation">*Date  field Required</p>
                    </div>
                    <!-- end del addres -->
                </div>


                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Jacket front Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.jacketFrontLength - APO_order.measurements.labor.jacketFrontLength}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.jacketFrontLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.jacketFrontLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.jacketFrontLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="col-md-6 padclasscustomer" >
                  <div class="col-md-6">
                    Jacket Back Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.jacketBackLength}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.jacketBackLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.jacketBackLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.jacketBackLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer" >
                  <div class="col-md-6">
                    Vest Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.vestLength}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.vestLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.vestLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.vestLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer" >
                  <div class="col-md-6">
                    Shoulder
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.shoulder}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.shoulder">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.shoulder++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.shoulder--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Jacket SL Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.jktSlLength}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.jktSlLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.jktSlLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.jktSlLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Whole Chest
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.wholeChest}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.wholeChest">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.wholeChest++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.wholeChest--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Front Chest
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.frontChest}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.frontChest">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.frontChest++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.frontChest--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Back Chest
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.backChest}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.backChest">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.backChest++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.backChest--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Chest vertical
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.chestVertical}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.chestVertical">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.chestVertical++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.chestVertical--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Chest Horizontal
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.chestHorizontal}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.chestHorizontal">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.chestHorizontal++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.chestHorizontal--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Front Chest Pt
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.frtChestPart}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.frtChestPart">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.frtChestPart++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.frtChestPart--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Back Chest pt
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.backChestPart}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.backChestPart">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.backChestPart++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.backChestPart--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Waist
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.waist}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.waist">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.waist++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.waist--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Shirt Collor
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.shirttCollor}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.shirttCollor">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.shirttCollor++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.shirttCollor--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Arm
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.arm}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.arm">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.arm++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.arm--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    ForeArm
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.forearm}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.forearm">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.forearm++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.forearm--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Wrist
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.wrist}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.wrist">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.wrist++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.wrist--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Shirt Sl Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.shirtSlLength}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.shirtSlLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.shirtSlLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.shirtSlLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Sk Size
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.SkSize}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.SkSize">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.SkSize++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.SkSize--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Sk Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.SkLength}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.SkLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.SkLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.SkLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    height
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.height">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.height++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.height--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Dress Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.dressLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.dressLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.dressLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Female Blouse Collar
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.femaleBlouseCollor">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.femaleBlouseCollor++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.femaleBlouseCollor--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Pant Waist
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.pantWaist">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.pantWaist++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.pantWaist--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Hip
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.hip">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.hip++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.hip--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Crotch
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.crotch">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.crotch++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.crotch--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    PT Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.ptLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.ptLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.ptLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Thigh
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.thigh">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.thigh++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.thigh--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Shin
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.shin">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.shin++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.shin--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Hem
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-3">
                        <!-- {{APO_order.measurements.labor.height}} -->
                      </div>
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="APO_order.measurements.labor.hem">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="APO_order.measurements.labor.hem++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="APO_order.measurements.labor.hem--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
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
      customerData: '',
      salesOrderData: '',
      selectedItem: '',
      APO_order: {
        measurements: {
          labor: {

          }
        },
        alteration_price:'',
        deliveryPhone:'',
        deliveryDate:'',
        deliveryAddress:''
      },
      authData: '',
      delAddValidation:'',
      delPhnValidation:'',
      delDateValidation:'',
      alteration_priceValidation:''
    }
  },
  watch: {
    APO_order: {
      handler: function (val) {
        // For Jacket Front Length
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.jacketFrontLength.toString().trim())) {
          val.measurements.labor.jacketFrontLength = 0;
        } else {}

        // For Jacket Back Length
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.jacketBackLength.toString().trim())) {
          val.measurements.labor.jacketBackLength = 0;
        } else {}

        // For Vest Length
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.vestLength.toString().trim())) {
          val.measurements.labor.vestLength = 0;
        } else {}

        // For Shoulder
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.shoulder.toString().trim())) {
          val.measurements.labor.shoulder = 0;
        } else {}

        // For Jacket SL length
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.jktSlLength.toString().trim())) {
          val.measurements.labor.jktSlLength = 0;
        } else {

        }

        // For whole Chest
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.wholeChest.toString().trim())) {
          val.measurements.labor.wholeChest = 0;
        } else {

        }

        // Front Chest
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.frontChest.toString().trim())) {
          val.measurements.labor.frontChest = 0;
        } else {

        }

        // Back Chest
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.backChest.toString().trim())) {
          val.measurements.labor.backChest = 0;
        } else {

        }

        // Chest vertical
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.chestVertical.toString().trim())) {
          val.measurements.labor.chestVertical = 0;
        } else {

        }

        // Chest Horizontal
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.chestHorizontal.toString().trim())) {
          val.measurements.labor.chestHorizontal = 0;
        } else {

        }

        // Front Chest Part
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.frtChestPart.toString().trim())) {
          val.measurements.labor.frtChestPart = 0;
        } else {

        }

        // Back Chest part
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.backChestPart.toString().trim())) {
          val.measurements.labor.backChestPart = 0;
        } else {

        }

        // Waist
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.waist.toString().trim())) {
          val.measurements.labor.waist = 0;
        } else {

        }

        // shirt collor
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.shirttCollor.toString().trim())) {
          val.measurements.labor.shirttCollor = 0;
        } else {

        }

        // arm
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.arm.toString().trim())) {
          val.measurements.labor.arm = 0;
        } else {

        }

        // forearm
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.forearm.toString().trim())) {
          val.measurements.labor.forearm = 0;
        } else {

        }

        // wrist
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.wrist.toString().trim())) {
          val.measurements.labor.wrist = 0;
        } else {

        }

        //Shirt SL length
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.shirtSlLength.toString().trim())) {
          val.measurements.labor.shirtSlLength = 0;
        } else {

        }

        // SK size
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.SkSize.toString().trim())) {
          val.measurements.labor.SkSize = 0;
        } else {

        }

        //SK length
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.SkLength.toString().trim())) {
          val.measurements.labor.SkLength = 0;
        } else {

        }

        // height
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.height.toString().trim())) {
          val.measurements.labor.height = 0;
        } else {

        }

        // Dress Length
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.dressLength.toString().trim())) {
          val.measurements.labor.dressLength = 0;
        } else {

        }

        // Female Blouse Collar
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.femaleBlouseCollor.toString().trim())) {
          val.measurements.labor.femaleBlouseCollor = 0;
        } else {

        }

        // Pant Waist
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.pantWaist.toString().trim())) {
          val.measurements.labor.pantWaist = 0;
        } else {

        }

        // Hip
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.hip.toString().trim())) {
          val.measurements.labor.hip = 0;
        } else {

        }


        // Crotch
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.crotch.toString().trim())) {
          val.measurements.labor.crotch = 0;
        } else {

        }

        // PT Length
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.ptLength.toString().trim())) {
          val.measurements.labor.ptLength = 0;
        } else {

        }

        // Thigh
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.thigh.toString().trim())) {
          val.measurements.labor.thigh = 0;
        } else {

        }

        // Hem
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.hem.toString().trim())) {
          val.measurements.labor.hem = 0;
        } else {

        }

        // Shin
        if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val.measurements.labor.shin.toString().trim())) {
          val.measurements.labor.shin = 0;
        } else {

        }
      },
      deep: true
    }
  },
  methods: {
    showPanel: function () {
      $("#fadeout").show();
      $("#poDashFull").css('margin-left','20%');
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
      this.getDataFromLocalStorage();
    },
    getDataFromLocalStorage: async function () {
      // Parse Data from Cookie
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
      let APO_order = JSON.parse(getCookie('apo_order_data'));
      APO_order.staff = this.authData._id;
      APO_order.alteration_price='';
      APO_order.deliveryPhone='';
      APO_order.deliveryAddress='';
      APO_order.deliveryDate='';
      APO_order.measurements = {
        labor: {
          jacketFrontLength: 0,
          jacketBackLength: 0,
          vestLength: 0,
          shoulder: 0,
          jktSlLength: 0,
          wholeChest: 0,
          frontChest: 0,
          backChest: 0,
          chestVertical: 0,
          chestHorizontal: 0,
          frtChestPart: 0,
          backChestPart: 0,
          waist: 0,
          remark1: 0,
          shirttCollor: 0,
          arm: 0,
          forearm: 0,
          wrist: 0,
          shirtSlLength: 0,
          remark2: 0,
          SkSize: 0,
          SkLength: 0,
          height: 0,
      		dressLength: 0,
      		femaleBlouseCollor: 0,
      		pantWaist: 0,
      		hip: 0,
      		crotch: 0,
      		ptLength: 0,
      		thigh: 0,
      		shin: 0,
      		hem: 0
        }
      }
      var customerID;

      var customerIDURL = this.apiURL + 'salesOrder/' + (APO_order.SO).trim() + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(customerIDURL).then(response => {
        customerID = response.body.customerId;
        this.salesOrderData = response.body;
        // console.log('this is sales order');
        console.log(response);
      }, response => {
        console.log(response)
      })

      var customerDataURL = this.apiURL + 'customer/' + customerID + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      await this.$http.get(customerDataURL).then(response => {
        this.customerData = response.body;
      }, response => {
        console.log(response)
      })

      for(let i=0;i<this.salesOrderData.itemsDetail.length;i++) {
        if (this.salesOrderData.itemsDetail[i].so_row == APO_order.SO_row) {
            this.selectedItem = this.salesOrderData.itemsDetail[i].productType
        }
      }
      this.APO_order = APO_order;
    },

    // Save Alteration Order
    saveAPO: function () {
      var data = this.APO_order;

        var allValidated = true


        this.delAddValidation = false;
        this.delPhnValidation = false;
        this.delDateValidation=false;
        this.alteration_priceValidation=false;


        console.log(this.APO_order);

        //alteratio price is required
        if(this.APO_order.alteration_price.trim() == '') {
            this.alteration_priceValidation = true
            allValidated = false
        } else {
            this.alteration_priceValidation = false
        }

        //Delivery Address validatiion
        if(this.APO_order.deliveryAddress.trim() == '') {
            this.delAddValidation = true
            allValidated = false
        } else {
            this.delAddValidation = false
        }

        //Delivery Phone validatiion
        if(this.APO_order.deliveryPhone.trim() == '') {
            this.delPhnValidation = true
            allValidated = false
        } else {
            this.delPhnValidation = false
        }

        //Delivery date validatiion
        if(this.APO_order.deliveryDate == '') {
            this.delDateValidation = true
            allValidated = false
        } else {
            this.delDateValidation = false
        }

        if (allValidated) {

        } else {
            return
        }



      data.orderType = 'alteration';
      var alterOrderURL = this.apiURL + 'api/alteration-order' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.post(alterOrderURL, data).then(response => {
        this.updateSalesOrder(response.body);
      }, response => {
        console.log(response)
      })
    },

    // Update Sales Order
    updateSalesOrder: function (data) {
      var updateSalesURL = this.apiURL + 'salesOrder/updateAPO' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.put(updateSalesURL, data).then(response => {
        // location.replace("/apo/" + data.code);
        var redirectURL = "/apo/" + data.code
        Router.push(redirectURL)
      }, response => {
        console.log(response)
      })
    },
  },

  created: function () {
    this.getCookie();
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
