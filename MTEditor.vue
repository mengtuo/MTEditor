<template>
    <div id="MTEditor">
        <div class="MTEditor-header">
                <ul>
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
                        <addImage/>
                    </li>
                    <li>
                        <i class="fa fa-table" 
                            onmousedown="event.preventDefault();" 
                            @click="insertTable"
                            title="插入表格"    
                        >
                        </i>
                    </li>
                    <li>
                        <i class="fa fa-link" 
                            onmousedown="event.preventDefault();" 
                            @click="execCommand('CreateLink')"
                            title="插入链接"    
                        >
                        </i>
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
                            @click="execCommand('InsertOrderedList')"
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
                            @click="execCommand('RemoveFormat')"
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
                    <!-- 
                        <i class="fa fa-font"></i></li>
                    <li><i class="fa fa-quote-left"></i></li>
                      <li>
                        <i class="fa fa-undo"></i>
                    </li>
                    <li>
                        <i class="fa fa-repeat"></i>
                    </li> -->
                </ul>
        </div>
        <div class="MTEditor-content" >
            <div id="text_area" contenteditable=true v-focus ref="richEdit"></div>
        </div>
    </div>
</template>
<script>
import './css/font-awesome.min.css'
import edHeader from './Header'
import addImage from './AddImage'
export default {
    name: 'mt-editor',
    data(){
        return {
            isHTML:'false',
            content: ``,
            showChild: false,
        }
    },
    components: {
        edHeader,
        addImage
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

        }
    },
    mounted(){
        var richEdit = this.$refs.richEdit;
        richEdit.innerHTML = `<p><br></p> `;
        
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
    #text_area{
        width: 100%;
        height: 100%;
        outline: none;
        border:none;
        resize: none;
        padding: 0;
        text-align: left;
    }
    .icons {
        width: 24px;
        height: 24px;
        background: url("./css_sprites.png") no-repeat;
        
    }
</style>
