<template>
    <div id="MTEditor" ref="MTEditor">
        <div class="MTEditor-header">
                <ul>
                    <!-- <li style="text-align:center">
                        <i class="fa fa-file-code-o"
                            onmousedown="event.preventDefault();" 
                            @click="showcodeView=!showcodeView"
                            title="预览"
                        ></i>
                    </li> -->
                    <li>
                       <edHeader :showChild="showChild"/>
                    </li>
                    <li>
                        <i class="fa fa-bold" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('bold')"
                            title="加粗"
                            >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-italic" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('italic')"
                            title="斜体"
                            >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-underline" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('underline')"
                            title="下划线"
                            >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-strikethrough" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('strikethrough')"
                            title="删除线"
                            >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-align-left" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('justifyLeft')"
                            title="居左"    
                        >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-align-center" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('justifyCenter')"
                            title="居中"    
                        >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-align-right" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('justifyRight')"
                            title="居右"    
                        >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-align-justify" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('justifyFull')"
                            title="两侧"    
                        >
                        </i>
                    </li>
                    <li>
                        <!-- 插入图片 -->
                        <addImage :currentSelect="currentSelection"/>
                    </li>
                    <li>
                       
                        <addTable/>
                    </li>
                    <li>
                        <addLink/>
                    </li>
                    <li>
                        <i class="fa fa-list-ul" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('InsertUnorderedList')"
                            title="无序列表"    
                        >
                        </i>
                    </li>
                    <li>
                    <i class="fa fa-list-ol" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('insertOrderedList')"
                            title="有序列表"
                        >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-superscript" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('superscript')"
                            title="上标"    
                        >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-subscript" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('subscript')"
                            title="下标"    
                        >
                        </i>
                    </li>
                    <li>
                         <i class="fa fa-code" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('code')"
                            title="插入代码"    
                        >
                        </i>
                        
                    </li>
                    <li>
                        <i class="fa fa-smile-o" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('subscript')"
                            title="表情"    
                        >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-eraser" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('removeFormat')"
                            title="取消效果"    
                        >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-undo" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('undo')"
                            title="撤销最近执行的命令"    
                        >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-repeat" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('redo')"
                            title="重做被撤销的操作"    
                        >
                        </i>
                    </li>
                </ul>
        </div>
        <div class="MTEditor-content" >
            <div  id="text_area" 
            contenteditable=true v-focus 
            ref="richEdit" 
            @blur="backupRange()"
            @input="code=$event.target.innerHTML,$emit('input',$event.target.innerHTML)"
            ></div>
        </div>
        <transition name="fade">
            <div v-if="saved" class="savedConfirm" ref="saved">已保存到本地</div>
        </transition>
    </div>
</template>
<script>
import './css/font-awesome.min.css'
import edHeader from './Header'
import addImage from './AddImage/AddImage'
import addLink from './AddLink'
import addTable from './AddTable'
export default {
    name: 'mt-editor',
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
        }
    },
    components: {
        edHeader,
        addImage,
        addLink,
        addTable
    },
    methods: {
        execCommand:(command,value) => {
		    value? document.execCommand(command, false, value):document.execCommand(command, false, null)
		},
        insertTable(){
            console.log("插入表格");
        },
        // 显示
        showHeader(){

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
        }
    },
    mounted(){
        var richEdit = this.$refs.richEdit;
        richEdit.innerHTML = `<p><br></p> `;
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
