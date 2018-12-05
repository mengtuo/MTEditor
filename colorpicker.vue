<template>
  <div id="colorpicker" @click.stop>
    <canvas id="canvas" width="100" height="100"></canvas>
    <div id="mask"></div>
  </div>
</template>

<script>
import colorsImg from "./images/colors.png";
export default {
  props: ["colorObj"],
  methods: {
    selectColor(colorHex) {
      this.colorObj.color = colorHex;
    },
    drawColor() {
      var image = new Image();
      image.src = colorsImg;
      var mask = document.getElementById("mask");
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      context.shadowBlur = 20;
      context.drawImage(image, 0, 0, 100, 100);
      var _this = this;
      canvas.onclick = function(e){
            var pos = _this.findPos(this);
            var x = e.pageX - pos.x;
            var y = e.pageY - pos.y;
            var coord = "x=" + x + ", y=" + y;
            var c = this.getContext('2d');
            var p = c.getImageData(x, y, 1, 1).data; 
            var hex = "#" + ("000000" + _this.rgbToHex(p[0], p[1], p[2])).slice(-6);
            console.log(hex);
            mask.style.background = `radial-gradient(${hex}, black,white)`;
      }
      mask.onclick = function(e){
          var pos = _this.findPos(this);
            var x = e.pageX - pos.x;
            var y = e.pageY - pos.y;
            var coord = "x=" + x + ", y=" + y;
            // var c = this.getContext('2d');
            // var p = c.getImageData(x, y, 1, 1).data; 
            // var hex = "#" + ("000000" + _this.rgbToHex(p[0], p[1], p[2])).slice(-6);
            console.log(coord);
      }
    },
    findPos(obj) {
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

    rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    }
  },
  mounted() {
    this.drawColor();
  }
};
</script>

<style scoped>
#colorpicker {
  width: 100px;
  height: 100px;
  background: white;
}
#mask {
    position: relative;
    width: 50px;
    height: 50px;
    background: red;
    top: -85px;
    left: 25px;
}
</style>
