<template>
  <div id="colorpicker" @click.stop>
    <canvas id="canvas" width="100" height="100"></canvas>
    <div class="opacityBar">
      <ul>
        <li>R <input type="text" class="colorInput" v-model.number="colors.r"></li>
        <li>G <input type="text" class="colorInput" v-model.number="colors.g"></li>
        <li>B <input type="text" class="colorInput" v-model.number="colors.b"></li>
        <li>A <input type="text" class="colorInput" v-model.number="colors.a"></li>
      </ul>
    </div>
    <div class="colorBar">
      <ul>
        <li class="colorItem" style="background-color:red" @click="colorObj.color='red'"></li>
        <li class="colorItem" style="background-color:green" @click="colorObj.color='green'"></li>
        <li class="colorItem" style="background-color:blue" @click="colorObj.color='blue'"></li>
        <li class="colorItem" style="background-color:black" @click="colorObj.color='black'"></li>
        <li class="colorItem" style="background-color:white" @click="colorObj.color='white'"></li>
      </ul>
    </div>
    <div class="alphaSlide">
      透明度<input type="range" max="1" min="0" step="0.01" v-model.number="colors.a" style="width:80px">
    </div>
  </div>
</template>

<script>
import colorsImg from "./images/colors.png";
export default {
  props: ["colorObj"],
  data(){
    return {
        colors: {
          r: 255,
          g: 255,
          b: 255,
          a: 1
        }
    }
  },
  computed: {
    RGB(){
      return `rgba(${this.colors.r},${this.colors.g},${this.colors.b},${this.colors.a})`
    }
  },
  methods: {
    selectColor(colorHex) {
      this.colorObj.color = colorHex;
    },
    drawColor() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext('2d');
        var r = 50;
        // var width = canvas.width;
        // var height = canvas.height;
        // canvas.style.width = width + "px";
        // canvas.style.height = height+"px";
        // canvas.height = height*window.devicePixelRatio;
        // canvas.width = width*window.devicePixelRatio;
        // ctx.scale(window.devicePixelRatio,window.devicePixelRatio);
        for (var i = 0; i < 360; i += .1) {
                //获取度数
                var rad = i * (2 * Math.PI) / 360,
                //计算x,y坐标
                x = r + Math.cos(rad) * r,
                y = r + Math.sin(rad) * r;
                //然后连接线
                ctx.strokeStyle = "hsl(" + i + ", 100%, 50%)";
                ctx.beginPath();
                ctx.moveTo(r,r);
                ctx.lineTo(x,y);
                ctx.stroke();
                ctx.closePath();
        }
        var _this = this;
        canvas.onclick = function(e){
            var pos = _this.findPos(this);
            var x = e.pageX - pos.x;
            var y = e.pageY - pos.y;
            console.log(x,y);
            var color = _this.getColor(x,y,ctx);
            _this.colorObj.color = color;
            console.log(color);
        }
    },
    findPos(obj){
      var curleft = 0,
        curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return { x: curleft, y: curtop };
      }
      return undefined;
    },
    getColor(x,y,ctx){
        var pixel = ctx.getImageData(x, y, 1, 1),
        data = pixel.data,
        rgb = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
        this.colors.r = data[0];
        this.colors.g = data[1],
        this.colors.b = data[2];
        this.colors.a = 1;
        return rgb
    }
  },
  watch: {
    colors:{
      handler(newValue,oldValue){
          console.log(newValue);
          this.colorObj.color = `rgba(${newValue.r},${newValue.g},${newValue.b},${newValue.a})`;
      },
      deep:true
    }
  },
  mounted() {
    this.drawColor();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#colorpicker {
  width: 100%;
  height: 150px;
  background: white;
  padding-left: 5px;
  box-sizing: border-box;
}
#canvas{
  position: relative;
  z-index: 100;
  float: left;
}
.opacityBar{
  position: relative;
  width: 80px;
  height:100px;
  float: left;
}
.colorInput {
  width: 40px;
  height: 20px;
}
.colorBar {
  width: 100px; 
  height: 20px; 
  position: relative;
  clear: both;
}
.colorBar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.colorItem {
  width: 15px;
  height: 15px;
  border:1px solid lightgray;
  margin-left: 5px;
}
.alphaSlide {
  width: 100%;
  height: 20px;
  position: relative;
  
  clear: both;
}
</style>
