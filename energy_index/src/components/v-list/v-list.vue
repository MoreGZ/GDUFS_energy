<template>
	<div class="list">
		<ul>
			<li class="list-main" 
				v-for='item in dataList[currentPage]'
				v-if="dataList[currentPage]"
			>
				<div class="img">
					<img :src="item.coverurl | imgFilter">
				</div>
				<div class="text">
					<a :href="'./detail.html#/'+item.pushtype+'/'+item.id" target="_blank"><h3 class="title">{{item.title | titleFilter}}</h3></a>
					<p class="content">{{item.content | contentFilter}}</p>
					<p class="note"><img src="./leaf.png" height="26" width="20">
						<span class="time">{{item.create_time |  dateFilter}}</span> 
						<span class="author"> 编者 : {{item.author}}</span>
					</p>
				</div>
			</li>
		</ul>
		<div class="turn-page-btns">
			<button class="last" @click='lastPage'><img src="./left.png" height="25" width="13"></button>
			<div class="pages">
				<button 
					v-for="item in pages" 
					@click='turnPage(item)'
					:class="{'active-page':currentPage+1==item}">{{item}}</button>
				<!-- <button>...</button> -->
			</div>
			<button class="next" @click='nextPage'><img src="./right.png" height="25" width="13"></button>
		</div>
	</div>
</template>

<script>

export default {
	data:function(){
		return {
			currentPage:0,
		}
	},
	computed:{
		endpage:function(){
			return this.pushcount%6==0 ? parseInt(this.pushcount/6) : parseInt(this.pushcount/6)+1;
		},
		pages:function(){
			var pages = [];
			/*少于9页的时候*/
			if(this.endpage<=9){
				for(var i=1;i<=this.endpage;i++){
					pages.push(i);
				}
				return pages;
			}

			// 当前页第五页之下的时候
			if(this.currentPage<5){
				for(var i=1;i<8;i++){
					pages.push(i);
				}
				pages.push("...");
				pages.push(this.endpage);
				return pages;
			}

			// 当前页在倒数第五页之上的时候
			if(this.currentPage>this.endpage-5){
				pages.push(1);
				pages.push("...");
				for(var i=this.endpage-5;i<this.endpage+1;i++){
					pages.push(i);
				}
				return pages;
			}

			// 其他情况
			pages.push(1);
			pages.push("...");
			for(var i=this.currentPage-1;i<=this.currentPage+3;i++){
				pages.push(i);
			}
			pages.push("...");
			pages.push(this.endpage);

			return pages;
		}
	},
	filters:{
		contentFilter:function(value){
			// console.log(value);
			if(value.length>300){
				
				return value.substring(0, 300)+"...";
			}else {
				return value
			}
		},
		dateFilter:function(value){
			return value.split(" ")[0];
		},
		imgFilter:function(value){
			return value==='undefined' ? '../../../static/bcimg.png' : value;
		},
		titleFilter:function(value){
			return value.length>30 ? value.substring(0, 30)+"..." : value;
		}
	},
	props:{
		dataList:{
			type: Array,
			require:true
		},
		pushcount:{
			type: Number,
			default:function(){
				return 54;
			}
		}
	},
	watch:{
		'currentPage':function(){
			// console.log(this.currentPage);
			if(!this.dataList[this.currentPage]) {
				this.tellParrents();
			}
		},
	},
	methods:{
		nextPage:function(){
			if(this.currentPage+1==this.endpage){
				return;
			}
			this.currentPage++
			document.documentElement.scrollTop = document.body.scrollTop = 0;
		},
		lastPage:function(){
			if(this.currentPage == 0) {
				return
			};
			this.currentPage--;
			document.documentElement.scrollTop = document.body.scrollTop = 0;
		},
		turnPage:function(aimPage){
			this.currentPage = aimPage-1;
			document.documentElement.scrollTop = document.body.scrollTop = 0;
		},
		tellParrents:function(){
			this.$emit('getData',this.currentPage);
		},
	}
}
</script>

<style scoped lang='less'>

	@media screen and (min-width: 1300px) {
		.list{
			overflow: auto;
			ul{
				width: 1300px;
				margin: auto;
				.list-main{
					width: 1300px;
					height: 300px;
					margin:20px 0px;
					background-color: #fff;
					border-radius: 2px;
					box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
					.img{
						width: 381px;
						height: 261px;
						margin-top: 20px;
						margin-left: 80px;
						float: left;
						background:#f7f7f7;
						img{
							width:100%;
							height: 100%;
						}
					}
					.text{
						float: left;
						width: 720px;
						margin-top: 20px;
						margin-left: 40px;
						color:#333333;
						a{
							color:#333;
						}
						.title{
							margin-bottom: 30px;
							font-size: 24px;
							font-weight: 700;

						}
						.content{
							width:720px;
							height: 168px;
							margin-bottom: 15px;
							font-size: 18px;
							overflow: hidden;
							/*position: relative;*/
						}
						.note{
							text-align: right;
							img{
								vertical-align: middle;
								width:20px;
								height: 26px;
								margin-right: 10px;
							}
							.time{
								margin-right: 3px;
							}
							.author{

							}
						}
					}
				}
			}
		}
	}
	@media screen and (max-width: 1299px) {
		.list{
			overflow: auto;
			ul{
				width: 1030px;
				margin: auto;
				.list-main{
					width: 1030px;
					height: 237px;
					margin:20px 0px;
					background-color: #fff;
					border-radius: 2px;
					box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.2);
					.img{
						width: 280px;
						height: 192px;
						margin-top: 20px;
						margin-left: 30px;
						float: left;
						background:#f7f7f7;
						img{
							width:100%;
							height: 100%;
						}
					}
					.text{
						float: left;
						width: 630px;
						margin-top: 20px;
						margin-left: 40px;
						color:#333333;
						a{
							color: #333;
						}
						.title{
							margin-bottom: 10px;
							font-size: 20px;
							font-weight: 700;

						}
						.content{
							width:630px;
							height: 134px;
							margin-bottom: 10px;
							font-size: 14px;
							overflow: hidden;
							/*position: relative;*/
							z-index: 1;
						}
						.note{
							text-align: right;
							font-size: 12px;
							img{
								vertical-align: middle;
								width:14px;
								height: 19px;
								margin-right: 8px;
							}
							.time{
								margin-right: 3px;
							}
							.author{

							}
						}
					}
				}
			}
		}
	}
	.turn-page-btns{
		margin:70px auto;
		text-align: center;			
		button{
			display: inline-block;
			background: none;
			border:none;
			height: 30px;
			cursor:pointer;
			img{
				/*vertical-align: middle;*/
			}
		}
		.pages{
			position: relative;
			top:-5px;
			display: inline-block;
			margin: auto 35px;
			button{
				height: 30px;
				font-size: 20px;
			}	
			.active-page{
				transform: scale(1.1);
				color:#6DA685;
			}
		}
	}
</style>