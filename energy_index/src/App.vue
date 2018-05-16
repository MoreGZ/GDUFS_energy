<template>
  <div id="app">  
    <div class="main-wrapper">
      <router-view></router-view>
    </div>
    <div class="header-wrapper">
      <v-header></v-header>
    </div>
  </div>
</template>

<script>
  // import 'common/css/reset.css';
  import vHeader from "./components/v-header/v-header.vue";

  export default {
    name: 'app',
    components: {
      vHeader:vHeader,
    }
  }
</script>

<style scoped lang='less'>
  #app{
    min-height: 100%;
    background-color: #f7f7f7;
    overflow: auto;
    .header-wrapper{
      width:100%;
      position: fixed;
      top:0;
      left: 0;
    }
    .main-wrapper{
      margin-top: 80px;
      overflow: auto;
    }
  }
</style>


</style>
