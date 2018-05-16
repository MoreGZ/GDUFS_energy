<template>
	<div id="list">
		<div class="mainListWrapper" ref='listWrapper'>
			<ul class="list" :style='{width:listWidth}' v-show='!isload'>
				<li v-for='(item,index) in listData[currentPage]'>
					<p class="date">发表日期：{{item.create_time}}</p>
					<p class="content">{{item.content | contentFilter}}</p>
					<div class="img">
						<img :src="item.coverurl | imgFilter">
						<a :href="'./detail.html#/'+pushtype+'/'+item.id" target="_blank">
							<div class="cover">
								<img src="./left.png" height="14" width="14" class="left">
								<span>查看文章</span>
								<img src="./right.png" height="14" width="14" class="right">
							</div>
						</a>
					</div>
					<p class="author">编者: {{item.author}}</p>
					<div class="button">
						<button @click='editIt(item.id)'><img src="./edit.png" height="17" width="17">编辑</button>
						<button @click='deleteIt(item.id)'><img src="./delete.png" height="17" width="17">删除</button>
					</div>
				</li>
			</ul>
			<img src="./loading.gif" height="28" width="28" class="loadingImg" v-show='isload'>
		</div>
		<div class="pages">
			<div class="record">记录{{dataCount}}条</div>
			<div class="pagescount">页数{{currentPage+1}}/{{endPage+1}}页</div>
			<div class="buttons">
				<button class="button1" @click="tofirstPage"><img src="./first.png" height="11" width="10"></button>
				<button class="button1" @click="tolastPage"><img src="./last.png" height="11" width="10"></button>
				<button class="button1" @click="tonextPage"><img src="./next.png" height="11" width="10"></button>
				<button class="button1" @click='toendPage'><img src="./end.png" height="11" width="10"></button>
				<span>跳转到</span>
				<input type="text" name="" v-model="inputPage" @keyup.enter='toaimPage(inputPage)'>
				<button class="button2" @click="toaimPage(inputPage)">GO</button>
			</div>
			<div class="cover" v-show="isload"></div>
		</div>
	</div>
</template>

<script>


export default {
	data:function(){
		return {
			currentPage:0,
			listWidth:"100%",
			inputPage:""
		}
	},
	props:{
		listData:{
			type: Array,
			default:function(){
				return [];
			}
		},
		dataCount:{
			type: Number,
			default:function(){
				return 0;
			}
		},
		pushtype:{
			type:Number,
			default:function(){
				return 1;
			}
		}
	},
	watch:{
		"currentPage":function(){
			if(!this.listData[this.currentPage]) {
				this.tellParents();
			}
		}
	},
	computed:{
		endPage:function(){
			return this.dataCount%16 === 0 ? parseInt(this.dataCount/16)-1 : parseInt(this.dataCount/16);
		},
		isload:function(){
			return this.listData[this.currentPage] ? false : true ;
		}
	},
	filters:{
		contentFilter:function(value){
			return value.length>30 ? value.substring(0, 30)+"..." : value;
		},
		imgFilter:function(value){
			return value=="undefined" || !value ? '../../../static/bcimg.png' : value;
		}
	},
	methods:{
		changeWidth:function(){
			var wrapperWidth = this.$refs.listWrapper.offsetWidth-6;
			var count = parseInt(wrapperWidth/261);
			this.listWidth = (count*261+3)+'px';
		},
		tolastPage:function(){
			if(this.currentPage<=0) return;
			this.currentPage--;
		},
		tonextPage:function(){
			if(this.currentPage>=this.endPage) return;
			this.currentPage++;
		},
		toendPage:function(){
			this.currentPage = this.endPage;
		},
		tofirstPage:function(){
			this.currentPage = 0;
		},
		toaimPage:function(aimpage){
			if(aimpage>this.endPage){
				this.currentPage = this.endPage;
				this.inputPage = "";
				return;
			}
			this.currentPage = aimpage;
			this.inputPage = "";
		},
		tellParents:function(){
			this.$emit("fetchData",this.currentPage);
		},
		editIt:function(id){
			this.$emit("editIt",id);
		},
		deleteIt:function(id){
			this.$emit("deleteIt",id);
		}
	},
	created:function(){
		window.onresize = this.changeWidth;
	},
	mounted:function(){
		this.changeWidth();
	}
}
</script>

<style scoped lang='less'>
#list {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    padding-top: 62px;
    padding-bottom: 66px;
    overflow: hidden;
	.mainListWrapper{
		margin: auto 20px;
	    height: 100%;
	    overflow: auto;
	    position: relative;
		.list{
		    padding-top: 4px;
    		margin: auto;
			li{
				position: relative;
			    width: 221px;
			    height: 302px;
			    padding-left: 10px;
			    padding-right: 10px;
			    background-color: #fff;
			    display: inline-block;
			    box-shadow: 0 0 3px 0 rgba(0,0,0,.1);
			    margin-right: 20px;
			    margin-bottom: 28px;
			    .date{
			    	font-size: 12px;
				    color: #bfbebe;
				    height: 32px;
				    line-height: 32px;
				    text-align: left;
			    }
			    .content{
		    	    font-size: 14px;
				    color: #333;
				    padding-top: 7px;
				    padding-bottom: 7px;
				    line-height: 16px;
				    height: 36px;
				    text-align: left;
			    }
			    .img{
				    position: relative;
				    width: 221px;
				    height: 148px;
				    background: #f7f7f7;
				    cursor: pointer;
				    text-align: center;
				    line-height: 148px;
				    overflow: hidden;
				    img{
			    	    vertical-align: middle;
					    max-width: 100%;
					    max-height: 100%;
				    }
				    .cover{
				    	position: absolute;
					    top: 0;
					    width: 100%;
					    height: 100%;
					    left: 0;
					    background-color: #212a33;
					    line-height: 148px;
					    text-align: center;
					    color: #fff;
					    opacity: 0;
					    transition: opacity .2s linear;
				    	.left{
				    		position: relative;
						    top: 10px;
						    right: 4px;
				    	}
				    	.right{
			    		    position: relative;
						    bottom: 10px;
						    left: 4px;
				    	}
				    }
				    .cover:hover{
				    	opacity: 0.8;
				    }
			    }
			    .author{
		    	    font-size: 12px;
				    color: #bfbebe;
				    height: 32px;
				    line-height: 32px;
				    text-align: right;
			    }
			    .button{
		    	    width: 241px;
				    height: 42px;
				    background-color: #6da583;
				    position: absolute;
				    bottom: 0;
				    left: 0;
				    button{
			    	    float: left;
					    width: 120px;
					    height: 100%;
					    background: none;
					    border: none;
					    outline: none;
					    font-size: 14px;
					    color: #fff;
				        cursor: pointer;
					    transition: all .1s linear;
					    img{
				    	    position: relative;
						    top: 2px;
						    display: inline-block;
						    margin-right: 8px;
					    }
				    }
				    button:hover{
						background-color: #5b8a6d;
				    }
			    }
			}
		}
		.loadingImg{
			position: absolute;
			left: 50%;
			top:50%;
			margin-left: -14px;
			margin-top: -14px;
			z-index: 3;
		}
	}
	
	.mainListWrapper::-webkit-scrollbar{
	    width: 6px;
	    background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	.mainListWrapper::-webkit-scrollbar-track{
	    background-color: #f7f7f7;
	}
	/*定义滑块，内阴影及圆角*/
	.mainListWrapper::-webkit-scrollbar-thumb{
	    width: 6px;
	    border-radius: 4px;
	    background-color: #6da583;
	}
    .pages{
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    padding-left: 20px;
	    padding-right: 20px;
	    height: 66px;
	    .record{
		    float: left;
		    height: 66px;
		    line-height: 66px;
		    font-size: 14px;
		    color: #555;
	        margin-right: 60px;
	    }
	    .pagescount{
			float: left;
		    height: 66px;
		    line-height: 66px;
		    font-size: 14px;
		    color: #555;
	    }
	    .buttons{
    	    float: right;
		    height: 100%;
		    line-height: 66px;
	    	.button1{
			    background: #fff;
			    color: #333;
	    	}
	    	.button2{
			    background-color: #6da583;
			    color: #fff;
			    font-size: 12px;
	    	}
	    	span{
			    display: inline-block;
			    margin-right: 10px;
			    height: 66px;
			    line-height: 66px;
			    font-size: 14px;
			    color: #555;
	    	}
	    	input[type='text']{
				display: inline-block;
			    width: 31px;
			    height: 31px;
			    margin-right: 9px;
			    border: none;
			    outline: none;
	    	}
	    	button{
    		    display: inline-block;
			    width: 31px;
			    height: 31px;
			    margin-right: 9px;
			    border: none;
			    outline: none;
	    	}
	    }
	    .cover{
	    	position: absolute;
	    	top:0;
	    	left: 0;
	    	width: 100%;
	    	height: 100%;
	    	background-color: #fff;
	    	opacity: 0.6;
	    	z-index: 2; 
	    }
    }
}
</style>
