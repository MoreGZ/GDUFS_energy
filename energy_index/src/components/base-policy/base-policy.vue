<template>
	<div class="policy">
		<div class="list-wrapper">
			<v-list 
			:dataList='data' 
			@getData='getData'
			:pushcount='pushcount'></v-list>
		</div>
	</div>
</template>

<script>
import vList from "../v-list/v-list.vue"
export default {
	data:function(){
		return {
			data:[],
			type:3,
			pushcount:0
		}
	},
	components:{
		vList:vList,
	},
	methods:{
		getData:function(page,handle){
			if(!handle) handle = this.addData;
			// 生成和配置post信息
			var formData = new FormData();
			formData.append("type","C1002");
			formData.append("pushtype",this.type);
			formData.append("headpage",page*6);
			formData.append("knowledgetype","0");
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
		}
	},
	created:function(){
		this.getData(0,);
	}
}
</script>

<style scoped>
	.policy{
		width:100%;
		background-color: #f7f7f7;
		padding-top: 80px;
	}
</style>