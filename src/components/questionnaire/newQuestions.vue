<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title"> New Questionnaire</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="Portal" class="md-raised md-primary">Previous</md-button>
        <md-button @click="saveQuestion" class="md-raised md-primary">Save</md-button>

      </md-card-actions>
      <br>
      <md-card-content>
        <md-layout>
          <md-card style="width:100%">
            <md-card-content>
              <div class="row">
                <div class="col-md-3">

                </div>
                <div class="col-md-6">
                  <p class="text-center text-danger" v-if="questionValidation">Question Missing</p>
                  <p class="text-center text-danger" v-if="optionValidation">Option Missing</p>
                  <p class="text-center text-danger" v-if="optionsValidation">Options Field Empty</p>
                  <p class="text-center text-danger" v-if="sameOptionsValidated">Duplicate option found</p>
                  <br><br>
                  <div class="input-group">
                    <span class="input-group-addon"><strong>Question: </strong></span>
                    <input type="text" class="form-control"  v-model="question">
                  </div>
                  <br><br>
                  <template v-for="(option, index) in options">
                    <div class="input-group col-md-12">
                      <span class="input-group-addon"><strong>Option {{index + 1}}: </strong></span>
                      <input type="text" class="form-control" v-model="option.option">
                      <template v-if="index == options.length - 1">
                        <span class="input-group-addon btn btn-info" v-on:click="addOption">Add</span>
                        <template v-if="index != 0">
                          <span class="input-group-addon btn btn-danger" v-on:click="removeOption">Remove</span>
                        </template>
                      </template>
                    </div>
                    <br>
                  </template>
                  <br><br>
                </div>
              </div>
            </md-card-content>
          </md-card >
        </md-layout>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'department',
  data () {
    return {
      questionValidation: false,
      optionValidation: false,
      optionsValidation: false,
      sameOptionsValidated: false,
      showAdd: true,
      question: '',
      options: [{option:''}]
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
      // this.getQuestions()
    },
    addOption: function () {
      this.options.push({option:''})
    },
    removeOption: function () {
      this.options.splice(-1,1)
    },
    Portal: function () {
      window.location = '/questionnaireportal'
    },
    saveQuestion: function () {

      // Validations
      var questionValidated = false;
      var optionValidated = false;
      var optionsValidated = false;
      var sameOptionsValidated = false;

      this.questionValidation = false;
      this.optionValidation = false;
      this.optionsValidation = false;
      this.sameOptionsValidated = false;

      // Question Validations
      if (this.question.trim() == ''){
          this.questionValidation = true
          this.question = ''
      } else {
        this.questionValidation = false
        questionValidated = true
      }

      // Option validation

      if (this.options.length == 1) {
        optionsValidated = true
        this.optionsValidation = false
        if (this.options[0].option.trim() == '') {
            this.optionValidation = true
        } else {
            this.optionValidation = false
            optionValidated = true
        }
      } else {
        this.optionValidation = false
        optionValidated = true
        // Options Validation
        var flag = true
        for (let i=0; i<this.options.length; i++) {
          if (this.options[i].option.trim() == ''){
            flag = false;
          }
        }

        if (flag == false) {
          optionsValidated = false
          this.optionsValidation = true
        } else {
          optionsValidated = true
          this.optionsValidation = false
        }

      }

      var matched = false;
      // Same options validated
      debugger;
      for(let m=0;m<this.options.length;m++){
        for(let n=0;n<this.options.length;n++) {
          if(this.options[m].option.trim() == this.options[n].option.trim() && m != n) {
            matched = true
          }
        }
      }

      if (matched == true) {
        this.sameOptionsValidated = true
      } else {
        sameOptionsValidated = true
      }

      var data = {
        question: this.question,
        options: this.options
      }

      data.doctype = 'questionnaire';
      if (questionValidated && optionValidated && optionsValidated && sameOptionsValidated) {
        var saveQuestionURL = this.apiURL + 'api/questionnaire' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.post(saveQuestionURL, data).then(response => {
          window.location.replace('/questionnaireportal')
        }, response => {
          console.log(response)
        })
      }

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
</style>
