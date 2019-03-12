<template>
  <div id="app">
    <ul class="sidenav" id="fadeout">
      <div style="padding:10px; margin-top:10px">
        <img src="./assets/persuit-logo.png" class="img img-responsive">
      </div>
      <br>
      <h5 class="text-center"><strong>Hi, {{username}}</strong></h5>
      <!-- <md-icon md-src="./assets/persuit-logo.png"></md-icon> -->
      <md-list>
        <md-list-item>
          <router-link to="/">Home</router-link>
        </md-list-item>
        <md-list-item id="hidePurchase">
          Purchase
          <md-list-expand>
            <md-list>
                <md-list-item class="md-inset" id="hideCreateVendor">
                  <router-link to="/vendor">Vendor</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/vendor-portal">Vendor Portal</router-link>
                </md-list-item>
                <md-list-item class="md-inset" id="hideCreateFabric">
                  <router-link to="/fabric">Fabric</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/fabric-portal">Fabric Portal</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/fpo-portal">FPO</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/lpo-portal">LPO</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/apo-portal">APO</router-link>
                </md-list-item>
            </md-list>
          </md-list-expand>
        </md-list-item>
        <md-list-item>
          Customer
          <md-list-expand>
            <md-list>
                <md-list-item class="md-inset">
                  <router-link to="/customer">Customer</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/customer-portal">Customer Portal</router-link>
                </md-list-item>
            </md-list>
          </md-list-expand>
        </md-list-item>
        <md-list-item id="hideSales">
          Sales
          <md-list-expand>
            <md-list>
                <md-list-item class="md-inset" id="hideCreate">
                  <router-link to="/sales">Sales Order</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/sales-portal">Sales Portal</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/questionnaire">Customer Questionnaire</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/questionnaireportal">Questionnaire Portal</router-link>
                </md-list-item>
                <!-- fabric images -->
                <md-list-item class="md-inset" id="hideCreate">
                  <router-link to="/fabric-images">Fabric Images</router-link>
                </md-list-item>

                <!-- end fabric images -->
            </md-list>
          </md-list-expand>
        </md-list-item>
        <md-list-item id="hideSystemSetting">
          System Setting
          <md-list-expand>
            <md-list>
                <md-list-item class="md-inset">
                  <router-link to="/staff">Staff</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/staff-portal">Staff Portal</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/department">Department</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link to="/department-portal">Department Portal</router-link>
                </md-list-item>
            </md-list>
          </md-list-expand>
        </md-list-item>
        <md-list-item id="hideDashboard">
          <router-link to="/po-dashboard">PO-Dashboard</router-link>
        </md-list-item>
        <md-list-item v-on:click="logout">
          Log Out
        </md-list-item>
      </md-list>
    </ul>
    <div class="content" id="poDashFull">
      <router-view></router-view>
    </div>
    <!-- <img src="./assets/logo.png"> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      username: 'admin'
    }
  },
  methods:{

    checkCookieForUser: function () {
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
      if (getCookie('userData') == '') {
        window.location = this.clientURL + 'login';
      } else {
        console.log("username");
        var tempA = getCookie('userData');
        var parsed = JSON.parse(tempA);
        this.username = parsed.name;
        this.displaySidePanel()
      }
    },
    checkForHiddenPanel: function () {
      let pagePath = this.$route.fullPath;
      if (pagePath == '/login') {

      } else if (pagePath == '/po-dashboard') {

      } else {
        if( $('#fadeout').css('display') != 'none' )  {
            /*success*/
        }
        else {
            /*does not have*/
            // location.reload();
            // $('#fadeout').css('display', "")
            // $("#poDashFull").css('margin-left', "25px");
        }
      }
    },
    displaySidePanel: function () {
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

      // Get User Role
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
      // Give Access to side panel

      // For admin
      if (isAdmin) {
        // Nothing to hide
      }

      // For sales staff
      else if (isSales && isPurchasing == false) {
        // Hide Items
        $("#hideCreateVendor").hide()
        $("#hideCreateFabric").hide()
        $("#hideSystemSetting").hide()
        // $("#hidePurchase").hide()

        // Restrict user to access purchase pages
        var url = this.$route.fullPath
        var l_url = url.split("/")

        if (l_url[1] == 'staff' || l_url[1] == 'staff-portal' || l_url[1] == 'department' || l_url[1] == 'department-portal') {
          var delete_cookie = function(name) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            };

          delete_cookie('userData');
          window.location = '/error-404'
        }

        // Restrict to vendor create and modify
        if (l_url[1] == 'vendor' ) {
          if (l_url[2] == undefined || l_url[2] == "edit" || l_url[2] == "") {
            var delete_cookie = function(name) {
                  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              };

            delete_cookie('userData');
            window.location = '/error-404'
          }
        }

        if (l_url[1] == 'fabric' ) {
          if (l_url[2] == undefined || l_url[2] == "edit" || l_url[2] == "") {
            var delete_cookie = function(name) {
                  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              };

            delete_cookie('userData');
            window.location = '/error-404'
          }
        }

        if (l_url[1] == 'fpo' ) {
          if (l_url[2] == undefined || l_url[2] == "edit" || l_url[2] == "") {
            var delete_cookie = function(name) {
                  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              };

            delete_cookie('userData');
            window.location = '/error-404'
          }
        }

        if (l_url[1] == 'lpo' ) {
          if (l_url[2] == undefined || l_url[2] == "edit" || l_url[2] == "") {
            var delete_cookie = function(name) {
                  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              };

            delete_cookie('userData');
            window.location = '/error-404'
          }
        }

        if (l_url[1] == 'apo' ) {
          if (l_url[2] == undefined || l_url[2] == "edit" || l_url[2] == "") {
            var delete_cookie = function(name) {
                  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              };

            delete_cookie('userData');
            window.location = '/error-404'
          }
        }
      }

      // For Purchase
      else if (isPurchasing && isSales == false) {
        console.log("purchase staff");
        // Hide Items
        $("#hideSystemSetting").hide()
        $("#hideCreate").hide()

        var url = this.$route.fullPath
        var l_url = url.split("/")
        if (l_url[1] == 'staff' || l_url[1] == 'staff-portal' || l_url[1] == 'department' || l_url[1] == 'department-portal' ) {
          var delete_cookie = function(name) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            };

          delete_cookie('userData');
          window.location = '/error-404'
        }

        // || l_url[1] == 'sales' || l_url[1] == 'sales-portal'

        if (l_url[1] == 'sales' ) {
          if (l_url[2] == undefined || l_url[2] == "edit" || l_url[2] == "") {
            var delete_cookie = function(name) {
                  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              };

            delete_cookie('userData');
            window.location = '/error-404'
          }
        }


      }

      // For Both Purchase and Sales
      else if (isPurchasing && isSales) {
        // Hide Items
        $("#hideSystemSetting").hide()

        // Restrict user to access system setting pages
        var url = this.$route.fullPath
        var l_url = url.split("/")

        if (l_url[1] == 'staff' || l_url[1] == 'staff-portal' || l_url[1] == 'department' || l_url[1] == 'department-portal') {
          var delete_cookie = function(name) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            };

          delete_cookie('userData');
          window.location = '/error-404'
        }

      }

      // End of Access Side Panel

    },
    logout: function () {
      // Delete Cookie and logout the user
      var delete_cookie = function(name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };

        delete_cookie('userData');
        // refresh the page
        window.location = '/login'
    }
  },
  mounted() {
    if (this.$route.fullPath == '/login') {

    } else if (this.$route.fullPath == '/error-404') {

    } else {
      this.checkCookieForUser()
    }
  },
  updated() {
    if (this.$route.fullPath == '/login') {

    } else if (this.$route.fullPath == '/error-404') {

    } else {
      this.displaySidePanel()
      this.checkForHiddenPanel()
      console.log("Page Changed")
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
}
body {margin: 0;
background: grey}

ul.sidenav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 20%;
    position: absolute;
    height: 100%;
    overflow: auto;
    background-color: white;
}

ul.sidenav li a {
    display: block;
    color: #001a33;
    padding: 8px 16px;
    text-decoration: none;
}

ul.sidenav li a.active {
    background-color: #001a33;
    color: white;
    text-decoration: none;
}

ul.sidenav li a:hover:not(.active) {
    background-color: #001a33;
    color: Black;
    text-decoration: none;
}

html, body {
    height:100%;
}

div.content {
    margin-left: 20%;
    padding: 1px 16px;
    background-color: #D5DBDB;
    height: -webkit-fill-available;
}

@media screen and (max-width: 900px) {
    ul.sidenav {
        width: 100%;
        height: auto;
        position: relative;
    }
    ul.sidenav li a {
        float: left;
        padding: 15px;
    }
    div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
    ul.sidenav li a {
        text-align: center;
        float: none;
    }
}

html {
overflow:   scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}

</style>
