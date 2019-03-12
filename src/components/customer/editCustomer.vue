<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Edit Customer</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="saveCustomer" class="md-raised md-primary">Save</md-button>
      </md-card-actions>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <div class="row">

                <div class="col-md-1">
                </div>
                <div>
                  <div class="col-md-10">
                    <div class="col-md-4">
                      <md-input-container>
                        <label>Name</label>
                        <md-textarea v-model="customerData.name" required style="text-transform: capitalize;"></md-textarea>
                      </md-input-container>
                      <p class="text-danger " v-if="this.nameBlankValidation">*Name field required</p>
                      <p class="text-danger" v-if="this.nameValidation">Please enter valid Name</p>
                    </div>
                    <div class="col-md-4">
                      <md-input-container>
                        <label>Mobile No.</label>
                        <md-input v-model="customerData.phone" required></md-input>
                      </md-input-container>
                      <p class="text-danger" v-if="this.phoneBlankValidation">*Mobile No. field required.</p>
                      <p class="text-danger" v-if="this.phoneValidation">Please enter valid Mobile No.</p>
                    </div>
                    <div class="col-md-4">
                      <md-input-container>
                        <label>Email</label>
                        <md-textarea v-model="customerData.email" ></md-textarea>
                      </md-input-container>
                      <p class="text-danger" v-if="this.emailValidation">Please enter valid Email</p>
                    </div>
                    <div class="col-md-4">
                      <md-input-container>
                        <label>Occupation</label>
                        <md-textarea v-model="customerData.occupation"></md-textarea>
                      </md-input-container>
                    </div>
                    <div class="col-md-4">
                      <!-- Suspend Date -->
                      <div class="col-md-1" style="padding-left:0; padding-right:0">
                        <br>
                        <div class="text-left">
                          <md-icon style="color:grey">date_range</md-icon>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <md-input-container>
                         <label>DD</label>
                         <md-autocomplete v-model="date.day"
                                             :list="days"
                                             print-attribute="day"
                                             :filter-list="codeFilterDay"
                                             :min-chars="0"
                                             :max-height="3"
                                             :max-width="1"
                                             @selected="dayCallback">
                         </md-autocomplete>
                        </md-input-container>
                      </div>
                      <div class="col-md-4">
                        <md-input-container>
                         <label>MM</label>
                         <md-autocomplete v-model="date.month"
                                             :list="months"
                                             print-attribute="month"
                                             :filter-list="codeFilterMonth"
                                             :min-chars="0"
                                             :max-height="3"
                                             :max-width="1"
                                             @selected="monthCallback">
                         </md-autocomplete>
                        </md-input-container>
                      </div>
                      <div class="col-md-4">
                        <md-input-container>
                         <label>YYYY</label>
                         <md-autocomplete v-model="date.year"
                                             :list="years"
                                             print-attribute="year"
                                             :filter-list="codeFilterYear"
                                             :min-chars="0"
                                             :max-height="3"
                                             :max-width="1"
                                             @selected="yearCallback">
                         </md-autocomplete>
                        </md-input-container>
                      </div>
                      <p class="text-danger" v-if="this.dobValidation">Please enter valid Date of birth</p>
                    </div>

                    <div class="col-md-4">
                      <md-input-container>
                        <label>Refer by</label>
                        <md-textarea v-model="customerData.referby"></md-textarea>
                      </md-input-container>
                    </div>
                    <div class="col-md-4">
                      <md-input-container>
                        <label>Off. Address</label>
                        <md-textarea v-model="customerData.officeAddress"></md-textarea>
                      </md-input-container>
                    </div>
                    <div class="col-md-4">
                      <md-input-container>
                        <label>Del. Address</label>
                        <md-textarea v-model="customerData.deliveryOffice"></md-textarea>
                      </md-input-container>
                    </div>
                  </div>
                </div>

              </div>
            </md-card-content>
          </md-card >
          <md-card  style="width:100%">
            <md-card-header>
              <div class="md-title text-center">Measurement</div>
            </md-card-header>
            <md-card-content>
              <div class="row text-left">
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Jacket Front Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.jacketFrontLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.jacketFrontLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.jacketFrontLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.jacketBackLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.jacketBackLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.jacketBackLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.vestLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.vestLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.vestLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.shoulder">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.shoulder++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.shoulder--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.jktSlLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.jktSlLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.jktSlLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.wholeChest">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.wholeChest++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.wholeChest--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.frontChest">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.frontChest++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.frontChest--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.backChest">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.backChest++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.backChest--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Chest Vertical
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.chestVertical">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.chestVertical++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.chestVertical--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.chestHorizontal">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.chestHorizontal++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.chestHorizontal--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.frtChestPart">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.frtChestPart++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.frtChestPart--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Back Chest Pt
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.backChestPart">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.backChestPart++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.backChestPart--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.waist">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.waist++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.waist--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="col-md-6 padclasscustomer">
                  <div class="col-md-10">
                    <input v-model="customerData.measurements.remark1" type="text" class="form-control" placeholder="Remarks" >
                  </div>
                </div> -->
              </div>

              <br><br>

              <div class="row text-left">
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Shirt Collar
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.shirttCollor">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.shirttCollor++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.shirttCollor--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.arm">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.arm++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.arm--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Forearm
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.forearm">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.forearm++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.forearm--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.wrist">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.wrist++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.wrist--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.shirtSlLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.shirtSlLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.shirtSlLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="col-md-6 padclasscustomer">
                  <div class="col-md-10">
                    <input v-model="customerData.measurements.remark2" type="text" class="form-control" placeholder="Remark" >
                  </div>
                </div> -->
              </div>
              <br>
              <br>
              <div class="row text-left">
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Sk Size
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.SkSize">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.SkSize++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.SkSize--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.SkLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.SkLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.SkLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br>
              <div class="row text-left">
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Height
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.height">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.height++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.height--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.dressLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.dressLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.dressLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row text-left">
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Female Blouse Collar
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.femaleBlouseCollor">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.femaleBlouseCollor++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.femaleBlouseCollor--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.pantWaist">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.pantWaist++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.pantWaist--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row text-left">
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Hip
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.hip">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.hip++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.hip--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.crotch">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.crotch++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.crotch--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row text-left">
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    PT Length
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.ptLength">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.ptLength++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.ptLength--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.thigh">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.thigh++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.thigh--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row text-left">
                <div class="col-md-6 padclasscustomer">
                  <div class="col-md-6">
                    Shin
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.shin">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.shin++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.shin--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
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
                      <div class="col-md-9">
                        <div class="col-md-6">
                            <input class="text-center" type="text" style="padding:0; width:100%" v-model="customerData.measurements.hem">
                        </div>
                        <div class="col-md-6" style="padding:0" md-theme="green">
                          <a v-on:click="customerData.measurements.hem++" style="cursor:pointer;"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">add</i></a>
                          <a v-on:click="customerData.measurements.hem--" style="cursor:pointer"><i class="material-icons" style="border:1px solid grey; border-radius:3px; background:lightgrey">remove</i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br>
              <div class="col-md-6 padclasscustomer">
                <md-input-container>
                  <label>Remarks</label>
                  <md-textarea v-model="customerData.measurements.remark1"></md-textarea>
                </md-input-container>
              </div>

            </md-card-content>

          </md-card>
        </md-layout>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import moment from 'moment'
import Router from '../../router/index.js';

export default {
  name: 'customer',
  data () {
    return {
      months: [{"month": 1},
              {"month": 2},
              {"month": 3},
              {"month": 4},
              {"month": 5},
              {"month": 6},
              {"month": 7},
              {"month": 8},
              {"month": 9},
              {"month": 10},
              {"month": 11},
              {"month": 12}],
              days : [{"day": 1},
                      {"day": 2},
                      {"day": 3},
                      {"day": 4},
                      {"day": 5},
                      {"day": 6},
                      {"day": 7},
                      {"day": 8},
                      {"day": 9},
                      {"day": 10},
                      {"day": 11},
                      {"day": 12},
                      {"day": 13},
                      {"day": 14},
                      {"day": 15},
                      {"day": 16},
                      {"day": 17},
                      {"day": 18},
                      {"day": 19},
                      {"day": 20},
                      {"day": 21},
                      {"day": 22},
                      {"day": 23},
                      {"day": 24},
                      {"day": 25},
                      {"day": 26},
                      {"day": 27},
                      {"day": 28},
                      {"day": 29},
                      {"day": 30},
                      {"day": 31}],
      years: [],
      date: {
        day: '',
        month: '',
        year: ''
      },
      nameValidation: false,
      nameBlankValidation: false,
      emailValidation: false,
      phoneValidation: false,
      phoneBlankValidation: false,
      dobValidation: false,
      customerData: {
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
          SkLength: ''
        }
      },
      params: this.$route.params.custID
    }
  },
  methods: {
    calculateYear: function () {
      var d = new Date();
      var year = d.getFullYear();
      for (let i=0;i<100;i++) {
        this.years.push({"year": year})
        year -= 1
      }
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

      this.getCustomer();

    },
    codeFilterDay: function(list, query) {
      var arr = [];
      query = query.toUpperCase();

      for(var i = 0; i < list.length; i++) {
        if(list[i].day.toString().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 32)
          break;
      }
      return arr;
    },
    dayCallback: function(item) {
      // console.log(item);
      console.log("working");
      // console.log("selected item " + JSON.stringify(item));
    },
    codeFilterMonth: function(list, query) {
      var arr = [];
      query = query.toUpperCase();
      for(var i = 0; i < list.length; i++) {
        if(list[i].month.toString().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 32)
          break;
      }
      return arr;
    },
    monthCallback: function(item) {
      // console.log(item);
      console.log("working");
      // console.log("selected item " + JSON.stringify(item));
    },
    codeFilterYear: function(list, query) {
      var arr = [];
      query = query.toUpperCase();

      for(var i = 0; i < list.length; i++) {
        if(list[i].year.toString().indexOf(query) !== -1)
          arr.push(list[i]);
        if(arr.length > 32)
          break;
      }
      return arr;
    },
    yearCallback: function(item) {
      // console.log(item);
      console.log("working");
      // console.log("selected item " + JSON.stringify(item));
    },
    saveCustomer: function () {
      var data = this.customerData
      delete data.createdAt
      delete data.updatedAt

      var data = this.customerData

      this.nameValidation = false;
      this.nameBlankValidation = false;
      this.emailValidation = false;
      this.phoneValidation = false;
      this.phoneBlankValidation = false;
      this.dobValidation = false;
      var nameValidated = false;
      var phoneValidated = false;
      var emailValidated = false;
      var dobValidated = false;

      // Name Validation
      if (this.customerData.name.toString().trim() == "") {
        this.nameBlankValidation = true
        data.name = ''
      } else {
        if(!/^[a-zA-Z ]+$/.test(data.name)){
          this.nameValidation = true
          data.name = ''
        } else {
          this.nameValidation = false
          nameValidated = true
        }
      }

      // Email Validation
      if (this.customerData.email.toString().trim() == "") {
        emailValidated = true;
      } else {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.customerData.email))
          {
            this.emailValidation = true
            this.customerData.email = ''
          } else {
            this.emailValidation = false
            emailValidated = true
          }
      }

      // Phone validations
      try {
        var cPhone = this.customerData.phone.toString().trim();
      } catch (e) {
        var cPhone = this.customerData.phone;
      }
      if ( cPhone == '') {
        this.phoneBlankValidation = true
        this.customerData.phone = ''
      } else {
        if (!/^\d+$/.test(cPhone)) {
          this.phoneValidation = true
          this.customerData.phone = ''
        } else {
            if (this.customerData.phone.length < 7 || this.customerData.phone.length > 12) {
              this.phoneValidation = true
              this.customerData.phone = ''
            } else {
              this.phoneValidation = false
              phoneValidated = true
            }
        }
      }


      // Date Validation
      if (this.date.day.toString().trim() == '' && this.date.month.toString().trim() == '' && this.date.year.toString().trim() == '') {
        dobValidated = true
      } else if (this.date.day.toString().trim() != '' && this.date.month.toString().trim() != '' && this.date.year.toString().trim() != '') {
        let dayValidated = false
        let monthValidated = false
        let yearValidated = false

        // Day Validation
        if (!/^\d+$/.test(this.date.day.toString().trim())) {
            dobValidated = false
            this.dobValidation = true
            this.date = {day:'', month: '', year: ''}
          } else if (this.date.day.toString().trim() >0 && this.date.day.toString().trim() < 32) {
            dayValidated = true
          } else {
            this.dobValidation = true
            this.date = {day:'', month: '', year: ''}
          }

        // Month validation
        if (!/^\d+$/.test(this.date.month.toString().trim())) {
            dobValidated = false
            this.dobValidation = true
            this.date = {day:'', month: '', year: ''}
          } else if (this.date.month.toString().trim() >0 && this.date.month.toString().trim() < 13) {
              monthValidated  = true
          } else {
              this.dobValidation = true
              this.date = {day:'', month: '', year: ''}
          }

        // Year validation
        if (!/^\d+$/.test(this.date.year.toString().trim())) {
            dobValidated = false
            this.dobValidation = true
            this.date = {day:'', month: '', year: ''}
          } else if (this.date.year.toString().trim() <= 2018) {
            yearValidated = true
          } else {
            this.dobValidation = true
            this.date = {day:'', month: '', year: ''}
          }

        // Check All
        if (dayValidated && monthValidated && yearValidated) {
          console.log(dayValidated, monthValidated, yearValidated);
          var myDate = parseInt(this.date.year.toString().trim()) + '-' + parseInt(this.date.month.toString().trim()) + '-' + parseInt(this.date.day.toString().trim())
          var dateObj = new Date(myDate)
          if (dateObj.getMonth() + 1 != this.date.month) {
            this.dobValidation = true
            return
          } else {
              dobValidated = true
          }
        }

      } else {
        this.dobValidation = true
        dobValidated = false
      }
      // New Date validation ends here

      if (nameValidated == true && phoneValidated == true && emailValidated == true && dobValidated == true) {
        var customerURL = this.apiURL + 'customer/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;

        // data.dob =   this.date.year + '/' + this.date.month + '/' +  this.date.day;
        // if (this.date.day == '') {
        //     data.dob = ''
        // }

        // Date format
        if (this.date.year) {
            data.dob =  this.date.year + '-' + this.date.month + '-' +  this.date.day;
        } else {
          data.dob = null
        }


        this.$http.put(customerURL, data).then(response => {
          // console.log(response);
          // location.href = '/customer/'+response.body._id;
          var redirectURL = '/customer/'+response.body._id
          Router.push(redirectURL)

        }, response => {
          console.log(response)
        })
      }
    },
    getCustomer: function () {
      if (this.params) {
        var customerURL = this.apiURL + 'customer/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.get(customerURL).then(response => {
          this.customerData = response.body;
          if (this.customerData.dob) {
            var tempDate = moment(String(this.customerData.dob)).format('DD-MM-YYYY');
            this.date.day = tempDate.split('-')[0]
            this.date.month = tempDate.split('-')[1]
            this.date.year = tempDate.split('-')[2]
          }
        }, response => {
          console.log(response)
        })
      }
    }
  },
  created() {
    this.getCookie();
    this.calculateYear();
  },
  watch: {
    customerData: {
      handler : function (val) {

        // For Jacket Front Length
        if (val.measurements.jacketFrontLength.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.jacketFrontLength = '';
        } else if (val.measurements.jacketFrontLength.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.jacketFrontLength.toString().trim())) {
            val.measurements.jacketFrontLength = '';
          } else {

          }
        }

        // For Jacket Back Length
        if (val.measurements.jacketBackLength.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.jacketBackLength = '';
        } else if (val.measurements.jacketBackLength.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.jacketBackLength.toString().trim())) {
            val.measurements.jacketBackLength = '';
          } else {

          }

        }

        // For Vest Length
        if (val.measurements.vestLength.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.vestLength = '';
        } else if (val.measurements.vestLength.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.vestLength.toString().trim())) {
            val.measurements.vestLength = '';
          } else {

          }
        }

        // For Shoulder
        if (val.measurements.shoulder.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.shoulder = '';
        } else if (val.measurements.shoulder.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.shoulder.toString().trim())) {
            val.measurements.shoulder = '';
          } else {

          }
        }

        // For Jacket SL length
        if (val.measurements.jktSlLength.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.jktSlLength = '';
        } else if (val.measurements.jktSlLength.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.jktSlLength.toString().trim())) {
            val.measurements.jktSlLength = '';
          } else {

          }
        }

        // For whole Chest
        if (val.measurements.wholeChest.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.wholeChest = '';
        } else if (val.measurements.wholeChest.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.wholeChest.toString().trim())) {
            val.measurements.wholeChest = '';
          } else {

          }
        }

        // Front Chest
        if (val.measurements.frontChest.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.frontChest = '';
        } else if (val.measurements.frontChest.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.frontChest.toString().trim())) {
            val.measurements.frontChest = '';
          } else {

          }

        }

        // Back Chest
        if (val.measurements.backChest.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.backChest = '';
        } else if (val.measurements.backChest.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.backChest.toString().trim())) {
            val.measurements.backChest = '';
          } else {

          }
        }

        // Chest vertical
        if (val.measurements.chestVertical.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.chestVertical = '';
        } else if (val.measurements.chestVertical.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.chestVertical.toString().trim())) {
            val.measurements.chestVertical = '';
          } else {

          }
        }

        // Chest Horizontal
        if (val.measurements.chestHorizontal.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.chestHorizontal = '';
        } else if (val.measurements.chestHorizontal.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.chestHorizontal.toString().trim())) {
            val.measurements.chestHorizontal = '';
          } else {

          }
        }

        // Front Chest Part
        if (val.measurements.frtChestPart.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.frtChestPart = '';
        } else if (val.measurements.frtChestPart.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.frtChestPart.toString().trim())) {
            val.measurements.frtChestPart = '';
          } else {

          }
        }

        // Back Chest part
        if (val.measurements.backChestPart.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.backChestPart = '';
        } else if (val.measurements.backChestPart.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.backChestPart.toString().trim())) {
            val.measurements.backChestPart = '';
          } else {

          }
        }

        // Waist
        if (val.measurements.waist.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.waist = '';
        } else if (val.measurements.waist.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.waist.toString().trim())) {
            val.measurements.waist = '';
          } else {

          }

        }

        // shirt collor
        if (val.measurements.shirttCollor.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.shirttCollor = '';
        } else if (val.measurements.shirttCollor.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.shirttCollor.toString().trim())) {
            val.measurements.shirttCollor = '';
          } else {

          }

        }

        // arm
        if (val.measurements.arm.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.arm = '';
        } else if (val.measurements.arm.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.arm.toString().trim())) {
            val.measurements.arm = '';
          } else {

          }
        }

        // forearm
        if (val.measurements.forearm.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.forearm = '';
        } else if (val.measurements.forearm.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.forearm.toString().trim())) {
            val.measurements.forearm = '';
          } else {

          }
        }

        // wrist
        if (val.measurements.wrist.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.wrist = '';
        } else if (val.measurements.wrist.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.wrist.toString().trim())) {
            val.measurements.wrist = '';
          } else {

          }
        }

        //Shirt SL length
        if (val.measurements.shirtSlLength.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.shirtSlLength = '';
        } else if (val.measurements.shirtSlLength.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.shirtSlLength.toString().trim())) {
            val.measurements.shirtSlLength = '';
          } else {

          }
        }

        // SK size
        if (val.measurements.SkSize.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.SkSize = '';
        } else if (val.measurements.SkSize.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.SkSize.toString().trim())) {
            val.measurements.SkSize = '';
          } else {

          }
        }

        //SK length
        if (val.measurements.SkLength.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.SkLength = '';
        } else if (val.measurements.SkLength.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.SkLength.toString().trim())) {
            val.measurements.SkLength = '';
          } else {

          }
        }

        // height
        if (val.measurements.height.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.height = '';
        } else if (val.measurements.height.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.height.toString().trim())) {
            val.measurements.height = '';
          } else {

          }
        }

        // Dress Length
        if (val.measurements.dressLength.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.dressLength = '';
        } else if (val.measurements.dressLength.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.dressLength.toString().trim())) {
            val.measurements.dressLength = '';
          } else {

          }
        }

        // Female Blouse Collar
        if (val.measurements.femaleBlouseCollor.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.femaleBlouseCollor = '';
        } else if (val.measurements.femaleBlouseCollor.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.femaleBlouseCollor.toString().trim())) {
            val.measurements.femaleBlouseCollor = '';
          } else {

          }
        }

        // Pant Waist
        if (val.measurements.pantWaist.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.pantWaist = '';
        } else if (val.measurements.pantWaist.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.pantWaist.toString().trim())) {
            val.measurements.pantWaist = '';
          } else {

          }
        }

        // Hip
        if (val.measurements.hip.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.hip = '';
        } else if (val.measurements.hip.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.hip.toString().trim())) {
            val.measurements.hip = '';
          } else {

          }
        }

        // Crotch
        if (val.measurements.crotch.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.crotch = '';
        } else if (val.measurements.crotch.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.crotch.toString().trim())) {
            val.measurements.crotch = '';
          } else {

          }
        }

        // PT Length
        if (val.measurements.ptLength.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.ptLength = '';
        } else if (val.measurements.ptLength.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.ptLength.toString().trim())) {
            val.measurements.ptLength = '';
          } else {

          }
        }

        // Thigh
        if (val.measurements.thigh.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.thigh = '';
        } else if (val.measurements.thigh.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.thigh.toString().trim())) {
            val.measurements.thigh = '';
          } else {

          }
        }


        // Hem
        if (val.measurements.hem.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.hem = '';
        } else if (val.measurements.hem.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.hem.toString().trim())) {
            val.measurements.hem = '';
          } else {

          }
        }

        // Shin
        if (val.measurements.shin.toString().trim().includes('-')) {
            alert("Negative value not allowed");
            val.measurements.shin = '';
        } else if (val.measurements.shin.toString().trim() == '0') {
            // alert("This is zero, disable neg button")
        } else {
          if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(val.measurements.shin.toString().trim())) {
            val.measurements.shin = '';
          } else {

          }
        }



      },
      deep: true
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
html {
overflow:   scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
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

</style>
