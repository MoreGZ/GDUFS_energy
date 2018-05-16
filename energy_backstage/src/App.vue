<template>
  <div id="app">
    <div class="right">
      <div class="inner-right">
        <div class="maintitle">
          欢迎使用广外大节能中心后台管理系统
          <button @click='logout'>退出登录</button>
        </div>
        <div class="view-wrapper">
         <router-view></router-view> 
        </div>
      </div>
    </div>
    <div class="left">
      <v-leftnavbar></v-leftnavbar>
    </div>
  </div>
</template>

<script>
import vLeftnavbar from './components/v-leftnavbar/v-leftnavbar.vue'

export default {
  name: 'app',
  components: {
    vLeftnavbar,
  },
  methods:{
    logout:function(){
      var c = confirm("确认退出登录吗？")
      if(c){
        var formData = new FormData();
        formData.append("type","A1002");
        this.$ajax.post("/energycenter/public/api/admin/logOut",formData)
        .then((response)=>{
          if(response.data.re==0){
            location.replace("./login.html");
            return
          }
        })
      }
    }
  }
}
</script>

<style scoped lang='less'>
#app {
  height: 100%;
  width: 100%;
  .right{
    float: left;
    width: 100%;
    height: 100%;
    .inner-right{
      height: 100%;
      background-color: #f7f7f7;
      position: relative;
      .maintitle{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        background-color: #fff;
        color: #6da683;
        button{
          border:none;
          background-color: #fff;
          position: absolute;
          right: 10px;
          top:0px;
          height: 100%;
          width:100px;
        }
      }
      .view-wrapper{
        position: absolute;
        top:50px;
        bottom: 0px;
        left: 0px;
        right: 0px;
      }
    }
  }
  .left{
    float: left;
    height: 100%;
    margin-left: -100%;
    background-color: #2c3642;
  }
  @media screen and (min-width: 1000px){
    .left{
      width:200px;
    }
    .inner-right{
      margin-left: 200px;
    }
  }
  @media screen and (max-width: 999px){
    .left{
      width:80px;
    }
    .inner-right{
      margin-left: 80px;
    }
  }
}
</style>
