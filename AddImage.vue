<template>
  <div id="addNewImage">
    <i class="fa fa-image" onmousedown="event.preventDefault();" title="插入图片" @click="show=!show"></i>
    <div v-if="show" class="coverLayer" @click.stop="handleClose">
      <div class="imageBox" @click.stop>
        <div class="boxTop">
          <span>插入图片</span>
          <span>
            <i
              class="fa fa-times-circle-o"
              aria-hidden="true"
              style="color:red"
              @click="handleClose"
            ></i>
          </span>
        </div>
        <ul class="inserType">
          <li
            @click="currentIndex=1"
            :style="currentIndex==1?{color:'red'}:{color:'black'}"
          >生成Base64图片</li>
          <li @click="currentIndex=2" :style="currentIndex==2?{color:'red'}:{color:'black'}">在线图片地址</li>
          <li
            @click="currentIndex=3"
            :style="currentIndex==3?{color:'red'}:{color:'black'}"
          >上传到服务器配置</li>
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
            <button class="btn danger" @click="handleClose">取消</button>
            <button class="btn primary" @click="insertImage('base64')">确定</button>
          </div>
        </div>
        <div class="onlineUpdate" v-show="currentIndex==2">
          <!-- 在线图片,添加链接 -->
          <ul class="addressList">
            <li>
              <label for="addr1">地址1</label>
              <input type="text" id="addr1" class="address" v-model="address.addr1">
            </li>
            <li>
              <label for="addr2">地址2</label>
              <input type="text" id="addr2" class="address" v-model="address.addr2">
            </li>
            <li>
              <label for="addr3">地址3</label>
              <input type="text" id="addr3" class="address" v-model="address.addr3">
            </li>
          </ul>
          <div class="uploadFooter">
            <button class="btn danger" @click="handleClose">取消</button>
            <button class="btn primary" @click="insertImage('urlOnline')">确定</button>
          </div>
        </div>
        <div class="searchOnline" v-show="currentIndex==3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 1,
      files: [],
      address: {}
    };
  },
  methods: {
    // 选择图片
    selectFile(event) {
      var e = event || window.event;
      var files = e.target.files;
      this.files = files;
      var preview = this.$refs.preview;
      this.previewImage(files, preview);
    },
    // 将图片插入到内容中
    async insertImage(type) {
      this.restoreRange();
      if (type == "base64") {
        for (var i = 0; i < this.files.length; i++) {
          var file = this.files[i];
          var reader = new FileReader();
          reader.readAsDataURL(file);
          await new Promise((resolve, reject) => {
            reader.onload = e => {
              this.execCommand("insertImage", e.target.result);
              resolve();
            };
          });
        }
      }
      if (type == "urlOnline") {
        console.log(this.address);
        
        for (var key in this.address) {
            var rs = this.checkURL(this.address[key]);
            if(rs){
                // 后期加上判断图片地址是否正确的正则
                this.execCommand("insertImage", this.address[key]);
            }else{
                console.log(key+"图片地址不正确");
            }
        }
      }
      this.handleClose();
    },
    async previewImage(files, target) {
      for (var i = 0; i < files.length; i++) {
        var url = this.getObjectURL(files[i]);
        var image = new Image();
        image.src = url;
        image.style.cssText = "width:100px;";
        var p = await new Promise((resolve, reject) => {
          image.onload = function() {
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
    checkURL(URL) {
      var str = URL;
      //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
      //下面的代码中应用了转义字符"\"输出一个字符"/"
      var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)\.(png|jpg|gif|jpeg)?/;
      var objExp = new RegExp(Expression);
      if (objExp.test(str) == true) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    show(value) {
      if (value) {
        this.backupRange();
      }
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#addNewImage {
  width: 100%;
  height: 100%;
}
#addNewImage > i {
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
  background: -webkit-linear-gradient(top, white, rgb(234, 234, 234));
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.localUpdate,
.onlineUpdate {
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
  color: rgb(140, 230, 244);
}
/* 上传图片地址 */
.onlineUpdate ul {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.onlineUpdate ul li {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
}
#uploadSource {
  display: none;
}
.uploadFooter {
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

.address {
  width: 90%;
  height: 30px;
}
.primary {
  background: #1678fa;
}
.danger {
  background: #e9210e;
}
</style>
