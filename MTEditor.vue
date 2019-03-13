<template>
    <div id="MTEditor" ref="MTEditor" :style="{height:height,width:width}">
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
                    <li v-if="showCode">
                        <addCode :range="range"></addCode>
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
                    <li @click="preview=true" >
                        <i class="fa fa-eye" title="预览"></i>
                    </li>
                </ul>
        </div>
        <div class="MTEditor-content" ref="MTEditorContent">
            <div  id="text_area" 
            contenteditable=true v-focus 
            ref="richEdit"
            @blur="backupRange('输入框失去焦点')" 
            @input="code=$event.target.innerHTML,$emit('input',$event.target.innerHTML)"
            ></div>
        </div>
        <context-menu :contextType="contextType"></context-menu>
        <transition name="fade">
            <div v-if="saved" class="savedConfirm" ref="saved">已保存到本地</div>
        </transition>
        <div class="preview" v-if="preview" v-html="value">
        </div>
    </div>
</template>
<script>
import '../font-awesome/css/font-awesome.min.css'
import edHeader from './Header'
import addImage from './AddImage/AddImage'
import addLink from './AddLink'
import addTable from './AddTable'
import addCode from './AddCode/AddCode'
import imageMenu from './ContextMenu/imageMenu'
import contextMenu from './ContextMenu/ContextMenu'
import configJSON from './allConfig.json'
export default {
    name: 'mt-editor',
    components: {edHeader,addImage,addLink,addTable,contextMenu,addCode},
    props:{
        value: String,
        config: {
            type:Array,
             // 对象或数组默认值必须从一个工厂函数获取
            default: function () {
                return configJSON;
            }
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
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
            showLink: false,
            showCode: false,
            contextType: 'div',//右键选中的类型
            preview:false,
        }
    },
    computed: {
        allConfig(){
            // 求两个数组的交集
               var rs = configJSON.filter((item)=>{
                    for(var i=0;i<this.config.length;i++){
                        var config = this.config[i];
                        if(config.commad==="code" || config.title==="代码"){
                            this.showCode = true;
                        }
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
            return  rs;
        }
    },
    methods: {
        execCommand:(command,value) => {
            console.log("命令",command);
            if(command == 'code'){
                // 插入代码
                this.insertCode()
            }else{
                value? document.execCommand(command, false, value):document.execCommand(command, false, null)
            }
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
         // 保留光标所在位置
         backupRange(text) {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            this.range = selection.getRangeAt(0);
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
            var richEdit = this.$refs['richEdit'];
            richEdit.focus();
        }
    },
    mounted(){
        var richEdit = this.$refs.richEdit;
        if(this.value){
            richEdit.innerHTML = this.value;
        }else{
            richEdit.innerHTML = `<p><br></p> `;
        }
        var MTEditor = this.$refs.MTEditor;
        console.log(MTEditor.clientHeight);
        var MTContent = this.$refs.MTEditorContent;
        MTContent.style.height = (MTEditor.clientHeight-44)+"px"
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
    },
    watch:{
        code(newValue){
            this.$emit('input',newValue)
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
        position: relative;
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
        overflow-y: scroll;
    }
    #text_area,#coldView{
        width: 100%;
        height: 100%;
        outline: none;
        border:none;
        resize: none;
        padding: 5px;
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
    .preview{
        width: 100%;
        height: 100%;
        background: white;
        position: absolute;
        top: 0;
    }
</style>
