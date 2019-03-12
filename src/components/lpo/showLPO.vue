<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Labor Purchase Order</div>
      </md-card-header>
      <md-card-actions>
        <!-- <md-button class="md-raised md-primary" v-bind:href='"/lpo/edit/"+ laborOrderData.code' v-if="showCreateAndButton">Modify</md-button> -->
        <router-link tag="md-button" :to='"/lpo/edit/"+ laborOrderData.code' class="md-raised md-primary" v-if="showCreateAndButton">Modify</router-link>


        <md-button v-on:click="generatePDF" class="md-raised md-primary">Generate PDF</md-button>
        <!-- <md-button class="md-raised md-primary">Primary</md-button> -->
      </md-card-actions>
      <br>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <div class="row">
                <div class="col-md-6">
                  <div class="col-md-6">
                    <p><strong>LPO: </strong> {{laborOrderData.code}}</p>
                    <p><strong>Date: </strong> {{laborOrderData.createdDate | formatDate}}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Vendor: </strong> {{laborOrderData.vendor}}</p>
                    <!-- <p><strong>Location: </strong> {{laborOrderData.location}}</p> -->
                  </div>
                  <div class="col-md-6">
                    <p><strong>Remark: </strong> {{laborOrderData.remark}}</p>
                  </div>
                  <div class="col-md-6">

                  </div>
                   <div class="col-md-12">
                     <p><strong>Delivery Address: </strong> {{laborOrderData.deliveryAddress}}</p>
                  </div>
                   <div class="col-md-6">
                     <p><strong>Delivery Phone: </strong> {{laborOrderData.deliveryPhone}}</p>
                  </div>
                   <div class="col-md-6">
                     <p><strong>Delivery date: </strong> {{deliveryDate1(laborOrderData.deliveryDate)._v}}</p>
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
                  <div class="col-md-6 text-center">
                    <div class="panel panel-default">
                      <div class="panel-heading"><strong>Total Labor Cost</strong></div>
                      <div class="panel-body">{{totalLaborPrice}}</div>
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
                          <div class="col-md-2">
                            <h5 v-if="lpo.arrived_date"><strong>Arr Date:</strong> {{lpo.arrived_date}}</h5>
                            <!-- <button type="button" class="btn btn-default" name="button" v-on:click="updateArrivedDate(lpo.lpo_row)" v-else>Arrived</button> -->
                            <md-button class="md-raised md-primary" v-on:click="updateArrivedDate(lpo.lpo_row)" v-else>Arrived</md-button>
                          </div>
                          <div class="col-md-2">
                              <h5>
                                <strong>Item No:</strong> #{{lpo.lpo_row}}
                              </h5>
                          </div>
                          <div class="col-md-2">
                              <h5><strong>SO No:</strong> {{lpo.SO}}</h5>
                          </div>
                          <div class="col-md-3">
                            <h5><strong>Item:</strong> {{lpo.item}} | <strong>SO row:</strong> {{lpo.so_row}}</h5>
                          </div>
                          <div class="col-md-3">
                            <h5><strong>Quantity:</strong> {{lpo.quantity}} | <strong>Price: </strong>$ {{lpo.price}}</h5>
                          </div>
                        </div>
                        <br>
                        <div class="row">
                          <h5><strong>Labor Cost:</strong> {{lpo.laborPrice}}</h5>
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
                        <h4> Measurement </h4>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.jacketFrontLength}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.jacketBackLength}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.vestLength}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.shoulder}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.jktSlLength}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.wholeChest}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.frontChest}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.backChest}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.chestVertical}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.chestHorizontal}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.frtChestPart}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.backChestPart}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.waist}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.shirttCollor}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.arm}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.forearm}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.wrist}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.shirtSlLength}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.SkSize}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.SkLength}}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6 padclasscustomer">
                          <div class="col-md-6">
                            Height
                          </div>
                          <div class="col-md-6">
                            <div class="row">
                              <div class="col-md-3">
                                {{lpo.measurements.customer.height}}
                              </div>
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.height}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.dressLength}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.femaleBlouseCollor}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.pantWaist}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.hip}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.crotch}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.ptLength}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.thigh}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.shin}}</p>
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
                              <div class="col-md-6">
                                <div class="text-center">
                                <p>{{lpo.measurements.labor.hem}}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>



                      </div>
                    </md-card-content>
                  </md-card>
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
export default {
  name: 'vendor',
  data () {
    return {
      showCreateAndButton: true,
      showCreateAndButton2: true,
      laborOrderData: '',
      showIndividualArrivedButton: true,
      // LPO Data
      final: '',
      totalPrice: 0,
      totalQuantity: 0,
      totalLaborPrice: 0,
      remark: '',
      location: '',
      updateStatusInSalesOrder: '',

      params: this.$route.params.lpoID,
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
          SkLength: 0
        }
      }
    }
  },
  methods: {
    generatePDF: async function () {
      var pdfURL = this.apiURL + 'api/lpo-pdf/'+ this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      var filepath = ''

      await this.$http.get(pdfURL).then(response => {
      //  filepath = response.body.filename.replace('./public/', '');
      }, response => {
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
      this.getLaborOrder()
      // this.getAllLaborOrders();

    },
    getLaborOrder: function () {
      if (this.params) {
        var laborURL = this.apiURL + 'api/labor-order/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.get(laborURL).then(response => {
          console.log(response.body);
          this.laborOrderData = response.body;
          this.laborListForOrder = response.body.lab_data;

          // calculate total Price
          for (let j=0;j<this.laborListForOrder.length;j++) {
            this.totalPrice += parseFloat(this.laborListForOrder[j].price);
          }

          // calculate total quantity
          for (let k=0;k<this.laborListForOrder.length;k++) {
            this.totalQuantity += parseFloat(this.laborListForOrder[k].quantity);
          }


          // calculate total labor price
          for (let k=0;k<this.laborListForOrder.length;k++) {
            this.totalLaborPrice += parseFloat(this.laborListForOrder[k].laborPrice);
          }

          // console.log(this.laborListForOrder);
          // var arrCount = 0;
          // for (let i=0;i<this.laborListForOrder.length;i++) {
          //   if (this.laborListForOrder[i].arrived_date) {
          //     arrCount =+ 1
          //   }
          // }
          //
          // if (arrCount == this.laborListForOrder.length) {
          //   this.showCreateAndButton2 = false
          // }


        }, response => {
          console.log(response)
        })
      }
    },
    updateArrivedDate: function (lpo_row) {
      var d = new Date();
      // Add date and Status in labor order data
      for (let i=0;i<this.laborOrderData.lab_data.length;i++) {
        if (this.laborOrderData.lab_data[i].lpo_row == lpo_row) {
            this.laborOrderData.lab_data[i].arrived_date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
            this.laborOrderData.lab_data[i].status = "arrived";
        }
      }
      // Update DB
      var data = this.laborOrderData;

      var updateDateURL = this.apiURL + 'api/labor-order/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.put(updateDateURL, data).then(response => {
        this.showIndividualArrivedButton = false;
        this.laborOrderData = response.body;
        location.reload()
      }, response => {
        console.log(response)
        location.reload()
      })



    },
    // Show Side Panel (Hidden in PO Dashboard)
    showPanel: function () {
      $("#fadeout").show();
      $("#poDashFull").css('margin-left','20%');
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
  created: function () {
    // this.getDataFromLocalStorage();
  },
  mounted: function () {
    this.showPanel()
    this.getCookie()
  },
  watch: {
    updateStatusInSalesOrder: function () {
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
