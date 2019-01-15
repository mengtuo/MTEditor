<template>
  <div id="addNewImage">
    <i class="fa fa-image" onmousedown="event.preventDefault();" title="插入图片" @click="show=!show,richEditBlur()"></i>
    <div v-if="show" class="coverLayer" @click.stop.prevent="handleClose">
      <div class="imageBox" @click.stop.prevent>
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
          >上传到服务器配置
          <i class="fa fa-question"></i>
          </li>
        </ul>
        <base64IMG v-if="currentIndex==1" :currentSelect="currentSelect" @click.stop :range="range"></base64IMG>
        <onlineImage v-if="currentIndex==2" :currentSelect="currentSelect" @click.stop :range="range"></onlineImage>
        <server-image v-if="currentIndex==3" :currentSelect="currentSelect" @click.stop :range="range"></server-image>
      </div>
    </div>
  </div>
</template>

<script>
import base64IMG from './Base64Image'
import onlineImage from './onlineImage'
import ServerImage from './ServerImage'
export default {
  props: ['currentSelect','range'],
  components: {base64IMG,onlineImage,ServerImage},
  data() {
    return {
      currentIndex: 1,
      files: [],
    };
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
  width: 600px;
  height: 333px;
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
.imageBox>ul li {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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
.primary {
  background: #1678fa;
}
.danger {
  background: #e9210e;
}
</style>
