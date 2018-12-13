<template>
        <div class="uploadServer">
            <div class="serverAddress">
                <label for="serverAddress">服务器地址</label>
                <input type="text" id="serverAddress" class="address" v-model="address">
            </div>
             <div class="addIcon" style="height:50px">
                <label for="localSource">
                <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                </label>
                <input type="file" id="localSource" multiple="multiple" @change="selectFile">
            </div>
            <div class="previewImage" ref="previewImage" v-show="showPreview"></div>
            <button  @click="startUpload">开始上传</button>
            <p><span>图片地址</span><span>{{imageAddress}}</span></p>
            <div class="uploadFooter">
                <button class="btn danger" @click="handleClose">取消</button>
                <button class="btn primary" @click="insertImage('base64')">确定</button>
            </div>
        </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['currentSelect'],
    data(){
        return {
            showPreview:false,
            address: '',
            files: [],
            imageAddress:''
        }
    },
    handleClose(){
        this.$parent.show = false;
    },
    methods: {
          // 选择图片
        selectFile(event) {
            console.log("测试");
            var e = event || window.event;
            var files = e.target.files;
            this.files = files;
            var previewImage = this.$refs.previewImage;
            console.log("选择图片");
            console.log(files);
            this.previewImage(files, previewImage);
        },
        async previewImage(files, target) {
            this.showPreview = true;
            for (var i = 0; i < files.length; i++) {
                var url = this.getObjectURL(files[i]);
                var image = new Image();
                image.src = url;
                image.style.cssText = "width:200px;";
                var p = await new Promise((resolve, reject) => {
                image.onload = function() {
                    target.appendChild(image);
                    
                    resolve();
                };
            });
        }
        },
        startUpload(){
            var fd = new FormData();
            for(var i=0;i<this.files.length;i++){
                fd.append("file",this.files[i]);
            }
            // fd.append("file",this.uploadFiles[0]);
            fd.append('en','test');
            fd.append('cn','朱蒙托');
            let config = {  
                headers:{'Content-Type':'multipart/form-data'}  
            };
            axios.post(this.address,fd,config)
            .then((resp)=>{
                console.log(resp);
                this.imageAddress = resp.data.imageAddress;
                //请求添加成功之后,重新发起请求,获取彩种的列表
                this.handleClose();
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
}
</script>
<style scoped>
.uploadServer {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.serverAddress {
    width: 100%;
    height: 30px;
    padding: 5px;
}
.serverAddress label {
    display: inline-block;
    width: 100px;
    padding-left: 20px;
    padding-right: 20px;
}
#serverAddress,#localAddress {
    height: 100%;
    width: 80%;
    border: none;
    border:1px solid lightgray;
    border-radius: 5px;
    outline: none;
    padding: 2px;
    box-sizing: border-box;
}

/*上传图标*/
.addIcon {
  width: 70px;
  height: 70px;
  border: 1px dashed rgb(208, 206, 206);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin: 5px;
  color: rgb(140, 230, 244);
} 
/*图片预览*/ 
.previewImage {
  width: 200px;
  height: 200px;
  background: white;
  margin-top: -60px;
}
#localSource {
  display: none;
}
.uploadFooter {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: right;
}
</style>
