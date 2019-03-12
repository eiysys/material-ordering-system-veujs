<template>
  <div id="content-div">
      <md-card>
        <img src="../assets/background.jpg" alt="" style="width:99%; height:100%" class="img img-responsive">
        <md-card-content style="width:70%">
          <i class="glyphicon glyphicon-copyright-mark"></i> Copyright 2018 Persuit Ordering System. All rights reserved.
        </md-card-content>
      </md-card>
  </div>
</template>


<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
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
        // console.log("User is Authenticated");
      }
    },
    showPanel: function () {
      if( $("#fadeout").css('display') == 'none') {
        location.reload();
      }
    },
  },
  created: function () {
    this.checkCookieForUser();
    this.showPanel();
  }
}

</script>

<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px;
  height: 100%
}
html {
overflow:   scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}

</style>
