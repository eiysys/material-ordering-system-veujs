<template>
    <div id="content-div">
        <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
        <md-card style="height: -webkit-fill-available">
            <md-card-header>
                <div class="md-title">Alteration Purchase Order Portal</div>
            </md-card-header>
            <md-card-actions>
                <!-- <md-button href="/apo/new">New</md-button> -->
            </md-card-actions>
            <md-card-content>
                <label for="">From Date: </label>
                <input type="text" name="" value="" placeholder="MM-DD-YYYY" v-model="fromDate">
                <label for="">To Date: </label>
                <input type="text" name="" placeholder="MM-DD-YYYY" v-model="toDate">
                <button type="button" name="button" v-on:click="filterData" v-if="fromDate && toDate">Filter</button>
                <button type="button" name="button" v-on:click="filterData" v-if="!fromDate || !toDate" disabled>Filter</button>
                <br>
                <br>
                <md-button class="md-raised md-default pull-right" @click="generatePdf">PDF</md-button>
                <p class="text-danger" v-if="validDateRange"> Please enter valid date range</p>
                <br>
                <table id="example" class="table table-striped table-bordered" cellspacing="0">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>SO_NO</th>
                            <th>SO_row</th>
                            <th>Date</th>
                            <th>Staff</th>
                            <th>Arrived Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template>
                            <tr v-for="order in alterationOrders">
                                <template v-if="order.showAPO != false">
                                    <td>
                                        <router-link v-bind:to='"/apo/"+ order.code'>{{order.code}}</router-link>
                                        <!-- <a v-bind:href='"/apo/"+ order.code'>{{order.code}}</a> -->
                                    </td>
                                    <td>
                                        <router-link v-bind:to='"/sales/"+ order.SO'>{{order.SO}}</router-link>
                                        <!-- <a v-bind:href='"/sales/"+ order.SO'>{{order.SO}}</a> -->
                                    </td>
                                    <td>{{order.SO_row}}</td>
                                    <td>{{order.createdDate | formatDate}}</td>
                                    <td>{{order.staff}}</td>
                                    <td>{{order.arrived_date}}</td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
    export default {
        name: 'alteration-portal',
        data() {
            return {
                validDateRange: false,
                fromDate: '',
                toDate: '',
                alterationOrders: '',
                authData: '',
                tableRowCount: ''
            }
        },
        methods: {
            filterData: function() {

                this.validDateRange = false;
                var validDateRangeValidated = false;

                if (new Date(this.fromDate) == 'Invalid Date' || new Date(this.toDate) == 'Invalid Date') {
                    this.validDateRange = true
                } else {
                    validDateRangeValidated = true
                }

                if (validDateRangeValidated) {

                } else {
                    return
                }

                $('#poDashboardLoader').addClass('is-active');

                var table = $('#example').DataTable();
                table.destroy();

                let tempArray = []

                this.alterationOrders = []

                for (let j = 0; j < this.alterationMainOrders.length; j++) {
                    this.alterationOrders.push(this.alterationMainOrders[j])
                }

                for (let i = 0; i < this.alterationOrders.length; i++) {
                    var pDate = new Date(this.fromDate);
                    var nDate = new Date(this.toDate);
                    var yDate = new Date(this.alterationOrders[i].createdDate)
                    yDate.setHours(0, 0, 0, 0);

                    if (yDate >= pDate && yDate <= nDate) {
                        console.log('a');
                        tempArray.push(this.alterationOrders[i])
                    }
                }
                console.log(tempArray);
                this.alterationOrders = tempArray;

                setTimeout(function() {
                    $('#example').DataTable({
                        "order": [
                            [0, "desc"]
                        ],
                        dom: 'Bfrtip',
                        buttons: [{
                            extend: 'excelHtml5',
                            title: 'customers'
                        }],
                        columnDefs: [{
                            "searchable": false,
                            "targets": 1
                        }]
                    });
                    $('#poDashboardLoader').removeClass('is-active');
                }, 500)

            },
            getCookie: function() {
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

                var userData = getCookie('userData');
                this.authData = JSON.parse(userData);
                this.getAllAlterationOrders();

            },
            getAllAlterationOrders: async function() {
                var allAlterationOrder = [];

                var url = this.apiURL + 'api/alteration-order/?' + 'token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id

                await this.$http.get(url).then(response => {
                    allAlterationOrder = response.body;
                    this.tableRowCount = response.body.length;
                    // this.dtablefun()
                }, response => {
                    console.log(response);
                })

                // Get Staff
                var staffDataOne;
                var staffURL = this.apiURL + 'staff/' + this.authData._id + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
                await this.$http.get(staffURL).then(response => {
                    staffDataOne = response.body;
                }, response => {
                    console.log(response)
                })

                var isSales = false
                    // Check role of user is sales or not
                for (let i = 0; i < staffDataOne.role.length; i++) {
                    if (staffDataOne.role[i] == 'sales') {
                        isSales = true
                    }
                }

                // If sales
                if (isSales) {
                    // Information Barrier code here

                    // Get Departments related to user
                    var filteredDeptID = [];
                    for (let j = 0; j < staffDataOne.department.length; j++) {
                        filteredDeptID.push(staffDataOne.department)
                    }
                    filteredDeptID = filteredDeptID.join()

                    var customerURL = this.apiURL + 'salesOrder/searchByID/' + filteredDeptID + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;

                    var filteredSalesOrderNumber = []

                    await this.$http.get(customerURL).then(response => {
                        // this.salesOrderData = response.body;
                        for (let k = 0; k < response.body.length; k++) {
                            filteredSalesOrderNumber.push(response.body[k]._id)
                        }
                        // this.paymentHistory = response.body.payment;
                    }, response => {
                        console.log(response);
                    })

                    for (let l = 0; l < allAlterationOrder.length; l++) {
                        if (filteredSalesOrderNumber.indexOf(allAlterationOrder[l].SO) != -1) {
                            allAlterationOrder[l].showAPO = true
                        } else {
                            allAlterationOrder[l].showAPO = false
                        }
                    }
                    console.log("final data");
                    console.log(allAlterationOrder);
                    this.alterationOrders = allAlterationOrder;
                } else {
                    console.log(allAlterationOrder)
                        // Show all data
                    this.alterationOrders = allAlterationOrder;
                }

                this.alterationMainOrders = allAlterationOrder;
                console.log(this.alterationMainOrders);

                this.dtablefun()
                setTimeout(function() {
                    $('#poDashboardLoader').removeClass('is-active');
                }, 1000)

            },

            dtablefun: function() {
                var dataRow = this.tableRowCount;
                setTimeout(function() {
                    var rowCount = $('#example tr').length;
                    if (rowCount >= dataRow) {
                        $('#example').DataTable({
                            "order": [
                                [0, "desc"]
                            ],
                            dom: 'Bfrtip',
                            buttons: [{
                                extend: 'excelHtml5',
                                title: 'APO_portal'
                            }],
                            columnDefs: [{
                                "searchable": false,
                                "targets": 1
                            }]
                        });
                    } else {
                        this.dtablefun();
                    }
                }, 10)
            },

            generatePdf: async function functionName() {

            var pdfURL = this.apiURL + 'api/alteration-order-pdf/?' + 'token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id


            var filepath = ''

              await this.$http.get(pdfURL).then(response => {
        filepath = response.body.filename.replace('./public/', '');
      }, response => {
        console.log('ds');
        console.log(response);
      })
      var fileURL = this.apiURL +  filepath;
      window.open(fileURL, '_blank');
            },
        },
        mounted() {
            this.getCookie()
        }
    }
</script>

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
