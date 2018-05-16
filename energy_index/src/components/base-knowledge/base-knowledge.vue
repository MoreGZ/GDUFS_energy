<template>
	<div class="knowledge">
		<div class="changetypebtn-wrapper">
			<v-changetypebtn @select="select"></v-changetypebtn>
		</div>
		<div class="list-wrapper">
			<v-list 
				:dataList='data' 
				@getData='getData'
				ref="list"
				:pushcount='pushcount'
			></v-list>
		</div>
	</div>
</template>

<script>
import vList from "../v-list/v-list.vue"
import vChangetypebtn from "../v-changetypebtn/changetypebtn.vue"
export default {
	data:function(){
		return {
			data:[],
			type:2,
			knowledgetype:this.$route.params.knowledgetype,
			pushcount:0
		}
	},
	components:{
		vList:vList,
		vChangetypebtn:vChangetypebtn
	},
	watch:{
		"$route.params":function(){
			// 改变knowledgetype的值
			this.knowledgetype = this.$route.params.knowledgetype;
			// 清空data的值
			this.data = [];
			// 将list的page变成1
			this.$refs.list.currentPage = 0;
			// 请求后台数据
			this.getData(0,this.addData);
		}
	},
	methods:{
		getData:function(page,handle){
			if(!handle) handle = this.addData;
			// 生成和配置post信息
			// console.log(page);
			var formData = new FormData();
			formData.append("type","C1002");
			formData.append("pushtype",this.type);
			formData.append("headpage",page*6);
			formData.append("knowledgetype",this.knowledgetype);
			var config = {
				headers:{
					'Content-Type':'application/x-www-from-urlencoded'
				}
			}

			this.$ajax.post('/energycenter/public/api/home/showSimplePushes',formData,config)
			.then(function(response){
				// console.log(response.data);
				handle(page,response.data);
			})
		},
		addData:function(page,data){
			var d = data.msg.pushes;
			if(!d){
				alert("已经没有更多内容")
				return
			}

			this.$set(this.data,page,[]);
			for(var i in d){
				this.data[page].push(d[i])
			}
			
			this.pushcount = data.msg.pushcount;
			// console.log(this.data);
		},
		select:function(value){
			this.$router.push('/baseKnowledge/'+value);
			// console.log("select2 "+value);
		}
	},
	created:function(){
		// console.log(this.knowledgetype);
		this.getData(0,this.addData);
	}
}
</script>

<style scoped lang="less">
	.knowledge{
		width:100%;
		background-color: #f7f7f7;
		padding-top: 40px;
		.changetypebtn-wrapper{
			text-align: right;
			height: 40px
		}
		@media screen and (min-width:1300px){
			.changetypebtn-wrapper{
				width: 1170px;
				margin:auto;
			}
		}
		@media screen and (max-width:1299px){
			.changetypebtn-wrapper{
				width: 960px;
				margin:auto;
			}
		}
	}
</style>