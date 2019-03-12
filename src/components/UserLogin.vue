<template>
  <div>
      <div>
        <p id="error">{{ logindata.error }}</p>
              <md-layout md-tag="form" novalidate md-align="center">
                <md-layout md-tag="md-card" md-column md-flex="30" md-flex-medium="40" md-flex-small="60" md-flex-xsmall="90" class="md-default">
                  <md-card-header>
                    <div class="md-title">User Login</div>
                    <div class="md-subhead">Pursuit Ordering System</div>
                  </md-card-header>
                  
                  <md-card-content>
                    <md-input-container>
                      <md-icon>person</md-icon>
                      <label>Email</label>
                      <md-input email required v-model="logindata.email" />
                    </md-input-container>

                    <md-input-container md-has-password>
                      <md-icon>lock</md-icon>
                      <label>Password</label>
                      <md-input type="password" required v-model="logindata.password" />
                    </md-input-container>
                  </md-card-content>

                  <md-card-actions md-align="center">
                    <md-button v-on:click.prevent="post">Login</md-button>
                    <md-button disabled>Register</md-button>
                  </md-card-actions>
                </md-layout>
              </md-layout>
      </div>
  </div>
</template>

<script>

export default {
  name: 'UserLogin',
  data () {
    return {
      msg: 'Welcome to User Login',
      logindata: {
        email: '',
        password: '',
        error: ''
      }
    }
  },
  methods: {
    post: function () {
      this.$http.post(this.apiURL + 'login', {
        email: this.logindata.email,
        password: this.logindata.password,
        remember: 1
      }).then(response => {
        location.href = '/'
      }, response => {
        this.logindata.error = response.body.message
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #error{
    color: red
  }
</style>
