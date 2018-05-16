<template>
  <div id="edit" v-show='isShow'>
	<div class="edit-main">
		<div class="edit-title">
			<span class="title">后台管理</span>
			 | 
			<span class="value">{{pushtypeMap2[mainData.pushtype]}}</span>
			<button class="back-btn" @click='returnBack'>
				<img src="./back.png" height="14" width="9">
				返回
			</button>
			<v-select 
			:value='mainData.knowledgetype'
			@choose='changeKnowledgetype' 
			v-if="mainData.knowledgetype != 0"></v-select>
		</div>
		<div class="edit-content">
			<div class="content-title">
				<span>标题</span>
				<input type="text" name="" v-model='mainData.title'>
			</div>
			<div class="content-cover">
				<span class="title">封面</span>
				<div class="coverImg" v-show="mainData.coverurl != 'undefined'">
					<img :src="mainData.coverurl">
				</div>
				<div class="button-wrapper">
					<button>
						<img src="./add.png" height="15" width="15">
						本地上传
					</button>
					<input type="file" name=""  @change="uploadImg($event)">
				</div>
				<span class="note">*如不设置将自动设置为默认图片</span>
			</div>
			<div class="content-author">
				<span class="title">编者</span>
				<input type="text" name=""  v-model='mainData.author'>
				<span class="note">{{mainData.author.length}}/20</span>
			</div>
			<div class="content-content" ref='container'>
				<div id="toolbar-box" ref='toolbarBox'>
					<button style="background: none; border: none; cursor: pointer;" class="fullscreen-btn" v-show='!isFullscreen' @click='fullscreen'>全屏</button>
					<button style="background: none; border: none; cursor: pointer;" class="fullscreen-btn" v-show='isFullscreen' @click='outFullscreen'>退出全屏</button>
				</div>
				<div id="content-box" ref='contentBox'></div>
			</div>
		</div>
		<div class="edit-buttons">
			<a 
			href="http://app.xunjiepdf.com/pdf2jpg" 
			style="float:left;color:#6da685;font-size:16px" 
			target="_blank"
			v-show="mainData.pushtype==3">转换pdf请点击这里</a>
			<button class="margin-right" @click="preview">预览</button>
			<button @click='saveAndDisplay'>保存并发布</button>
		</div>
		<div class="cropper-wrapper" v-if='isShowCropper'>
			<div class="cropper">
				<div class="cropper-box">
					<vue-cropper
					ref="cropper"
					:img="option.img"
					:outputSize="option.size"
					:outputType="option.outputType"
					:info="true"
					:full="option.full"
					:canMove="option.canMove"
					:canMoveBox="option.canMoveBox"
					:fixedBox="option.fixedBox"
					:original="option.original"

					:autoCrop="option.autoCrop"
					:autoCropWidth="option.autoCropWidth"
					:autoCropHeight="option.autoCropHeight"
					:fixed="option.fixed"
					:fixedNumber="option.fixedNumber"></vue-cropper>
				</div>
				<div class="right">
					<div class="show-preview">
						<img :src="previewImgData">
					</div>
					<button class="preview-btn" @click='previewImg'>预览</button>
					<div class="buttons">
						<button class="margin-right" @click='sureUpload'>确定</button>
						<button @click='cansoleUpload'>取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="fullscreen" v-show='isFullscreen' ref='fullscreen'></div>
	<div class="previewContent" v-if='isPreview'>
		<div class="main">
			<button @click='backFromPreview'><img src="./back.png" height="14" width="9">返回</button>
			<h1 class="title">{{mainData.title}}</h1>
			<div class="content" v-html='mainData.content'></div>
		</div>
	</div>
	<v-bomb ref='bomb1'>
		<span style="display: inline-block;width:100%;text-align: center;margin-top: 60px;;color:#FEC05B" slot='alert'>
			不好意思，后台出现了问题
		</span>
	</v-bomb>
	<v-bomb ref='bomb2' @yesConfirm="sureDisplay">
	</v-bomb>
	<v-bomb ref='bomb3'>
		<span style="display: inline-block; margin-top: 33px;" slot="alert">
			<img src="./success.png" height="40" width="40"><br>发布成功
		</span>
	</v-bomb>
	<v-bomb ref='bomb4' @close='addSuccess'>
		<span style="display: inline-block; margin-top: 33px;" slot="alert">
			<img src="./success.png" height="40" width="40"><br>发布成功
		</span>
	</v-bomb>
	<v-bomb ref='bomb5' @yesConfirm="sureReturn">
	</v-bomb>
  </div>
</template>

<script>
import E from 'wangeditor';
import VueCropper from 'vue-cropper';
import vBomb from "../v-bomb/v-bomb.vue"; 
import vSelect from '../v-selecttype/v-selecttype.vue';

export default {
	data:function(){
		return {
			editor:undefined,
			mainData:{
				"id": undefined, 
	            "title": undefined, 
	            "content": undefined, 
	            "create_time": undefined, 
	            "update_time": undefined, 
	            "coverurl": undefined, 
	            "pushtype": undefined, 
	            "author": "", 
	            "knowledgetype": 0
			},
			isShow: false,
			pushtypeMap2:['搜索','动态管理','节能知识管理','政策支持管理','通知管理'],
			isPreview:false,
			// add/edit
			status:'add',
			// 裁剪图片选项配置
			isShowCropper:false,
			option:{
				img: '',
				size: 1,
				full: false,
				outputType: 'png',
				canMove: true,
				fixedBox: false,
				original: false,
				canMoveBox: true,
				autoCrop: true,
				// 只有自动截图开启 宽度高度才生效
				autoCropWidth: 320,
				autoCropHeight: 240,
				// 开启宽度和高度比例
				fixed: true,
				fixedNumber: [4, 3]
			},
			previewImgData:undefined,
			// 全屏记录
			isFullscreen:false,
		}
	},
	components:{
		VueCropper,
		vBomb,
		vSelect
	},
	watch:{
		'mainData.author':function(){
			if(this.mainData.author.length>20){
				this.mainData.author = this.mainData.author.substring(0, 20);
			}
		}
	},
	methods:{
		fetchData:function(id){
			var formData = new FormData();
			formData.append("type","A2006");
			formData.append("pushid",id);
			this.$ajax.post("/energycenter/public/api/admin/showDetailPush", formData)
			.then((response)=>{
				if(response.data.re == 0){
					this.mainData = response.data.msg.push;
					this.editor.txt.html(this.mainData.content);
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
		init:function(status){
			this.status = status;
			this.mainData.id = undefined;
			this.mainData.title = undefined;
			this.mainData.content = undefined;
			this.mainData.create_time = undefined;
			this.mainData.update_time = undefined;
			this.mainData.coverurl = undefined;
			this.mainData.pushtype = undefined;
			this.mainData.author = "";
			this.mainData.knowledgetype = 0;
		},
		returnBack:function(){
			this.$refs.bomb5.confirm("正在编辑状态，确定要返回吗");
		},
		sureReturn:function(){
			this.isShow = false;
		},
		changeKnowledgetype:function(value){
			this.mainData.knowledgetype = value;
		},
		editPush:function(id){
			// 编辑
			this.init("edit");
			this.isShow = true;
			this.fetchData(id);
		},
		addPush:function(type){
			// 添加
			this.init("add");
			this.isShow = true;
			this.mainData.pushtype = type;
			if(type=='2'){
				this.mainData.knowledgetype = 1;
			}
		},
		preview:function(){
			this.mainData.content = this.editor.txt.html();
			this.isPreview = true;
		},
		backFromPreview:function(){
			this.isPreview = false;
		},
		saveAndDisplay:function(){

			this.mainData.content = this.editor.txt.html();
			if(this.mainData.title=='' || this.mainData.title=='undefined'){
				alert("标题不能为空")
				return;
			}

			if(this.mainData.content=='' || this.mainData.content=='undefined'){
				alert("内容不能为空")
				return;
			}

			if(this.mainData.author=='' || this.mainData.author=='undefined'){
				alert("编者不能为空")
				return;
			}
			// if(this.mainData.content)
			this.$refs.bomb2.confirm("确认发布吗？");
		},
		sureDisplay:function(){
			if(this.status=='add'){
				var formData = new FormData();
				formData.append("type","A2001");
				formData.append("pushtype",this.mainData.pushtype);
				formData.append("title",this.mainData.title);
				formData.append("author",this.mainData.author);
				formData.append("coverurl",this.mainData.coverurl);
				formData.append("knowledgetype",this.mainData.knowledgetype);
				formData.append("content",this.mainData.content);
				this.$ajax.post("/energycenter/public/api/admin/addPush",formData)
				.then((response)=>{
					if(response.data.re == 0){
						this.$refs.bomb4.alert();
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
				return;
			}
			if(this.status=='edit'){
				var formData = new FormData();
				formData.append("type","A2002");
				formData.append("pushid",this.mainData.id);
				formData.append("title",this.mainData.title);
				formData.append("author",this.mainData.author);
				formData.append("coverurl",this.mainData.coverurl);
				formData.append("knowledgetype",this.mainData.knowledgetype);
				formData.append("content",this.mainData.content);
				this.$ajax.post("/energycenter/public/api/admin/updatePush",formData)
				.then((response)=>{
					if(response.data.re == 0){
						this.$refs.bomb3.alert();
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
				return;
			}
		},
		addSuccess:function(){
			location.reload();
		},
		// 裁剪图片相关方法
		uploadImg (e) {
			this.isShowCropper = true;
			//上传图片
			// this.option.img
			var file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
			var reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
				}
				this.option.img = data
			}
			// 转化为base64
			// reader.readAsDataURL(file)
			// 转化为blob
			reader.readAsArrayBuffer(file)
		},
		previewImg:function(){
			this.$refs.cropper.getCropData((data) => {
				this.previewImgData = data
			})
		},
		sendImg:function(data){
			console.log(data);
			var formData = new FormData();
			formData.append("photo",data);
			this.$ajax.post("/energycenter/public/api/admin/uploadImageForUrl",formData)
			.then((response)=>{
				if(response.data.re == 0){
					this.mainData.coverurl = response.data.msg.coverurl;
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
		sureUpload:function(){
			// this.$refs.cropper.getCropData((data) => {
			// 	this.mainData.coverurl = data;
			// })
			this.previewImgData = '';
			this.isShowCropper = false;
			this.$refs.cropper.getCropBlob((data) => {
				// console.log(data);
				this.sendImg(data);
			})
		},	
		cansoleUpload:function(){
			this.previewImgData = '';
			this.isShowCropper = false;
		},

		// 编辑框操作
		fullscreen:function(){
			var cover = this.$refs.fullscreen;
			var toolbarBox = this.$refs.toolbarBox;
			var contentBox = this.$refs.contentBox;
			var contain = this.$refs.container;
			this.isFullscreen = true;
			contentBox.style.position = 'absolute';
            contentBox.style.top = '71px';
            contentBox.style.left = '20px';
            contentBox.style.right = '20px';
            contentBox.style.bottom = '20px';
            contentBox.style.height = '90%';
            
            cover.appendChild(toolbarBox)
            cover.appendChild(contentBox)
		},
		outFullscreen:function(){
			var cover = this.$refs.fullscreen;
			var toolbarBox = this.$refs.toolbarBox;
			var contentBox = this.$refs.contentBox;
			var contain = this.$refs.container;
			this.isFullscreen = false;
            contentBox.style.position = '';
            contentBox.style.height = '391px';
            contentBox.style.top = '0';
            contentBox.style.left = '0';
            contentBox.style.right = '0';
            contentBox.style.bottom = '0';

            contain.appendChild(toolbarBox);
            contain.appendChild(contentBox);
		}

	},
	mounted:function(){
		var that = this;
		this.editor = new E("#toolbar-box","#content-box");
		this.editor.customConfig.zIndex = 5;
	    this.editor.customConfig.customUploadImg = function (files, insert) {
		    // files 是 input 中选中的文件列表
		    // insert 是获取图片 url 后，插入到编辑器的方法
			var formData = new FormData();
			var photo = [];
			for(var i=0;i<files.length;i++){
				formData.append("photo["+i+"]",files[i]);
			}
			that.$ajax.post("/energycenter/public/api/admin/uploadImagesForUrls",formData)
			.then((response)=>{
				console.log(response.data);
				response.data.data.forEach(function(imgUrl){
					insert(imgUrl)
				})
			})
			.catch((error)=>{
				console.log(error);
				alert("不好意思，出现了问题，请稍后重试");
			})
		    // 上传代码返回结果之后，将图片插入到编辑器中
		    // insert(imgUrl)
		}
	    this.editor.create();
	}
}
</script>

<style scoped lang='less'>
#edit {
	position: fixed;
	top:0;
	left: 0px;
	right: 0px;
	bottom: 0px;
	z-index: 4;
	width: 100%;
	height: 100%;
	background-color: #fff;
	overflow: auto;
	.edit-main{
	    width: 901px;
	    margin: auto;
	    .edit-title{
    	    width: 901px;
		    margin: 40px auto 60px;
		    font-size: 18px;
		    color: #878686;
		    .title{
			    font-size: 18px;
			    color: #878686;
			    margin-right: 8px;
		    }
		    .value{
				font-size: 20px;
			    color: #333;
			    margin-left: 8px;
			    font-weight: 800;
		    }
		    .back-btn{
			    display: inline-block;
			    width: 81px;
			    height: 31px;
			    background-color: #6da685;
			    border: none;
			    outline: none;
			    border-radius: 1px;
			    color: #fff;
			    font-size: 16px;
			    cursor:pointer;
			    margin-left: 20px;
			    img{
		    	    position: relative;
				    top: 1px;	
				    margin-right: 8px;
			    }
		    }
	    }
	    .edit-content{
		    border: 1px solid #ececec;
		    .content-title{
			    width: 901px;
			    background-color: #ececec;
			    margin: auto;
			    span{
		    	    display: inline-block;
				    font-size: 14px;
				    width:140px;
				    height: 47px;
				    line-height: 47px;
				    text-align: center;
				    color: #333;
			    }
			    input{
				    width: 630px;
				    height: 28px;
				    padding-left: 11px;
				    border: none;
				    background-color: #fff;
				    outline: none;
				    box-shadow: 0 0 4px 0 rgba(0,0,0,.1);
			    }
		    }
		    .content-cover{
	    	    position: relative;
			    width: 901px;
			    background-color: #fff;
			    margin: auto;
		    	.title{
					display: inline-block;
				    font-size: 14px;
				    width:140px;
				    height: 47px;
				    line-height: 47px;
				    text-align: center;
				    color: #333;
		    	}
		    	.note{
				    color: #a9a8a8;
				    font-size: 12px;
				    margin-left: 20px;
		    	}
		    	.coverImg{
		    		display: inline-block;
				    width: 256px;
				    height: 192px;
				    line-height: 192px;
				    padding-top: 11px;
				    padding-bottom: 11px;
				    margin-right: 26px;
				    margin-top: 12px;
				    margin-bottom: 12px;
				    vertical-align: top;
				    background-color: #f7f7f7;
		    		img{
						max-width: 100%;
						max-height: 100%;
    					vertical-align: middle;
		    		}
		    	}
		    	.button-wrapper{
	    		    display: inline-block;
    				position: relative;
		    		button{
						width: 141px;
						height: 28px;
						border: none;
						background-color: #6da685;
						outline: none;
						box-shadow: 0 0 4px 0 rgba(0,0,0,.1);
						color: 18px;
						font-size: 14px;
						color: #fff;

		    		}
		    		input[type='file']{
					    display: inline-block;
					    position: absolute;
					    left: 0;
					    top: 0;
					    width: 141px;
					    height: 28px;
					    cursor: pointer;
					    opacity: 0;
		    		}
		    	}
		    }
		    .content-author{
			    width: 901px;
			    background-color: #ececec;
			    margin: auto;
			    .title{
		    	    display: inline-block;
				    font-size: 14px;
				    width:140px;
				    height: 47px;
				    line-height: 47px;
				    text-align: center;
				    color: #333;
			    }
			    input{
			        width: 150px;
				    height: 28px;
				    padding-left: 11px;
				    border: none;
				    background-color: #fff;
				    outline: none;
				    box-shadow: 0 0 4px 0 rgba(0,0,0,.1);
			    }
			    .note{
			    	color: #a9a8a8;
				    font-size: 12px;
				    margin-left: 20px;
			    }
		    }
		    .content-content{
		    	.w-e-toolbar{
		    		position:relative;
					.fullscreen-btn{
						height: 31px;
						width: 70px;
						position: absolute;
						right: 0px;
						top:0px;
						outline: none;
					}
		    	}
				#content-box{
					height: 391px;
				}
		    }
	    }
	    .edit-buttons{
    	    width: 901px;
		    margin: 30px auto;
		    text-align: center;
	    	button{
			    font-size: 14px;
			    color: #fff;
			    background-color: #6da685;
			    padding: 7px 13px;
			    border-radius: 1px;
			    border: none;
			    outline: none;
	    	}
	    	.margin-right{
	    		margin-right: 125px;
	    	}
	    }
		.cropper-wrapper{
		    position: fixed;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    background-color: rgba(0,0,0,.7);
		    z-index: 8;
		    .cropper{
		    	position: absolute;
			    top: 40%;
			    left: 50%;
			    width: 861px;
			    padding: 20px;
			    margin-top: -203px;
			    margin-left: -480px;
			    background-color: #fff;
			    border-radius: 10px;
		    	.cropper-box{
				    width: 480px;
				    height: 406px;
				    float: left;
			    }
			    .right{
			    	float: left;
				    margin-left: 80px;
				    text-align: right;
				    .show-preview{
			    	    background-color: #f7f7f7;
					    width: 280px;
					    height: 210px;
					    overflow: hidden;
					    img{
				    	    width: 100%;
					    }
				    }
				    .preview-btn{
			    	    margin-top: 20px;
				    }
				    button{
			    	    display: inline-block;
					    width: 80px;
					    height: 24px;
					    background-color: #bfbfbf;
					    border: none;
					    outline: none;
					    border-radius: 2px;
					    color: #fff;
					    cursor: pointer;
				    }
				    button:hover{
				    	background-color: #6da685
				    }
				    .buttons{
	    				margin-top: 130px;
				    }
			    }
		    }
		}
	}
	.fullscreen{
        position: fixed;
        z-index: 100;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        padding: 20px;
        background-color: #fff;
        z-index: 6;
        .w-e-toolbar{
    		position:relative;
			.fullscreen-btn{
				height: 31px;
				width: 70px;
				position: absolute;
				right: 0px;
				top:0px;
				outline: none;
			}
    	}
		#content-box{
			height: 391px;
		}
	}
	.previewContent{
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background-color: #fff;
	    z-index: 8;
	    overflow: auto;
		.main{
			margin: auto;
    		width: 1100px;
			h1{
				text-align: center;
				height: 100px;
				line-height: 100px;
			}
			button{
			    display: inline-block;
			    width: 81px;
			    height: 31px;
			    background-color: #6da685;
			    border: none;
			    outline: none;
			    border-radius: 1px;
			    color: #fff;
			    margin-top: 40px;
			    font-size: 16px;
			    cursor:pointer;
			    img{
		    	    position: relative;
				    top: 1px;
				    margin-right: 8px;
			    }
			}
		}
		
	}
}
</style>
