<template>
  <div id="content-div">
    <md-card style="height: -webkit-fill-available">
      <md-card-header>
        <div class="md-title"> New Fabric Image</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="Portal" class="md-raised md-primary">Previous</md-button>
        <md-button @click="saveFabric" class="md-raised md-primary">Save</md-button>

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
                  <p class="text-center text-danger" v-if="titleValidation">Title Missing</p>
                  <p class="text-center text-danger" v-if="imageReqValidation">Image Missing</p>
                  <p class="text-center text-danger" v-if="imageValidation">Image Missing</p>
                  <br><br>
                  <div class="input-group">
                    <span class="input-group-addon"><strong>Name: </strong></span>
                    <input type="text" class="form-control"  v-model="title">
                  </div>
                  <br><br>
                   
                
                  <div class="input-group" >
                    <span class="input-group-addon"><strong>Image: </strong></span>
                    <input type="file" class="form-control"   name="file" v-on:change="fileChange($event.target.files)" accept="image/*" >
                  </div>

                   <!-- <div v-else>
                        <img :src="image" style="width: 30%;
                          margin: auto;
                          display: block;
                          margin-bottom: 10px;"/>
                        <button @click="removeImage">Remove image</button>
                      </div> -->
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
      titleValidation: false,
      imageValidation: false,
      imageReqValidation: false,
      showAdd: true,
      title: '',    
      fname:'',
      image:'',
      files: new FormData()
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
      window.location = '/fabric-images'
    },
    saveFabric: function () {

      //validations
      this.titleValidation = false;
      this.imageValidation = false;
      this.imageReqValidation = false;

      // Question Validations
            if (this.title.trim() == '' || this.image.trim() == '' ){
                if (this.title.trim() == ''){
                     this.titleValidation = true;    
                }
                if (this.image.trim() == ''){
                     this.imageValidation = true;    
                }
                  return false;
            } else {
              this.titleValidation = false;
              this.imageValidation = false;
              this.imageReqValidation = false;
            }

        
        this.files.append("title", this.title);
        var saveImageURL = this.apiURL + 'api/fabricImg' + '/?token=' + this.authData.passwordHash + '&' + 'staffId=' + this.authData._id;
        this.$http.post(saveImageURL, this.files).then(response => {
          window.location.replace('/fabric-images')
        }, response => {
          console.log(response)
        })
      

    },
    fileChange(fileList) {
        console.log(fileList);
        this.files.append("file", fileList[0], fileList[0].name);
        this.image=fileList[0].name;
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;

      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
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
</style>
