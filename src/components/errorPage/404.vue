<template>
  <div id="content-div">
    <div style="padding-top:20%; background-color:white; height: -webkit-fill-available">
      <div style="font-size:150px" class="text-center"><img src="/static/images/error-icon.png" style="max-height:100px; max-width:100px"> 404</div> <br><br><br><br>
      <div class="text-center" style="font-size:50px">Unauthorised Access</div>
      <div class="text-center"><br><br>
        Go to <a href="/login">Login </a>page
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {

    }
  },
  methods: {
    fadePanel: function () {
      $("#fadeout").hide();
      $("#poDashFull").css('margin-left',0);
    },
  },
  mounted: function () {
    this.fadePanel();
  }
}
</script>

<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
  .content {
    background-color: white
  }
  #po-dashboard {
    background-color: white
  }
</style>
