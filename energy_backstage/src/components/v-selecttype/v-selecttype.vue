<template>
  <div id="select">
	<div class="selectBox" v-show="!status">
		<p class="value">{{map[value-1]}}</p>
		<div class="arrow" @click='select'>
			<img src="./left.png" height="12" width="7">
		</div>
	</div>
	<ul class="options" v-show="status">
		<li v-for="(item,index) in map"  
		@click='choose(index+1)'
		:class="{active:index+1==value}">{{map[index]}}</li>
	</ul>
  </div>
</template>

<script>


export default {
	data:function(){
		return {
			map:["生活类","常识类","办公类"],
			status:0,
		}
	},
	props:{
		value:{
			type:Number,
			default:function(){
				return 1;
			}
		}
	},
	methods:{
		select:function(){
			this.status = 1;
		},
		choose:function(value){
			this.status = 0;
			this.$emit("choose",value);
		}
	}
}
</script>

<style scoped lang='less'>
#select{
	float:right;
    border: 2px solid #6da685;
    border-radius: 18px;
    background-color: #6da685;
    display: inline-block;
    transition: width .2s linear;
	.selectBox{
	    position: relative;
		.value{
		    float: right;
		    height: 27px;
		    line-height: 27px;
		    padding: 0 22px;
		    margin-left: 20px;
		    color: #fff;
		    font-size: 18px;
		}
		.arrow{
		    position: absolute;
		    top: 1px;
		    left: 1px;
		    height: 25px;
		    border-top-left-radius: 18px;
		    border-bottom-left-radius: 18px;
		    border-top-right-radius: 12px;
		    border-bottom-right-radius: 12px;
		    line-height: 25px;
		    padding: 0 9px 0 8px;
		    background-color: #fff;
		    cursor: pointer;
			img{
			    position: relative;
			    height: 12px;
			}
		}
	}
	.options{
	    width: 250px;
	    height: 27px;
	    line-height: 27px;
	    padding-left: 14px;
	    padding-right: 14px;
	    .active{
			background-color: #fff;
			color: #6da685;
	    }
		li{
		    display: inline-block;
		    height: 21px;
		    margin: 0 4px;
		    padding-left: 10px;
		    padding-right: 10px;
		    line-height: 21px;
		    color: #fff;
		    background-color: #6da685;
		    border-radius: 18px;
		    text-align: center;
		    transition: all .2s linear;
		    cursor: pointer;
		}
		li:hover{
			background-color: #fff;
			color: #6da685;
		}
	}
}
</style>
