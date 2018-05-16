<template>
  <div class="header"
    :class="{'state1':state==1,'state2':state==2,'size1':size==1,'size2':size==2}"
    ref='header'>
    <div class="header-main">
      <div class="logo">
        <router-link to='/baseHome'>
          <img src='./logo1.png' v-if="state==1">
          <img src='./logo2.png' v-if="state==2">
        </router-link>
      </div>
      <div class="navbar">
        <ul>
          <li><router-link to='/baseDynamic'>最新动态</router-link></li>
          <li><router-link to='/baseKnowledge' :class="{'router-link-active':ifactive}">节能知识</router-link></li>
          <li><router-link to='/basePolicy'>政策支持</router-link></li>
          <li><router-link to='/baseNotice'>通知</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      path: '',
      state: NaN,
      size:1
    }
  },
  watch:{
    '$route.path':function(){
      this.changeState();
    },
    'size':function(){
      this.changeState();
    }
  },
  computed:{
    ifactive:function(){
      return this.path == 'baseknowledge' ? true : false;
    }
  },
  methods:{
    changeState:function(){
      this.path = this.$route.path.split('/')[1];
      this.state = this.path == 'baseHome' && this.size == 1 ? 1 : 2;
    },
    changeSize:function(){
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop>50){
        this.size = 2
        return
      }

      this.size = 1;
    }
  },
  created:function(){
    this.changeState();

    // 绑定滚动事件
    window.addEventListener('scroll',this.changeSize);
  }
}
</script>

<style scoped lang='less'>
  @media screen and (min-width: 1300px){
    .header-main{
      width: 1170px;
    }
  }
  @media screen and (max-width: 1299px){
    .header-main{
      width: 960px;
    }
  }
  .header{
    width: 100%;
    box-shadow: 1px 0px 1px rgba(0,0,0,0.2);
    .header-main{
      height: 100%;
      margin:auto;
      transition: all 0.2s linear;
      .logo{
        float: left;
        img{
          transition: all 0.2s;
        }
      }
      .navbar{
        float: right;
        ul{
          li{
            display: inline-block;
            a{
              width:90px;
              margin-left: 13px;
              margin-right: 13px;
              display: inline-block;
              font-size: 16px;
              text-align: center;
              transition: border 0.2s linear;
            }
          }
        }
      }
    }
  }
  .state1{
    background-color: #6DA685;
    ul{
      li{
        a{
          color:#fff;
          border-bottom: 5px solid #6DA685;
        }
        .router-link-active{
          border-bottom: 5px solid #fff;
        }
      }
      li:hover a{
        border-bottom: 5px solid #fff;
      }
    }
  }
  .state2{
    background-color: #fff;
    ul{
      li{
        a{
          color:#333;
          border-bottom: 5px solid #fff;
        }
        .router-link-active{
          border-bottom: 5px solid #6DA685;
        }
      }
      li:hover a{
        border-bottom: 5px solid #6DA685;
      }
    }
  }
  .size1{
    height: 80px;
    .logo{
      margin-top: 20px;
      img{
        width:176px;
        height: 41px;
      }
    }
    .navbar{
      float: right;
      ul{
        li{
          a{
            height: 75px;
            line-height: 75px;
          }
        }
      }
    }
  }
  .size2{
    height: 60px;
    .logo{
      margin-top: 10px;
      img{
        transform: scale(0.9);
      }
    }
    .navbar{
      float: right;
      ul{
        li{
          a{
            height: 55px;
            line-height: 55px;
          }
        }
      }
    }
  }
</style>