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
  props:['currentSelect'],
  data() {
    return {
      address: {
          addr1:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544632585413&di=48fd06b907a12300fe4c99585dafef35&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2FoM3Ux_qm9BNW6fp1HxJ8_Q%3D%3D%2F1687723960457254251.jpg',
      }
    };
  },
  methods: {
    handleClose(){
        this.$parent.show = false;
    },
    async insertImage() {
        this.restoreRange(this.currentSelect);    
        for (var key in this.address) {
            var rs = this.checkURL(this.address[key]);
            if(rs){
                // 后期加上判断图片地址是否正确的正则
                this.execCommand("insertImage", this.address[key]);
            }else{
                console.log(key+"图片地址不正确");
            }
        }
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
