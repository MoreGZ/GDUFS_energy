<template>
  <div id="bomb" v-show='isShow'>
  	<div class="bomb-main">
  		<div class="content1" v-show="type==='alert'">
  			<slot name='alert'>
  				<span>{{text}}</span>
  			</slot>
  			<img src="./close.png" height="14" width="14" @click="close" class='close'>
  		</div>
  		<div class="content2" v-show="type==='confirm'">
  			<slot name='confirm'>
  				<span>{{text}}</span>
  			</slot>
  			<div class="buttons">
  				<button class="margin-right" @click='yesConfirm'>确定</button>
  				<button @click='noConfirm'>取消</button>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>


export default {
	data:function(){
		return {
			text:"",
			isShow:false,
			type:"alert"
		}
	},
	methods:{
		alert:function(text){
			this.type = "alert";
			this.isShow = true;
			this.text = text;
		},
		confirm:function(text){
			this.type = "confirm";
			this.isShow = true;
			this.text = text;
		},
		close:function(){
			this.isShow = false;
			this.$emit("close");
		},
		noConfirm:function(){
			this.isShow = false;
			this.$emit("noConfirm");
		},
		yesConfirm:function(){
			this.isShow = false;
			this.$emit("yesConfirm");
		}
	}
}
</script>

<style scoped lang='less'>
#bomb {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.7);
    z-index: 10;
	.bomb-main{
		display: block;
	    position: absolute;
	    top: 40%;
	    left: 50%;
	    width: 260px;
	    height: 136px;
	    background-color: #fff;
	    margin-left: -130px;
	    margin-top: -78px;
	    border-radius: 4px;
	    overflow: auto;
	    transition: all .1s ease-out;
		.content1{
			position: relative;
		    height: 100%;
		    width: 100%;
		    text-align: center;
		    font-size: 14px;
		    color: #333;
			.close{
			    position: absolute;
			    top: 10px;
			    right: 10px;
			    cursor: pointer;
			}
			span{
				display: inline-block;
				width:100%;
				text-align: center;
				margin-top: 60px;
			}
		}
		.content2{
			width: 100%;
		    margin-top: 40px;
		    text-align: center;
		    font-size: 14px;
		    color: #333;
		    .buttons{
	    	    position: absolute;
			    bottom: 21px;
			    width: 100%;
			    text-align: center;
			    button{
		    	    display: inline-block;
				    width: 61px;
				    height: 23px;
				    background-color: #bfbfbf;
				    border: none;
				    color: #fff;
				    border-radius: 4px;
				    outline: none;
				    cursor: pointer;
			    }
			    button:hover{
			    	background-color: #6da685;
			    }
			    .margin-right{
		    	    margin-right: 50px;
			    }
		    }
		}
	}
}
</style>