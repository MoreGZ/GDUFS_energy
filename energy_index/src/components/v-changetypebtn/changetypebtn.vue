<template>
	<div class="changestypebtn">
		<div class="selectedBox" v-show="state===0">
			<p class="value">{{optionsMap[value]}}</p>
			<div class="arrowbtn" @click="showOption"><img src="./greenarrow.png"></div>
		</div>
		<ul class="options" v-show="state===1"> 
			<li :class="{active:value==item}" @click="hideOption(item)" v-for="item in options">{{optionsMap[item]}}</li>
		</ul>
	</div>
</template>

<script>
import VueRouter from 'vue-router';

export default {
	data:function(){
		return {
			value:this.$route.params.knowledgetype,
			options:[0,1,2,3],
			state:0,
			optionsMap:["全部","生活类","常识类","办公类"]
		}
	},
	computed:{

	},
	filters:{

	},
	watch:{
		"$route.params":function(){
			this.value = this.$route.params.knowledgetype;
		}
	},
	methods:{
		showOption:function(){
			this.state = 1;

		},
		hideOption:function(value){
			this.state = 0;
			this.$emit('select',value);
		}
	}
}
</script>

<style scoped lang='less'>
	.changestypebtn{
		border:2px solid #B6DCC7;
		border-radius: 18px;
		background-color:#B6DCC7;
		display: inline-block;
		transition:width 0.2s linear;
		.selectedBox{
			position: relative;
			.value{
				float: right;
				height: 27px;
				line-height: 27px;
				padding:0px 22px;
				margin-left: 20px;
				color:#fff;
				font-size: 18px;
			}
			.arrowbtn{
				position: absolute;
				top: 1px;
				left: 1px;
				height: 25px;
				border-top-left-radius: 18px;
				border-bottom-left-radius: 18px;
				border-top-right-radius: 12px;
				border-bottom-right-radius: 12px;
				line-height: 25px;
				padding: 0px 9px 0px 8px;
				background-color: #fff;
				cursor: pointer;
				img{
					position: relative;
					height: 12px;

				}
			}
		}
		.options{
			width:290px;
			height: 27px;
			line-height: 27px;
			padding-left: 14px;
			padding-right: 14px;
			li{
				display: inline-block;
				height: 21px;
				margin:0px 4px;
				padding-left: 10px;
				padding-right: 10px;
				line-height: 21px;
				color:#fff;
				background-color: #B6DCC7;
				border-radius: 18px;
				text-align: center;
				transition: all 0.2s linear;
				cursor: pointer;
			}
			.active{
				color:#B6DCC7;
				background-color: #fff;
			}
			li:hover{
				color:#B6DCC7;
				background-color: #fff;
			}
		}
	}
</style>