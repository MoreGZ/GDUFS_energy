<template>
  <div id="app">
    <div class="login-box">
      <div class="logo">
        <img src="../static/logo.png" height="43" width="199">
      </div>
      <form class="login">
        <div class="username">
          <img src="../static/username.png" height="21" width="21">
          <input type="" name="" v-model='username' placeholder="请输入用户名">
        </div>
         <div class="password">
          <img src="../static/username.png" height="21" width="21">
          <input type="password" name="" v-model='password' placeholder="请输入密码">
        </div>
        <div class="login-btn">
          <input type="button" name="" value="登  录" @click='login'>
        </div>
      </form>
    </div>
    <v-bomb ref='bomb'>
      <span style="display: inline-block; margin-top: 33px;" slot="alert">
        <img src="../static/warning.png" height="30" width="30"><br>{{alertText}}
      </span>
    </v-bomb>
  </div>
</template>

<script>
import vBomb from './components/v-bomb/v-bomb.vue'

export default {
  name: 'app',
  components: {
    vBomb
  },
  data:function(){
    return {
      username:"",
      password:"",
      alertText:""
    }
  },
  methods:{
    login:function(){
      var formData = new FormData();
      formData.append("type","A1001");
      formData.append("username",this.username);
      formData.append("password",this.password);
      this.$ajax.post("/energycenter/public/api/admin/login",formData)
      .then((response)=>{
        if(response.data.re==0){
          location.replace("./backStage.html");
          return
        }

        if(response.data.re==5){
          this.alertText = "密码错误，请重试"
          this.$refs.bomb.alert();
          return;
        }

        if(response.data.re==4){
          this.alertText = "用户不存在"
          this.$refs.bomb.alert();
          return;
        }

        this.alertText = "登录失败，请重试"
        this.$refs.bomb.alert();
      })
      .catch((error)=>{
        console.log(error);
        alert("不好意思，出现了问题，请稍后重试");
      })
    }
  }
}
</script>

<style lang="less">
*{
  padding:0px;
  margin:0px;
}
html{
  height: 100%;
}
body{
  height: 100%;
}
#app {
  background-color: #6da685;
  width: 100%;
  height: 100%;
  text-align: center;

  ::-webkit-input-placeholder { /* WebKit browsers */
    color:#CACACA;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#CACACA;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#CACACA;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#CACACA;
  }
  .login-box{
    display: block;
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -175px;
    margin-top: -153px;
    .logo{
      width: 100%;
      text-align: center;
      margin-bottom: 40px;
      img{
        
      }
    }
    .login{
      .username{
        width: 351px;
        height: 50px;
        background-color: #fff;
        border-radius: 40px;
        margin-bottom: 20px;
        position: relative;
        img{
          position: absolute;
          top: 14px;
          left: 20px;
        }
        input{
          display: inline-block;
          float: left;
          height: 48px;
          border: none;
          font-size: 18px;
          color: #666553;
          margin-left: 50px;
          padding-left: 15px;
          outline: none;
        }
      }
      .password{
        width: 351px;
        height: 50px;
        background-color: #fff;
        border-radius: 40px;
        margin-bottom: 20px;
        position: relative;
        img{
          position: absolute;
          top: 14px;
          left: 20px;
        }
        input{
          display: inline-block;
          float: left;
          height: 48px;
          border: none;
          font-size: 18px;
          color: #666553;
          margin-left: 50px;
          padding-left: 15px;
          outline: none;
        }
      }
      .login-btn{
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        input{
          width: 351px;
          height: 49px;
          background-color: #e6e6e6;
          margin-top: 30px;
          outline: none;
          border: none;
          color: #aeaeae;
          font-size: 20px;
          border-radius: 30px;
          cursor: pointer;
          transition: all .2s linear;
          font-weight: 700;
        }
        input:hover{
          background-color: #F9D8A3;
          color:#666553;
        }
      }
    }
    
  }
}
</style>
