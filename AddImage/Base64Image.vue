<template>
   <div class="localUpdate" @click.stop>
        <div class="addIcon" style="height:50px">
            <label for="uploadSource">
            <i class="fa fa-cloud-upload" aria-hidden="true"></i>
            </label>
            <input type="file" id="uploadSource" multiple="multiple" @change="selectFile">
        </div>
        <div>
            宽 <input  type="number" style="width:40px" v-model.number="imgWidth">
            <i :class="{fa:true,'fa-link':isLink,'fa-unlink':!isLink}" @click="isLink=!isLink"></i>
            高 <input  type="number" style="width:40px" v-model.number="imgHeight">            
        </div>
        <div class="preview" ref="preview"></div>
        <div class="uploadFooter">
            <button class="btn danger" @click="handleClose">取消</button>
            <button class="btn primary" @click="insertImage('base64')">确定</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['currentSelect','range'],
    data(){
        return {
            imgHeight: 0,
            imgWidth: 0,
            isLink: true
        }
    },
    methods: {
        handleClose(){
            this.$parent.show = false;
        },
        selectFile(event) {
            var e = event || window.event;
            var files = e.target.files;
            this.files = files;
            var preview = this.$refs.preview;
            this.previewImage(files, preview);
        },
        // 将图片插入到内容中
        async insertImage(type) {
            console.log(this.range);
            var innerDom = this.range.extractContents();
            console.log(innerDom);
             this.restoreRange(this.currentSelect);
             for (var i = 0; i < this.files.length; i++) {
                var file = this.files[i];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                await new Promise((resolve, reject) => {
                    reader.onload = e => {
                        var img = document.createElement("img");
                        img.className = 'inertImage'
                        img.src =  e.target.result;
                        // 关联计算图片的宽高
                        if(this.isLink){

                        }
                        img.style.width = this.imgWidth==0?'auto':this.imgWidth+'px';
                        img.style.height = this.imgHeight==0?'auto':this.imgHeight+'px';
                        img.appendChild(innerDom);
                        this.range.insertNode(img);
                        this.adjustList('.inertImage');
                        // this.resetAll();
                        resolve();
                    };
                });
            }
            this.handleClose();
        },
        async previewImage(files, target) {
            for (var i = 0; i < files.length; i++) {
                var div = document.createElement("div");
                var url = this.getObjectURL(files[i]);
                var image = new Image();
                image.src = url;
                image.style.cssText = "width:160px;";
                var p = await new Promise((resolve, reject) => {
                image.onload = ()=> {
                    console.log(image.width);
                    this.imgHeight = image.height;
                    this.imgWidth = image.width;
                    console.log(image.height);
                    target.appendChild(image);
                    resolve();
                };
            });
        }
    },
    //取得该文件的url
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    },
    created(){
        // this.backupRange();
    },
    watch: {
       
    }
}
</script>
<style scoped>
.localUpdate {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#uploadSource {
  display: none;
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
  color: rgb(140, 230, 244);
}
/*图片预览*/ 
.preview {
    width: 100%;
    height: 70%;
}
.uploadFooter {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: right;
}
</style>
