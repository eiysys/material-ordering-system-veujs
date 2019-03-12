<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Labor Purchase Order</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="saveLPO">Save</md-button>
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
                        <md-autocomplete v-model="vendorValue"
                                          :list="vendors"
                                          print-attribute="name"
                                          :filter-list="vendorFilter"
                                          :min-chars="0"
                                          :max-height="6"
                                          :debounce="500">
                        </md-autocomplete>
                      </md-input-container>
                      <p class="text-danger" v-if="vendorBlankValidation">*Vendor field Required</p>
                      <p class="text-danger" v-if="vendorValidation">Please enter valid Vendor</p>
                      <!-- AutoComplete Ends -->
                    </div>
                    <div class="col-md-6">
                      <md-input-container>
                        <label>Date</label>
                        <md-textarea v-model="date" readonly></md-textarea>
                      </md-input-container>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <md-input-container>
                        <label>Remark</label>
                        <md-textarea v-model="remark"></md-textarea>
                      </md-input-container>
                    </div>
                    <div class="col-md-12">
                      <md-input-container>
                        <label>Delivery Adress</label>
                        <md-textarea v-model="deliveryAddress"></md-textarea>
                      </md-input-container>
                        <p class="text-danger" v-if="delAddVlidation">*Delivery Address field Required</p>
                    </div>

                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <md-input-container>
                        <label>Delivery Phone</label>
                        <md-input v-model="deliveryPhone"></md-input>
                      </md-input-container>
                       <p class="text-danger" v-if="delPhoneVlidation">*Delivery Phone </p>
                    </div>
                    <div class="col-md-6">
                      <label>Delivery Date</label>
                        <v2-datepicker v-model='deliveryDate' lang="en" format="MM/DD/YYYY"  placeholder="Delivery Date"></v2-datepicker>
                        <p class="text-danger" v-if="deldatelidation">*Delivery Date field Required</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="col-md-6 text-center">
                    <div class="panel panel-default">
                      <div class="panel-heading"><strong>Total Item Price</strong></div>
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
                              <h5>
                                <span><strong>Item No:</strong></span> <span>#{{lpo.lpo_row}}</span>
                              </h5>
                          </div>
                          <div class="col-md-3">
                              <h5>
                                <span><strong>SO No:</strong></span> <span>{{lpo.SO}}</span>
                              </h5>
                          </div>
                          <div class="col-md-3">
                            <h5>
                              <span><strong>Item:</strong></span> <span>{{lpo.item}}</span>  | <span><strong>SO row:</strong></span> <span>{{lpo.so_row}}</span>
                            </h5>
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

                       <!-- styling -->

                    <md-card-header  v-if="lpo.accesories">
                        <md-card-header-text>
                           <!--  <h4> Style </h4> -->
                        </md-card-header-text>
                    </md-card-header>
                    <md-card-content>
                      <div class="row text-left" v-if="lpo.item==='vest'">
                            <div class="col-md-4 padclasscustomer">
                                <h4>Side Pocket</h4>
                                <p><strong>Type : </strong> {{lpo.accesories.side_pocket.type}}</p>
                                <p><strong>Style : </strong> {{lpo.accesories.side_pocket.style}}</p>

                            </div>

                            <div class="col-md-4 padclasscustomer">
                                <h4>Back Piece</h4>
                                <p><strong>Style: </strong> {{lpo.accesories.back_piece.type}}</p>
                                <p><strong>Name : </strong> {{lpo.accesories.back_piece.name}}</p>

                            </div>
                              <div class="col-md-4 padclasscustomer">
                                <h4>Button</h4>
                                <p><strong>Style: </strong> {{lpo.accesories.button.style}}</p>
                                <p><strong>No Of Buttons : </strong> {{lpo.accesories.button.noOfButtons}}</p>
                            </div>

                              <div class="col-md-4 padclasscustomer">
                                <h4>Lapel</h4>
                                <p><strong>Type: </strong> {{lpo.accesories.lapel.type}}</p>
                                <p><strong>Button Hole : </strong> {{lpo.accesories.lapel.button_hole}}</p>
                                <p><strong>Style: </strong> {{lpo.accesories.lapel.style}}</p>
                                <p><strong>Length : </strong> {{lpo.accesories.lapel.length}}</p>

                            </div>
                             <div class="col-md-4 padclasscustomer">
                                <h4>Strap</h4>
                                <p><strong>Type: </strong> {{lpo.accesories.strap.type}}</p>
                                <p><strong>Location : </strong> {{lpo.accesories.strap.location}}</p>
                            </div>

                      </div>
                      <div class="row text-left" v-if="lpo.item==='suit'">
                          <div class="col-md-4 padclasscustomer">
                                <h4>Stiches</h4>
                                <p><strong>Sleves : </strong> {{lpo.accesories.stiches.sleves}}</p>
                                <p><strong>No of buttons : </strong> {{lpo.accesories.stiches.no_of_buttons}}</p>
                            </div>



                              <div class="col-md-4 padclasscustomer">
                                <h4>Pocket</h4>
                                <p><strong>Style : </strong> {{lpo.accesories.pocket.style}}</p>
                                <p><strong>Ticket Pocket : </strong> {{lpo.accesories.pocket.ticket_pocket}}</p>
                                <p><strong>Ticket Pocket Style: </strong> {{lpo.accesories.pocket.ticket_pocket_style}}</p>
                            </div>
                             <div class="col-md-4 padclasscustomer">
                                <h4>Name Embroidery</h4>
                                <p><strong>Name : </strong> {{lpo.accesories.name_embroidery.name}}</p>
                                <p><strong>Font : </strong> {{lpo.accesories.name_embroidery.font}}</p>
                                <p><strong>Color: </strong> {{lpo.accesories.name_embroidery.color}}</p>
                            </div>
                              <div class="col-md-4 padclasscustomer">
                                <h4>Button</h4>
                                <p><strong>Style : </strong> {{lpo.accesories.button.style}}</p>
                                <p><strong>No Of Buttons : </strong> {{lpo.accesories.button.noOfButtons}}</p>
                            </div>


                              <div class="col-md-4 padclasscustomer">
                                <h4>Lapel</h4>
                                <p><strong>Color : </strong> {{lpo.accesories.lapel.color}}</p>
                                <p><strong>Different Fabric : </strong> {{lpo.accesories.lapel.differentfabric}}</p>
                                <p><strong>Fabric : </strong> {{lpo.accesories.lapel.fabric}}</p>
                                <p><strong>Fabric Name : </strong> {{lpo.accesories.lapel.fabriccode}}</p>
                                <p><strong>Style : </strong> {{lpo.accesories.lapel.style}}</p>
                                <p><strong>ButtonHole : </strong> {{lpo.accesories.lapel.buttonHole}}</p>
                                <p><strong>length : </strong> {{lpo.accesories.lapel.length}}</p>
                            </div>

                             <div class="col-md-4 padclasscustomer">
                                <h4>Vent</h4>
                                <p><strong>Style : </strong> {{lpo.accesories.vent.style}}</p>
                                <p><strong>Vent : </strong> {{lpo.accesories.vent.vent}}</p>
                            </div>

                      </div>
                      <div class="row text-left" v-if="lpo.item==='trouser'" style="padding:10px 28px;">
                            <div class="col-md-4 padclasscustomer">
                                <h4>Style</h4>
                                <p><strong>Folded Hem : </strong> {{lpo.accesories.style.folded_hem}}</p>
                                <p><strong>Bottom Flap : </strong> {{lpo.accesories.style.bottom_flap}}</p>
                                <p><strong>Belt Loop : </strong> {{lpo.accesories.style.belt_loop}}</p>
                            </div>
                            <div class="col-md-4 padclasscustomer">
                                <h4>Back Pocket</h4>
                                <p><strong>Type: </strong> {{lpo.accesories.back_pocket.type}}</p>
                                <p><strong>Bottom : </strong> {{lpo.accesories.back_pocket.bottom}}</p>

                            </div>
                            <div class="col-md-4 padclasscustomer">
                                <h4>Lining</h4>
                                <p><strong>color: </strong> {{lpo.accesories.lining.color}}</p>
                                <p><strong>Fabric Name : </strong> {{lpo.accesories.lining.fabricname}}</p>
                                <p><strong>Piping : </strong> {{lpo.accesories.lining.piping}}</p>
                            </div>
                      </div>
                      <div class="row text-left" v-if="lpo.item==='shirt'">
                            <div class="col-md-4 padclasscustomer">
                                <h4>Back Darts</h4>
                                <p><strong>Length : </strong> {{lpo.accesories.back_darts.length}}</p>
                            </div>
                            <div class="col-md-4 padclasscustomer">
                                <h4>Chest Poclket</h4>
                                <p><strong>Length : </strong> {{lpo.accesories.chest_pocket.length}}</p>
                                <p><strong>Style : </strong> {{lpo.accesories.chest_pocket.style}}</p>
                            </div>
                             <div class="col-md-4 padclasscustomer">
                                <h4>Collor</h4>
                                <p><strong>Length : </strong> {{lpo.accesories.collar.length}}</p>
                                <p><strong>Style : </strong> {{lpo.accesories.collar.style}}</p>
                            </div>
                             <div class="col-md-4 padclasscustomer">
                                <h4>Placket</h4>
                                <p><strong>Length  : </strong> {{lpo.accesories.placket.length}}</p>
                                <p><strong>Length  Bool: </strong> {{lpo.accesories.placket.length_bool}}</p>
                            </div>
                             <div class="col-md-4 padclasscustomer">
                                <h4>Cuff</h4>
                                <p><strong>Length: </strong> {{lpo.accesories.cuff.length}}</p>
                                <p><strong>Style : </strong> {{lpo.accesories.cuff.style}}</p>
                            </div>

                      </div>
                    </md-card-content>

                    <!-- end styling  -->
                    <md-card-header>


                      <md-card-header-text>
                        <h4>Measurement</h4>
                        <!-- {{lpo}} -->
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

                        <!-- New -->
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
                                  <a v-on:click="lpo.measurements.labor.femaleBlouseCollor++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
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
                        <!-- New Ends -->

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
      // Validations
      vendorBlankValidation: false,
      vendorValidation: false,
      lpo: {},
       delAddVlidation:false,
      delPhoneVlidation:false,
      deldatelidation:false,
      laborPriceValidation:false,

      // FPO Data
      final: '',
      totalPrice: 0,
      totalQuantity: 0,
      remark: '',
      location: '',
      laborPrice:'',
      updateStatusInSalesOrder: '',
      // Autocomplete
      vendorValue: '',
      vendors: [
        {name: "aqua", color: "#00ffff"},
      ],
      // Autocomplete Ends
      customerID: '',
      date: '',
      laborListForOrder: '',
      final: '',
      lpoCode: '',
      measurements: {
        customer: '',
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
      },
      deliveryPhone:'',
      deliveryAddress:'',
      deliveryDate:'',
      laborPrice:'',
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

      this.getDataFromLocalStorage();
      this.getVendors();

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
      // console.log(getCookie('lpo_order_data'));
      let LPO_order = JSON.parse(getCookie('lpo_order_data'));
      for (let i=0; i<LPO_order.length;i++) {
        console.log('ff');

          var laborURL = this.apiURL + 'salesOrder/' + (LPO_order[i].SO).trim() + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;

          await this.$http.get(laborURL).then(response => {
            LPO_order[i].measurements = {
              customer: '',
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
            LPO_order[i].customerId = response.body.customerId;

            // Get Price and Quantity
            for (let j=0; j<response.body.itemsDetail.length;j++) {
              if (response.body.itemsDetail[j].so_row == LPO_order[i].so_row) {
                  LPO_order[i].price = response.body.itemsDetail[j].pPrice;
                  LPO_order[i].quantity = response.body.itemsDetail[j].quantity;
                  if(response.body.itemsDetail[j].accesories){
                    LPO_order[i].accesories = response.body.itemsDetail[j].accesories;
                  }else{
                    LPO_order[i].accesories = [];
                  }
              }
            }
          }, response => {
            console.log(response)
          })
      }

      // Add customer measurement to LPO Order
      for (let i=0; i<LPO_order.length;i++) {
          var customerURL = this.apiURL + 'customer/' + (LPO_order[i].customerId).trim() + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
          await this.$http.get(customerURL).then(response => {
            LPO_order[i].measurements.customer = response.body.measurements;
          }, response => {
            console.log(response)
          })
          LPO_order[i].lpo_row = i+1;
      }
      // Calculate Total Price
      var tP = 0;
      for (let i=0;i<LPO_order.length;i++) {
        tP += parseInt(LPO_order[i].price)
        console.log(tP);
      }
      this.totalPrice = tP;

      // Calculate Total Quantity
      var tQ = 0;
      for (let i=0;i<LPO_order.length;i++) {
        tQ += parseInt(LPO_order[i].quantity)
      }
      this.totalQuantity = tQ;

      this.laborListForOrder =  LPO_order;
    },
    // Save FPO
    saveLPO: function functionName() {
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



      // Main Block for Order
      var data = {
        orderType: 'labor',
        staff: this.authData._id,
        arrived_date: '',
        vendor: this.vendorValue,
        remark: this.remark,
        location: this.location,
        laborPrice: this.laborPrice,
        status: 'placed',
        lab_data: this.laborListForOrder,
        deliveryDate:this.deliveryDate,
        deliveryAddress:this.deliveryAddress,
        deliveryPhone:this.deliveryPhone
      }

      if (data.deliveryAddress.trim() == '') {
            this.delAddVlidation = true
            DelAddressValidated = false
        }else{
            this.delAddVlidation = false
            DelAddressValidated = true
        }

        if (data.deliveryPhone.trim() == '') {
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
/*
         if (data.laborPrice.trim() == '') {
            this.laborPriceValidation = true
            laborPricevalidated = false
        }else{
            this.laborPriceValidation = false
            laborPricevalidated = true
        }*/


      // Vendor Validations
      // vendorValidated = true

      if (data.vendor.trim() == '') {
        this.vendorBlankValidation = true
        vendorValidated = false
      } else {
        var found = false
        for (let i=0; i<this.vendors.length;i++){
          if (data.vendor.trim() == this.vendors[i].name) {
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


      if (!vendorValidated || !DelAddressValidated  || !DelDateValidated || !DelPhoneValidated) {
        return
      }

      var laborOrderURL = this.apiURL + 'api/labor-order' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.post(laborOrderURL, data).then(response => {
        this.updateStatusInSalesOrder = response.body;
        this.final = response.body;
        this.lpoCode = response.body.code;
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

    // Update Sales Order
    updateSalesOrder: function () {
      var data = this.final;
      console.log("This is data")
      console.log(data);
      //
      // return
      var updateSalesOrderURL = this.apiURL + 'salesOrder/updateLPO' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      // console.log(updateSalesOrderURL)
      this.$http.put(updateSalesOrderURL, data).then(response => {
        // console.log(response);
        // window.location.href = '/lpo/'+ this.lpoCode;
        var redirectURL = '/lpo/'+ this.lpoCode
        Router.push(redirectURL)
      }, response => {
        // console.log(response)
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
    this.getCookie()
    let todayDate = new Date()
    let m = todayDate.getMonth() + 1
    this.date = todayDate.getDate() + '-' + m + '-' + todayDate.getFullYear()
  },
  mounted: function () {
    this.showPanel()
  },
  watch: {
    laborListForOrder: {
      handler: function (val) {
        // console.log(val);
        for (let i=0; i<val.length;i++) {
          console.log(val[i].measurements.labor);

          //  Measurement Validation

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
