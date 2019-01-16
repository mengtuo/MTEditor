<template>
    <div id="MTEditor" ref="MTEditor">
        <div class="MTEditor-header" @click="focusEditor">
                <ul>
                    <li>
                       <edHeader :showChild="showChild"/>
                    </li>
                    <li v-for="(item,key) in allConfig" :key="key"
                     onmousedown="event.preventDefault()"
                     @click.stop="execCommand(item.commad)"
                     >
                         <i :class=item.class 
                            :title=item.title
                            >
                        </i>
                    </li>
                    
                    <li v-if="showImage">
                        <addImage :currentSelect="currentSelection" :range="range"/>
                    </li>
                    <li v-if="showTable">
                        <addTable :range="range"/>
                    </li>
                    <li v-if="showLink">
                        <addLink :range="range"/>
                    </li>
                </ul>
        </div>
        <div class="MTEditor-content" >
            <div  id="text_area" 
            contenteditable=true v-focus 
            ref="richEdit"
            @blur="backupRange('输入框失去焦点')" 
            @input="code=$event.target.innerHTML,$emit('input',$event.target.innerHTML)"
            @mousedown="mousedown"
            ></div>
        </div>
        <image-menu v-show="isImage"/>
        <transition name="fade">
            <div v-if="saved" class="savedConfirm" ref="saved">已保存到本地</div>
        </transition>
    </div>
</template>
<script>
import '../font-awesome/css/font-awesome.min.css'
import edHeader from './Header'
import addImage from './AddImage/AddImage'
import addLink from './AddLink'
import addTable from './AddTable'
import imageMenu from './ContextMenu/imageMenu'
import configJSON from './allConfig.json'
export default {
    name: 'mt-editor',
    components: {edHeader,addImage,addLink,addTable,imageMenu},
    props:{
        value: String,
        config: {
            type:Array,
             // 对象或数组默认值必须从一个工厂函数获取
            default: function () {
                return configJSON;
            }
        }
    },
    data(){
        return {
            isHTML:'false',
            content: ``,
            showChild: false,
            selectedUnorder:false,
            selectedOrdered:false,
            textValue:'',
            showcodeView:false,
            code:'',//保存到本地的代码
            saved: false,
            timeOut: null,
            currentSelection:{},//保留上次光标所在的位置
            isImage: false, //右键选中的是否是图片
            range: {},//光标信息
            showImage: false,//显示image标签
            showTable:false,
            showLink: false
        }
    },
    computed: {
        allConfig(){
            // 求两个数组的交集
               var rs = configJSON.filter((item)=>{
                    // console.log(item.title);
                             console.log(this.showImage)
                    for(var i=0;i<this.config.length;i++){
                        var config = this.config[i];
                        console.log(item.commad);
                        if(config.commad==="image"||config.title==="图片"){
                            this.showImage = true;
                        }
                        if(config.commad==="table"||config.title==="表格"){
                            this.showTable = true;
                        }
                        if(config.commad==="link"||config.title==="链接"){
                            this.showLink = true;
                        }
                        if(item.title === config.title || item.commad===config.command){
                            return true;
                        }
                    }
                })
                console.log(rs);
            return  rs;
        }
    },
    methods: {
        execCommand:(command,value) => {
		    value? document.execCommand(command, false, value):document.execCommand(command, false, null)
        },
        myClearTimeout(){
            clearTimeout(this.timeOut);
        },
        myInterval(func,time){
            this.timeOut = setTimeout(()=>{
                clearTimeout(this.timeOut);
                func();
                this.myInterval(func,time);
            },time)
        },
        mousedown(event){
            var tagName = event.target.tagName;
            switch(event.button){
                case 2: 
                    if(tagName==='IMG'){
                        this.isImage = true;
                    }
                    break;
            }
        },
         // 保留光标所在位置
         backupRange(text) {
            console.log(text);
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            console.log(range);
            this.range = selection.getRangeAt(0);
            console.log(range.startContainer);
            this.currentSelection = {
                "startContainer": range.startContainer,
                "startOffset": range.startOffset,
                "endContainer": range.endContainer,
                "endOffset": range.endOffset
            }
            localStorage.setItem("currentSelection",JSON.stringify(this.currentSelection))
        },
        
        test(){
            this.show = false;
        },
        
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
        // 鼠标点击头部的空白地区的时候默认让输入框
        focusEditor(){
            console.log("点击空白地方");
            var richEdit = this.$refs['richEdit'];
            richEdit.focus();
        }
    },
    mounted(){
        var richEdit = this.$refs.richEdit;
        console.log(this.value);
        if(this.value){
            richEdit.innerHTML = this.value;
        }else{
            console.log(this.value);
            richEdit.innerHTML = `<p><br></p> `;
        }
        this.myInterval(()=>{
            this.saved = true;
            localStorage.setItem("code",richEdit.innerHTML)
            setTimeout(() => {
                this.saved = false;
            }, 4000);
        },30000);
    },
    directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
    .fade-enter-active,.fade-leave-active {
        transition: all 0.5s;
    }
    .fade-enter,.fade-leave-to {
        opacity: 0;
    }
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #MTEditor {
        width: 100%;
        min-height: 400px;
        border: 1px solid lightgray;
    }
    .MTEditor-header{
        width: 100%;
        height: auto;
        min-height: 30px;
        background: -webkit-linear-gradient(top,white,rgb(234, 234, 234));
    }
    .MTEditor-header ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .MTEditor-header ul li {
        width: 24px;
        height: 24px;
        margin: 5px;
        color: gray;
        text-align: center;
    }
    .MTEditor-header ul li:hover {
        color: black;
    }
    .MTEditor-content{
        width: 100%;
        height: 400px;
        padding: 10px;
        box-sizing: border-box;
        overflow-y: scroll;
    }
    #text_area,#coldView{
        width: 100%;
        height: 100%;
        outline: none;
        border:none;
        resize: none;
        padding: 0;
        text-align: left;
        box-sizing: border-box
    }
    .text_area>p {
        padding: 0;
    }
    .icons {
        width: 24px;
        height: 24px;
        /* background: url("./css_sprites.png") no-repeat; */ 
    }
    .savedConfirm{
        width: 100px;
        height: 50px;
        background: lightblue;
        position: absolute;
        bottom: 0;
        right: 10px;
    }
</style>
