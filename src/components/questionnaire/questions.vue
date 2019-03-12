<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Questionnaire</div>
      </md-card-header>
      <md-card-actions>
        <md-button href="/addquestionnaire">New</md-button>

      </md-card-actions>
      <br>
      <md-card-content>
        <md-stepper @completed="SaveQuestionnaire">
        <md-step md-label="Customer" >
          <div class="text-center">
            <!-- <h4>Customer Details<span style="color:red; font-size:15px" v-if="error"> - No Record Found</span> </h4> -->
            <span style="color:red; font-size:15px" v-if="error"> No Record Found</span>
          </div>
          <br>
          <div class="row">
            <div class="col-md-6">
              <input class="searchbox" type="number" maxlength=10 placeholder="Customer Phone" v-model="searchInput" v-on:keyup.enter="searchCustomer"> <button @click="searchCustomer">Search</button>
              <button @click="clearSearch">Clear</button>
            </div>
          </div>
          <br>
          <div class="row" style="font-size:15px">
            <div class="col-md-4 botmargin">
              <md-input-container>
                <label>Name</label>
                <md-input v-model="customerData.name" disabled style="text-transform: capitalize;">></md-input>
              </md-input-container>
            </div>
            <div class="col-md-4 botmargin">
              <md-input-container>
                <label>Occupation</label>
                <md-input v-model="customerData.occupation" disabled></md-input>
              </md-input-container>
            </div>
            <div class="col-md-4 botmargin">
              <md-input-container>
                <label>Office Address</label>
                <md-input v-model="customerData.officeAddress" disabled></md-input>
              </md-input-container>
            </div>
            <div class="col-md-4 botmargin">
              <md-input-container>
                <label>Phone No</label>
                <md-input v-model="customerData.phone" disabled></md-input>
              </md-input-container>
            </div>
            <div class="col-md-4 botmargin">
              <md-input-container>
                <label>Date of Birth</label>
                <md-input v-model="customerData.dob" type="text" disabled></md-input>
              </md-input-container>
            </div>
            <div class="col-md-4 botmargin">
              <md-input-container>
                <label>Delivery Address</label>
                <md-input v-model="customerData.deliveryOffice" disabled></md-input>
              </md-input-container>
            </div>
            <div class="col-md-4 botmargin">
              <md-input-container>
                <label>E-mail</label>
                <md-input v-model="customerData.email" disabled></md-input>
              </md-input-container>
            </div>
            <div class="col-md-4 botmargin">
              <md-input-container>
                <label>Refer By</label>
                <md-input v-model="customerData.referby" disabled></md-input>
              </md-input-container>
            </div>
          </div>
        </md-step>

        <md-step md-label="Questions" md-button-continue="Submit">
          <div v-for="(question, index) in questions">
            <div class="row">
                {{index+1}}. {{question.question}}
                <br>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="sel1">Options:</label>
                    <select class="form-control" id="sel1" v-model="question.answer">
                      <template  v-for="option in question.options">
                        <option>{{option.option}}</option>
                      </template>
                    </select>
                  </div>
                </div>
            </div>
            <br>
          </div>
        </md-step>
        </md-stepper>
      </md-card-content>
    </md-card>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'department',
  data () {
    return {
      answers: [],
      selected: '',
      error: false,
      searchInput: '',
      questions: '',
      customerData: {
        _id: '',
        name: '',
        occupation: '',
        phone: '',
        officeAddress: '',
        deliveryOffice: '',
        dob: '',
        email: '',
        referby: ''
      },
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
      this.getQuestions()
    },
    SaveQuestionnaire: function () {
      var customerId = this.customerData._id;
      var questionnaireData = []
      for (let i=0;i<this.questions.length; i++) {
        if(this.questions[i].answer != '') {
          questionnaireData.push({_id: this.questions[i]._id,
                                  question: this.questions[i].question,
                                  answer: this.questions[i].answer});
        }
      }
      var allData = {
        custID: customerId,
        questions: questionnaireData
      }

      var saveQuestionsURL = this.apiURL + 'api/cquestionnaire' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.post(saveQuestionsURL, allData).then(response => {
        window.location.replace('/sales')
      }, response => {
        console.log(response)
      })

      console.log(allData);

    },
    getQuestions: function () {
      var getQuestionsURL = this.apiURL + 'api/questionnaire' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(getQuestionsURL).then(response => {
        console.log(response);
        for (let i=0;i<response.body.length;i++) {
          response.body[i].answer = ''
        }
        this.questions = response.body;
        // window.location.href = '/#/department/'+ response.body._id;
      }, response => {
        console.log(response)
      })
    },
    searchCustomer: function () {
      var data = this.searchInput;
      var searchCustomerURL = this.apiURL + 'customer/search/'  + data + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(searchCustomerURL).then(response => {
        if(response.body){
          this.error = false;
          var data = response.body;
          // data.dob = moment(String(data.dob)).format('DD-MM-YYYY')
          var myDate = new Date(data.dob)
          var m = myDate.getMonth() + 1
          data.dob = m + '-' + myDate.getDate() + '-' + myDate.getFullYear()
          console.log(data);

          this.customerData = data;
          this.stepOneContinue = true;
        } else {
          this.customerData = {
            _id: '',
            name: '',
            occupation: '',
            phone: '',
            officeAddress: '',
            deliveryOffice: '',
            dob: '',
            email: '',
            referby: ''
          }
          this.error = true;
        }
      }, response => {
        console.log(response)
      })
    },
    clearSearch: function () {
      this.customerData ={
        _id: '',
        name: '',
        occupation: '',
        phone: '',
        officeAddress: '',
        deliveryOffice: '',
        dob: '',
        email: '',
        referby: ''
      },
      this.searchInput = '';
      this.error = false;
      this.stepOneContinue = false;
    },
    saveQuestions: function () {
      var data = this.departmentData
      data.doctype = 'department';

      var saveDeptURL = this.apiURL + 'api/department' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.post(saveDeptURL, data).then(response => {
        console.log(response);
        // window.location.href = '/#/department/'+ response.body._id;
      }, response => {
        console.log(response)
      })
    },
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
