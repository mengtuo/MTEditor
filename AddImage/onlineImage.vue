<template>
  <div class="onlineUpdate">
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
      <button class="btn primary" @click="insertImage()">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  props:['currentSelect','range'],
  data() {
    return {
      address: {
          addr1:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544632585413&di=48fd06b907a12300fe4c99585dafef35&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2FoM3Ux_qm9BNW6fp1HxJ8_Q%3D%3D%2F1687723960457254251.jpg',
      },
      imgWidth: 0,
      imgHeight:0,
    };
  },
  methods: {
    handleClose(){
        this.$parent.show = false;
    },
    async insertImage() {
        var innerDom = this.range.extractContents();
        this.restoreRange(this.currentSelect);    
        for (var key in this.address) {
            var rs = this.checkURL(this.address[key]);
            if(rs){
                // 后期加上判断图片地址是否正确的正则
                // this.execCommand("insertImage", this.address[key]);
                 var img = document.createElement("img");
                  img.className = 'inertImage'
                  img.src =  this.address[key];
                  img.style.width = "100%";
                  img.style.height = this.imgHeight==0?'auto':this.imgHeight+'px';
                  img.appendChild(innerDom);
                  this.range.insertNode(img);
                  this.adjustList('.inertImage');
                  this.handleClose();
                  console.log(img.parentElement);
            }else{
                alert(key+"图片地址不正确");
            }
        }
    },
    checkURL(url) {
      var reg = /\.(png|jpg|gif|jpeg)$/;
      return reg.test(url)
    }
  },
  watch: {
    
  }
};
</script>
<style scoped>
.onlineUpdate {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
/* 上传图片地址 */
.onlineUpdate ul {
    margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing:border-box;
}
.onlineUpdate ul li {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.address {
  width: 85%;
  height: 30px;
}
.uploadFooter {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: right;
}
</style>
