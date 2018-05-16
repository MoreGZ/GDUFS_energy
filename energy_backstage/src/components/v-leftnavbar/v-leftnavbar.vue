<template>
  <div id="leftnavbar">
    <div class="title">节能中心欢迎您！</div>
    <ul>
    	<router-link to="/dynamic">
	    	<li>
	    		<img src="./dynamic.png" height="30" width="30"><br>
	    		<span>动态管理</span>
	    	</li>
	    </router-link>
	    <router-link to="/knowledge">
	    	<li>
	    		<img src="./knowledge.png" height="30" width="30"><br>
	    		<span>节能知识管理</span>
	    	</li>
	    </router-link>
	    <router-link to="/policy">
	    	<li>
	    		<img src="./policy.png" height="30" width="30"><br>
	    		<span>政策支持管理</span>
	    	</li>
	    </router-link>
	    <router-link to="/notice">
	    	<li>
	    		<img src="./notice.png" height="30" width="30"><br>
	    		<span>通知管理</span>
	    	</li>
	    </router-link>
    </ul>
  </div>
</template>

<script>


export default {
	
}
</script>

<style scoped lang='less'>
@media screen and (max-width: 999px){
	.title{
		display: none;
	}
	li{
		span{
			display: none;
		}
	}
}
#leftnavbar {
  .title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #6da583;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
  ul{
  	.router-link-active{
		li{
			background-color: #212a33;
			img{
				filter: brightness(140%);
			}
			span{
				color: #a4c3ea;
			}
		}
	}
  	li{
	    padding-top: 20px;
	    padding-bottom: 20px;
	    text-align: center;
  		span{
			font-size: 12px;
    		color: #687c96;
  		}
  	}
  	li:hover{
  		img{
    		filter: brightness(140%);
  		}
  		span{
    		color: #a4c3ea;
  		}
  	}
  }
}
</style>
