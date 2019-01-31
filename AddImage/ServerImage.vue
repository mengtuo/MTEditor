<template>
        <div class="uploadServer">
             <!-- <div class="baseURL">
                <label>基础路径</label>
                <input type="text" v-model="baseURL" id="baseURL">
            </div> -->
            <div class="serverAddress">
                <label for="serverAddress">服务器地址</label>
                <input type="text" id="serverAddress" class="address" v-model="address">
            </div>
             <div class="addIcon" ref="addIcon">
                 <ul>
                     <li v-for="(item,key) in imagesTarget" 
                      :key="key"
                      >
                        <div class="imgDiv" v-html="item.outerHTML"></div>
                        <div class="imgCover">
                            <i class="fa fa-times-circle-o" @click="deleteURL(key)"></i>
                        </div>
                     </li>
                 </ul>
                <label for="localSource" class="localSourceLabel" ref="localLabel" v-show="files.length<3" @click.stop>
                    <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                </label>
                <input type="file" id="localSource" multiple="multiple" @change="selectFile"  @click.stop>
            </div>
            <div class="results">
                <ul>
                    <li v-for="(item,key) in imageURLS" :key="key">
                        <span>图片{{key+1}}:{{baseURL+item}}</span>
                        <button class="btn danger" style="height:20px;width:40px;" @click="deleteURL(key)">删除</button>
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
            baseURL: 'http://localhost:3000',
            imagesTarget: [],
            showDelete: false

        }
    },
    
    methods: {
        handleClose(){
            this.$parent.show = false;
        },
            // 选择图片
        selectFile(event) {
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
            this.previewImage(this.files, addIcon);
        },
        async previewImage(files, target) {
            this.showPreview = true;
            var localLabel = this.$refs.localLabel;
            for (var i = 0; i < this.files.length; i++) {
                var url = this.getObjectURL(this.files[i]);
                var image = new Image();
                image.src = url;
                image.name = this.files[i].name;
                image.style.cssText = "width:auto;height:100%";
                var isSaved = false;
                for(var j=0;j<this.imagesTarget.length;j++){
                    var imgTarget = this.imagesTarget[j];
                    if(imgTarget.name == image.name){
                        isSaved = true;
                        break;
                    }
                }
                if(!isSaved){
                    this.imagesTarget.push(image);
                }
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
                /**
                 * 判断预览图片里是否已经有该图片
                 */
                this.imageURLS = resp.data.imgPaths;
                //请求添加成功之后,重新发起请求,获取彩种的列表
                // this.handleClose();
            }).catch((error)=>{
                console.log(error);
            })
        },
         async insertImage() {
            this.restoreRange(this.currentSelect);
            for (var key in this.imageURLS) {
                this.execCommand("insertImage", this.baseURL+this.imageURLS[key]);
            }
            this.handleClose();
        },
        deleteURL(index){
            //删除地址
            this.imageURLS.splice(index,1);
            // 删除图片对应的文件对象
            this.files.splice(index,1);
            // 删除预览图片
            this.imagesTarget.splice(index,1)
        }
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
.addIcon ul {
    height: 100%;
    display: flex;
    flex-direction: row;
}
.addIcon ul li {
    height: 100%;
}
.addIcon ul li img {
    height: 100%;
}
.imgDiv {
    height: 100%;
}
.imgDiv img {
    height: 100%;
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
    background: rgb(211, 215, 216);
}

/* 划过删除图片 */
.imgCover {
    width: 100%;
    height: 100%;
    background: red;
    z-index: 102;
    font-size: 14px;
    margin-top: -100px;
    text-align: right;
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
