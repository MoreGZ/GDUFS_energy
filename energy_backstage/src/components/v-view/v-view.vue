<template>
  <div id="view">
    <div class="header">
    	<div class="type-title">
    		<span class="title">后台管理</span> | <span class="value">{{pushtypeMap2[pushtype]}}</span>
    	</div>
    	<form class="search-box">
    		<input type="text" name="" v-model='searchContent'>  
    		<button @click='search'>
    			<img src="./search.png" height="12" width="12">
    		</button>
    	</form>
    	<button class="add" v-show="isCanAdd" @click="addPush">
    		<img src="./add.png" height="12" width="12">新增{{pushtypeMap3[pushtype]}}
    	</button>
    </div>
    <div class="list-wrapper">
    	<v-list ref='list' 
    	:dataCount="pushcount" 
    	:pushtype="pushtype" 
    	:listData="listData"
    	@fetchData="fetchData"
    	@editIt='editIt'
    	@deleteIt='deleteIt'
    	 v-show="!isshowNothing"
    	></v-list>
    </div>
    <div class="nothing" v-show="isshowNothing">
    	<img src="./nothing.png" height="68" width="69"><br>
    	<span>没有找到相应内容哦，换个关键词试试吧!</span>
    </div>
	<v-edit ref='edit'></v-edit>
	<v-bomb ref='bomb1'>
		<span style="display: inline-block;width:100%;text-align: center;margin-top: 60px;;color:#FEC05B" slot='alert'>
			不好意思，后台出现了问题
		</span>
	</v-bomb>
  </div>
</template>

<script>
import vList from '../v-list/v-list.vue'
import vBomb from '../v-bomb/v-bomb.vue'
import vEdit from '../v-edit/v-edit.vue'

export default {
	data:function(){
		return {
			// 当前的类型 1,2,3,4
			pushtype:1,
			pushtypeMap:{'dynamic':1,'knowledge':2,'policy':3,'notice':4},
			pushtypeMap2:['搜索','动态管理','节能知识管理','政策支持管理','通知管理'],
			pushtypeMap3:['','动态','节能知识','政策支持','通知'],
			isCanAdd:this.$route.params.type == 'search' ? false : true,
			isshowNothing:false,
			isShowEdit:false,
			// 搜索关键字
			searchContent:"",
			// 主要信息
			listData:[],
			pushcount:0,

		}
	},
	watch:{
		'$route.params':function(){
			if(this.$route.params.type!='search'){
				this.isshowNothing = false;
				this.isCanAdd = true;
				this.pushtype = this.pushtypeMap[this.$route.params.type];
				this.init();
				this.fetchData();
			}
			if(this.$route.params.type=='search'){
				this.isshowNothing = false;
				this.isCanAdd = false;
				this.pushtype = 0;
				this.init();
				this.fetchSearchData();
			}
		}
	},
	components:{
		vList,
		vBomb,
		vEdit
	},
	methods:{
		init:function(){
			this.$refs.list.currentPage = 0;
			this.listData = [];
			this.pagecount = 0;
		},
		fetchData:function(page){
			//设置默认的page
			if(page==undefined) page = 0;

			var formData = new FormData();
			formData.append("type","A2005");
			formData.append("pushtype",this.pushtype);
			formData.append("headpage",page*16);
			this.$ajax.post("/energycenter/public/api/admin/showSimplePushes",formData)
			.then((response)=>{
				if(response.data.re == 0){
					this.addListData(response.data,page);
					return;
				}

				if(response.data.re == 3){
					alert("请先登录系统");
					location.replace("./login.html");
				}

				this.$refs.bomb1.alert();
			})
			.catch((error)=>{
				console.log(error);
				alert("不好意思，出现了问题，请稍后重试");
			})
			.catch((error)=>{
				console.log(error);
				alert("不好意思，出现了问题，请稍后重试");
			})
		},
		addListData:function(data,page){
			this.$set(this.listData,page,data.msg.pushes);
			this.pushcount = data.msg.pushcount;
		},
		fetchSearchData:function(){
			var formData = new FormData();
			formData.append("type","A2004");
			formData.append("key",this.searchContent);
			this.$ajax.post("/energycenter/public/api/admin/searchPush",formData)
			.then((response)=>{
				if(response.data.re == 0){
					this.addSearchListData(response.data)
					return;
				}

				if(response.data.re == 3){
					alert("请先登录系统");
					location.replace("./login.html");
				}

				this.$refs.bomb1.alert();
			})
			.catch((error)=>{
				console.log(error);
				alert("不好意思，出现了问题，请稍后重试");
			})
		},
		addSearchListData:function(data){
			var pushes = data.msg.pushes;
			if(pushes.length===0){
				this.isshowNothing = true;
				return;
			}

			var d = [];
			d[0] = [];
			var i = 0,j = 0;
			for(var x = 0;x < pushes.length; x++){
				if(j == 15){
					j = 0;
					i++;
					d[i] = [];
					// this.$set(this.listData,i,[])
				}
				d[i][j++] = pushes[x];
				// this.$set(this.listData[i],j++,pushes[x])
			}
			for(var x = 0;x < d.length;x++){
				this.$set(this.listData,x,d[x]);
			}
			console.log(d);	
			console.log(this.listData);
			this.pushcount = pushes.length;
		},
		deleteIt:function(id){
			// console.log("delete"+id);
			var c = confirm("请问确定要删除该记录吗？");
			if(c){
				var formData = new FormData();
				formData.append("type","A2003");
				formData.append("pushid",id);
				this.$ajax.post("/energycenter/public/api/admin/deletePush",formData)
				.then((response)=>{
					if(response.data.re == 0){
						location.reload();
						return;
					}

					if(response.data.re == 3){
						alert("请先登录系统");
						location.replace("./login.html");
					}

					this.$refs.bomb1.alert();
				})
				.catch((error)=>{
					console.log(error);
					alert("不好意思，出现了问题，请稍后重试");
				})
			}
		},
		editIt:function(id){
			this.isShowEdit = true;
			this.$refs.edit.editPush(id);
		},
		search:function(){
			this.$router.replace("/search/"+this.searchContent);
		},
		addPush:function(){
			this.isShowEdit = true;
			this.$refs.edit.addPush(this.pushtype);
		}
	},
	created:function(){
		this.$router.replace("/dynamic");
		this.fetchData();
	}
}
</script>

<style scoped lang='less'>
#view {
	.header{
		position: absolute;
		left: 0;
		right: 0;
		height: 62px;
		padding-left: 20px;
		padding-right: 20px;
		line-height: 50px;
		z-index: 2;
			.type-title{
		    float: left;
		    height: 50px;
		    line-height: 50px;
			.title{
			    font-size: 14px;
			    color: #878686;
			}
			.value{
			    font-size: 16px;
			    color: #333;
			    font-weight: 800;
			}
			}
		.search-box{
		    width: 268px;
		    height: 20px;
		    margin-top: 15px;
		    background-color: #fff;
		    float: right;
		    box-shadow: 0 0 3px 0 rgba(0,0,0,.2);
			input{
			    float: left;
			    width: 215px;
			    height: 18px;
			    padding-left: 15px;
			    font-size: 12px;
			    border: none;
			    outline: none;
			}
			button{
				float: right;
			    width: 33px;
			    height: 100%;
			    background-color: #6da583;
			    border: none;
			    outline: none;
			    img{
		    	    width: 12px;
				    height: 12px;
				    position: relative;
				    top: 1px;
			    }
			}
		}
		.add{
		    float: right;
		    width: 120px;
		    height: 20px;
		    margin-right: 20px;
		    margin-top: 15px;
		    background-color: #6da583;
		    border-radius: 20px;
		    color: #fff;
		    border: none;
		    outline: none;
		    font-size: 12px;
		    cursor: pointer;
		    img{
	    	    position: relative;
			    top: 1px;
			    width: 12px;
			    margin-right: 5px;
		    }
		}
	}
	.nothing{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 300px;
		margin-left: -150px;
		margin-top: -50px;
		text-align: center;
		/*z-index: -1;*/
		img{

		}
		span{

		}
	}
	.edit-wrapper{
		position: fixed;
		top:0;
		left: 0px;
		right: 0px;
		bottom: 0px;
		z-index: 4;
		overflow: auto;
	}
}
</style>
