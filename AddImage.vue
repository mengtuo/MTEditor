<template>
    <div id="addNewImage">
        <i class="fa fa-image" 
            onmousedown="event.preventDefault();" 
            title="插入图片"
            @click="show=!show"    
        >
        </i>
        <div v-if="show" class="coverLayer" @click.stop="handleClose">
            <div class="imageBox" @click.stop>
                <div class="boxTop">
                    <span>插入图片</span>
                    <span>
                        <i class="fa fa-times-circle-o"
                         aria-hidden="true"
                         style="color:red"
                         @click="handleClose"
                         ></i>
                    </span>
                </div>
                <ul class="inserType">
                    <li @click="currentIndex=1">本地上传</li>
                    <li @click="currentIndex=2">在线图片</li>
                    <li @click="currentIndex=3">图片搜索</li>
                </ul>
                <div class="localUpdate" v-show="currentIndex==1">
                    <div class="addIcon">
                        <label for="uploadSource">
                            <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                        </label>
                        <input type="file" id="uploadSource" multiple="multiple" @change="selectFile">
                    </div>
                    <div class="preview" ref="preview"></div>
                    <div class="uploadFooter">
                        <button class="btn danger">取消</button>
                        <button class="btn primary" @click="insertImage">确定</button>
                    </div>
                </div>
                <div class="onlineUpdate" v-show="currentIndex==2">
                    <!-- 在线图片,添加链接 -->
                </div>
                <div class="searchOnline" v-show="currentIndex==3">
                    <iframe src="./searh.html" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            show: false,
            currentIndex:1,
            files: [],
            currentSelection:{}
        }
    },
    methods: {
        execCommand(value){
            document.execCommand('insertImage',false,value)
        },
        handleClose(event){
            this.show = false;
        },
        // 选择图片
         selectFile(event){
            var e = event || window.event;
            console.log(e);
            var files = e.target.files;
            this.files = files;
            var preview = this.$refs.preview;
            this.previewImage(files,preview);
        },
        // 将图片插入到内容中
        insertImage(){
            // console.log(this.$parent.$refs.richEdit);
            this.restoreRange();
            var richEdit = this.$parent.$refs.richEdit;
            for(var i=0;i<this.files.length;i++){
                var url = this.getObjectURL(this.files[i]);
                this.execCommand(url);
            }
            this.handleClose();
        },
        async previewImage(files,target){
            for(var i=0;i<files.length;i++){
                var url = this.getObjectURL(files[i]);
                var image = new Image();
                image.src = url;
                image.style.cssText="width:100px;"
                var p = await new Promise((resolve,reject)=>{
                    image.onload = function(){
                        target.appendChild(image);
                        resolve();
                    }
                })
            }
        },
        execCommand(value){
            document.execCommand("insertImage", false, value);
        },
        //取得该文件的url 
        getObjectURL(file) { 
        　　var url = null ; 
        　　if (window.createObjectURL!=undefined) { 
        　　　　url = window.createObjectURL(file) ; 
        　　} else if (window.URL!=undefined) { 
        　　　　url = window.URL.createObjectURL(file) ; 
        　　} else if (window.webkitURL!=undefined) { 
        　　　　url = window.webkitURL.createObjectURL(file) ; 
        　　} 
        　　return url ; 
        },
        backupRange() {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            console.log(range);
            this.currentSelection = {
                "startContainer": range.startContainer,
                "startOffset": range.startOffset,
                "endContainer": range.endContainer,
                "endOffset": range.endOffset

            }
        },
        restoreRange() {
            if (this.currentSelection) {

                let selection = window.getSelection();

                selection.removeAllRanges();

                let range = document.createRange();

                range.setStart(this.currentSelection.startContainer, this.currentSelection.startOffset);

                range.setEnd(this.currentSelection.endContainer, this.currentSelection.endOffset);

                // 向选区中添加一个区域

                selection.addRange(range);  
            }

        }
    },
    watch: {
        show(value){
            if(value){
                this.backupRange();
            }
        }
    }
    
}
</script>
<style scoped>
 *{
     margin: 0;
     padding: 0;
     list-style: none;
 }
    #addNewImage {
        width: 100%;
        height:100%;
    }
    #addNewImage>i {
        width: 100%;
        display: inline-block;
        text-align: center;
    }
    .coverLayer {
        width: 100%;
        height: 100%;
        border: 1px solid lightgray;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);

    }
    .imageBox {
        margin: 0 auto;
        margin-top: 60px;
        width: 50%;
        height: 50%;
        background: white;
        border: 1px solid lightgray;
        border-radius: 5px;
    }
    .boxTop {
        width: 100%;
        height: 33px;
        background: -webkit-linear-gradient(top,white,rgb(234, 234, 234));
        display: flex;
        justify-content: space-between;
        padding: 5px;
        box-sizing: border-box;
    }
   .imageBox ul {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid lightgray;
    }
    .imageBox ul li {
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .localUpdate {
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    } 
    .addIcon {
        width: 70px;
        height: 70px;
        border: 1px dashed rgb(208, 206, 206);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        margin: 5px;
        color: rgb(140, 230, 244)
    }
    .preview {
        width: 100%;
        height: 80%;
        
    }

    #uploadSource{
        display: none;
    }
    .uploadFooter{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: right;
    }
    .btn {
        width: 60px;
        height: 30px;
        border: none;
        border-radius: 5px;
        color: white;
        margin-right: 10px;
        outline: none;
    }
    .primary{
        background: #1678fa;
    }
    .danger{
        background: #e9210e
    }
</style>
