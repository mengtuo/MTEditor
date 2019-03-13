<template>
    <div>
        <image-menu v-show="contextType=='image'" @changeImageSize="changeImageSize"></image-menu>
        <table-menu v-show="contextType=='table'" :tapTd="tapTd" :tapTr="tapTr" :tapIndex="tapIndex"></table-menu>
    </div>
</template>

<script>
import imageMenu from './imageMenu';
import tableMenu from './TableMenu'
export default {
    components: {imageMenu,tableMenu},
    data(){
        return {
            contextType: 'div',
            tapTd: {},//右键选中元素的
            tapIndex: 0,//选中的元素的下标
            tapTr: {},
            rowIndex: 0,
            imgTarget:{}
        }
    },
    methods:{
        changeImageSize(imageSize){
            this.imgTarget.style.width = imageSize.imageWidth==0?'auto':imageSize.imageWidth+'px';
            this.imgTarget.style.height = imageSize.imageHeight==0?'auto':imageSize.imageHeight+'px';
        }
    },
    watch: {
        contextType(newValue){
            if(newValue==='image'){
                console.log(this.contextEvent);
                var contextmenu=document.getElementById('imageMenu');
                document.oncontextmenu = function(ev){
                    var oEvent=ev||event;
                    //一定要加px，要不然chrom不认
                    contextmenu.style.position = "absolute";
                    contextmenu.style.top=oEvent.clientY+10+'px';
                    contextmenu.style.left=oEvent.clientX+'px';
                    contextmenu.style.display='block';
                    return false;
                }
                document.onclick = function(){
                    contextmenu.style.display = 'none';
                }
            }else if(newValue === 'table'){
                console.log(this.$parent.$refs.MTEditor.offsetLeft);
                console.log("点击的是表格");
                var offsetLeft = this.$parent.$refs.MTEditor.offsetLeft;
                var contextmenu=document.getElementById('menu');
                document.oncontextmenu = function(ev){
                    var oEvent=ev||event;
                    console.log(oEvent);
                    //一定要加px，要不然chrom不认
                    contextmenu.style.position = "absolute";
                    contextmenu.style.top=oEvent.clientY+10+'px';
                    contextmenu.style.left=oEvent.clientX-offsetLeft+'px';
                    contextmenu.style.display='block';
                    return false;
                }
                document.onclick = function(){
                    contextmenu.style.display = 'none';
                }
            }else{
                document.oncontextmenu = function(ev){
                    return true;
                }
            }
        }
    },
    mounted() {
        var richEdit = this.$parent.$refs['richEdit'];
        richEdit.onmousedown = (e)=>{
            var tagName = e.target.tagName;
            switch(e.button){
                case 2: 
                    console.log("右键");
                    if(tagName==='IMG'){
                        this.contextType = "image";
                        this.imgTarget = e.target;
                    }else if(tagName === "TD"){
                        this.contextType = "table";
                        this.tapTd = e.target;
                        this.tapTr = e.target.parentElement;
                        this.tapIndex = Array.from(this.tapTr.children).indexOf(e.target);
                    }else{
                        this.contextType = "div";
                    }
                break;
            }
        }
    },
}
</script>

<style scoped>

</style>
