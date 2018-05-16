<template>
  <div class="home">
  	<div class="home-main" ref='homeMain' :style="{height:mainHeight+'px'}">
  		<div class="home-main-img" 
  			:style="{height:mainHeight-155+'px',opacity:backgroundImgOpacity}">
  			<div class="imformation">
	  				<div class="imformation-main">
	  					<transition name='fade'>
	  						<p class="marginbottom3 margintop" v-show="animateState1[0]"><span class="title">节能中心</span>成立于2013年8月，围绕学校建设“国际化特色鲜明的高水平大学”和深化高校自主办学综合改革的总体目标，对学校水、电、冷气等能耗进行监管，制定并组织实施全校节能工作方案，积极探索新型高校节能管理体系落实节能降耗工作，贯彻落实新发展理念，推动绿色和谐校园建设。</p>
	  					</transition>
	  					<transition name='fade'>
	  						<p class="marginbottom1" v-show="animateState1[1]" transition='show'><span class="circle"></span>办公地址：</p>
	  					</transition>
	  					<transition name='fade'>
		  					<p class="marginleft" v-show="animateState1[2]" transition='show'>北校区工程服务部二楼</p>
						</transition>
						<transition name='fade'>
		  					<p class="marginleft" v-show="animateState1[2]" transition='show'>南校区后勤综合楼316</p>
		  				</transition>
		  				<transition name='fade'>
		  					<p class="marginleft marginbottom2" v-show="animateState1[2]" transition='show'>学生宿舍1栋1楼水电冷充值点</p>
		  				</transition>
		  				<transition name='fade'>
							<p class="marginbottom1" v-show="animateState1[3]" transition='show'><span class="circle"></span>联系电话：</p>
						</transition>
						<transition name='fade'>
		  					<p class="marginleft" v-show="animateState1[4]" transition='show'>020-36317052（8052）</p>
		  				</transition>
		  				<transition name='fade'>
		  					<p class="marginleft marginbottom2" v-show="animateState1[4]" transition='show'>020-36317082（7082）</p>
		  				</transition>
		  				<transition name='fade'>
		  					<p class="floatRight" v-show="animateState1[5]" transition='show' style="cursor:pointer"><router-link to="/Introduction"><img src="./more.png" height="12" width="10">更多</router-link></p>
		  				</transition>
	  				</div>
  			</div>
  		</div>
  		<div class="home-main-notice">
  			<div class="notice-main">
  				<transition name='fade'>
  					<h1 v-show="animateState2[0]" transition='show'>最新通知</h1>
  				</transition>
  				<transition name='fade'>
	  				<div class="lines"  v-show="animateState2[0]">
	  					<span class="line1"></span><span class="line2"></span><span class="line3"></span>
	  				</div>
	  			</transition>
  				<ul>
  					
  					<a  target="_blank" 
  						v-for='(item,index) in notice' 
  						:href="'./detail.html#/4/'+item.id"
  						v-show="animateState2[1]"
  						>
						<transition name='fade'>
	  						<li 
	  							:class="{marginRight: (index+1)%3 != 0}"
	  							v-show="animateState2[1]"
	  							>
	  							<span class="circle"></span>
	  							<span class="text">{{item.title}}</span>
	  						</li>
	  					</transition>
  					</a>
	  				
  				</ul>
  			</div>
  		</div>
  	</div>
  	<div class="home-knowledge">
  		<router-link to="/baseknowledge"><div class="home-knowledge-title">节能知识</div></router-link>
  		<div class="home-konwledge-main">
  			<div class="knowledge-list marginLeft marginRight ">
  				<h2 class="list-title"><span class="line marginleft"></span><span class="text">生活类</span><span class="line"></span></h2>
	  			<ul class="color1">
	  				<li v-for='item in knowledges.life'>
	  					<div class="img">
	  						<a :href="'./detail.html#/2/'+item.id" target="blank">
	  							<div class="cover"><img src="./x.png" class='rightimg'>显示详情<img src="./y.png" class="leftimg"></div>
	  						</a>
	  						<img :src="item.coverurl | imgFilter" class="mainimg">
	  					</div>
	  					<p class="list-a-title">
	  						{{item.title}}
	  					</p>
	  				</li>
	  				<router-link to='/baseknowledge/1'><div class="more"><img src="./more2.png"><span>查看更多</span></div></router-link>
	  			</ul>
  			</div>
  			<div class="knowledge-list marginRight">
  				<h2 class="list-title"><span class="line marginleft"></span><span class="text">常识类</span><span class="line"></span></h2>
	  			<ul class="color2">
	  				<li v-for='item in knowledges.common'>
	  					<div class="img">
	  						<a :href="'./detail.html#/2/'+item.id" target="blank">
	  							<div class="cover"><img src="./x.png" class='rightimg'>显示详情<img src="./y.png" class="leftimg"></div>
	  						</a>
	  						<img :src="item.coverurl | imgFilter" class="mainimg">
	  					</div>
	  					<p class="list-a-title">
	  						{{item.title}}
	  					</p>
	  				</li>
	  				<router-link to='/baseknowledge/2'><div class="more"><img src="./more2.png"><span>查看更多</span></div></router-link>
	  			</ul>
  			</div>
  			<div class="knowledge-list">
  				<h2 class="list-title"><span class="line marginleft"></span><span class="text">办公类</span><span class="line"></span></h2>
	  			<ul class="color3">
	  				<li v-for='item in knowledges.office'>
	  					<div class="img">
	  						<a :href="'./detail.html#/2/'+item.id" target="blank">
	  							<div class="cover"><img src="./x.png" class='rightimg'>显示详情<img src="./y.png" class="leftimg"></div>
	  						</a>
	  						<img :src="item.coverurl | imgFilter" class="mainimg">
	  					</div>
	  					<p class="list-a-title">
	  						{{item.title}}
	  					</p>
	  				</li>
	  				<router-link to='/baseknowledge/3'><div class="more"><img src="./more2.png"><span>查看更多</span></div></router-link>
	  			</ul>
  			</div>
  		</div>
  	</div>
  	<div class="home-dynamic">
  		<div class="home-dynamic-title"><span class="line"></span><span class="text">最新动态</span><span class="line"></span></div>
  		<div class="home-dynamic-main">
  			<ul>
  				<li v-for='(item,index) in dynamic' :class='{marginleft:(index+1)/3 != 0}'>
  					<img :src="item.coverurl | imgFilter">
  					<a :href="'./detail.html#/1/'+item.id" target="_blank">
  						<div class="cover">{{item.title}}</div>
  					</a>
  				</li>
  			</ul>
  		</div>
  		<div class="more">
  			<img src="./b.png" class="leftimg">
  			<router-link to="/baseDynamic">
				<span>查看全部</span><img src="./a.png" class="rightimg">
  			</router-link>
  		</div>
  	</div>
  	<div class="footer">
  		<p class="enter"><a href='./backStage.html'><img src="./enterbg.png">进入后台管理系统</a></p>
  		<p class="connect">copyright@Quanta2017</p>
  	</div>
  </div>
</template>

<script>
export default {
	data:function(){
		return {
			mainHeight:NaN,
			bannerRate:1920/800,
			widthFill:true,
			animateState1:[0,0,0,0,0,0],
			animateState2:[0,0,0],
			backgroundImgOpacity:0,
			notice:[],
			dynamic:[],
			knowledges:{
				life:[],
				common:[],
				office:[]
			},
			isDetail:true,
		}
	},
	filters:{
		imgFilter:function(value){
			if(value==='undefined'){
				// console.log("un");
			}
			return value==='undefined' ? '../../../static/bcimg.png' : value;
		}
	},
	methods:{
		changeHeight:function(){
			var screenHeight = document.documentElement.clientHeight;
			var screenWidth = document.documentElement.clientWidth;

			// 设置home-mian的高度
			this.mainHeight = screenHeight-80;

			// 设置banner的size
			if(screenWidth / screenHeight > this.bannerRate){

			}else {
				
			}	
		},
		getDataApi:function(handler){
			if(!handler) {
				handler = this.addData;
			}

			// 生成和配置post信息
			var formData = new FormData();
			formData.append("type","C1001");
			var config = {
				headers:{
					'Content-Type':'application/x-www-from-urlencoded'
				}
			}

			this.$ajax.post("/energycenter/public/api/home/showHomePage",formData,config)
			.then(function(response){
				
				handler(response.data);
			})
		},
		addData:function(data){

			// 填入数据
			this.notice = data.msg.informations;
			this.knowledges = data.msg.knowledges;
			this.dynamic = data.msg.news;

			this.showAnimate();
			// console.log(this.knowledges);
		},
		showAnimate:function(){
			this.backgroundImgOpacity = 1;
			var x = 0,y = 0;
			var t = setInterval((function(){
				this.$set(this.animateState1,x,1);
				this.$set(this.animateState2,y,1);
				if(x<6) x++;
				if(y<3) y++;
				if(x === 6&&y === 3){
					clearInterval(t);
				}
			}).bind(this), 200);
		},
		back:function(){
			this.isDetail = false;
		},
		showDetial:function(){
			this.isDetail = true;
		}
	},
	created:function(){
		this.changeHeight();
		window.onresize = this.changeHeight;

		this.getDataApi();

	}
}	
</script>


<style scoped lang='less'>
	.fade-enter-active,.fade-leave-active{
		transition: all 0.4s ease;
		transform:translate(0px,0px);  
	}
     
	.fade-enter,.fade-leave-active{
		display: inline-block;
		opacity: 0;
		transform:translate(0px,20px);
	}
	.cover(){
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		color:#fff;
		background-color: rgba(109,166,133,0.8);
		text-align: center;
	}
	.line(@height:3px,@width:152px){
		height: @height;
		display: inline-block;
		width: @width;
		border:1px solid #dcdcdc; 
	}
	.textoverflow(){
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.home{
		background-color: #fff;
		.home-main{
			width:100%;
			overflow-y: hidden;
			.home-main-img{
				background-image: url(./banner.jpg);
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				overflow: hidden;
				transition: opacity 1s linear;
				.imformation{
					margin:auto;
					height: 100%;
					/*background-color: blue;*/
					.imformation-main{
						float: left;
						background-color: #fff;
						p{
							widows: 100%;
							color:#333333;
							a{
								color:#6DA685;
								font-weight: 500;
							}
						}
						.floatRight{
							text-align: right;
						}
						.circle{
							background-color: #6DA685;
							border-radius: 50%;
							display: inline-block;
							margin-right: 10px;
						}
						.title{
							color:#6DA685;
							font-weight: 700;
							margin-left: 25px;
						}
					}
				}
			}
			.home-main-notice{
				overflow: hidden;
				.notice-main{
					margin:auto;
				}
				height: 155px;
				background-color: #B6DBC9;
				h1{
					 font-weight: 700;
					color:#666553;
				}
				.lines{
					margin-bottom: 12px;
					span{
						height: 3px;
						background-color: #666553;
						display: block;
						float: left;
						margin-right: 3px;
					}
					.line1{
						width: 150px;
					}
					.line2{
						width: 21px;
					}
					.line3{
						width: 11px;
					}
				}				
				ul{
					clear: both;
					li{
						display: inline-block;
						color:#666553;
						.textoverflow();
						.text{
							transition: all 0.2s linear;
						}
					}
					.marginRight{
						margin-right: 64px;
					}
					li:hover .text{
						transform:translate(5px,0px);
						display: inline-block;
					}
				}
				.circle{
					background-color: #6DA685;
					border-radius: 50%;
					display: inline-block;
					
				}
			}
		}
		.home-knowledge{
			.home-knowledge-title{
				width:960px;
				font-weight: 800;
				text-align: center;
				color:#333;
			}
			.home-knowledge-title:hover{
				color:#AA7855;
				transition: color 0.2s linear;
			}
			.home-konwledge-main{
				margin:auto;
				overflow: auto;
				.knowledge-list{
					float: left;
					h2{
						a{
							color:#333;
						}
					}
					ul{
						li{
							text-align: center;
							.img{
								.cover{
									position: absolute;
									top: 0;
									left: 0;
									width: 100%;
									height: 100%;
									color:#fff;
									background-color: rgba(109,166,133,0.8);
									opacity: 0;
									transition: opacity 0.2s linear;
									text-align: center;
									img{
										position: relative;
									}
								}
								.cover:hover{
									opacity: 1;
								}
								.mainimg{
									height: 100%;
									vertical-align: center;
								}
							}
						}

						.list-a-title{
							.textoverflow();
						}
						.more{
							color:#fff;
							text-align: right;
						}
						.more:hover span{
							display: inline-block;
							transition: transform 0.2s ease-out;
							transform:translate(5px,0px);
						}
					}
				}
			}
			.color1{
				border:1px solid #6da685;
				.more{
					background-color: #6da685;
				}
			}
			.color2{
				border:1px solid #a2c3b3;
				.more{
					background-color: #a2c3b3;
				}
			}
			.color3{
				border:1px solid #b4c0c5;
				.more{
					background-color: #b4c0c5;
				}
			}
		}
		.home-dynamic{
			.home-dynamic-title{
				width:960px;
				color:#333;
				text-align: center;
				font-weight: 700;
			}
			.home-dynamic-main{
				ul{
					margin:auto;
					li{
						display: inline-block;
						position: relative;
						background-color: #f7f7f7;
						text-align: center;
						overflow: hidden;
						img{
							display: inline-block;
							vertical-align: middle;
							height: 100%;
						}
						.cover{
							opacity: 0;
							transition: opacity 0.2s linear;
							.textoverflow();
							.cover();
						}
						.cover:hover{
							opacity: 1;
						}
					}
					.marginleft{
					}
				}
			}
			.more{
				text-align: center;
				span{
					transition: transform 0.2s ease-out;
					cursor: pointer;
					color:#333;
				}
				img{
					transition:transform 0.2s ease-out;
				}
			}
			.more:hover{
				span{
					display: inline-block;
					transform: scale(1.1);
				}
				.leftimg{
					display: inline-block;
					transform: translate(-5px,0px);
				}
				.rightimg{
					display: inline-block;
					transform: translate(5px,0px);
				}
			}
		}
		.footer{
			width:100%;
			overflow: auto;
			background-color: #77B490;
			p{
				text-align: center;
			}
			.enter{
				a{
					color: #AA7855;
				}
			}
			.connect{
				color:#fff;
			}
		}
	}
	@media screen and (min-width: 1300px){
		.home-main{
			.home-main-img{
				.imformation{
					width: 1170px;
					.imformation-main{
						width:326px;
						height: 100%;
					}
				}
			}
			.home-main-notice{
				.notice-main{
					width: 1170px;
					h1{
						font-size: 22px;
						margin-top: 15px;
					}
					li{
						width:347px;
						font-size: 16px;
						height: 35px;
						line-height: 35px;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						.circle{
							width: 13px;
							height: 13px;
							margin-right: 8px;
						}
					}
				}
			}
		}
		.home-knowledge{
			width:1170px;
			margin:auto;
			.home-knowledge-title{
				font-size: 38px;
				margin:100px auto 58px auto;
			}
			.home-konwledge-main{
				width:1170px;
				h2{
					height: 31px;
					font-size: 24px;
					margin-bottom: 33px;
					.line{
						display: inline-block;
						width: 81px;
						height: 3px;
						border:1px solid #dcdcdc; 
						margin-top: 15px;
						float: left;

					}
					.marginleft{
						margin-left: 39px;
					}
					.text{
						float: left;
						margin-left: 20px;
						margin-right: 20px;
					}
				}
				li{
					.img{
						position: relative;
						width:360px;
						height: 216px;
						line-height: 216px;
						background: #f7f7f7;
						border:none;
						background-size: 100%;
						.cover{
							line-height: 216px;font-size: 18px;
							img{
								width:13px;
								height: 15px;
							}
							.leftimg{
								left: 7px;
								bottom: 7px
							}
							.rightimg{
								right: 7px;
								top: 7px
							}
						}
						img{
							width: 100%;
						}
						
					}
					.list-a-title{
						.textoverflow();
						width: 316px;
						padding-left: 22px;
						padding-right: 22px;
						padding-top: 18px;
						padding-bottom: 20px;
						font-size: 20px;
					}
				}
				.more{
					width: 340px;
					padding-right: 20px;
					height: 50px;
					line-height: 50px;
					img{
						width:13px;
						margin-right: 8px;
					}
				}
			}
			.marginLeft{
				margin-left: 1px;
			}
			.marginRight{
				margin-right: 39px;
			}
		}
		.home-dynamic{
			width:1170px;
			margin:auto;
			.home-dynamic-title{
				margin:150px auto 58px auto;
				font-size: 38px;
				.line{
					.line();
					position: relative;
					top:-8px;
				}
				.text{
					margin:auto 25px;
				}
			}
			.home-dynamic-main{
				ul{
					width: 1170px;
					li{
						width:380px;
						height: 229px;
						line-height: 229px;
						img{

						}
						.cover{
							line-height: 229px;
							.cover();
						}
						.cover:hover{
						}
					}
					.marginleft{
						margin-left: 9px;
					}
				}
			}
			.more{
				font-size: 18px;
				margin:60px auto 165px auto;
				img{
					width:21px;
				}
				.leftimg{
					position: relative;
					top: 7px;right: 7px;
				}
				.rightimg{
					position: relative;
					bottom: 7px;left: 7px;
				}
			}
		}
		.footer{
			width:100%;
			height: 120px;
			background-color: #77B490;
			.enter{
				font-size:18px;
				margin:26px auto;
				img{
					position: relative;
					right: 7px;top:3px;
				}
			}
			.connect{
				font-size:18px;
			}
		}
	}
	@media screen and (max-width: 1299px){
		.home-main{
			.home-main-img{
				.imformation{
					width: 960px;		
					.imformation-main{
						width:277px;
						height: 100%;
					}
				}
			}
			.home-main-notice{
				.notice-main{
					width: 960px;
					h1{
						font-size: 18px;
						margin-top: 12px;
					}
					li{
						width:277px;
						font-size: 14px;
						height: 42px;
						line-height: 42px;
					}
					.circle{
						width: 10px;
						height: 10px;
						margin-right: 5px;
					}
				}
			}
		}
		.home-knowledge{
			width:960px;
			margin:auto;
			.home-knowledge-title{
				font-size: 26px;
				margin:96px auto 45px auto;
			}
			.home-konwledge-main{
				width:960px;
				h2{
					height: 31px;
					font-size: 16px;
					margin-bottom: 33px;
					.line{
						display: inline-block;
						width: 63px;
						height: 3px;
						border:1px solid #dcdcdc; 
						margin-top: 10px;
						float: left;

					}
					.marginleft{
						margin-left: 35px;
					}
					.text{
						float: left;
						margin-left: 14px;
						margin-right: 14px;
					}
				}
				li{
					.img{
						position: relative;
						width:276px;
						height: 167px;
						line-height: 167px;
						background: #f7f7f7;
						border:none;
						background-size: 100%;
						.cover{
							line-height: 167px;font-size: 18px;
							img{
								width:13px;
								height: 15px;
							}
							.leftimg{
								left: 7px;
								bottom: 7px
							}
							.rightimg{
								right: 7px;
								top: 7px
							}
						}
						img{
							width: 100%;
						}
						
					}
					.list-a-title{
						width: 191px;
						padding-left: 22px;
						padding-right: 22px;
						padding-top: 18px;
						padding-bottom: 20px;
						font-size: 14px;
					}
				}
				.more{
					width: 256px;
					padding-right: 20px;
					height: 50px;
					line-height: 50px;
					img{
						width:13px;
						margin-right: 8px;
					}
				}
			}
			.marginLeft{
				margin-left: 30px;
			}
			.marginRight{
				margin-right: 31px;
			}
		}
		.home-dynamic{
			width:100%;
			.home-dynamic-title{
				margin:110px auto 41px auto;
				font-size: 26px;
				.line{
					.line(2px,117px);
					position: relative;
					top:-8px;
				}
				.text{
					margin:auto 25px;
				}
			}
			.home-dynamic-main{
				ul{
					width: 960px;
					li{
						width:295px;
						height: 177px;
						line-height: 177px;
						img{

						}
						.cover{
							line-height: 177px;
							.cover();
						}
						.cover:hover{
						}
					}
					.marginleft{
						margin-left: 20px;
					}
				}
			}
			.more{
				font-size: 18px;
				margin:45px auto 121px auto;
				img{
					width:21px;
				}
				.leftimg{
					position: relative;
					top: 7px;right: 7px;
				}
				.rightimg{
					position: relative;
					bottom: 7px;left: 7px;
				}
			}
		}
		.footer{
			width:100%;
			height: 90px;
			background-color: #77B490;
			.enter{
				font-size:14px;
				margin:20px auto;
				img{
					width:15px;
					position: relative;
					right: 5px;top:3px;
				}
			}
			.connect{
				font-size:14px;
			}
		}
	}
	@media screen and (max-width: 960px){
		.home{
			width:960px;
		}
		.home-main-img{
			width: 960px
		}
		.home-main-notice{
			width: 960px;
		}
	}
	@media screen and (min-width: 1300px) and (min-height: 930px){
		.imformation-main{
			p{
				font-size: 20px;
				line-height: 33px;
				a{

				}
				img{
					margin-right: 9px;

				}
			}
			.marginleft{
				margin-left: 32px;
			}
			.marginbottom1{
				margin-bottom: 15px;
			}
			.marginbottom2{
				margin-bottom: 21px;
			}
			.marginbottom3{
				margin-bottom: 37px;
			}
			.margintop{
				margin-top: 25px;
			}
			.circle{
				width: 13px;
				height: 13px;
			}
			.title{
				font-size: 26px;
			}

		}
	}
	@media screen and (min-width: 1300px) and (max-height: 929px) and (min-height: 720px){
		.imformation-main{
			width:277px;
			height: 100%;
			p{
				font-size: 16px;
				line-height: 28px;
				a{

				}
				img{
					margin-right: 9px;

				}
			}
			.marginleft{
				margin-left: 32px;
			}
			.marginbottom1{
				margin-bottom: 8px;
			}
			.marginbottom2{
				margin-bottom: 13px;
			}
			.marginbottom3{
				margin-bottom: 15px;
			}
			.margintop{
				margin-top: 15px;
			}
			.circle{
				width: 10px;
				height: 10px;
			}
			.title{
				font-size: 20px;
			}
		}
	}
	@media screen and (min-width: 1300px) and (max-height: 719px){
		.imformation-main{
			p{
				font-size: 12px;
				line-height: 20px;
				a{

				}
				img{
					margin-right: 9px;

				}
			}
			.marginleft{
				margin-left: 32px;
			}
			.marginbottom1{
				margin-bottom: 3px;
			}
			.marginbottom2{
				margin-bottom: 6px;
			}
			.marginbottom3{
				margin-bottom: 15px;
			}
			.margintop{
				margin-top: 25px;
			}
			.circle{
				width: 10px;
				height: 10px;
			}
			.title{
				font-size: 16px;
			}

		}
	}
	@media screen and (max-width: 1299px) and (min-height: 720px){
		.imformation-main{
			width:277px;
			height: 100%;
			p{
				font-size: 16px;
				line-height: 28px;
				a{

				}
				img{
					margin-right: 9px;

				}
			}
			.marginleft{
				margin-left: 32px;
			}
			.marginbottom1{
				margin-bottom: 8px;
			}
			.marginbottom2{
				margin-bottom: 13px;
			}
			.marginbottom3{
				margin-bottom: 15px;
			}
			.margintop{
				margin-top: 15px;
			}
			.circle{
				width: 10px;
				height: 10px;
			}
			.title{
				font-size: 20px;
			}
		}
	}	
	@media screen and (max-width: 1299px) and (max-height: 719px){
		.imformation-main{
			p{
				font-size: 12px;
				line-height: 20px;
				a{

				}
				img{
					margin-right: 9px;

				}
			}
			.marginleft{
				margin-left: 32px;
			}
			.marginbottom1{
				margin-bottom: 3px;
			}
			.marginbottom2{
				margin-bottom: 6px;
			}
			.marginbottom3{
				margin-bottom: 15px;
			}
			.margintop{
				margin-top: 25px;
			}
			.circle{
				width: 10px;
				height: 10px;
			}
			.title{
				font-size: 16px;
			}
		}
	}
</style>
