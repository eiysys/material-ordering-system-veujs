<template>
  <div id="content-div">
    <div class="loader loader-default is-active" data-text="Please Wait" data-blink id="poDashboardLoader"></div>
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title">Questionnaire Portal</div>
      </md-card-header>
      <md-card-actions>
        <md-button href="/addquestionnaire" class="md-raised md-primary">New</md-button>
      </md-card-actions>
      <br>
      <md-card-content>
        <div class="table-responsive">
          <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(question, index) in questions">
                <tr>
                  <td>{{index + 1}}</td>
                  <td>{{question.question}}</td>
                  <td>{{question.createdAt | formatDate}}</td>
                  <td class="text-center text-danger"><a v-on:click="removeQuestion(index)" style="cursor:pointer">remove</a></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'department',
  data () {
    return {
      tableRowCount: 0,
      showAdd: true,
      questions: []
    }
  },
  methods: {
    dtablefun: function () {
      setTimeout(function () {
        $('#example').DataTable( {
             dom: 'Bfrtip',
             'bdestroy': true,
             buttons: [{
                            extend: 'excelHtml5',
                            title: 'Questions'
                      }
                      ],
            columnDefs: [
              { "searchable": false, "targets": 0 },
              { "searchable": false, "targets": 2 },
              { "searchable": false, "targets": 3 },
              { "bSortable": false, "aTargets": [ 3 ] }
            ]
         });
      }, 1000)
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
      this.getQuestions()
    },
    getQuestions: function () {
      var getQuestionURL = this.apiURL + 'api/questionnaire' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.get(getQuestionURL).then(response => {
        setTimeout(function () {
            $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
        this.questions = response.body;
        this.tableRowCount = response.body.length;
        this.dtablefun()
      }, response => {
        setTimeout(function () {
            $('#poDashboardLoader').removeClass('is-active');
        }, 1000)
        console.log(response)
      })
    },
    removeQuestion: function (index) {
      var table = $('#example').DataTable();
      table.destroy();
      var objId = this.questions[index]._id
      // Remove Question
      var removeQuestionURL = this.apiURL + 'api/questionnaire/'+ objId + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
      this.$http.delete(removeQuestionURL).then(response => {
        this.getQuestions()
        window.location.replace('/questionnaireportal')
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
</style>
