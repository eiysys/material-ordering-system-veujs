<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Customer Question Answers</div>
      </md-card-header>
   
      <md-card-content>
        <br>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <md-card>
                <md-card-header>
                  <h4>Customer Question Answers</h4>
                </md-card-header>
                <md-card-content>

                  <div class="row quesrow" v-for="ques in QueAnsCustData.questions" style="padding-bottom: 30px;">
                    <div class="col-md-12">
                      <strong>Question :</strong> {{ques.question}}
                    </div>
                    <div class="col-md-12">
                      <strong>Answer:</strong>   {{ques.answer}}
                    </div>
                  </div>

                

                  
                </md-card-content>
              </md-card>
            </div>
         
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'customer-quesAns',
  data () {
    return {
      customerData: {
        _id: '',
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
          SkLength: '',
          height: '',
          dressLength: '',
          femaleBlouseCollor: '',
          pantWaist: '',
          hip: '',
          crotch: '',
          ptLength: '',
          thigh: '',
          shin: '',
          hem: ''
        }
      },
      params: this.$route.params.custID,
      QueAnsCustData :[]
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

      this.getQueAnsCust();

    },
    getQueAnsCust: function () {
      if (this.params) {

        var customerURL = this.apiURL + 'api/cquestionnaire/list/' + this.params + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        //console.log(customerURL);
        this.$http.get(customerURL).then(response => {
        
          if(response.body.error){
               console.log('s');
               this.QueAnsCustData = [];               
          }else{
              this.QueAnsCustData = response.body.data;
          }

          console.log('data');
         console.log(this.QueAnsCustData.questions);
         

          console.log(this.QueAnsCustData);
        }, response => {
          console.log(response)
        })
      }
    }
  },
  created() {
    this.getCookie()
  }
}

</script>
<!-- Add "scoped" attr  ibute to limit CSS to this component only -->
<style scoped>
#content-div{
  margin-top: 10px;
  margin-bottom: 10px
}

.infoPad {
  padding-top: 10px
}
</style>
