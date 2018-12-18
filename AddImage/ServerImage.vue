<template>
        <div class="uploadServer">
             <div class="baseURL">
                <label>基础路径</label>
                <input type="text" v-model="baseURL" id="baseURL">
            </div>
            <div class="serverAddress">
                <label for="serverAddress">服务器地址</label>
                <input type="text" id="serverAddress" class="address" v-model="address">
            </div>
             <div class="addIcon" ref="addIcon">
                <label for="localSource" class="localSourceLabel" ref="localLabel" v-show="files.length<3">
                    <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                </label>
                <input type="file" id="localSource" multiple="multiple" @change="selectFile">
            </div>
            <div class="results">
                <ul>
                    <li v-for="(item,key) in imageURLS" :key="key">
                        图片{{key+1}}:{{baseURL+item}}
                    </li>
                </ul>
            </div>
            <div class="uploadFooter">
                <button  @click="startUpload" class="btn danger">开始上传</button>
                <button class="btn danger" @click="handleClose">取消</button>
                <button class="btn primary" @click="insertImage()">确定</button>
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
            imageURLS:[],
            baseURL: 'http://localhost:3000'
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
            if(files.length>1){
                // this.files.concat(Array.from(files))
                for(var i=0;i<files.length;i++){
                    this.files.push(files[i])
                }
            }else{
                this.files.push(files[0]);
            }
            var addIcon = this.$refs.addIcon;
            console.log("选择图片");
            console.log(this.files);
            this.previewImage(files, addIcon);
        },
        async previewImage(files, target) {
            this.showPreview = true;
            var localLabel = this.$refs.localLabel;
            for (var i = 0; i < files.length; i++) {
                var url = this.getObjectURL(files[i]);
                var image = new Image();
                image.src = url;
                image.style.cssText = "width:auto;height:100%";
                var p = await new Promise((resolve, reject) => {
                image.onload = function() {
                    // target.appendChild(image);
                    target.insertBefore(image,localLabel)
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
            let config = {  
                headers:{'Content-Type':'multipart/form-data'}  
            };
            axios.post(this.address,fd,config)
            .then((resp)=>{
                console.log(resp);
                // this.imageAddress = resp.data.imageAddress;
                this.imageURLS = resp.data.imgPaths;
                //请求添加成功之后,重新发起请求,获取彩种的列表
                this.handleClose();
            }).catch((error)=>{
                console.log(error);
            })
        },
         async insertImage() {
            this.restoreRange(this.currentSelect);
            for (var key in this.imageURLS) {
                this.execCommand("insertImage", this.baseURL+this.imageURLS[key]);
            }
        },
    }
}
</script>
<style scoped>
* {
    list-style: none;
    margin: 0;
    padding: 0;
}
.uploadServer {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.serverAddress,.baseURL{
    width: 100%;
    height: 35px;
    padding: 5px;

}
.serverAddress label,.baseURL label{
    display: inline-block;
    width: 100px;
    padding-left: 20px;
}
#serverAddress,#localAddress,#baseURL{
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
  width: 100%;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  font-size: 40px;
  margin: 5px;
  color: rgb(140, 230, 244);
  padding-left: 10px;
} 
/* 上传结果 */
.results{
    width: 100%;
    height: 80px;
    overflow: scroll;
}

.results ul {
    width: 100%;
    height: 100%;
}

.results ul li {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-top: 5px;
    box-sizing: border-box;
    background: lightblue;
}

#localSource {
  display: none;
}
.localSourceLabel {
    display: block;
    width: 100px;
    height: 100px;
    border: 1px dashed lightgray;
    text-align: center;
    line-height: 100px;

}

.uploadFooter {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: right;
}
</style>
