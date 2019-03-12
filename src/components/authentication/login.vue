<template>
    <div id="content-div" style="margin-top:10%">
        <div class="row" style="height:-webkit-fill-available;" id="logindiv">
            <div class="col-md-4">

            </div>
            <div class="col-md-4">
                <md-card>
                    <md-card-content>
                        <div class="text-center">
                            <h1> </h1>
                            <div><img src="../../assets/persuit-logo.png" class="img img-responsive" width="250" height="70" style="margin-left:20%" /></div>
                            <h2>Login</h2>
                            <br>
                            <div class="col-md-1">

                            </div>
                            <div class="col-md-10">
                                <div class="text-center">
                                    <p class="text-danger" v-if="fieldError.email">Required: Please enter email address</p>
                                    <p class="text-danger" v-if="fieldError.password">Required: Please enter password</p>
                                    <p class="text-danger" v-if="fieldError.singleEmail">Email is not registered</p>
                                    <p class="text-success" v-if="successmsg">Check your mail for new password</p>
                                    <p class="text-danger text-left">{{error_msg}}</p>
                                </div>
                                <div v-if="!show">
                                    <form validate @submit.stop.prevent="loginStaff" id="loginForm">
                                        <!-- Login Successful Message -->
                                        <p v-if="login_successful" class="text-success">Login Successful</p>
                                        <!-- Input Box Error -->
                                        <md-input-container>
                                            <md-icon>email</md-icon>
                                            <label>Email</label>
                                            <md-input type="email" v-model="staffData.email" v-on:keyup="checkmail"></md-input>
                                        </md-input-container>

                                        <md-input-container md-has-password>
                                            <md-icon>vpn_key</md-icon>
                                            <label>Password</label>
                                            <md-input type="password" v-model="staffData.password"></md-input>
                                        </md-input-container>
                                        <br>
                                        <md-button class="md-raised md-primary" type="submit">Login</md-button>

                                    </form>
                                    <a href="#" v-on:click.prevent="show = !show">Forgot Password</a>
                                </div>

                                <transition name="fade">
                                    <template v-if="show">
                                        <div class="">
                                            <form validate @submit.stop.prevent="resetPassword">
                                                <md-input-container>
                                                    <md-icon>email</md-icon>
                                                    <label>Email</label>
                                                    <md-input type="email" v-model="staffData.email" v-on:keyup="checkmail"></md-input>
                                                </md-input-container>
                                                <md-button class="md-raised md-primary" type="submit">Reset</md-button>
                                            </form>
                                            <p><a href="#" v-on:click.prevent="show = !show">Login </a>again</p>
                                        </div>
                                    </template>
                                </transition>
                            </div>
                            <div class="col-md-1">
                                <span> </span>
                            </div>

                        </div>

                    </md-card-content>
                </md-card>
            </div>
            <div class="col-md-4">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                successmsg: false,
                show: false,
                showModal: false,
                fieldError: {
                    email: false,
                    password: false,
                    singleEmail: false
                },

                staffData: {
                    email: '',
                    password: '',
                },

                error_msg: '',
                LPO_order: '',
                login_successful: false
            }
        },
        methods: {
            resetPassword: async function() {
                // Validation
                if (this.staffData.email == "") {
                    console.log("validation start");
                    this.fieldError.email = false;
                    this.fieldError.password = false;
                    this.fieldError.singleEmail = false;

                    if (this.staffData.email == "") {
                        this.fieldError.email = true
                    }
                } else {
                    this.error_msg = '';
                    this.fieldError.email = false;
                    this.fieldError.password = false;
                    this.fieldError.singleEmail = false;

                    // Update Password
                    this.$http.post(this.apiURL + 'forgot', {
                        "email": this.staffData.email
                    }).then(response => {
                        this.error_msg = ''
                        this.successmsg = true
                        console.log(response);
                    }, response => {
                        console.log("error");
                        console.log(response);
                        this.error_msg = response.body.message;
                    })
                }
            },
            checkmail: function() {
                alert("Hello")
            },
            loginStaff: async function() {
                if (this.staffData.email == "" || this.staffData.password == "") {
                    this.error_msg = '';
                    this.fieldError.email = false;
                    this.fieldError.password = false;
                    this.fieldError.singleEmail = false;

                    if (this.staffData.email == "") {
                        this.fieldError.email = true
                    }
                    if (this.staffData.password == "") {
                        this.fieldError.password = true
                        if (this.staffData.email == "") {

                        } else {
                            var isEmailvalid = false;
                            var url = this.apiURL + 'staff';
                            var found = false;
                            await this.$http.get(url).then(response => {
                                for (let i = 0; i < response.body.length; i++) {
                                    if (response.body[i].email == this.staffData.email) {
                                        found = true;
                                    }
                                }
                            }, response => {
                                console.log(response)
                            })
                            if (found == true) {

                            } else {
                                this.fieldError.singleEmail = true;
                            }
                        }
                    }
                } else {
                    this.error_msg = '';
                    this.fieldError.email = false;
                    this.fieldError.password = false;
                    this.fieldError.singleEmail = false;
                    this.$http.post(this.apiURL + 'login', this.staffData).then(response => {
                        this.error_msg = ''
                            // Calculate Date for cookie expiraton
                        var date = new Date();
                        date.setDate(date.getDate() + 1);
                        // Save User Data to Cookie
                        var data = {
                            _id: response.body._id,
                            passwordHash: response.body.passwordHash,
                            role: response.body.role,
                            name: response.body.name
                        }
                        document.cookie = 'userData=' + JSON.stringify(data) + ';expires=' + date.toGMTString() + ';path=/';
                        this.login_successful = true;
                        // alert("Testing")
                        // Redirect to Home page after saving data to cookie
                        var redirectURL = this.clientURL
                        setTimeout(function() {
                            window.location = redirectURL;
                        }, 1000);

                    }, response => {
                        // Error Checking Password else Email
                        if (response.body.message == "The email address or password you entered is not valid") {
                            this.error_msg = response.body.message;
                        } else if (response.body.message == "The email address or password you entered is not valid") {
                            this.error_msg = response.body.message;
                        }
                    })
                }
            },
            fadePanel: function() {
                $("#fadeout").hide();
                $("#poDashFull").css('margin-left', 0);
            },
        },
        mounted: function() {
            this.fadePanel();
        }
    }
</script>

<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
    #content-div {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    html {
        overflow: scroll;
    }

    ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
        /* make scrollbar transparent */
    }

    #logindiv {
        height: -webkit-fill-available;
    }

    @media screen and (min-width: 480px) {
        body {
            background-color: lightgreen;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */

    {
        opacity: 0
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-in .0s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
