<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Labor Purchase Order</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="updateLPO">Save</md-button>
      </md-card-actions>
      <br>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <div class="row">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-6">
                      <!-- AutoComplete Test -->
                      <md-input-container md-theme="default">
                        <label>Choose a Vendor</label>
                        <md-autocomplete v-model="laborOrderData.vendor"
                                          :list="vendors"
                                          print-attribute="name"
                                          :filter-list="vendorFilter"
                                          :min-chars="0"
                                          :max-height="6"
                                          :debounce="500">{{laborOrderData}}
                        </md-autocomplete>
                      </md-input-container>
                      <!-- AutoComplete Ends -->
                      <p class="text-danger" v-if="vendorBlankValidation">*Vendor field Required</p>
                      <p class="text-danger" v-if="vendorValidation">Please enter valid Vendor</p>
                    </div>
                    <div class="col-md-6">
                      <md-input-container>
                        <label>Date</label>
                        <md-textarea v-model="laborOrderData.createdDate" readonly></md-textarea>
                      </md-input-container>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <md-input-container>
                        <label>Remark</label>
                        <md-textarea v-model="laborOrderData.remark"></md-textarea>
                      </md-input-container>
                    </div>.
                  </div>
                   <div class="row">
                     <div class="col-md-12">
                       <md-input-container>
                         <label>Delivery Adresss</label>
                         <md-textarea v-model="laborOrderData.deliveryAddress"></md-textarea>
                       </md-input-container>
                        <p class="text-danger" v-if="delAddVlidation">*Delivery Address field Required</p>
                     </div>

                  </div>
                   <div class="row">
                     <div class="col-md-6">
                       <md-input-container>
                         <label>Delivery Phone</label>
                         <md-textarea v-model="laborOrderData.deliveryPhone"></md-textarea>
                       </md-input-container>
                        <p class="text-danger" v-if="delPhoneVlidation">*Delivery Phone </p>
                     </div>
                    <div class="col-md-6">
                        <label>Delivery Date</label>
                        <v2-datepicker v-model='laborOrderData.deliveryDate' lang="en" format="MM/DD/YYYY"  placeholder="Delivery Date"></v2-datepicker>
                     <p class="text-danger" v-if="deldatelidation">*Delivery Date field Required</p>

                    </div>
                  </div>

                </div>
                <div class="col-md-6">
                  <div class="col-md-6 text-center">
                    <div class="panel panel-default">
                      <div class="panel-heading"><strong>Total Price</strong></div>
                      <div class="panel-body">$ {{totalPrice}}</div>
                    </div>
                  </div>
                  <div class="col-md-6 text-center">
                    <div class="panel panel-default">
                      <div class="panel-heading"><strong>Total Quantity</strong></div>
                      <div class="panel-body">{{totalQuantity}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card >
          <div class="text-center">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <template v-for="lpo in laborListForOrder">
                  <br>
                  <md-card>
                    <div class="text-left">
                      <md-card-content>
                        <div class="row text-center" style="background-color:lightgrey">
                          <div class="col-md-3">
                              <h5><strong>Item No:</strong> <span>#{{lpo.lpo_row}}</span></h5>
                          </div>
                          <div class="col-md-3">
                              <h5><strong>SO No:</strong> <span>{{lpo.SO}}</span></h5>
                          </div>
                          <div class="col-md-3">
                            <h5><strong>Item:</strong> <span>{{lpo.item}}</span> | <strong>SO row:</strong> <span>{{lpo.so_row}}</span></h5>
                          </div>
                          <div class="col-md-3">
                            <h5><strong>Quantity:</strong> <span>{{lpo.quantity}}</span> | <strong>Price: </strong>$ <span>{{lpo.price}}</span></h5>
                          </div>
                        </div>
                        <br>
                        <div class="row">
                          <div class="col-md-3">
                            <md-input-container>
                              <md-icon>attach_money</md-icon>
                              <label>Labor Price</label>
                              <md-input v-model="lpo.laborPrice"></md-input>
                            </md-input-container>
                            <p class="text-danger" v-if="laborPriceValidation">*labor Price field Required</p>
                          </div>
                        </div>
                      </md-card-content>
                    </div>
                    <md-card-header>
                      <md-card-header-text>
                        <h4>Measurement</h4>
                      </md-card-header-text>
                    </md-card-header>
                    <md-card-content>
                      <div class="row text-left">

                        <div class="col-md-6 padclasscustomer">
                          <div class="col-md-6">
                            Jacket front Length
                          </div>
                          <div class="col-md-6">
                            <div class="row">
                              <div class="col-md-3">
                                {{lpo.measurements.customer.jacketFrontLength}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.jacketFrontLength">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.jacketFrontLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.jacketFrontLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.jacketBackLength}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.jacketBackLength">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.jacketBackLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.jacketBackLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.vestLength}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.vestLength">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.vestLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.vestLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.shoulder}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.shoulder">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.shoulder++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.shoulder--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.jktSlLength}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.jktSlLength">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.jktSlLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.jktSlLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.wholeChest}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.wholeChest">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.wholeChest++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.wholeChest--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.frontChest}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.frontChest">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.frontChest++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.frontChest--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.backChest}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.backChest">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.backChest++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.backChest--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.chestVertical}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.chestVertical">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.chestVertical++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.chestVertical--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.chestHorizontal}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.chestHorizontal">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.chestHorizontal++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.chestHorizontal--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.frtChestPart}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.frtChestPart">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.frtChestPart++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.frtChestPart--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.backChestPart}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.backChestPart">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.backChestPart++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.backChestPart--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.waist}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.waist">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.waist++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.waist--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.shirttCollor}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.shirttCollor">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.shirttCollor++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.shirttCollor--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.arm}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.arm">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.arm++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.arm--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.forearm}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.forearm">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.forearm++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.forearm--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.wrist}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.wrist">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.wrist++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.wrist--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.shirtSlLength}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.shirtSlLength">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.shirtSlLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.shirtSlLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.SkSize}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.SkSize">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.SkSize++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.SkSize--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.SkLength}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.SkLength">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.SkLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.SkLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>




                        <!-- New fields -->

                        <div class="col-md-6 padclasscustomer">
                          <div class="col-md-6">
                            Height
                          </div>
                          <div class="col-md-6">
                            <div class="row">
                              <div class="col-md-3">
                                {{lpo.measurements.customer.height}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.height">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.height++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.height--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.dressLength}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.dressLength">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.dressLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.dressLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.femaleBlouseCollor}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.femaleBlouseCollor">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.dressLfemaleBlouseCollorength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.femaleBlouseCollor--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.pantWaist}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.pantWaist">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.pantWaist++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.pantWaist--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.hip}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.hip">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.hip++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.hip--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.crotch}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.crotch">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.crotch++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.crotch--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.ptLength}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.ptLength">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.ptLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.ptLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.thigh}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.thigh">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.thigh++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.thigh--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.shin}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.shin">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.shin++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.shin--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                                {{lpo.measurements.customer.hem}}
                              </div>
                              <div class="col-md-9">
                                <div class="col-md-6">
                                    <input class="text-center" type="text" style="padding:0; width:100%" v-model="lpo.measurements.labor.hem">
                                </div>
                                <div class="col-md-6" style="padding:0" md-theme="green">
                                  <a v-on:click="lpo.measurements.labor.hem++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                                  <a v-on:click="lpo.measurements.labor.hem--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>




                      </div>
                    </md-card-content>
                  </md-card>
                  <br>
                </template>
              </div>
            </div>
          </div>

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
      totalPrice: 0,
      totalQuantity: 0,

      //  Validation
      vendorBlankValidation: false,
      vendorValidation: false,
      laborPriceValidation:false,
      delAddVlidation:false,
      delPhoneVlidation:false,
      deldatelidation:false,

      laborOrderData: '',
      params: this.$route.params.lpoID,
      updateStatusInSalesOrder: '',
      // Autocomplete
      vendors: [
        {name: "aqua", color: "#00ffff"},
      ],
      // Autocomplete Ends
      laborListForOrder: '',
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
      this.getVendors();
      this.getLaborOrder();
      // this.getAllLaborOrders();

    },
    getLaborOrder: function () {
      if (this.params) {
        var cust_url = this.apiURL + 'api/labor-order/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.get(cust_url).then(response => {
          this.laborOrderData = response.body;
          var myDate = new Date(this.laborOrderData.createdDate)
          this.laborOrderData.createdDate = (myDate.getMonth() +1)  + '-' + myDate.getDate() + '-' + myDate.getFullYear()
          this.laborListForOrder = response.body.lab_data;
          console.log('My data');
          console.log(this.laborListForOrder);

          // calculate total Price
          for (let j=0;j<this.laborListForOrder.length;j++) {
            this.totalPrice += parseFloat(this.laborListForOrder[j].price);
          }

          // calculate total quantity
          for (let k=0;k<this.laborListForOrder.length;k++) {
            this.totalQuantity += parseFloat(this.laborListForOrder[k].quantity);
          }

        }, response => {
          console.log(response)
        })
      }
    },
    // Update LPO
    updateLPO: function functionName() {

      // vendor Validation
      this.vendorBlankValidation = false;
      this.vendorValidation = false;
      var vendorValidated = false;

      this.delAddVlidation=false;
      this.delPhoneVlidation=false;
      this.deldatelidation=false;
      this.laborPriceValidation=false;


      var vendorValidated = false;
      var DelAddressValidated = false;
      var DelPhoneValidated = false;
      var DelDateValidated = false;
      var laborPricevalidated =false;


      var data = this.laborOrderData;


       if (data.deliveryAddress.toString().trim() == '') {
            this.delAddVlidation = true
            DelAddressValidated = false
        }else{
            this.delAddVlidation = false
            DelAddressValidated = true
        }

        if (data.deliveryPhone.toString().trim() == '') {
            this.delPhoneVlidation = true
            DelPhoneValidated = false
        }else{
            this.delPhoneVlidation = false
            DelPhoneValidated = true
        }

        if (data.deliveryDate == '') {
            this.deldatelidation = true
            DelDateValidated = false
        }else{
            this.deldatelidation = false
            DelDateValidated = true
        }

      /*   if (data.laborPrice.trim() == '') {
            this.laborPriceValidation = true
            laborPricevalidated = false
        }else{
            this.laborPriceValidation = false
            laborPricevalidated = true
        }*/


      // Validations
      // if (data.vendor.trim() == '') {
      //   this.vendorBlankValidation = true
      // } else {
      //   vendorValidated = true
      // }

      if (data.vendor.toString().trim() == '') {
        this.vendorBlankValidation = true
        vendorValidated = false
      } else {
        var found = false
        for (let i=0; i<this.vendors.length;i++){
          if (data.vendor.toString().trim() == this.vendors[i].name) {
            found = true
          }
        }
        if (found) {
          vendorValidated = true
        } else {
          this.vendorValidation = true
        }
      }


      // Measurement validation
      for(let i=0;i<this.laborListForOrder.length;i++){
        $.each( this.laborListForOrder[i].measurements.labor, function( key, value ) {
          if (value == '') {

          }
          else if (!/^-?\d*(\.\d+)?$/.test(parseFloat(value))) {
            alert('Measurement values are incorrect')
            this.laborListForOrder[i].measurements.labor[key] = 0;
            vendorValidated = false
          }
        }.bind(this));
      }

      if (!vendorValidated || !DelAddressValidated || !DelDateValidated || !DelPhoneValidated) {
        return
      }

      var updateLPOURL = this.apiURL + 'api/labor-order/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.put(updateLPOURL , data).then(response => {
        // window.location.href = '/lpo/'+this.params;
        var redirectURL = '/lpo/'+this.params
        Router.push(redirectURL)
      }, response => {
        console.log(response)
      })
    },

    // Get all vendors from API
    getVendors: function () {

      var vendorURL = this.apiURL + 'api/vendor' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(vendorURL).then(response => {
        // Fiter Data
        var newData = []
        var data = response.body;
        for (var i=0;i<data.length;i++) {
          if (data[i].type == 'labor') {
            newData.push(data[i]);
          }
        }

        this.vendors = newData;
      }, response => {
        console.log(response)
      })
    },


    // Show Side Panel (Hidden in PO Dashboard)
    showPanel: function () {
      $("#fadeout").show();
      $("#poDashFull").css('margin-left','20%');
    },

    // Sort List of Vendors according to the query
    vendorFilter: function(list, query) {
      var arr = [];
      query = query.toUpperCase();
      for(var i = 0; i < list.length; i++) {
        var q = list[i].name.toUpperCase();
        if(q.indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 3)
          break;
      }
      return arr;
    }
  },
  created: function () {
    // this.getDataFromLocalStorage();
    // this.getCustomer()
    this.getCookie();
  },
  mounted: function () {
    this.showPanel();
  },
  watch: {
    laborListForOrder: {
      handler: function (val) {
        for (let i=0;i<val.length;i++) {

          // For Jacket Front Length
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.jacketFrontLength.toString().trim())) {
            val[i].measurements.labor.jacketFrontLength = 0;
          } else {}

          // For Jacket Back Length
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.jacketBackLength.toString().trim())) {
            val[i].measurements.labor.jacketBackLength = 0;
          } else {}

          // For Vest Length
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.vestLength.toString().trim())) {
            val[i].measurements.labor.vestLength = 0;
          } else {}

          // For Shoulder
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.shoulder.toString().trim())) {
            val[i].measurements.labor.shoulder = 0;
          } else {}

          // For Jacket SL length
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.jktSlLength.toString().trim())) {
            val[i].measurements.labor.jktSlLength = 0;
          } else {

          }

          // For whole Chest
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.wholeChest.toString().trim())) {
            val[i].measurements.labor.wholeChest = 0;
          } else {

          }

          // Front Chest
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.frontChest.toString().trim())) {
            val[i].measurements.labor.frontChest = 0;
          } else {

          }

          // Back Chest
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.backChest.toString().trim())) {
            val[i].measurements.labor.backChest = 0;
          } else {

          }

          // Chest vertical
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.chestVertical.toString().trim())) {
            val[i].measurements.labor.chestVertical = 0;
          } else {

          }

          // Chest Horizontal
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.chestHorizontal.toString().trim())) {
            val[i].measurements.labor.chestHorizontal = 0;
          } else {

          }

          // Front Chest Part
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.frtChestPart.toString().trim())) {
            val[i].measurements.labor.frtChestPart = 0;
          } else {

          }

          // Back Chest part
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.backChestPart.toString().trim())) {
            val[i].measurements.labor.backChestPart = 0;
          } else {

          }

          // Waist
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.waist.toString().trim())) {
            val[i].measurements.labor.waist = 0;
          } else {

          }

          // shirt collor
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.shirttCollor.toString().trim())) {
            val[i].measurements.labor.shirttCollor = 0;
          } else {

          }

          // arm
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.arm.toString().trim())) {
            val[i].measurements.labor.arm = 0;
          } else {

          }

          // forearm
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.forearm.toString().trim())) {
            val[i].measurements.labor.forearm = 0;
          } else {

          }

          // wrist
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.wrist.toString().trim())) {
            val[i].measurements.labor.wrist = 0;
          } else {

          }

          //Shirt SL length
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.shirtSlLength.toString().trim())) {
            val[i].measurements.labor.shirtSlLength = 0;
          } else {

          }

          // SK size
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.SkSize.toString().trim())) {
            val[i].measurements.labor.SkSize = 0;
          } else {

          }

          //SK length
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.SkLength.toString().trim())) {
            val[i].measurements.labor.SkLength = 0;
          } else {

          }

          // height
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.height.toString().trim())) {
            val[i].measurements.labor.height = 0;
          } else {

          }

          // Dress Length
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.dressLength.toString().trim())) {
            val[i].measurements.labor.dressLength = 0;
          } else {

          }

          // Female Blouse Collar
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.femaleBlouseCollor.toString().trim())) {
            val[i].measurements.labor.femaleBlouseCollor = 0;
          } else {

          }

          // Pant Waist
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.pantWaist.toString().trim())) {
            val[i].measurements.labor.pantWaist = 0;
          } else {

          }

          // Hip
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.hip.toString().trim())) {
            val[i].measurements.labor.hip = 0;
          } else {

          }


          // Crotch
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.crotch.toString().trim())) {
            val[i].measurements.labor.crotch = 0;
          } else {

          }

          // PT Length
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.ptLength.toString().trim())) {
            val[i].measurements.labor.ptLength = 0;
          } else {

          }

          // Thigh
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.thigh.toString().trim())) {
            val[i].measurements.labor.thigh = 0;
          } else {

          }

          // Hem
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.hem.toString().trim())) {
            val[i].measurements.labor.hem = 0;
          } else {

          }

          // Shin
          if (!/^[-]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+|-)$/.test(val[i].measurements.labor.shin.toString().trim())) {
            val[i].measurements.labor.shin = 0;
          } else {

          }

        }
      },
      deep: true
    },
    updateStatusInSalesOrder: function () {
      // console.log("Changed sales order");
        this.updateSalesOrder()
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
.padclasslabor {
  padding-top: 6px
}
.padclasscustomer {
  padding-top: 7px
}
html {
overflow:   scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
